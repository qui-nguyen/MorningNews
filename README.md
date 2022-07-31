# :newspaper: Morning News :bookmark:

Ma deuxième SAP (Single Page Application) avec la librairie front-end `React` et `Redux`.
My Moviz est une application web qui permet d'afficher les news actualisées et de les mettre dans une wishlist pour les sauvegarder en base de données et les lire plus tard.

## FONCTIONNALITES PRINCIPALES

- Sign-in et sign-up avec une méchanique de la génération d'un token et de l'encrytion du mot de passe.
- Afficher des catégories (Sport / Economie / ...)  des news via l'API News par 2 langages : français (:fr:) et anglais (:us:)
- Sauvegarder un article dans la base de données et le lire dans le détail
- Associer les articles sauvegardés au compte utilisateur

## USAGE

### Back-end

Installer les modules définis dans `package.json` par `node package manager (npm)`

```node
npm install
```

Créer le fichier des variables d'environnement `.env` à la racine du projet et les donner des valeurs pour votre environnement de développement

- `DB_LOGIN`
- `DB_PWD`
- `DB_HOSTNAME`
- `DB_NAME`
- `API_TOKEN`

Démarrer le serveur en local

```node
npm start
```

### Front-end

Déplacer vers le répertoire du front-end React

```bash
 cd ./reactapp
```

Installer les modules définis dans `package.json` par `node package manager (npm)`

```node
npm install
```

Démarrer l'application en local

```node
npm start
```

Naviguer le navigateur vers <http://localhost:3001>. La page web s'actualise automatiquement si l'on change un des fichiers source.

> Le port **3000** est occupé par le serveur en local donc on utilise le port **3001**

## TECHNOLOGIES

- `html`, `css` et `bootstrap` pour créer un UI responsible
- `react` pour créer des composants et gérer des événements de l'application
- `redux` pour faciliter la gestion des états des composants
- `express` pour créer rapidement une infrastructure Web souple sous l'environment `node.js` et pour rendre dynamique les pages HTML
- `MongoDB` pour le stockage des données et la bibliothèque MongooseDB pour créer la connexion entre MongoDB et le serveur node.js
- `API News` <https://newsapi.org>
- `AntDesign` <https://3x.ant.design/>

[![npm](https://img.shields.io/npm/v/npm)](https://npm.im/npm)

## A QUOI CE WEB RESSEMBLE ?

### :computer: "On the internet"

Le projet a été déployé sur `Heroku` et il se retrouve via le lien : <https://morningnews00.herokuapp.com/>

### :clapper: Youtube

[![Demo projet sur ma chaîne youtube](https://img.youtube.com/vi/fKzrdTkOt48/0.jpg)](https://youtu.be/fKzrdTkOt48)

## LICENCE

![NPM](https://img.shields.io/npm/l/express)
