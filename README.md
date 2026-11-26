# Portafolio — Christopher Vivas

Sitio portafolio de Christopher Vivas, diseñador gráfico y director de arte.

> Estado: prototipo. Las piezas, clientes y textos son de muestra y se reemplazarán por el material real.

## Estructura

```
portafolio-chris/
├── index.html        # Estructura de la página
├── css/
│   └── styles.css    # Estilos (colores, tipografía, layout, responsive)
└── js/
    └── main.js       # Interacciones: collage, cintas, carrusel, cursor, formulario
```

## Cómo verlo en local

Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code para que se recargue solo al guardar.

## Personalizar

- **Colores:** variables al inicio de `css/styles.css` (`--bg`, `--ink`, `--accent`).
- **Proyectos, habilidades, clientes y rubros:** arreglos en `js/main.js`.
- **Texto del cursor:** atributo `data-cursor` en el HTML.

## Próximos pasos

- [ ] Reemplazar piezas de muestra por imágenes reales
- [ ] Conectar el formulario a Formspree
- [ ] Diseño final en Figma
- [ ] Migrar a Astro
- [ ] Publicar en Cloudflare Pages con dominio propio
