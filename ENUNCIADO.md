# Laboratorio · Módulo 3 · Bundling con Vite

> **Entrega:** enlace a un repositorio de GitHub (público, o privado con acceso a los profesores).
> **Proyecto elegido:** la tienda de **Tueste** (tostadero de café). Si usas otro proyecto (p. ej. tu portfolio), adapta los ejemplos: los cafés pasan a ser proyectos, el carrito una lista de favoritos, el banner de ofertas un aviso de "disponible para trabajar"… Lo que cuenta son las comprobaciones, no el contenido.

---

## Índice

0. [Antes de empezar](#0-antes-de-empezar)
1. [Proyecto desde cero](#1--proyecto-desde-cero-paso-1)
2. [Estilos con Sass](#2--estilos-con-sass-pasos-2-y-3)
3. [Imágenes](#3--imágenes-paso-5)
4. [TypeScript con comprobación de tipos](#4--typescript-con-comprobación-de-tipos-paso-6)
5. [React](#5--react-paso-7)
6. [Variables de entorno](#6--variables-de-entorno-paso-8)
7. [README + bitácora de IA](#7--readme--bitácora-de-ia)
8. [Opcional 1 · Tailwind](#opcional-1--tailwind-paso-9)
9. [Opcional 2 · Code splitting y análisis del bundle](#opcional-2--code-splitting-y-análisis-del-bundle-pasos-10-y-11)
10. [Chuleta: lo que la IA suele hacer mal](#chuleta-lo-que-la-ia-suele-hacer-mal)
11. [Entrega y evaluación](#entrega-y-evaluación)

Cada obligatorio tiene tres partes:

| Parte | Qué es |
|---|---|
| 🔧 **Qué montar** | Los pasos (casi todos están en el apartado del módulo indicado). |
| 👀 **Qué comprobar** | Lo que tienes que ver con tus ojos en DevTools, en la terminal o en `dist/`. Es la "salida esperada". |
| ✍️ **Qué responder** | 1 o 2 preguntas para el README. Con 2-3 frases basta. |

---

## Reglas del juego

- La IA está **permitida y recomendada**.
- Pero tienes que **entender cada línea de configuración** que entregas. En la revisión te pueden preguntar "¿para qué sirve este plugin?" o "¿por qué esta variable lleva `VITE_` delante?".
- En los obligatorios **nada de `npm create vite`**: el proyecto se monta a mano, desde un `package.json` vacío.

---

## 0 · Antes de empezar

### Requisitos

- [ ] **Node.js 20.19 o superior** (mínimo de Vite 8). Compruébalo:
  ```bash
  node -v
  ```
  Si tienes que instalar, coge la **24** (LTS actual).
- [ ] Esta carpeta (`lab-bundling--lucia`) vacía, sin espacios ni mayúsculas en el nombre.
- [ ] Inicializa git:
  ```bash
  git init
  ```
- [ ] Crea **ya** el `.gitignore` (esta vez no hay plantilla que lo haga por ti). Como mínimo debe ignorar `node_modules`, `dist` y `.env.local`. Piensa tú si `.env` y `.env.production` deben subirse o no (pista: depende de lo que contengan).

### Commits recomendados

Un commit por obligatorio, para que se vea cómo crece el proyecto:

```
1 - proyecto desde cero
2 - estilos con Sass
3 - imágenes
4 - TypeScript con comprobación de tipos
5 - React
6 - variables de entorno
7 - README y bitácora de IA
opcional 1 - Tailwind
opcional 2 - code splitting y análisis del bundle
```

### Cómo mirar las cosas en DevTools

Casi todas las comprobaciones se hacen en **DevTools → pestaña Network**:

- Deja **desmarcada** la casilla **Disable cache** (si está marcada no verás ni los `304` ni los `from disk cache`).
- **F5** recarga la página y rellena la lista de peticiones.
- Al pulsar en una petición ves sus cabeceras (**Headers**) y su contenido (**Response**).

Las otras comprobaciones se hacen en la carpeta **`dist/`** que genera `npm run build`: abre los ficheros con el editor y usa su buscador (Ctrl+F).

### 📸 Capturas que vas a necesitar (guárdalas en `docs/` o `screenshots/`)

- [ ] El `304 Not Modified` del obligatorio 1.
- [ ] La cabecera `Cache-Control` del obligatorio 5.
- [ ] La página en `preview` con los valores de producción del obligatorio 6.
- [ ] (Opcional 2) El informe del analizador del bundle.

> Haz cada captura **en el momento** en que llegues a esa comprobación; luego es más difícil reproducirla.

---

# Parte 1 · Obligatorios

Todos son necesarios para aprobar. Ve en orden: cada uno parte del anterior.

---

## 1 · Proyecto desde cero (paso 1)

### 🔧 Qué montar

- [ ] Crea el `package.json`:
  ```bash
  npm init -y
  ```
- [ ] Edítalo y añade `"private": true` y `"type": "module"`.
- [ ] Instala Vite como dependencia de desarrollo:
  ```bash
  npm install vite --save-dev
  ```
- [ ] Añade estos tres scripts al `package.json`:
  ```json
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```
- [ ] Crea un `index.html` **en la raíz** con:
  - `lang="es"`
  - un `<title>` con sentido
  - una cabecera con el nombre de la tienda
  - `<script type="module" src="/src/index.js"></script>`
- [ ] Crea `src/index.js` con un `console.log` de bienvenida.

### 👀 Qué comprobar

- [ ] `npm run build` crea `dist/index.html` y `dist/assets/index-<hash>.js`.
  - Abre el `.js`: está **minificado**.
  - Abre el `index.html`: apunta al fichero **con hash**.
- [ ] `npm run preview` sirve la carpeta `dist` en <http://localhost:4173>.
- [ ] `npm start` arranca el servidor de desarrollo en <http://localhost:5173>. En Network aparecen `index.js`, `client` y `env.mjs` (los dos últimos los inyecta Vite).
- [ ] Pulsa **F5** varias veces: `index.js` responde **`304 Not Modified`**. 📸 **Captura.**
- [ ] Cambia el texto del `console.log` y guarda: la petición pasa a ser `index.js?t=<número>` y responde `200`. Pega ese número en la consola del navegador así para ver qué es:
  ```js
  new Date(<número>)
  ```

### ✍️ Qué responder (README)

1. ¿Para qué sirve el **hash** del nombre del fichero en producción? ¿Qué pasaría sin él al subir una versión nueva?
2. ¿Qué diferencia hay entre `npm start` y `npm run preview`? ¿Cuál usarías para comprobar que la versión de producción funciona?

- [ ] **Commit:** `1 - proyecto desde cero`

---

## 2 · Estilos con Sass (pasos 2 y 3)

### 🔧 Qué montar

- [ ] Crea `src/styles/_variables.scss` con los colores de marca de Tueste (puedes reutilizar los del `@theme` del lab 1):
  ```scss
  $tueste-500: #9a5b33;
  $tueste-900: #2e1a10;
  ```
- [ ] Crea `src/styles/main.scss` que los use para dar estilo a la cabecera del `index.html` (fondo oscuro, texto claro, logo y título en fila con `display: flex`…):
  ```scss
  @use "variables" as *;

  .brand-header {
    background-color: $tueste-900;
    /* ... */
  }
  ```
- [ ] Impórtalo desde `src/index.js`:
  ```js
  import "./styles/main.scss";
  ```
- [ ] **Arranca antes de instalar nada.** Lee el error que da Vite y haz lo que te dice (instalar `sass-embedded`).

> ⚠️ **Ojo con la IA:** en Sass, `@import` está **obsoleto**. Lo actual es `@use`. Si la IA te propone `@import "variables";`, corrígela.

### 👀 Qué comprobar

- [ ] En desarrollo, en Network, `main.scss` aparece como una petición más… pero con **icono de JavaScript**. Abre su contenido: contiene `updateStyle` y `removeStyle`.
- [ ] Cambia un color en `_variables.scss` y guarda: el color cambia **sin recargar** la página (el `console.log` de `index.js` no se vuelve a ejecutar).
- [ ] En la pestaña **Elements**, mira el `<style>` que Vite ha metido en el `<head>`.
- [ ] `npm run build` genera `dist/assets/index-<hash>.css`, ya en **CSS normal** (las variables de Sass se han sustituido por los colores), y `dist/index.html` lo enlaza con un `<link>`.

### ✍️ Qué responder (README)

1. ¿Por qué en desarrollo el CSS llega como un **módulo de JavaScript** y en producción como un fichero **`.css`**?

- [ ] **Commit:** `2 - estilos con Sass`

---

## 3 · Imágenes (paso 5)

### 🔧 Qué montar

Dos imágenes en `src/assets/`:

- [ ] **Un logo pequeño en SVG** (`logo.svg`): dibujado a mano, pedido a la IA o sacado de [Lucide](https://lucide.dev) (p. ej. el icono `coffee`). Ponlo en la cabecera del `index.html`:
  ```html
  <img src="/src/assets/logo.svg" alt="Tueste" />
  ```
- [ ] **Una foto de café en JPG** (`coffee.jpg`), de **varios cientos de KB** (de Unsplash o Pexels). Esta impórtala **desde JavaScript** y añádela a la página:
  ```js
  import coffeePhoto from "./assets/coffee.jpg";

  console.log(coffeePhoto);

  const img = document.createElement("img");
  img.src = coffeePhoto;
  img.alt = "";
  document.body.appendChild(img);
  ```

### 👀 Qué comprobar

- [ ] El `console.log(coffeePhoto)` muestra un **texto**: la URL de la imagen, no la imagen.
- [ ] En desarrollo, en Network: la foto tiene como **iniciador** (columna *Initiator*) `index.js`, y el logo, el propio HTML.
- [ ] `npm run build`: la foto aparece en `dist/assets/coffee-<hash>.jpg`.
- [ ] ¿Y el logo? Búscalo en `dist/assets`… **no está**. Abre `dist/index.html` y mira el `src` del `<img>`.

### ✍️ Qué responder (README)

1. ¿Dónde ha ido a parar el logo y por qué Vite lo trata distinto que la foto? ¿Qué ganamos y qué perdemos con eso?
   *Pista: busca `assetsInlineLimit` en la documentación de Vite.*

- [ ] **Commit:** `3 - imágenes`

---

## 4 · TypeScript con comprobación de tipos (paso 6)

### 🔧 Qué montar

- [ ] Instala TypeScript:
  ```bash
  npm install typescript --save-dev
  ```
- [ ] Crea un `tsconfig.json` (puedes partir del del módulo):
  ```json
  {
    "compilerOptions": {
      "esModuleInterop": true,
      "isolatedModules": true,
      "lib": ["ESNext", "DOM"],
      "module": "ESNext",
      "moduleResolution": "bundler",
      "noEmit": true,
      "noImplicitReturns": true,
      "resolveJsonModule": true,
      "skipLibCheck": true,
      "target": "ESNext",
      "useDefineForClassFields": true
    },
    "include": ["src"]
  }
  ```
  > Recuerda: tienes que poder explicar cada opción. Repásalas una a una.
- [ ] Renombra `src/index.js` → `src/index.ts` y actualiza el `<script>` del `index.html`.
- [ ] Mira el editor: saldrán errores que en JavaScript no veías. Arréglalos así:
  - **"Cannot find module './assets/coffee.jpg'…"** (y otro parecido con `main.scss`): TypeScript no sabe qué es importar una imagen o un fichero de estilos; eso lo añade Vite. Crea `src/vite-env.d.ts` con:
    ```ts
    /// <reference types="vite/client" />
    ```
    y desaparecen los dos.
  - Si usas `getElementById`: **"Object is possibly 'null'"** (modo estricto, lab 2). Comprueba que existe antes de usarlo, o usa `!` si estás segura.

### 👀 Qué comprobar

- [ ] Mete un error de tipos **a propósito**:
  ```ts
  const total: string = 3;
  ```
  Con `npm start`, Vite **no se queja**: ni en la terminal ni en el navegador. Sólo el editor.
- [ ] Instala `vite-plugin-checker`:
  ```bash
  npm install vite-plugin-checker --save-dev
  ```
  y crea `vite.config.ts` con `checker({ typescript: true })` (como en el módulo). Vuelve a arrancar: ahora el error sale **en la terminal** y en una **capa encima de la página**.
- [ ] Con el error todavía puesto, `npm run build` **falla**.
- [ ] Quita el error y vuelve a construir: ahora funciona.

### ✍️ Qué responder (README)

1. ¿Por qué Vite, por sí solo, no comprueba los tipos? ¿Qué gana con ello?
   *Pista: introducción del módulo, oxc e `isolatedModules`.*

- [ ] **Commit:** `4 - TypeScript con comprobación de tipos`

---

## 5 · React (paso 7)

> React se ve a fondo en el siguiente módulo, así que el código te lo dan. Lo que importa aquí es **cómo lo sirve Vite**.

### 🔧 Qué montar

- [ ] Instala React y sus tipos:
  ```bash
  npm install react react-dom
  ```
  ```bash
  npm install @types/react @types/react-dom --save-dev
  ```
- [ ] En `tsconfig.json`, añade dentro de `compilerOptions`:
  ```json
  "jsx": "react-jsx",
  "verbatimModuleSyntax": true
  ```
- [ ] En `index.html`: un `<div id="root"></div>` **debajo de la cabecera**, y el `<script>` apuntando a `/src/index.tsx`.
- [ ] Renombra `index.ts` → `index.tsx` y crea estos ficheros:

**`src/data.ts`**
```ts
export interface Coffee {
  id: number;
  name: string;
  origin: string;
  price: number;
}

export const coffees: Coffee[] = [
  { id: 1, name: "Etiopía Yirgacheffe", origin: "Etiopía", price: 14.9 },
  { id: 2, name: "Colombia Huila", origin: "Colombia", price: 12.9 },
  { id: 3, name: "Brasil Cerrado", origin: "Brasil", price: 10.5 },
];
```

**`src/app.tsx`**
```tsx
import { useState } from "react";
import { coffees, type Coffee } from "./data";
import coffeePhoto from "./assets/coffee.jpg";

export const App = () => {
  const [cart, setCart] = useState<Coffee[]>([]);

  return (
    <main>
      <h2>Cafés del mes</h2>
      <img src={coffeePhoto} alt="" />
      <ul>
        {coffees.map((coffee) => (
          <li key={coffee.id}>
            <h3>{coffee.name}</h3>
            <p>{coffee.price.toFixed(2)} €</p>
            <button onClick={() => setCart((prev) => [...prev, coffee])}>Añadir</button>
          </li>
        ))}
      </ul>
      <p>Bolsas en el carrito: {cart.length}</p>
    </main>
  );
};
```

**`src/index.tsx`** (sustituye lo que tenías; la foto ahora la pinta `App`)
```tsx
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./styles/main.scss";

createRoot(document.getElementById("root")!).render(<App />);
```

> 💡 `[...prev, coffee]` es el **spread** del lab 2: React necesita que no mutes el estado, sino que crees uno nuevo.

### 👀 Qué comprobar

- [ ] La página muestra los **tres cafés**. No has instalado ningún plugin para el JSX: Vite lo transforma de serie.
- [ ] En Network, `react.js` y `react-dom_client.js` vienen de `/node_modules/.vite/deps/` con un `?v=<hash>`.
  - Mira su cabecera **`Cache-Control: max-age=31536000, immutable`** (un año). 📸 **Captura.**
  - Pulsa F5: ahora salen **`from disk cache`**, sin pedirlas al servidor.
  - Compáralo con `app.tsx`, que responde **`304`**.
- [ ] Añade **3 bolsas** al carrito, cambia el texto del `<h2>` y guarda: el carrito vuelve a **0** (se ha recargado la página entera).
- [ ] Instala el plugin de React:
  ```bash
  npm install @vitejs/plugin-react --save-dev
  ```
  y añádelo al `vite.config.ts`. Repite la prueba: ahora el título cambia y el carrito **conserva sus 3 bolsas**.

### ✍️ Qué responder (README)

1. ¿Por qué Vite trata distinto a `react` (dependencia) y a `app.tsx` (tu código)? ¿Qué es el **pre-bundling** y qué problema resuelve?
2. ¿Qué aporta exactamente `@vitejs/plugin-react` si el JSX ya funcionaba sin él?

- [ ] **Commit:** `5 - React`

---

## 6 · Variables de entorno (paso 8)

### 🔧 Qué montar

- [ ] Crea un `.env` en la raíz, **a propósito sin prefijo**:
  ```
  SHOP_NAME=Tueste (desarrollo)
  ```
- [ ] Haz `console.log(import.meta.env)` en `app.tsx` y busca `SHOP_NAME`… **No está.**
- [ ] Añade el prefijo `VITE_` y comprueba que aparece (despliega el objeto en la consola: la vista previa sólo enseña las primeras propiedades).
- [ ] Deja el `.env` final con tres variables:
  ```
  VITE_SHOP_NAME=Tueste (desarrollo)
  VITE_API_BASE=http://localhost:3000
  VITE_SHOW_OFFERS=true
  ```
- [ ] Decláralas en `src/vite-env.d.ts` (interfaz `ImportMetaEnv`) y activa **`strictImportMetaEnv`** (como en el módulo).
- [ ] Crea `src/env.constants.ts` que las lea **en un único sitio** y convierta `VITE_SHOW_OFFERS` en un **booleano de verdad** (ojo: en `.env` todo es texto, `"true"` no es `true`).
- [ ] En `app.tsx`:
  - el nombre de la tienda como título,
  - un banner **"Envío gratis este mes"** sólo si `SHOW_OFFERS` es `true`,
  - la `API_BASE` en un texto pequeño al final.
- [ ] Crea `.env.production` con otros valores:
  - nombre: `Tueste`
  - API: `https://api.tueste.example`
  - ofertas: `false`
- [ ] Quita el `console.log(import.meta.env)` cuando termines.

### 👀 Qué comprobar

- [ ] Con `npm start`: "Tueste (desarrollo)", el banner y `localhost:3000`.
- [ ] Con `npm run build` + `npm run preview`: "Tueste", **sin banner** y la URL de producción. 📸 **Captura.**
- [ ] Escribe mal el nombre de una variable en `env.constants.ts` (`VITE_SHOP_NAM`): TypeScript da error gracias a `strictImportMetaEnv`. (Luego déjalo bien.)
- [ ] Busca `api.tueste.example` en `dist/assets/index-<hash>.js`: el valor está **escrito tal cual** en el código.
- [ ] Busca ahora `Envío gratis` en ese mismo fichero. ¿Está, aunque en producción `VITE_SHOW_OFFERS` sea `false`?

### ✍️ Qué responder (README)

1. ¿Por qué Vite obliga a usar el prefijo `VITE_`?
2. Si mañana cambia la URL de la API de producción, ¿basta con editar `.env.production` en el servidor? ¿Por qué **nunca** debe ir una clave secreta en una variable `VITE_`?
3. Según la última comprobación: ¿un *feature flag* desactivado sirve para "esconder" algo a los usuarios?

- [ ] **Commit:** `6 - variables de entorno`

---

## 7 · README + bitácora de IA

El `README.md` del repo tiene que incluir:

- [ ] **Cómo arrancarlo:** `npm install` y una tabla con los scripts:

  | Script | Comando | Para qué sirve |
  |---|---|---|
  | `start` | `npm start` | … |
  | `build` | `npm run build` | … |
  | `preview` | `npm run preview` | … |

- [ ] **Respuestas** de los obligatorios 1 a 6 (y de los opcionales que hagas).
- [ ] **Capturas** (enlazadas desde `docs/` o `screenshots/`):
  - el `304` del obligatorio 1,
  - la cabecera `Cache-Control` del obligatorio 5,
  - la página en `preview` con los valores de producción del obligatorio 6.
- [ ] **La salida final de `npm run build`** (la tabla con ficheros y tamaños), pegada en un bloque de código.
- [ ] **Checklist** de obligatorios y opcionales hechos.
- [ ] **Bitácora de IA:** qué herramienta(s) has usado y **al menos 3 ejemplos** con este formato:

  ```markdown
  ### Prompt

  "¿Cómo leo una variable de entorno en mi proyecto de React?"

  ### Qué me dio

  process.env.REACT_APP_API_URL, que es de Create React App (webpack), no de Vite.

  ### Qué corregí y por qué

  En Vite es import.meta.env.VITE_API_URL: sólo expone las variables con prefijo VITE_.
  ```

> 💡 Lo interesante de la bitácora no es que la IA acertara, sino **lo que tuviste que arreglar**. Ve apuntando los fallos **mientras trabajas** (en un fichero de notas aparte), no al final.

> ⚠️ Si haces el opcional de Tailwind: Tailwind **también lee el README**. No escribas ahí nombres de clases que no uses (p. ej. `bg-pink-500`) o acabarán en el CSS.

- [ ] **Commit:** `7 - README y bitácora de IA`

---

# Parte 2 · Opcionales

## Opcional 1 · Tailwind (paso 9)

### 🔧 Qué montar

- [ ] Instala Tailwind y su plugin:
  ```bash
  npm install tailwindcss
  ```
  ```bash
  npm install @tailwindcss/vite --save-dev
  ```
- [ ] Añade el plugin al `vite.config.ts`.
- [ ] Crea `src/styles.css` con:
  ```css
  @import "tailwindcss";
  ```
  e impórtalo en `index.tsx` **antes** de `main.scss`.
- [ ] Da estilo al catálogo con clases de Tailwind: tarjetas en rejilla (`grid sm:grid-cols-3 gap-4`), con borde, sombra y botón de color.
- [ ] La cabecera **se queda con Sass**: así compruebas que las dos cosas conviven.

> ⚠️ Estamos en **Tailwind v4** (como en el lab 1): nada de `tailwind.config.js` ni de `@tailwind base;`.

### 👀 Qué comprobar

- [ ] En `dist/assets/index-<hash>.css` está el CSS de las clases que **sí** usas (busca una, p. ej. `grid-cols-3`).
- [ ] Busca una clase que **no** uses en ningún sitio (p. ej. `bg-pink-500`): no está.
- [ ] Las reglas de `.brand-header` (Sass) están **en el mismo fichero CSS**.

### ✍️ Qué responder (README)

1. Tailwind tiene miles de clases. ¿Cómo sabe cuáles meter en el CSS final?

- [ ] **Commit:** `opcional 1 - Tailwind`

---

## Opcional 2 · Code splitting y análisis del bundle (pasos 10 y 11)

### A) Carga bajo demanda

#### 🔧 Qué montar

Dos módulos que sólo se necesitan cuando el usuario pulsa un botón:

**`src/cart.ts`**
```ts
import type { Coffee } from "./data";

export const cartTotal = (items: Coffee[]): number =>
  items.reduce((sum, coffee) => sum + coffee.price, 0);
```

**`src/shipping.ts`**
```ts
export const shippingCost = (total: number): number => (total >= 30 ? 0 : 3.9);
```

> 💡 Si hiciste el carrito inmutable del lab 2, puedes traer tus funciones a `cart.ts` en lugar de la de ejemplo.

- [ ] En `app.tsx`, un botón **"Calcular total"** que los cargue con `import()` dinámico y muestre el resultado:
  ```tsx
  const [message, setMessage] = useState("");

  const calculateTotal = async () => {
    const { cartTotal } = await import("./cart");
    const { shippingCost } = await import("./shipping");
    const total = cartTotal(cart);
    setMessage(`Total: ${total.toFixed(2)} € + envío ${shippingCost(total).toFixed(2)} €`);
  };
  ```
  Y en el JSX:
  ```tsx
  <button onClick={calculateTotal}>Calcular total</button>
  <p>{message}</p>
  ```

#### 👀 Qué comprobar

- [ ] `npm run build`: además de `index-<hash>.js`, aparecen `cart-<hash>.js` y `shipping-<hash>.js`. Fíjate en el tamaño de cada uno en la terminal.
- [ ] Con `npm run preview` y Network abierto:
  - al cargar la página, `cart` y `shipping` **no** se descargan;
  - al pulsar el botón, **sí**;
  - al pulsarlo otra vez, **no** se vuelven a pedir.

#### ✍️ Qué responder (README)

1. Cambia uno de los dos a un `import` normal al principio de `app.tsx` y vuelve a construir. ¿Qué pasa con su chunk? ¿Por qué? **(Después déjalo como estaba.)**
2. En un proyecto real, ¿qué partes de una tienda cargarías así?

### B) Análisis del bundle

#### 🔧 Qué montar

- [ ] Instala el analizador:
  ```bash
  npm install vite-bundle-analyzer --save-dev
  ```
  y añádelo al `vite.config.ts` en **modo estático** (genera un HTML sin levantar servidor):
  ```ts
  analyzer({ analyzerMode: "static", openAnalyzer: false, fileName: "bundle-report" }),
  ```
- [ ] Instala `loglevel`:
  ```bash
  npm install loglevel
  ```
  y úsalo en los **dos** módulos perezosos (`cart.ts` y `shipping.ts`), por ejemplo:
  ```ts
  import log from "loglevel";

  log.warn("*** Cargado el chunk del carrito");
  ```

#### 👀 Qué comprobar

- [ ] `npm run build` genera `dist/bundle-report.html` (y ficheros `.map`: con el analizador se activan los sourcemaps, no te asustes por los tamaños). Ábrelo en el navegador: cada rectángulo es un módulo, de tamaño proporcional a lo que ocupa.
- [ ] En la terminal aparece un chunk nuevo, `loglevel-<hash>.js`: Vite no lo ha duplicado dentro de `cart` y `shipping`, lo ha sacado aparte para compartirlo.
- [ ] Al pulsar "Calcular total" en `preview` se descargan **tres** ficheros: `cart`, `shipping` y `loglevel`.

#### ✍️ Qué responder (README)

1. ¿Qué es lo que más ocupa del chunk principal? 📸 **Captura del informe.**
2. ¿Por qué Vite saca `loglevel` a un fichero aparte en lugar de copiarlo dentro de cada chunk?

> ℹ️ El informe se genera dentro de `dist`, así que se subiría a producción con el resto. En un proyecto real el analizador se activa sólo cuando se necesita.

- [ ] **Commit:** `opcional 2 - code splitting y análisis del bundle`

---

## Chuleta: lo que la IA suele hacer mal

**Dale contexto.** Con las herramientas de build, la versión lo es todo. Ejemplo de prompt:

```
Estoy con Vite 8 (usa Rolldown y Oxc, no esbuild ni Rollup), TypeScript 7,
React 19 y Tailwind CSS 4 con el plugin @tailwindcss/vite. El proyecto NO
está creado con create-vite: tengo mi propio vite.config.ts con estos plugins:
vite-plugin-checker, @vitejs/plugin-react y @tailwindcss/vite.

Quiero añadir variables de entorno distintas para desarrollo y producción,
tipadas y con strictImportMetaEnv. Explícame cada fichero que haya que crear.
```

**Pídele que explique, no sólo que haga:** "¿qué hace exactamente este plugin?", "¿esto se ejecuta en desarrollo, en el build o en los dos?", "¿esta opción existe en Vite 8 o es de una versión anterior?".

| Lo que suele hacer | Qué hacer |
|---|---|
| `process.env.REACT_APP_X` (Create React App / webpack) | `import.meta.env.VITE_X` |
| Poner claves de API "secretas" en variables `VITE_` | Nada secreto en el front: todo `VITE_` acaba en el JS descargable |
| Proponer webpack, `react-scripts` o Create React App | Estamos con Vite: CRA está abandonado |
| Opciones de `esbuild` o `build.rollupOptions` de Vite 7 o anterior | Comprobar en la documentación de Vite que siguen en Vite 8 |
| `/// <reference path="vite/client" />` | `/// <reference types="vite/client" />`, y el fichero dentro de `src` |
| `tailwind.config.js` y `@tailwind base;` (Tailwind v3) | `@import "tailwindcss";` + plugin `@tailwindcss/vite` |
| `@import "variables";` en Sass | `@use "variables" as *;` |
| Instalar `sass` + `node-sass` + un loader | Sólo `sass-embedded`: Vite ya sabe usarlo |
| Añadir `tsc &&` al script de build **y** `vite-plugin-checker` | Una de las dos: no comprobar lo mismo dos veces sin saber por qué |
| Enlazar CSS de `node_modules` con `<link href="/node_modules/...">` | Funciona, pero lo normal es importarlo desde JS/TS: `import "bootstrap/dist/css/bootstrap.css";` |

**Si algo no se comporta como esperas:** mira en DevTools qué petición se hace y qué devuelve, y qué hay de verdad en el fichero generado en `dist`.

---

## Entrega y evaluación

### Checklist de entrega

- [ ] Repositorio en GitHub (público, o privado con acceso a los profesores), con un commit por obligatorio si puede ser.
- [ ] En la raíz: el proyecto + el `README.md` del obligatorio 7.
- [ ] Capturas en `docs/` o `screenshots/`.
- [ ] **No** se suben `node_modules` ni `dist` (revisa el `.gitignore`).
- [ ] Decidido qué ficheros `.env` se suben (`.env.local`, **nunca**).
- [ ] `npm run build` funciona sin errores.
- [ ] `package.json` sin dependencias que sobren (cada una debe tener un motivo).
- [ ] Enlace pegado en <https://academia.lemoncode.net> → laboratorios del módulo 3.

### Evaluación

| Bloque | Peso |
|---|---|
| Obligatorios 1 a 6 (el proyecto funciona en `start` y en `build`) | 60 % |
| README: respuestas, capturas y bitácora de IA (obligatorio 7) | 20 % |
| Opcionales 1 y 2 | 15 % |
| Configuración limpia: sin dependencias ni opciones que sobren | 5 % |

**Para aprobar:** todos los obligatorios hechos, `npm run build` sin errores y las respuestas contestadas.

### Prepárate para la revisión

Te pueden pedir que expliques una línea de tu `vite.config.ts` o que hagas un cambio pequeño en directo, por ejemplo:

- [ ] "Añade una variable de entorno nueva y úsala."
- [ ] "Quita el plugin de React y explica qué deja de funcionar."

Practica ambas antes de entregar.

---

## Recursos

- Apuntes del módulo: **03-bundling** (cada obligatorio indica su paso).
- [Documentación de Vite](https://vite.dev/guide/), en especial: [Features](https://vite.dev/guide/features), [Static Asset Handling](https://vite.dev/guide/assets), [Env Variables and Modes](https://vite.dev/guide/env-and-mode).
- [Por qué Vite](https://vite.dev/guide/why) (la misma idea que la introducción del módulo, contada por sus autores).
- [Awesome Vite](https://github.com/vitejs/awesome-vite) — catálogo de plugins.
- [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite).

¡A empaquetar! 📦
