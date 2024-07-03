# Réseau Social pour Freelances

Bienvenue sur le Réseau Social pour Freelances, une application permettant aux freelances et aux clients de se connecter, de gérer des projets, de commenter, de suivre d'autres utilisateurs et bien plus encore.

## Table des matières

- [Réseau Social pour Freelances](#réseau-social-pour-freelances)
  - [Table des matières](#table-des-matières)
  - [Fonctionnalités](#fonctionnalités)
  - [Technologies utilisées](#technologies-utilisées)
  - [Installation](#installation)
    - [Prérequis](#prérequis)
    - [Étapes d'installation](#étapes-dinstallation)
  - [Utilisation](#utilisation)
  - [Tests](#tests)
    - [Tests unitaires](#tests-unitaires)
    - [Tests API](#tests-api)

## Fonctionnalités

- Inscription et connexion avec GitHub
- Gestion des profils utilisateurs (freelance et client)
- Création, modification et suppression de projets
- Commentaires et likes sur les projets
- Système de suivi des utilisateurs (followers et following)
- Visualisation des utilisateurs par rôle

## Technologies utilisées

- Next.js
- React
- Tailwind CSS
- Prisma
- PostgreSQL
- Docker
- Jest
- Supertest
- NextAuth.js

## Installation

### Prérequis

- Node.js (version 20 ou supérieure)
- Docker
- Docker Compose

### Étapes d'installation

1. Clonez le dépôt

  ```sh
  git clone git@github.com:Enemles/free-work.git
  cd free-work
  ```

2. Installez les dépendances

  ```sh
  npm install
  ```

3. Configurez les variables d'environnement

  Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

  ```env
POSTGRES_USER="your-postgres-user"
POSTGRES_PASSWORD="your-postgres-password"
POSTGRES_DB="your-postgres-db"
DATABASE_URL="postgresql://your-postgres-user:your-postgres-password@postgres:5432/your-postgres-db?schema=public"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
CYPRESS_BASE_URL="http://localhost:3000"
CYPRESS_BACKEND_URL="http://localhost:3000/api"

  ```

4. Démarrez les services Docker

  ```sh
  npm run docker:compose:dev
  ```

## Utilisation

1. Accédez à l'application via http://localhost:3000
2. Inscrivez-vous ou connectez-vous avec votre compte GitHub
3. Complétez votre profil
4. Créez et gérez des projets
5. Commentez et likez les projets
6. Suivez d'autres utilisateurs

## Tests

### Tests unitaires
Pour exécuter les tests unitaires :
```sh
npm run test:unit
```
### Tests API

Pour exécuter les tests API :

```sh
npm run test:api
```