# Projet04GameOn
![GitHub repo size](<https://img.shields.io/github/repo-size/Yan-Coquoz/GameOn>) 
1. Forkez ce repo ; ✔
2. Il est conseillé d'utiliser VisualStudio Code **✔** et vous pouvez utiliser Docker, mais ce n'est pas obligatoire ;
3. Il n'y a aucune dépendance ; ✔
4. Vous ne devez utiliser que du CSS personnalisé et du JavaScript pur, sans jQuery, Bootstrap ou autre librairie. ✔

## Fermer la modale

- Ajouter la fonctionnalités au bouton (X) ✔
  
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

Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")  ✔

## Tests manuels

- Visualiser et tester l'interface utilisateur dans les dernières versions de Chrome et de Firefox, ainsi que dans les versions mobile et desktop. ✔
- Corriger les erreurs d'affichage existantes.
Tester toutes les fonctionnalités des boutons et des entrées de formulaire (tester les valeurs correctes et incorrectes) ✔

Site pour le test des regex :

- [regexr](https://regexr.com/)


## **compte rendu soutenance**
Liste des corrections à apporter sous 48h (avant 11h00 le 09/03/2022) suite à la soutenance d'aujourd'hui :

1-Points à retravailler pour valider ce projet:

 Desktop :

- Supprimer le comportement par défaut du formulaire pour ne pas avoir en doublon les messages d'erreur de saisie par défaut du formulaire ✔

- Lorsque l'on saisit "d" dans l'input "prénom" puis que l'on continue à remplir le formulaire et que l'on clique sur "c'est partie", le message d'erreur ne s'affiche pas puis lorsque l'on ajoute "david" à la place de "d" dans l'input prénom et que l'on clique de nouveau sur "c'est partie", le formulaire n'affiche pas la page de confirmation. ✔

- Les inputs n'ont pas de bordure rouge lorsque le message d'erreur s'affiche comme sur la maquette ✔
- Supprimer le bouton "Accueil" pour être conforme à la maquette ✔

Sur la page de confirmation :

- La police de caractère n'est pas comme sur la maquette ✔
- Le bouton "fermer" n'a pas d'ombre sur la maquette ✔

Mobile :

- Le formulaire ne s'affiche pas comme sur la maquette avec le header logo + menu visible  ✔

Desktop + Mobile :

- Problème d'affichage sur Firefox à corriger (image + fonts)

2-Autres suggestions :

Architecture du projet :

- mettre le fichier index.html dans public ✔
- mettre le dossier asset dans public supprimer les fonts qui ne sont pas utilisées ✔
- mettre les fichiers js dans un dossier script ou js par exemple ✔

Code :

- Nettoyer les commentaires ou codes commentés, non utilisés et ajouter les commentaires avant le bloc de code à commenter ✔
- Tester le code au validateur W3C ✔

[⬆ Haut de page](#projet04gameon)
