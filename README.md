# Portafolio de Mauricio

Sitio personal sencillo para mostrar quién soy, qué hago y cómo contactarme.

## Qué hay aquí
- Home: presentación, breve About, links a mis redes y contacto.
- Projects: página con proyectos destacados (incluye demo y código cuando aplica).
- Skills: sección en Home con mis principales tecnologías.

## Tecnologías
- HTML, CSS, JavaScript (sin frameworks)
- Modo oscuro/claro, navegación con pequeñas transiciones
- Iconos: Lucide (CDN)

## Estructura
- `index.html` → Home (Hero, About, Skills, Contact)
- `projects.html` → Proyectos
- `styles/main.css` → estilos y diseño responsive
- `scripts/main.js` → interacciones (tema, animaciones, form, transiciones)
- `assets/` → imágenes (avatar, favicon, og-image)

## Personalización rápida
- Texto y enlaces: edítalos en `index.html` y `projects.html`.
- Skills: ajusta los chips en `index.html` (sección Skills).
- Foto de perfil: coloca tu imagen en `assets/avatar.jpg`.
- Email y teléfono: sección Contact en `index.html`.

## Formulario de contacto (opcional)
Si usas Formspree:
1. Crea un formulario en https://formspree.io
2. Copia tu endpoint (ej. `https://formspree.io/f/xxxxxxx`)
3. En `index.html`, agrega al `<form>` el atributo:
	`data-formspree="https://formspree.io/f/xxxxxxx"`

Si no configuras Formspree, el botón abrirá tu cliente de correo con `mailto`.

## Ejecutar localmente
Abre `index.html` en tu navegador. Para recarga automática, usa la extensión "Live Server" de VS Code.

## Despliegue
Funciona como sitio estático en GitHub Pages (rama `main`, carpeta `/` root) o en Netlify/Vercel sin build.

—

Hecho con cariño para mostrar mi trabajo. Si te sirve de base, adelante ✌️
