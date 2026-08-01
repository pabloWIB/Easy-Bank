# Auditoría inicial — Easy-Bank

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.

---

## 1. Inventario de archivos

### 1.1 HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Estado |
|---|---|---|---|---|
| `index.html` | `easybank` | `Next generation digital banking` | Landing page única del sitio | Se carga. Único HTML del proyecto |

No existe `404.html`, ni ninguna otra página. Los 5 enlaces del menú y los 6 del footer no apuntan a nada.

### 1.2 CSS

| Archivo | Tamaño | Líneas | ¿Se carga? | Notas |
|---|---|---|---|---|
| `CSS/normalize.css` | 2,4 KB | 17 | Sí, desde `index.html` | Normalize v8 minificado, sin salto de línea final |
| `CSS/styles.css` | 42,3 KB | 1456 | Sí, desde `index.html` | Compilado por Prepros desde `styles.scss`. Duplicado por prefijos `-webkit-` / `-ms-` |
| `CSS/styles.scss` | 38,6 KB | 1229 | No (fuente) | Fuente real de `styles.css`. Editar el `.css` a mano se perdería en la siguiente compilación |
| `CSS/prepros.config` | 21,6 KB | — | No | Config de la app de escritorio Prepros. Basura de build, no aporta al repo |

### 1.3 JavaScript

| Archivo | Tamaño | Líneas | ¿Se carga? | Notas |
|---|---|---|---|---|
| `JS/script.js` | 8,7 KB | 347 | Sí, al final de `<body>`, sin `defer` | 10 bloques de animación copiados y pegados |
| jQuery 3.6.0 (CDN) | ~89 KB | — | Sí, en `<head>`, bloqueante | Solo se usa para `$(fn)`, `.hover()`, `.click()` y `.toggleClass()` |

### 1.4 Imágenes

| Ruta | Peso | Dimensiones | Formato | ¿Se usa? | Dónde |
|---|---|---|---|---|---|
| `IMG/logo.svg` | 2,5 KB | vector | SVG | Sí | `<img>` en nav |
| `IMG/logo-white.svg` | 4,0 KB | vector | SVG | Sí | `<img>` en footer |
| `IMG/favicon-32x32.png` | 1,0 KB | 32×32 | PNG | Sí | `<link rel="icon">` |
| `IMG/icon-hamburger.svg` | 0,2 KB | vector | SVG | Sí | Botón menú móvil |
| `IMG/icon-close.svg` | 0,2 KB | vector | SVG | Sí | Botón cerrar menú móvil |
| `IMG/icon-online.svg` | 2,0 KB | vector | SVG | Sí | Feature 1 |
| `IMG/icon-budgeting.svg` | 2,5 KB | vector | SVG | Sí | Feature 2 |
| `IMG/icon-onboarding.svg` | 3,9 KB | vector | SVG | Sí | Feature 3 |
| `IMG/icon-api.svg` | 5,0 KB | vector | SVG | Sí | Feature 4 |
| `IMG/bg-intro-desktop.svg` | 2,2 KB | vector | SVG | Sí | `background-image` en CSS |
| `IMG/bg-intro-mobile.svg` | 2,1 KB | vector | SVG | Sí | `background-image` en CSS (≤875px) |
| `IMG/image-mockups.png` | 47,3 KB | 767×939 | PNG | Sí | `<img>` móvil + `background-image` escritorio |
| `IMG/image-currency.jpg` | 65,0 KB | 533×400 | JPG | Sí | `background-image` card 1 |
| `IMG/image-restaurant.jpg` | 57,1 KB | 600×400 | JPG | Sí | `background-image` card 2 |
| `IMG/image-plane.jpg` | 29,7 KB | 602×400 | JPG | Sí | `background-image` card 3 |
| `IMG/image-confetti.jpg` | 29,6 KB | 600×400 | JPG | Sí | `background-image` card 4 |
| `IMG/icon-facebook.svg` | 0,4 KB | vector | SVG | **No** | Huérfano — el footer usa SVG inline |
| `IMG/icon-twitter.svg` | 0,5 KB | vector | SVG | **No** | Huérfano |
| `IMG/icon-instagram.svg` | 1,0 KB | vector | SVG | **No** | Huérfano |
| `IMG/icon-pinterest.svg` | 0,8 KB | vector | SVG | **No** | Huérfano |
| `IMG/icon-youtube.svg` | 0,4 KB | vector | SVG | **No** | Huérfano |
| `design/desktop-design.jpg` | 219,2 KB | comp | JPG | Referencia | Comp de diseño, no se sirve |
| `design/mobile-design.jpg` | 204,0 KB | comp | JPG | Referencia | Comp de diseño, no se sirve |
| `design/active-states.jpg` | 219,6 KB | comp | JPG | Referencia | Comp de diseño, no se sirve |
| `design/mobile-navigation.jpg` | 28,3 KB | comp | JPG | Referencia | Comp de diseño, no se sirve |
| `Guides/image.png` | **4116,1 KB** | 5760×3840 | PNG | Solo en `README-template.md` | Captura real del hero. 4 MB para una imagen de documentación |

Ninguna imagen servida por la página supera los 200 KB. Tres comps de `design/` sí.

### 1.5 Dependencias externas

| Dependencia | Origen | Cómo se carga | Necesaria |
|---|---|---|---|
| jQuery 3.6.0 | `code.jquery.com` | `<script>` en `<head>`, bloqueante | No — solo selectores y clases |
| Public Sans | `fonts.googleapis.com` | `@import url(...)` en la primera línea de `styles.css` | Sí, pero `@import` serializa la petición |

Sin `preconnect`. El `@import` obliga al navegador a descargar `styles.css` antes de descubrir la fuente.

### 1.6 Archivos basura

| Archivo | Motivo |
|---|---|
| `CSS/prepros.config` | Config de herramienta de escritorio, 21,6 KB, irrelevante para el repo |
| `Guides/readmeInformation.txt` | Brief original del reto, no del proyecto |
| `Guides/README-template.md` | Plantilla del reto con enlace muerto a `surge.sh` y `![alt text](image.png)` |
| `Guides/text.txt` | Volcado de la copy; ya está en el HTML |
| `Guides/image.png` | 4 MB de imagen que solo consume la plantilla |

No hay `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni ficheros con sufijo de versión.

---

## 2. Problemas detectados

### 2.1 Enlaces rotos

| Elemento | `href` | Destino |
|---|---|---|
| Nav: Home, About, Contact, Blog, Careers | `href=""` | Recarga la página actual |
| Footer: About Us, Contact, Blog, Careers, Support, Privacy Policy | `href=""` | Recarga la página actual |
| Botón "Request Invite" (×2) | — | `<button>` sin `type`, sin handler, sin destino |
| 5 iconos sociales (SVG inline) | — | `cursor: pointer` y `:hover`, pero no son enlaces |
| `<h4>` de las 4 cards | — | `cursor: pointer` y `:hover`, pero no son enlaces |

**11 enlaces vacíos y 11 elementos con afordancia de clic falsa.**

### 2.2 Imágenes rotas

Ninguna. Las 16 rutas referenciadas existen en disco.

### 2.3 CSS / JS referenciados que no existen

Ninguno. `normalize.css`, `styles.css` y `script.js` existen.

### 2.4 HTML inválido

| Línea | Problema |
|---|---|
| 57 | `<button>Request Invite</section>` — etiqueta de cierre incorrecta |
| 309 | `<button>Request Invite</section>` — misma etiqueta de cierre incorrecta |

### 2.5 CSS duplicado o muerto

- **Bloque `.overflow` duplicado íntegro**: definido a ancho completo (líneas 259–316) y repetido tal cual dentro de `@media (max-width: 875px)` (líneas 318–377). ~120 líneas idénticas salvo `display: none` → `display: block`.
- **`position: normal`** (línea 573 del SCSS): valor inexistente en CSS, el navegador lo descarta.
- **Prefijos redundantes**: `-webkit-box`, `-ms-flexbox`, `-webkit-box-orient`… duplican cada regla flex. Aproximadamente el 45 % de `styles.css` son prefijos para navegadores que ya no se soportan.
- **Selectores de hasta 8 niveles**: `body header > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)`. Todo el layout se direcciona por posición, no por nombre.
- **`all: unset`** en `h1`, `h2`, `h3`, `h4`, `h6`, `p`, `a` y `button`: elimina también el `outline` de foco.

### 2.6 HTML duplicado entre páginas

No aplica: solo hay una página.

### 2.7 Contenido de relleno del template original

| Dónde | Qué |
|---|---|
| `Guides/readmeInformation.txt` | Brief completo del reto ("You have 3 days to complete the challenge…") |
| `Guides/README-template.md` | Tabla de contenidos de plantilla, `![alt text](image.png)`, enlace muerto `easybankpablonieto.surge.sh` |
| `Guides/text.txt` | Copy suelta, ya volcada en el HTML |

### 2.8 SEO y accesibilidad

| Problema | Detalle |
|---|---|
| `<title>` | `easybank` — 8 caracteres |
| `<meta name="description">` | No existe |
| Open Graph | No existe |
| `<link rel="canonical">` | No existe |
| `robots.txt` / `sitemap.xml` | No existen |
| Jerarquía de encabezados | `h1 → h2 → h3 → h2 → h6 → h4`: salto de h2 a h6 y h6 antes que h4 |
| `alt` | `easybankLogo`, `iconHamburger`, `iconClose`, `iconOnline`, `iconBudgeting`, `iconOnboarding`, `iconApi.`, `Mockups` — ninguno descriptivo |
| Imágenes de las cards | Son `background-image` sobre `<div>` vacíos: invisibles para lectores de pantalla |
| `width` / `height` en `<img>` | Ausentes en los 8 `<img>` → layout shift |
| `loading="lazy"` | Ausente |
| Foco visible | Eliminado por `all: unset` |
| Menú móvil | Sin `aria-expanded`, sin `aria-controls`, no cierra con `Escape`, no cierra al pulsar un enlace, no bloquea el scroll de fondo |
| Landmarks | El bloque de features está dentro de `<main>` pero el hero (`<header>`), los artículos (`<article>`) y el `<footer>` quedan fuera de `<main>` |
| `<article>` | Usado como sección contenedora de cuatro artículos, no como artículo |

### 2.9 Rendimiento

| Problema | Impacto |
|---|---|
| jQuery en `<head>` sin `defer` | ~89 KB bloqueando el render para 4 llamadas triviales |
| `@import` de Google Fonts dentro del CSS | Cadena de peticiones en serie; sin `preconnect` |
| `script.js` sin `defer` | Bloquea el parseo al final del body |
| 20 listeners de `scroll` y `resize` sin throttle | `getBoundingClientRect()` × 10 por evento → *layout thrashing* |
| `styles.css` con prefijos | 42,3 KB donde caben ~20 |

### 2.10 Responsive

| Problema | Detalle |
|---|---|
| Enfoque | Desktop-first: todas las media queries son `max-width` |
| Breakpoints | 875 px, 960 px, 1024 px — valores arbitrarios, no coinciden entre sí |
| Alturas en `vh` | `height: 112vh` y `margin-top: -14.2vh` en el hero: en móvil, con la barra del navegador, la maquetación se descuadra |
| Área táctil | El botón de menú es una imagen de 16×16 escalada con `transform: scale(1.3)` ≈ 21×21 px, muy por debajo de 44×44 |

### 2.11 Credenciales

Ninguna. No hay tokens, claves ni endpoints en el código.

---

## 3. Resumen en cinco líneas

1. Es una **landing page de una sola pantalla** para un banco digital ficticio (*Easybank*), replicada a partir de comps de diseño que vienen en el propio repo; no tiene backend, ni formularios, ni segunda página.
2. **Funciona y se ve bien**: la maquetación responde, las animaciones de scroll disparan y no hay ni una sola imagen o ruta rota.
3. Lo más grave es que **todo lo que parece clicable es falso**: 11 `href=""`, dos botones sin destino, cinco iconos sociales que no son enlaces y cuatro titulares de artículo con `cursor: pointer`. Un revisor de portafolio lo detecta en el primer clic.
4. Le sigue la **arquitectura del CSS**: el layout entero se direcciona con `:nth-child()` de hasta ocho niveles sobre `<div>` anónimos, con un bloque de 120 líneas duplicado literalmente, y `all: unset` eliminando el foco visible en toda la página.
5. Y el **coste innecesario**: 89 KB de jQuery bloqueando el render para hacer cuatro `toggleClass`, más 20 listeners de scroll sin throttle que recalculan geometría diez veces por evento.
