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

### [Paso 0] Crear el repositorio git y subirlo a GitHub

**Prompt:** "¿Cómo puedo hacer para crear un proyecto de git en este proyecto, para después subirlo a GitHub?"

**Qué me dio:** los pasos: `git init`, crear el `.gitignore` (lo decido yo según el enunciado), primer commit, crear el repo vacío en GitHub y enlazarlo con `git remote add origin` + `git push -u origin main`.

**Qué corregí y por qué:** nada por ahora.

### [Paso 0] Contenido del .gitignore

**Prompt:** "En verdad no sé qué sería bueno meter en .gitignore. ¿Podrías decirme qué es lo más conveniente y ponerlo?"

**Qué me dio:** movió mi `.gitignore` de `docs/` a la raíz (en `docs/` solo afectaba a esa carpeta) y lo completó: `node_modules`, `dist`, `.env.local` / `*.local`, logs, ficheros del sistema y del editor. Decidió que `.env` y `.env.production` sí se suben porque solo llevan valores públicos `VITE_*`, que acaban igualmente escritos en el bundle.

**Qué corregí y por qué:** nada por ahora.

### [Paso 0] Excluir mis apuntes del repo

**Prompt:** "¿Puedes meter también el enunciado-paso-a-paso en gitignore?"

**Qué me dio:** añadió `enunciado-paso-a-paso.md` al `.gitignore` en una sección "Apuntes personales".

**Qué corregí y por qué:** nada.

### [Paso 1] Qué comprobar después del build

**Prompt:** "En la parte de Paso 1: comprobar, no me queda muy claro qué es lo que hay que hacer después del build. ¿Podrías continuar?"

**Qué me dio:** desglosó las comprobaciones del paso 1 en `enunciado-paso-a-paso.md` (qué mirar en `dist/`, `preview` en el 4173, `start` en el 5173, el 304, el `?t=` y `new Date(...)`). Además detectó dos fallos en mi `index.html`: faltaba la cabecera con el nombre de la tienda y había un acento grave (`) suelto dentro del `<head>`.

**Qué corregí y por qué:** nada de lo que me dio; apliqué los dos arreglos que me señaló (añadir la cabecera `<header><h1>Tueste</h1></header>` y borrar el acento grave suelto).
