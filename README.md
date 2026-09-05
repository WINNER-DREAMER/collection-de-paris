# Collection de Paris — site vitrine & boutique

Site web pour **Collection de Paris**, boutique d'articles divers (sacs, perruques, parfums, pagnes) et salon de coiffure situé à Château, Abengourou, Côte d'Ivoire.

## Ce que contient le site

- **Vitrine** : présentation de la boutique et du salon, galerie photo, avis clients.
- **Catalogue** : grille de produits filtrable par catégorie (Sacs, Perruques, Parfums, Pagnes).
- **Panier** : ajout de produits, gestion des quantités, tiroir latéral.
- **Commande** : le client valide son panier, un message pré-rempli s'ouvre dans WhatsApp avec le détail de la commande et le total indicatif. Aucun paiement en ligne — la confirmation et le règlement se font directement avec la boutique, comme demandé.
- **Contact** : adresse, téléphones cliquables, horaires, carte Google Maps intégrée.

## Structure des fichiers

```
collection-de-paris/
├── index.html              → structure de la page (une seule page, sections ancrées)
├── README.md                → ce fichier
└── assets/
    ├── css/
    │   └── style.css        → tous les styles (palette, typographie, mise en page, responsive)
    ├── js/
    │   ├── products.js       → liste des produits (nom, prix, catégorie, image, description)
    │   └── main.js           → logique : filtres, panier, modale produit, commande WhatsApp
    └── images/               → toutes les photos (produits, salon, galerie, devanture)
```

## Comment modifier le contenu

### Changer un prix ou ajouter un produit
Tout se passe dans `assets/js/products.js`. Chaque produit est un bloc :

```js
{
  id: "identifiant-unique",       // sans espace, sans accent
  name: "Nom affiché du produit",
  category: "sacs",                 // sacs | perruques | parfums | pagnes
  price: 25000,                     // en FCFA, sans espace ni symbole
  image: "assets/images/mon-image.jpg",
  description: "Texte descriptif affiché dans la fiche produit."
}
```
Pour ajouter un produit : copier un bloc existant, changer les valeurs, l'ajouter dans la liste `PRODUCTS`. Pour ajouter une nouvelle catégorie (ex. "parfums" n'a pas encore de produits), il faut aussi l'ajouter dans le bouton de filtre correspondant dans `index.html` (section `#filterRow`) — ils sont déjà prévus (Sacs, Perruques, Parfums, Pagnes), il suffit d'ajouter les produits avec la bonne `category`.

### Changer les photos
Remplacer le fichier dans `assets/images/` en gardant exactement le même nom, ou changer le chemin dans `products.js` / `index.html` si le nom change. Formats recommandés : `.jpg`, carré ou proche du carré pour les produits (1:1), format paysage pour la galerie (4:3).

### Changer les horaires, téléphone, adresse
Ces informations sont écrites directement dans `index.html`, section `<section id="contact">` et dans le pied de page. Elles sont dupliquées à deux endroits : dans le texte visible (`#hoursText`, `.info-list`) et dans le lien WhatsApp (`https://wa.me/...`) — si le numéro change, penser à le changer aux deux endroits, ainsi que dans `assets/js/main.js` (variable `WHATSAPP_NUMBER` en haut du fichier).

### Changer les couleurs ou les polices
Tout est centralisé en haut de `assets/css/style.css`, dans le bloc `:root`. Exemple :
```css
--wine: #8B1E3F;   /* couleur d'accent principale (bordeaux) */
--gold: #C9A66B;   /* couleur secondaire (doré) */
```
Changer une valeur ici met à jour toute la couleur sur l'ensemble du site.

## Mise en ligne

Ce site est 100% statique (HTML/CSS/JS, aucun serveur ni base de données requis). Il peut être hébergé sur :
- **Netlify** ou **Vercel** (glisser-déposer le dossier, gratuit, HTTPS automatique)
- **GitHub Pages** (gratuit, nécessite un compte GitHub)
- Un hébergement mutualisé classique (upload par FTP)

Aucune étape de compilation n'est nécessaire : le dossier peut être déployé tel quel.

## Points restants avant mise en ligne définitive

- [ ] Confirmer les horaires exacts d'ouverture avec la propriétaire (actuellement calés sur la fiche Google Maps : ouvert tous les jours, fermeture à 23h)
- [ ] Valider les prix indicatifs des produits avec la propriétaire (prix d'exemple actuellement dans `products.js`)
- [ ] Ajouter les produits manquants (parfums, pagnes — catégories prévues mais vides pour l'instant)
- [ ] Remplacer les avis clients d'exemple par de vrais avis si disponibles

## Support

Site réalisé par Digit Communication.
