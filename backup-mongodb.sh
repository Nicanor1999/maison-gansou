#!/bin/bash

# =============================================================================
# Script de sauvegarde MongoDB hebdomadaire
# Sauvegarde locale + Upload vers AWS S3
# =============================================================================

set -e

# Configuration
BACKUP_DIR="/root/MaisonGANSOU/backups/mongodb"
LOG_FILE="/root/MaisonGANSOU/backup-mongodb.log"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_NAME="mongodb_backup_${DATE}"
RETENTION_DAYS=30  # Garder les backups locaux pendant 30 jours

# Configuration MongoDB (depuis docker-compose)
MONGO_CONTAINER="maison-mongodb"
MONGO_USER="admin"
MONGO_PASSWORD="admin123"
MONGO_DB="gansou_db"

# Configuration S3 (charger depuis .env si disponible)
if [ -f "/root/MaisonGANSOU/backend/.env" ]; then
    export $(grep -E '^PUBLIC_AWS' /root/MaisonGANSOU/backend/.env | xargs)
fi

S3_BUCKET="${PUBLIC_AWS_BUCKET_NAME:-}"
S3_REGION="${PUBLIC_AWS_REGION:-eu-central-1}"
AWS_ACCESS_KEY="${PUBLIC_AWS_ACCESS_KEY_ID:-}"
AWS_SECRET_KEY="${PUBLIC_AWS_SECRET_ACCESS_KEY:-}"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction de log
log() {
    local level=$1
    local message=$2
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo -e "${timestamp} [${level}] ${message}" | tee -a "$LOG_FILE"
}

log_info() { log "INFO" "$1"; }
log_success() { log "${GREEN}SUCCESS${NC}" "$1"; }
log_warning() { log "${YELLOW}WARNING${NC}" "$1"; }
log_error() { log "${RED}ERROR${NC}" "$1"; }

# Creer les dossiers necessaires
mkdir -p "$BACKUP_DIR"
mkdir -p "$(dirname $LOG_FILE)"

log_info "=========================================="
log_info "Demarrage de la sauvegarde MongoDB"
log_info "=========================================="

# Verifier que le container MongoDB est en cours d'execution
if ! docker ps --format '{{.Names}}' | grep -q "^${MONGO_CONTAINER}$"; then
    log_error "Le container MongoDB '${MONGO_CONTAINER}' n'est pas en cours d'execution!"
    exit 1
fi

log_info "Container MongoDB detecte: ${MONGO_CONTAINER}"

# Effectuer le dump MongoDB
log_info "Creation du dump MongoDB..."
DUMP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

docker exec "$MONGO_CONTAINER" mongodump \
    --username="$MONGO_USER" \
    --password="$MONGO_PASSWORD" \
    --authenticationDatabase=admin \
    --db="$MONGO_DB" \
    --out="/tmp/${BACKUP_NAME}" \
    2>&1 | tee -a "$LOG_FILE"

# Copier le dump depuis le container
docker cp "${MONGO_CONTAINER}:/tmp/${BACKUP_NAME}" "$DUMP_PATH"

# Nettoyer le dump temporaire dans le container
docker exec "$MONGO_CONTAINER" rm -rf "/tmp/${BACKUP_NAME}"

log_success "Dump MongoDB cree avec succes"

# Compresser le backup
log_info "Compression du backup..."
cd "$BACKUP_DIR"
tar -czvf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}" 2>&1 | tee -a "$LOG_FILE"
rm -rf "${BACKUP_NAME}"

BACKUP_FILE="${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
log_success "Backup compresse: ${BACKUP_FILE} (${BACKUP_SIZE})"

# Upload vers S3 si configure
if [ -n "$S3_BUCKET" ] && [ "$S3_BUCKET" != "your-awss3bucket" ] && [ -n "$AWS_ACCESS_KEY" ]; then
    log_info "Upload vers AWS S3..."

    # Configurer AWS CLI credentials temporairement
    export AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY"
    export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY"
    export AWS_DEFAULT_REGION="$S3_REGION"

    # Verifier si AWS CLI est installe
    if command -v aws &> /dev/null; then
        aws s3 cp "$BACKUP_FILE" "s3://${S3_BUCKET}/mongodb-backups/${BACKUP_NAME}.tar.gz" \
            2>&1 | tee -a "$LOG_FILE"

        if [ $? -eq 0 ]; then
            log_success "Backup uploade vers S3: s3://${S3_BUCKET}/mongodb-backups/${BACKUP_NAME}.tar.gz"
        else
            log_error "Echec de l'upload vers S3"
        fi
    else
        log_warning "AWS CLI non installe. Installation recommandee: apt install awscli"
        log_warning "Le backup local a ete cree mais pas uploade vers S3"
    fi
else
    log_warning "Configuration S3 incomplete. Backup local uniquement."
    log_warning "Configurez les variables AWS dans /root/MaisonGANSOU/backend/.env"
fi

# Rotation des anciens backups locaux
log_info "Nettoyage des anciens backups (> ${RETENTION_DAYS} jours)..."
DELETED_COUNT=$(find "$BACKUP_DIR" -name "mongodb_backup_*.tar.gz" -type f -mtime +$RETENTION_DAYS -delete -print | wc -l)
log_info "${DELETED_COUNT} ancien(s) backup(s) supprime(s)"

# Resume
log_info "=========================================="
log_success "Sauvegarde terminee avec succes!"
log_info "Fichier local: ${BACKUP_FILE}"
log_info "Taille: ${BACKUP_SIZE}"
log_info "=========================================="

# Lister les backups disponibles
log_info "Backups disponibles:"
ls -lh "$BACKUP_DIR"/*.tar.gz 2>/dev/null | tail -5 | tee -a "$LOG_FILE"

exit 0
