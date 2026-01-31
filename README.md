# AWS Widgets

Bibliothèque de Web Components réutilisables pour vos projets front-end.  
Chaque widget est autonome, thémable via `style.json` et prêt à l’emploi.

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

---

## Composants disponibles

### 1. `<aws-button>`

Bouton stylé et réutilisable.

**Attributs**

- `variant` : `primary` | `secondary` | `ghost` (défaut : `primary`)
- `disabled` : booléen
- `type` : `button` | `submit` | `reset`
- `size` : `sm` | `md` | `lg` (défaut : `md`)

**Slots**

- `default` : texte du bouton
- `icon` : icône optionnelle

**Événements**

- `click` : déclenché lors du clic

**Exemple**  
```html
<aws-button variant="secondary" size="lg">
<span slot="icon">★</span>
Click Me
</aws-button>
```

---

### 2. `<aws-title>`

Titre principal pour les pages ou sections.

**Slots**

- `default` : texte du titre

**Exemple**
```html
<aws-title>Mon Titre</aws-title>
```
---

### 3. `<aws-paragraph>`

Paragraphe stylé.

**Slots**

- `default` : texte du paragraphe

**Exemple**
```html
<aws-paragraph>Voici un paragraphe de démonstration.</aws-paragraph>
```
---

### 4. `<aws-bool>`

Affichage booléen interactif, mode `view` ou `edit`.

**Attributs**

- `value` : `true` | `false`
- `mode` : `view` | `edit` (défaut : `edit`)

**Événements**

- `change` : déclenché à chaque modification de valeur

**Exemple**
```html
<aws-bool value="true" mode="edit"></aws-bool>
```
---

### 5. `<aws-icon-button>`

Bouton avec icône uniquement.

**Attributs**

- `variant` : `primary` | `secondary` | `ghost`
- `disabled` : booléen
- `size` : `sm` | `md` | `lg`

**Slots**

- `icon` : contenu de l’icône

**Événements**

- `click` : déclenché au clic

**Exemple**
```html
<aws-icon-button><span slot="icon">⚙️</span></aws-icon-button>
```

---

### 6. `<aws-slider>`

Slider pour sélection de valeurs numériques.

**Attributs**

- `min` : valeur minimale
- `max` : valeur maximale
- `value` : valeur actuelle

**Événements**

- `change` : déclenché lors du changement de valeur

**Exemple**
```html
<aws-slider min="0" max="100" value="50"></aws-slider>
```

---

### 7. `<aws-input>`

Champ texte stylé.

**Attributs**

- `type` : `text` | `number` | `email` | `password`
- `value` : valeur actuelle
- `placeholder` : texte d’indication

**Événements**

- `input` : déclenché à chaque saisie

**Exemple**
```html
<aws-input type="text" placeholder="Votre nom"></aws-input>
```

---

### 8. `<aws-search>`

Champ de recherche stylé avec intégration globale de frappe.

**Slots** : aucun  
**Événements** : `input`

**Exemple**
```html
<aws-search></aws-search>
```

---

### 9. `<aws-progress-circle>`

Cercle de progression animé.

**Attributs**

- `value` : 0 → 100
- `indeterminate` : booléen pour animation continue

**Exemple**
```html 
<aws-progress-circle value="75"></aws-progress-circle>
```

---

### 10. `<aws-stat-card>`

Carte d’affichage de statistiques.

**Attributs**

- `value`, `min`, `max`, `color-min`, `color-max`

**Slots**

- `title` : titre de la statistique
- `value` : valeur affichée

**Exemple**
```html
<aws-stat-card value="70" min="0" max="100">
<span slot="title">Score de sécurité</span>
<span slot="value">70</span>
</aws-stat-card>
```

---

### 11. `<aws-selector>`

Sélecteur stylé pour listes.

**Attributs**

- `value` : valeur sélectionnée
- `list` : tableau d’objets `{col1, col2}`

**Événements**

- `change` : déclenché à la sélection

**Exemple**
```html
<aws-selector></aws-selector>
```

---

### 12. `<aws-context>`

Dialog/modal stylé.

**Méthodes**

- `open()`
- `close()`

**Exemple**
```html
<aws-context id="dialog"></aws-context>
```

---

### 13. `<aws-table>`

Tableau stylé, avec `<aws-table-head>` et `<aws-table-body>`.

**Exemple**
```html
<aws-table>
<aws-table-head>
<aws-table-row>
<aws-table-cell>Nom</aws-table-cell>
<aws-table-cell>Âge</aws-table-cell>
</aws-table-row>
</aws-table-head>
<aws-table-body>
<aws-table-row>
<aws-table-cell>Jean</aws-table-cell>
<aws-table-cell>30</aws-table-cell>
</aws-table-row>
</aws-table-body>
</aws-table>
```

---

## Démonstration

Ouvrir `demo.html` pour voir tous les composants en action.
