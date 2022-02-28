# Projet GameOn

1. Forkez ce repo ; ✔
2. Il est conseillé d'utiliser VisualStudio Code **✔** et vous pouvez utiliser Docker, mais ce n'est pas obligatoire ;
3. Il n'y a aucune dépendance ; ✔
4. Vous ne devez utiliser que du CSS personnalisé et du JavaScript pur, sans jQuery, Bootstrap ou autre librairie. ✔

## Implémentation des données du formulaire

- 1) Lier les labels aux entrées dans le HTML en utilisant les attributs "for" et "id" dans le code existant. Corriger le code HTML quand nécessaire. ✔
- 2) Utiliser du JavaScript pur (pas de jQuery) pour terminer le formulaire. ✔

Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
Les données doivent être saisies correctement :

- (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide. ✔
- (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide. ✔
- (3) L'adresse électronique est valide. ✔
- (4) Pour le nombre de concours, une valeur numérique est saisie. ✔
- (5) Un bouton radio est sélectionné. ✔
- (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée. ✔

- Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation. ✔

## *Validation et message d'erreurs*

- "Veuillez entrer 2 caractères ou plus pour le champ du nom." ✔
- "Vous devez choisir une option." ✔
- "Vous devez vérifier que vous acceptez les termes et conditions." ✔
- "Vous devez entrer votre date de naissance." ✔

## Après la validation

Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")

## Tests manuels

- Visualiser et tester l'interface utilisateur dans les dernières versions de Chrome et de Firefox, ainsi que dans les versions mobile et desktop.
- Corriger les erreurs d'affichage existantes.
Tester toutes les fonctionnalités des boutons et des entrées de formulaire (tester les valeurs correctes et incorrectes)

<details>

<summary>Installation de Webpack</summary>

Webpack, nous permet de minifier notre code, de le packager, de le structurer, d'utiliser des bibliotheques grâce à la communauté, et de le transpiler, et d'avoir un serveur afin d'avoir un rendu apres chaque modification du code.

Avant toutes choses, **Nodejs** doit être installé.
Pour voir la version de Nodejs:

```bash
node --version
```

1) Préparation d'un projet

```bash
npm init
```

2) installation de Webpack

```bash
npm install webpack webpack-cli --save-dev
```

Webpack s'installe en mode dev avec la commande `--save-dev`

3) Création d'un fichier de configuration de Webpack.

À la racine du projet : `webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

Explication de cette configuration :

En `production`, le point d'entrée de notre application sera `./src/index.js`.
Une fois compilé, il sera placé dans le dossier `./dist` avec pour nom de fichier `app.bundle.js`. `[name]` est une variable qui sera remplacée ici par `app`, car c'est ici ce qui désigne notre fichier de point d'entrée.

Pour lancé Webpack, il faut avant tout rajouté un script dans le package.json.

```json
"scripts": {
    "build": "webpack"
}
```

Une fois ce script placé, on peut lancé Webpack avec la commande :

```bash
npm run build
```

4) Babel

   Pour s'assurer que notre code soit bien prit en charge par rapport aux évolution de JavaScript, il nous faut un transpilateur.
   Nous allons donc installer **Babel** et le **loader** de Webpack pour qu'ils puissent fonctionner ensemble.

   - Les [plugin](https://webpack.js.org/plugins/) sont des options.
   - les [loader](https://webpack.js.org/loaders/#transpiling) sont des package installer par le biais de npm / yarn ou autre.. Il faut bien penser à configurer à la suite de l'installation d'un package le fichier `webpack.config.js`.

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env babel-polyfill
```

- `babel-polyfill` permet de géré entre autre les promesses.
  Il est important de **le placé avant** l'appel de notre code dans la configuration de Webpack, pour s'assuer de la bonne prise en charge de notre fichier `index.js`.
- Configuration de babel dans le fichier de configuration de Webpack.

````javascript
const path = require('path');

const port = 3000;
module.exports = {
  mode: "production",
  entry: {
    polyfill: "babel-polyfill",
    app: "./GameOn-website-FR/starterOnly/src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean:true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
   devServer: {
    open: true,
    port,
  },
};
````

1) Le serveur
   
Le serveur va nous permetre d'avoir un rendu côté navigateur après chaque modification de notre code.

````javascript
npm install -D webpack-dev-server
````

</details>
