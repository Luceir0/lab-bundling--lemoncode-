# Notas de IA (borrador para la bitácora)

Fichero de trabajo: aquí se apunta, **mientras se trabaja**, cada interacción con la IA que merezca la pena: sobre todo lo que dio mal o incompleto y cómo se corrigió. Al final, los mejores ejemplos (mínimo 3) pasan a la sección "Bitácora de IA" del `README.md`.

**Herramientas usadas:** Claude Code (Claude Opus 5.5) en VS Code.

---

## Plantilla

```markdown
### [Paso N] Título corto

**Prompt:** "..."

**Qué me dio:** ...

**Qué corregí y por qué:** ...
```

---

## Entradas

### [Paso 0] Organizar el enunciado

**Prompt:** "Teniendo en cuenta el archivo enunciado.md, ¿podrías decirme paso a paso qué hay que hacer? Escríbelo en enunciado-paso-a-paso.md. ¿Cuánto tiempo calculas que me puede llevar?"

**Qué me dio:** un resumen por pasos (montar / comprobar / responder / commit), con estimación de tiempo por paso (~8-11 h en total) y consejos (llevar este fichero de notas, hacer las capturas en el momento).

**Qué corregí y por qué:** nada por ahora. Es un resumen: el detalle exacto (código, comandos) hay que seguir mirándolo en `ENUNCIADO.md`.

### [Paso 0] Contenido del .gitignore

**Prompt:** "No sé qué sería bueno meter en .gitignore. ¿Podrías decirme qué es lo más conveniente y ponerlo?"

**Qué me dio:** movió mi `.gitignore` de `docs/` a la raíz (en `docs/` solo afectaba a esa carpeta) y lo completó: `node_modules`, `dist`, `.env.local` / `*.local`, logs, ficheros del sistema y del editor. Decidió que `.env` y `.env.production` sí se suben porque solo llevan valores públicos `VITE_*`, que acaban igualmente escritos en el bundle.

**Qué corregí y por qué:** nada por ahora.

### [Paso 1] Qué comprobar después del build

**Prompt:** "En la parte de Paso 1: comprobar, no me queda muy claro qué es lo que hay que hacer después del build. ¿Podrías continuar?"

**Qué me dio:** desglosó las comprobaciones del paso 1 en `enunciado-paso-a-paso.md` (qué mirar en `dist/`, `preview` en el 4173, `start` en el 5173, el 304, el `?t=` y `new Date(...)`). Además detectó dos fallos en mi `index.html`: faltaba la cabecera con el nombre de la tienda y había un acento grave (`) suelto dentro del `<head>`.

**Qué corregí y por qué:** nada de lo que me dio; apliqué los dos arreglos que me señaló (añadir la cabecera `<header><h1>Tueste</h1></header>` y borrar el acento grave suelto).

### [Paso 4] Modo estricto y vite-plugin-checker

**Prompt:** "Incluye el modo estricto en tsconfig y montemos vite-plugin-checker"

**Qué me dio:** añadió `"strict": true` al `tsconfig.json` (el del enunciado no lo traía aunque luego habla del modo estricto), instaló `vite-plugin-checker` y creó `vite.config.ts` con `checker({ typescript: true })`. Comprobó que, con `const total: string = 3;` puesto, `npm run build` falla con `TS2322`.

**Qué corregí y por qué:** nada por ahora.

### [Paso 5] React y plugin de React

**Prompt:** "Listo. ¿Puedes comprobar que en este paso está hecho todo lo necesario para cumplir con los requisitos? Si es así, pasemos al punto siguiente."

**Qué me dio:** montó React con el código del enunciado (`data.ts`, `app.tsx`, `index.tsx`, `jsx` y `verbatimModuleSyntax` en `tsconfig.json`, `#root` en el HTML), revisó mi captura de `Cache-Control`, instaló `@vitejs/plugin-react`, lo añadió a `vite.config.ts` y redactó las dos respuestas del README.

**Qué corregí y por qué:** nada por ahora.

### [Extra] Favicon con el logo

**Prompt:** "Sí, usa mi logo como favicon dándole otro color"

**Qué me dio:** creó `src/assets/favicon.svg`, una copia de mi logo con el trazo en el marrón de la marca (`#9a5b33`, el de `$tueste-500`) en lugar de blanco para que se vea en pestañas claras, y lo enlazó con `<link rel="icon">` en `index.html`. Así desaparece el 404 de `/favicon.ico` que salía en consola.

**Qué corregí y por qué:** nada.

### [Opcional 1] Tailwind y el reset de Sass

**Prompt:** "Sí, hagamos los opcionales. Empecemos por el 1. Voy a hacer el punto 1 y el 2, podemos seguir desde ahí?"

**Qué me dio:** revisó lo que yo había hecho (instalación, `styles.css` e import en `index.tsx` antes de `main.scss`) y vio que faltaba `tailwindcss()` en `vite.config.ts`. Me dijo que, como Tailwind se carga antes que `main.scss`, donde chocaran mandaría mi Sass "por orden".

**Qué corregí y por qué:** la explicación era incorrecta y la propia IA la rectificó al mirar el reset: no es cuestión de orden sino de capas. Tailwind v4 mete sus clases en `@layer utilities`, y cualquier regla **fuera** de una capa (como todo mi `_reset.scss`) gana a cualquier regla dentro de una capa, se cargue antes o después. Así, `* { padding: 0 }` o `button { background: none }` del reset anularían `p-4` o `bg-amber-700`. Solución: meter el reset en `@layer base`.

### [Opcional 1] Error de VS Code con `source(".")`

**Prompt:** "Por qué esto me da error en styles.css ?: `@import "tailwindcss" source(".");`"

**Qué me dio:** explicó que no es un error real sino del comprobador de CSS de VS Code (`css-semicolonexpected`), que no conoce la sintaxis de Tailwind v4; el build funciona. Como la extensión Tailwind CSS IntelliSense ya estaba instalada, creó `.vscode/settings.json` con `"files.associations": { "*.css": "tailwindcss" }` (no se sube: `.vscode/*` está en `.gitignore`).

**Qué corregí y por qué:** nada por ahora.

### [Opcional 2] Entender el botón "Calcular total"

**Prompt:** "No entiendo el punto 3 de app.tsx"

**Qué me dio:** una explicación por partes de lo que hay que añadir en `app.tsx` (el estado `message`, la función `async` con `await import()` y el botón con su `<p>`), dónde va cada trozo dentro de mi componente y por qué `import()` dentro de la función hace que Vite saque `cart` y `shipping` a chunks aparte.

**Qué corregí y por qué:** nada por ahora.

### [Opcional 2] Revisión de la parte B

**Prompt:** "hecho. Podrías comprobar qué tal está implementada la solución?"

**Qué me dio:** revisó `vite.config.ts`, `cart.ts`, `shipping.ts` y `package.json` (analizador en `devDependencies`, `loglevel` en `dependencies`) y ejecutó el build: sale `loglevel-<hash>.js` (3.23 kB) aparte, `dist/bundle-report.html` y los `.map`. Abrió `cart-<hash>.js` y `shipping-<hash>.js` para enseñarme que los dos importan el mismo `loglevel-<hash>.js` en lugar de llevar una copia.

**Qué corregí y por qué:** nada por ahora.

### [Entrega] Revisión final del proyecto

**Prompt:** "Hecho. Podrías analizar el proyecto por si nos falta algo?"

**Qué me dio:** comparó el repo con el checklist de entrega y el obligatorio 7: build sin errores, commits subidos, nada de `node_modules`/`dist`/`.env.local` en git, capturas enlazadas. Encontró que la respuesta de Tailwind del README cita `bg-amber-700`, que ya no está en el CSS porque cambié los colores de los botones, y que la "Salida final de `npm run build`" del README es la de antes de los opcionales. Sugirió limpiar campos sobrantes de `package.json` (`main`, `directories`, script `test`).

**Qué corregí y por qué:** nada por ahora.

### [Entrega] Comprobar si está todo para entregar

**Prompt:** "teniendo en cuenta el enunciado, podrías decirme si está todo hecho y es entregable?"

**Qué me dio:** repasó el enunciado punto por punto contra el código, el README y git. El build pasa y los obligatorios están completos, pero en el README faltan las dos respuestas de la parte B del opcional 2 (qué ocupa más del chunk principal, con la captura `docs/opcional2-analyzer.png` enlazada, y por qué `loglevel` sale en un chunk aparte). Además, los cambios de la revisión anterior (README, `package.json`, `notas-ia.md`) están sin commit ni push.

**Qué corregí y por qué:** nada por ahora.

### [Entrega] Completar el opcional 2 B y subir los cambios

**Prompt:** "Haz entonces eso que falta. Ya he cambiado la imagen del chunk para que se vea mejor"

**Qué me dio:** revisó la captura nueva y los tamaños de `dist/bundle-report.html`, y redactó en el README las dos respuestas de la parte B (lo que más ocupa del chunk principal, con la captura enlazada, y por qué `loglevel` sale en un chunk aparte). Después hizo commit y push de los cambios pendientes.

**Qué corregí y por qué:** nada por ahora.
