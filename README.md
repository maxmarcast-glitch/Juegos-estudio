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

## Estructura

```
index.html              portada: elegir juego y ver el progreso
styles.css              estilos de la portada
app.js                  catálogo de juegos y lectura del progreso
bucle/                  Bucle JS
terminal-lab/           Terminal Lab
problema-prototipo/     Del problema al prototipo
```

Para agregar un juego nuevo: crear su carpeta con un `index.html` y sumar un objeto al arreglo `JUEGOS` en `app.js`.

## Cómo verlo

Publicado con GitHub Pages. Para probarlo en local, abrir `index.html` en el navegador.

## Autor

Maximiliano Castaño · Tecnicatura Superior en Desarrollo de Software Full Stack, IPAP Río Negro.
