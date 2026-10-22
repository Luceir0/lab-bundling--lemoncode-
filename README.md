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
