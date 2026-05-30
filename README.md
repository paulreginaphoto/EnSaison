# DeSaison

DeSaison est une application web simple pour voir rapidement quels aliments sont de saison selon un pays ou un grand profil climatique.

Pas de compte, pas de carte, pas de score, pas de backend. Tout est local et statique.

## Prérequis

- Node.js 20 ou plus récent
- npm
- Pour Android: Android Studio, Android SDK et un JDK compatible avec Gradle

## Installation

```bash
npm install
```

## Développement local

```bash
npm run dev
```

Vite affiche ensuite l'URL locale, généralement `http://localhost:5173/`.

## Build web

```bash
npm run build
```

Le site statique est généré dans `dist/`.

## Prévisualisation du build

```bash
npm run preview
```

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` déploie automatiquement depuis la branche `main`.

Dans GitHub:

1. Aller dans `Settings` → `Pages`.
2. Choisir `GitHub Actions` comme source.
3. Pousser sur `main`.

Le workflow configure automatiquement `VITE_BASE_PATH` avec le nom du dépôt, ce qui permet un déploiement de type `https://utilisateur.github.io/nom-du-repo/`.

Déploiement manuel possible:

```bash
npm run deploy
```

Pour un domaine racine ou custom domain, définir la base avant build:

```bash
$env:VITE_BASE_PATH="/"
npm run build
```

## Android avec Capacitor

Initialiser le projet Android si le dossier `android/` n'existe pas encore:

```bash
npm run android:init
```

Synchroniser le build web vers Android:

```bash
npm run android:sync
```

Ouvrir dans Android Studio:

```bash
npm run android:open
```

Construire un APK debug:

```bash
npm run android:build
```

Si `JAVA_HOME` ou `ANDROID_HOME` ne sont pas définis sur Windows, cette commande équivalente utilise les chemins Android Studio courants:

```powershell
$env:JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME="$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT=$env:ANDROID_HOME
$env:PATH="$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:PATH"
cd android
.\gradlew.bat assembleDebug
```

APK attendu après un build réussi:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Multilingue et pays

L'application inclut:

- 6 langues d'interface: français, anglais, espagnol, allemand, italien, portugais.
- un sélecteur de pays basé sur les codes ISO-3166;
- des profils saisonniers larges: Europe montagne, Europe tempérée, Méditerranée, nord tempéré, sud tempéré et tropical;
- 25 catégories alimentaires incluant produits animaux, algues, boissons, huiles, condiments et aliments préparés;
- des libellés de confiance pour éviter de présenter une approximation climatique comme une certitude locale.

## Données

Les données vivent dans `src/data/seasonItems.ts`.

Chaque item suit le type:

```ts
type SeasonItem = {
  id: string
  name: string
  names?: Partial<Record<Locale, string>>
  category:
    | "allium"
    | "beverage"
    | "condiment"
    | "dairy"
    | "egg"
    | "fat"
    | "fish"
    | "fruit"
    | "insect"
    | "herb"
    | "legume"
    | "meat"
    | "grain"
    | "mushroom"
    | "nut"
    | "poultry"
    | "prepared"
    | "seafood"
    | "seaweed"
    | "seed"
    | "snack"
    | "spice"
    | "sweetener"
    | "tuber"
    | "vegetable"
  icon: string
  months: number[]
  nearMonths?: number[]
  seasonLabel: string
  seasonMode?: "harvest" | "year-round" | "variable"
  sourceIds?: string[]
  confidence?: "source" | "model" | "indicative" | "taxonomy"
}
```

La logique est volontairement simple:

- `months` contient le mois sélectionné: `De saison`
- `nearMonths` contient le mois sélectionné: `Bientôt`
- sinon: `Hors saison`

Les sources et limites de couverture sont dans `docs/data-sources.md`.

## Assets et prompts

Les SVG de secours sont dans `src/assets/icons/`.

Les prompts GPT Images sont documentés dans `docs/image-prompts.md`.

## Limites connues

- Les données sont des repères pratiques, pas un calendrier agricole certifié pays par pays.
- Le sélecteur couvre tous les pays, mais plusieurs pays utilisent encore un profil climatique indicatif.
- Le catalogue alimentaire mondial n'est pas encore exhaustif.
- L'application ne fournit pas de recettes, nutrition, carte, compte ou recommandations personnalisées.
