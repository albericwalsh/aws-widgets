# AWS Widgets

Bibliothèque de Web Components réutilisables pour vos projets front-end.

---

## Installation

### 1. Via module ES
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/albericwalsh/aws-widgets@main/dist/index.js"></script>
```
### 2. Via npm (optionnel)
```bash
npm install aws-widgets
```
   

## Composants disponibles
1. `<aws-button>`

Bouton stylé et réutilisable.

### Attributs

* `variant` : `primary` | `secondary` | `ghost` (défaut : `primary`)
* `disabled` : booléen
* `type` : `button` | `submit` | `reset`
* `size` : `sm` | `md` | `lg` (défaut : `md`)


### Slots

* `default` : texte du bouton
* `icon` : icône optionnelle

### Événements

* `click` : déclenché lorsqu’on clique sur le bouton

### Exemple
```html
<aws-button variant="secondary" size="lg">
<span slot="icon">★</span>
Click Me
</aws-button>
```

## Démonstration

Ouvrir `demo.html` pour voir tous les composants en action.