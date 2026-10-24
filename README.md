# Plateforme multi-tenant de location de véhicules

Plateforme web qui réunit plusieurs agences de location sur un même site.
Chaque agence publie ses véhicules ; les clients consultent les offres de toutes
les agences et envoient des demandes de réservation.

## Fonctionnalités

- **Visiteur** : consulte les offres sans compte
- **Client** : crée un compte, envoie une demande de réservation, suit les réponses
- **Agence** : publie ses véhicules avec photo, répond aux demandes reçues
- **Administrateur** : valide les agences, modère les véhicules, reçoit des notifications

## Points techniques

- Architecture multi-tenant : l'identifiant d'agence est lu dans le jeton JWT,
  ce qui garantit l'isolation des données entre agences
- Authentification JWT, mots de passe hachés (bcrypt), contrôle d'accès par rôle
- Envoi de photos (Multer)

## Technologies

MongoDB (Atlas), Express, React, Node.js, TypeScript, Tailwind CSS, Mongoose

## Installation

1. Copier `backend/.env.example` en `backend/.env` et renseigner les valeurs
2. Copier `frontend/.env.example` en `frontend/.env`
3. Backend :
   `cd backend` puis `npm install` puis `npm run dev`
4. Créer le compte administrateur (une seule fois) :
   `node src/seed/createAdmin.js` (le mot de passe par défaut est dans le script, à modifier)
5. Frontend :
   `cd frontend` puis `npm install` puis `npm run dev`

L'interface est sur http://localhost:5173 et l'API sur http://localhost:5000.

## Auteur

Mohamed Hajji
