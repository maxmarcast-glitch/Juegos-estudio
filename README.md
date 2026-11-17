# Juegos de estudio

Plataforma de juegos para estudiar las materias de primer año de la **Tecnicatura Superior en Desarrollo de Software Full Stack** (IPAP Río Negro).

Desde la portada se elige el juego. Cada uno tiene bloques por unidad, con una mini lección antes de jugar, preguntas con explicación, un simulacro de examen y un repaso de los errores.

| Juego | Materia | Bloques | Preguntas |
|---|---|---|---|
| Bucle JS | Programación I | 24 | 132 |
| Terminal Lab | Laboratorio Full Stack I | 18 | 118 |
| Del problema al prototipo | Prácticas Profesionalizantes I y Diseño UX/UI | 16 | 96 |

## Tecnologías

- HTML5, CSS3 y JavaScript, sin frameworks ni dependencias.
- `localStorage` para guardar el progreso de cada juego en el navegador.
- PWA: `manifest.webmanifest` y un service worker (`sw.js`) para instalarla en el celular y jugar sin conexión.

## Estructura

```
index.html              portada: elegir juego y ver el progreso
styles.css              estilos de la portada
app.js                  catálogo de juegos, progreso y botón de instalación
manifest.webmanifest    datos de la app instalable (nombre, íconos, colores)
sw.js                   service worker: guarda los archivos para usar sin conexión
icons/                  íconos de la app
bucle/                  Bucle JS
terminal-lab/           Terminal Lab
problema-prototipo/     Del problema al prototipo
```

Para agregar un juego nuevo: crear su carpeta con un `index.html` y sumar un objeto al arreglo `JUEGOS` en `app.js`.

## Cómo verlo

Publicado con GitHub Pages. Para probarlo en local, abrir `index.html` en el navegador (la instalación y el modo sin conexión solo funcionan servidos por HTTPS o desde `localhost`).

## Instalar en el celular

- **Android (Chrome):** abrir la página y tocar **Instalar en el celular**, o el menú ⋮ → **Instalar app**.
- **iPhone (Safari):** tocar **Compartir** → **Agregar a inicio**.

Al cambiar archivos, subir el número de `VERSION` en `sw.js` para que el celular descargue la versión nueva.

## Autor

Maximiliano Castaño · Tecnicatura Superior en Desarrollo de Software Full Stack, IPAP Río Negro.
