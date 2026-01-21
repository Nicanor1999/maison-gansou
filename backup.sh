#!/bin/bash

# ────────────────────────────────────────────────
# CONFIGURATION – À MODIFIER SELON TON CAS
# ────────────────────────────────────────────────
PROJECT_DIR="/root/MaisonGANSOU"          # ← Mets le chemin ABSOLU exact de ton projet
BRANCHE="master"                             # ou "master" selon ta branche principale
GIT_REMOTE="origin"                        # normalement "origin"

# ────────────────────────────────────────────────
# NE PAS TOUCHER EN DESSOUS SAUF SI TU SAIS CE QUE TU FAIS
# ────────────────────────────────────────────────

cd "$PROJECT_DIR" || { echo "Erreur : dossier $PROJECT_DIR introuvable"; exit 1; }

# Ajoute tous les changements (nouveaux fichiers + modifiés)
git add .

# Essaie de commiter – si rien n'a changé, on affiche un message et on continue
git commit -m "Sauvegarde automatique $(date '+%Y-%m-%d %H:%M:%S')" || {
    echo "Aucun changement à commiter → on passe au push (au cas où)"
}

# On pousse vers le remote (GitHub/GitLab/etc.)
git push "$GIT_REMOTE" "$BRANCHE"

echo "Backup terminé à $(date '+%Y-%m-%d %H:%M:%S')"