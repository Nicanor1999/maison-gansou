#!/bin/bash

# =============================================================================
# Script de restauration MongoDB
# Restaure une sauvegarde locale ou depuis AWS S3
# =============================================================================

set -e

# Configuration
BACKUP_DIR="/root/MaisonGANSOU/backups/mongodb"
TEMP_DIR="/tmp/mongodb_restore"

# Configuration MongoDB
MONGO_CONTAINER="maison-mongodb"
MONGO_USER="admin"
MONGO_PASSWORD="admin123"
MONGO_DB="gansou_db"

# Configuration S3
if [ -f "/root/MaisonGANSOU/backend/.env" ]; then
    export $(grep -E '^PUBLIC_AWS' /root/MaisonGANSOU/backend/.env | xargs)
fi

S3_BUCKET="${PUBLIC_AWS_BUCKET_NAME:-}"
S3_REGION="${PUBLIC_AWS_REGION:-eu-central-1}"
AWS_ACCESS_KEY="${PUBLIC_AWS_ACCESS_KEY_ID:-}"
AWS_SECRET_KEY="${PUBLIC_AWS_SECRET_ACCESS_KEY:-}"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo -e "  Restauration MongoDB - MaisonGANSOU"
echo -e "==========================================${NC}"
echo ""

# Fonction pour lister les backups locaux
list_local_backups() {
    echo -e "${BLUE}Backups locaux disponibles:${NC}"
    echo ""
    local i=1
    backups=()
    for f in $(ls -t "$BACKUP_DIR"/mongodb_backup_*.tar.gz 2>/dev/null); do
        backups+=("$f")
        size=$(du -h "$f" | cut -f1)
        name=$(basename "$f")
        echo "  $i) $name ($size)"
        ((i++))
    done
    echo ""
    if [ ${#backups[@]} -eq 0 ]; then
        echo -e "${YELLOW}Aucun backup local trouve.${NC}"
        return 1
    fi
    return 0
}

# Fonction pour lister les backups S3
list_s3_backups() {
    if [ -z "$S3_BUCKET" ] || [ "$S3_BUCKET" == "your-awss3bucket" ] || [ -z "$AWS_ACCESS_KEY" ]; then
        echo -e "${YELLOW}Configuration S3 non disponible.${NC}"
        return 1
    fi

    export AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY"
    export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY"
    export AWS_DEFAULT_REGION="$S3_REGION"

    if ! command -v aws &> /dev/null; then
        echo -e "${YELLOW}AWS CLI non installe.${NC}"
        return 1
    fi

    echo -e "${BLUE}Backups S3 disponibles:${NC}"
    echo ""
    aws s3 ls "s3://${S3_BUCKET}/mongodb-backups/" 2>/dev/null | tail -10
    echo ""
    return 0
}

# Fonction de restauration
restore_backup() {
    local backup_file=$1

    echo -e "${YELLOW}ATTENTION: Cette operation va remplacer les donnees actuelles de la base '${MONGO_DB}'${NC}"
    read -p "Etes-vous sur de vouloir continuer? (oui/non): " confirm

    if [ "$confirm" != "oui" ]; then
        echo "Restauration annulee."
        exit 0
    fi

    # Creer un dossier temporaire
    rm -rf "$TEMP_DIR"
    mkdir -p "$TEMP_DIR"

    echo -e "${BLUE}Extraction du backup...${NC}"
    tar -xzvf "$backup_file" -C "$TEMP_DIR"

    # Trouver le dossier extrait
    EXTRACTED_DIR=$(find "$TEMP_DIR" -maxdepth 1 -type d -name "mongodb_backup_*" | head -1)

    if [ -z "$EXTRACTED_DIR" ]; then
        echo -e "${RED}Erreur: Impossible de trouver les fichiers du backup${NC}"
        exit 1
    fi

    echo -e "${BLUE}Copie des fichiers vers le container MongoDB...${NC}"
    docker cp "$EXTRACTED_DIR" "${MONGO_CONTAINER}:/tmp/restore_data"

    echo -e "${BLUE}Restauration de la base de donnees...${NC}"
    docker exec "$MONGO_CONTAINER" mongorestore \
        --username="$MONGO_USER" \
        --password="$MONGO_PASSWORD" \
        --authenticationDatabase=admin \
        --db="$MONGO_DB" \
        --drop \
        "/tmp/restore_data/${MONGO_DB}"

    # Nettoyage
    docker exec "$MONGO_CONTAINER" rm -rf /tmp/restore_data
    rm -rf "$TEMP_DIR"

    echo ""
    echo -e "${GREEN}=========================================="
    echo -e "  Restauration terminee avec succes!"
    echo -e "==========================================${NC}"
}

# Fonction pour telecharger depuis S3
download_from_s3() {
    read -p "Entrez le nom du fichier S3 (ex: mongodb_backup_2024-01-01_03-00-00.tar.gz): " s3_file

    export AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY"
    export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY"
    export AWS_DEFAULT_REGION="$S3_REGION"

    local_file="$BACKUP_DIR/$s3_file"

    echo -e "${BLUE}Telechargement depuis S3...${NC}"
    aws s3 cp "s3://${S3_BUCKET}/mongodb-backups/${s3_file}" "$local_file"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Telechargement termine!${NC}"
        restore_backup "$local_file"
    else
        echo -e "${RED}Erreur lors du telechargement${NC}"
        exit 1
    fi
}

# Menu principal
echo "Choisissez une source de restauration:"
echo ""
echo "  1) Backup local"
echo "  2) Backup depuis AWS S3"
echo "  3) Quitter"
echo ""
read -p "Votre choix (1-3): " choice

case $choice in
    1)
        if list_local_backups; then
            read -p "Numero du backup a restaurer: " backup_num
            if [ "$backup_num" -ge 1 ] && [ "$backup_num" -le ${#backups[@]} ]; then
                selected_backup="${backups[$((backup_num-1))]}"
                restore_backup "$selected_backup"
            else
                echo -e "${RED}Numero invalide${NC}"
                exit 1
            fi
        fi
        ;;
    2)
        if list_s3_backups; then
            download_from_s3
        fi
        ;;
    3)
        echo "Au revoir!"
        exit 0
        ;;
    *)
        echo -e "${RED}Choix invalide${NC}"
        exit 1
        ;;
esac
