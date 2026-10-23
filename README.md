# Tueste · Lab Bundling con Vite

## Puesta en marcha

```bash
npm install
```

| Script | Qué hace |
|---|---|
| `npm start` | Arranca el servidor de desarrollo de Vite en <http://localhost:5173>. Sirve `src/` sin empaquetar y recarga al guardar. |
| `npm run build` | Genera la versión de producción en `dist/` (minificada y con hash en los nombres). |
| `npm run preview` | Sirve la carpeta `dist/` en <http://localhost:4173> para probar la versión de producción. |

## Respuestas

### 1 · Proyecto desde cero

![304 Not Modified en el servidor de desarrollo](docs/01-304.png)

**¿Para qué sirve el hash del nombre del fichero en producción? ¿Qué pasaría sin él al subir una versión nueva?**

El hash se calcula a partir del contenido del fichero: si el código cambia, cambia el nombre (al cambiar el `console.log` pasó de `index-DBxnL7Ec.js` a `index-CQBpR9o0.js`), y si no cambia, el nombre se mantiene. Así el servidor puede decirle al navegador que guarde esos ficheros en caché mucho tiempo, y en cuanto hay una versión nueva el HTML apunta a un nombre distinto que se descarga sí o sí. Sin hash, el fichero se llamaría siempre igual y los usuarios podrían seguir usando la versión vieja de su caché después de subir la nueva.

**¿Qué diferencia hay entre `npm start` y `npm run preview`? ¿Cuál usarías para comprobar que la versión de producción funciona?**

`npm start` es el servidor de desarrollo: sirve los ficheros de `src/` tal cual, sin empaquetar ni minificar, y los recarga al guardar (por eso aparecen `client`, `env.mjs` y el `?t=<timestamp>`). `npm run preview` no compila nada: sirve lo que ya hay en `dist/`, que es exactamente lo que se subiría a producción. Para comprobar que la versión de producción funciona usaría `npm run build` + `npm run preview`.

### 2 · Estilos con Sass

**¿Por qué en desarrollo el CSS llega como un módulo de JavaScript y en producción como un fichero `.css`?**

En desarrollo, Vite compila el `.scss` y lo envuelve en un módulo JS (`Content-Type: text/javascript`) que mete el CSS en un `<style>` del `<head>` con `updateStyle` y lo quita con `removeStyle`. Al ser un módulo, entra en el sistema de recarga en caliente (HMR): cuando cambio un color, Vite sólo vuelve a enviar ese módulo y se sustituye el `<style>` sin recargar la página (el `console.log` de `index.js` no se repite). En producción no hace falta HMR y lo que importa es el rendimiento, así que Vite extrae todo el CSS a `dist/assets/index-<hash>.css`, ya compilado (las variables `$tueste-900` se han sustituido por `#2e1a10`) y minificado, y lo enlaza con un `<link rel="stylesheet">`: el navegador puede descargarlo en paralelo, cachearlo por separado y aplicar los estilos sin esperar a ejecutar JavaScript.

### 3 · Imágenes

**¿Dónde ha ido a parar el logo y por qué Vite lo trata distinto que la foto? ¿Qué ganamos y qué perdemos con eso?**

El logo no aparece en `dist/assets`: Vite lo ha metido dentro del propio `dist/index.html`, en el `src` del `<img>`, como *data URI* (`data:image/svg+xml,%3csvg...`). Lo decide la opción `build.assetsInlineLimit`, que por defecto vale 4 KiB (4096 bytes): los ficheros por debajo de ese tamaño se incrustan y los que lo superan se copian a `dist/assets` con hash. El logo pesa unos 340 bytes, así que se incrusta; la foto pesa unos 2 MB, así que va a `dist/assets/coffee-<hash>.jpg` y el `import` devuelve su URL. Lo que ganamos es una petición HTTP menos para un fichero diminuto, que llega junto al HTML sin esperar a nada más. Lo que perdemos es que ya no se cachea por separado: va dentro del HTML (o del JS/CSS), que pesa más y se vuelve a descargar entero cada vez que cambia, y si la imagen se usara en varios sitios se repetiría en cada uno. Por eso sólo compensa con ficheros muy pequeños.

### 4 · TypeScript con comprobación de tipos

**¿Por qué Vite, por sí solo, no comprueba los tipos? ¿Qué gana con ello?**

Vite no usa el compilador de TypeScript para servir los `.ts`: usa **oxc**, que se limita a *quitar* las anotaciones de tipo fichero a fichero, sin mirar los demás, y devuelve JavaScript. Comprobar los tipos exige analizar el proyecto entero a la vez (qué exporta cada módulo, qué tipos tienen las librerías…), y eso es muy lento comparado con transpilar un único fichero cada vez que lo pides o lo guardas. Para que transpilar fichero a fichero sea seguro está la opción `isolatedModules`, que hace que TypeScript avise de lo que no se puede traducir sin conocer otros ficheros (por ejemplo, reexportar un tipo sin `export type`). Así Vite arranca y recarga casi al instante, y la comprobación de tipos se deja al editor, a `tsc` o, como aquí, a `vite-plugin-checker`, que la ejecuta en otro proceso sin frenar el servidor y además hace fallar el `build` si hay errores (con `const total: string = 3;` daba `TS2322` y el build terminaba con error).

### 5 · React

![Cache-Control de las dependencias pre-empaquetadas](docs/05-cache-control.png)

**¿Por qué Vite trata distinto a `react` (dependencia) y a `app.tsx` (tu código)? ¿Qué es el pre-bundling y qué problema resuelve?**

Mi código cambia continuamente, así que Vite lo sirve fichero a fichero desde `src/` y deja que el navegador pregunte cada vez si ha cambiado (`app.tsx` responde `304`). Las dependencias de `node_modules` casi nunca cambian, pero vienen en formatos y tamaños poco prácticos: React se publica en CommonJS, que el navegador no entiende como módulo, y otras librerías están partidas en cientos de ficheros que serían cientos de peticiones. El **pre-bundling** consiste en que, al arrancar, Vite empaqueta cada dependencia una sola vez en un único módulo ESM y lo guarda en `node_modules/.vite/deps/` (`react.js`, `react-dom_client.js`). Como el `?v=<hash>` cambia si cambian las versiones instaladas, puede servirlos con `Cache-Control: max-age=31536000, immutable`: tras el primer F5 salen de la caché del navegador sin preguntar siquiera al servidor.

**¿Qué aporta exactamente `@vitejs/plugin-react` si el JSX ya funcionaba sin él?**

Sin el plugin, Vite ya transforma el JSX (oxc lo convierte en llamadas a `jsx()`), pero al guardar `app.tsx` no sabe actualizar sólo ese componente y recarga la página entera: el carrito volvía a 0. El plugin añade **Fast Refresh**: sustituye el componente modificado conservando su estado, así que al cambiar el `<h2>` el título se actualiza y el carrito mantiene sus 3 bolsas.
