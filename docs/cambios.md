# Registro de cambios

Reorganización completa del proyecto, por fases. El estado de partida está documentado en
[auditoria.md](auditoria.md).

Ninguna operación de este registro tocó Git. Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Inventariados los 34 archivos del proyecto: 1 HTML, 4 archivos en `CSS/`, 1 en `JS/`,
  21 imágenes en `IMG/`, 4 comps en `design/` y 5 archivos en `Guides/`.
- Detectados 11 `href=""`, 2 botones sin destino, 5 iconos sociales que no eran enlaces
  y 4 titulares de artículo con `cursor: pointer` sin ser enlaces.
- Detectados 2 errores de HTML inválido (`<button>…</section>` en las líneas 57 y 309).
- Detectado un bloque de ~120 líneas de CSS duplicado literalmente entre la regla base y
  su media query, y `position: normal` (valor inexistente).
- Escrito `docs/auditoria.md`.

---

## Fase 2 — Estructura

Nueva jerarquía: `assets/{css,js,img}` + `docs/`. Renombrado todo a minúsculas con guiones
y nombres semánticos.

| Antes | Después |
|---|---|
| `IMG/logo.svg` | `assets/img/logo/easybank-logo.svg` |
| `IMG/logo-white.svg` | `assets/img/logo/easybank-logo-white.svg` |
| `IMG/favicon-32x32.png` | `assets/img/icons/favicon-32x32.png` |
| `IMG/icon-online.svg` | `assets/img/icons/icon-online-banking.svg` |
| `IMG/icon-budgeting.svg` | `assets/img/icons/icon-budgeting.svg` |
| `IMG/icon-onboarding.svg` | `assets/img/icons/icon-onboarding.svg` |
| `IMG/icon-api.svg` | `assets/img/icons/icon-open-api.svg` |
| `IMG/bg-intro-desktop.svg` | `assets/img/content/hero-shape-desktop.svg` |
| `IMG/bg-intro-mobile.svg` | `assets/img/content/hero-shape-mobile.svg` |
| `IMG/image-mockups.png` | `assets/img/content/easybank-app-mockups.png` |
| `IMG/image-currency.jpg` | `assets/img/content/article-currency.jpg` |
| `IMG/image-restaurant.jpg` | `assets/img/content/article-restaurant.jpg` |
| `IMG/image-plane.jpg` | `assets/img/content/article-plane.jpg` |
| `IMG/image-confetti.jpg` | `assets/img/content/article-confetti.jpg` |
| `design/*.jpg` | `docs/design/*.webp` |
| `Guides/style-guide.txt` | `docs/style-guide.md` |
| `CSS/normalize.css` + `CSS/styles.css` | `assets/css/{base,layout,components}.css` |
| `JS/script.js` | `assets/js/main.js` + `assets/js/modules/{nav,reveal}.js` |

Actualizadas todas las rutas en HTML, CSS y JS. Comprobado que las 16 referencias a
recursos devuelven 200 servidas por HTTP y que la página también carga desde `file://`.

---

## Fase 3 — Higiene

### Eliminado

| Archivo | Motivo |
|---|---|
| `CSS/prepros.config` | 21,6 KB de configuración de una app de escritorio |
| `CSS/styles.scss` | Se retiró el paso de compilación SASS (ver nota abajo) |
| `Guides/readmeInformation.txt` | Brief del reto original, no del proyecto |
| `Guides/README-template.md` | Plantilla del reto, con enlace muerto a `surge.sh` |
| `Guides/text.txt` | Volcado de la copy, ya presente en el HTML |
| `Guides/image.png` | 4,1 MB; sustituido por una derivada de 52 KB |
| `IMG/icon-facebook.svg` | Huérfano: el footer usaba SVG inline |
| `IMG/icon-twitter.svg` | Huérfano |
| `IMG/icon-instagram.svg` | Huérfano |
| `IMG/icon-pinterest.svg` | Huérfano |
| `IMG/icon-youtube.svg` | Huérfano |
| `IMG/icon-hamburger.svg` | Ahora es SVG inline dentro del botón de menú |
| `IMG/icon-close.svg` | Ahora es SVG inline dentro del botón de menú |
| `CSS/`, `JS/`, `IMG/`, `Guides/`, `design/` | Carpetas vacías tras la reorganización |

Antes de borrar cada imagen se comprobó con `grep` que ningún HTML, CSS ni JS la
referenciaba.

**Nota sobre SASS:** el proyecto compilaba `styles.scss` a `styles.css` con Prepros. Como
la fase 6 exige variables CSS en `:root`, las variables SASS quedaban duplicadas y el
`.css` se habría sobrescrito en la siguiente compilación. Se retiró la cadena de
compilación entera: ahora el CSS es la única fuente y el proyecto no tiene build.

### Añadido

- `.gitignore` para un stack estático con tooling opcional de Node.
- Formato normalizado: indentación de 2 espacios, comillas dobles en HTML, punto y coma
  en JS, salto de línea final en todos los archivos.

### Credenciales

No había ninguna. No se encontraron tokens, claves de API ni endpoints privados.

---

## Fase 4 — Imágenes

- Ninguna imagen servida por la página superaba los 200 KB, así que no hubo que convertir
  ninguna a WebP ni redimensionarla. La mayor es `easybank-app-mockups.png` (47,3 KB,
  767×939, por debajo del máximo de 1920 px para un hero).
- Los cuatro comps de `design/` (204–220 KB) se convirtieron a WebP en `docs/design/`,
  pasando de 671 KB a 371 KB en total. No los sirve ninguna página.
- `Guides/image.png` (5760×3840, 4,1 MB) era una captura real del hero. Se generó
  `assets/img/content/easybank-preview.jpg` (1200×630, 52 KB) recortada al centro para
  usarla como `og:image`, y se eliminó el original.
- Los cuatro `<div>` vacíos con `background-image` de las cards se sustituyeron por
  `<img>` reales con `width`, `height`, `loading="lazy"` y `alt` descriptivo.
- Añadidos `width` y `height` a las 11 imágenes de la página para evitar layout shift.
- `alt` reescrito en todas: los iconos de features pasan a `alt=""` (decorativos, el
  encabezado ya los nombra), el resto describe lo que se ve.

---

## Fase 5 — HTML, SEO y accesibilidad

### Estructura

- El hero pasa de `<header>` a `<section>` dentro de `<main>`; `<header>` queda para la
  cabecera del sitio. Antes solo el bloque de features estaba dentro de `<main>`.
- `<article>` se usaba como contenedor de cuatro artículos: ahora es
  `<section id="articles">` con cuatro `<article>` dentro.
- Jerarquía de encabezados corregida: era `h1 → h2 → h3 → h2 → h6 → h4`, ahora es
  `h1 → h2 → h3×4 → h2 → h3×4`, sin saltos. La firma del autor pasa de `<h6>` a `<p>`.
- Corregidos los dos `<button>Request Invite</section>`.

### `<head>`

- `<title>` de 8 a 57 caracteres, único por página.
- `<meta name="description">` de 151 caracteres, único por página.
- Open Graph completo: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`
  (+ `width`, `height`, `alt`), apuntando a un archivo que existe.
- `<link rel="canonical">` a `https://easybank.wib.digital/`.
- `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`, y la fuente cargada con
  `<link>` en vez de `@import` dentro del CSS.

### Accesibilidad

- Enlace «Skip to content» al principio del `<body>`.
- Foco visible restaurado: `all: unset` eliminaba el `outline`; ahora hay una regla
  `:focus-visible` global con `outline: 2px solid` y `outline-offset`.
- Botón de menú con `aria-label`, `aria-expanded` y `aria-controls`; el panel con
  `aria-hidden`. El `aria-label` alterna entre «Open menu» y «Close menu».
- Menú móvil operable con teclado: cierra con `Escape` y devuelve el foco al botón.
- Áreas táctiles: el botón de menú era una imagen de 24×11 escalada (~21×21 px efectivos);
  ahora es un `<button>` de 44×44. El CTA mide 44 px de alto.
- Contraste corregido, ver fase 6.

### Archivos nuevos

- `404.html` con `<title>` y descripción propios, `noindex` y enlace de vuelta al inicio.
- `robots.txt` apuntando al sitemap.
- `sitemap.xml` con la URL real del sitio.

### Contenido de relleno

Eliminado todo lo heredado del template del reto: el brief, la plantilla de README con su
enlace muerto y el volcado de copy. La copy de la página en sí es la del diseño original y
se conserva íntegra.

---

## Fase 6 — CSS y sistema de diseño

### Reescritura

`styles.css` (1456 líneas, 42,3 KB) se sustituyó por tres archivos de 887 líneas y 18,5 KB
en total. El grueso de la reducción viene de eliminar los prefijos `-webkit-box`,
`-ms-flexbox` y compañía que generaba autoprefixer.

- `base.css` — variables, reset y tipografía base.
- `layout.css` — contenedor, cabecera, hero, secciones y footer.
- `components.css` — botón, navegación, menú móvil, feature, card y utilidades.

Cada archivo sigue el orden variables → reset → base → layout → componentes → utilidades →
media queries.

### Selectores

El layout se direccionaba con cadenas de hasta 8 niveles de `:nth-child()` sobre `<div>`
anónimos, del tipo:

```css
body header > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1)
```

Ahora todo va por clase, con un máximo de 3 niveles.

### Variables

Extraídas a `:root`: 13 colores, 8 pasos de espaciado, 7 de tipografía, radios, sombras,
duraciones y curvas de animación, y las medidas del contenedor y la cabecera.

- **Espaciado**: escala 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96. Se eliminaron los valores
  sueltos del original (`1.75rem`, `3.85rem`, `6.5rem`, `1.11rem`, `-14.2vh`, `-5.2%`).
- **Tipografía**: una sola familia (Public Sans) y siete tamaños. El original mezclaba
  `13px`, `14px`, `15px`, `15.5px`, `17px`, `18px`, `1.35rem`, `2.35rem` y `2.85rem`.

### Contraste (desviaciones deliberadas del diseño original)

Dos colores del style guide no llegaban a 4.5:1 y se corrigieron:

| Elemento | Antes | Ratio | Ahora | Ratio |
|---|---|---|---|---|
| Texto secundario | `hsl(233, 8%, 62%)` sobre blanco | 2.9:1 | `hsl(233, 8%, 45%)` | 5.2:1 |
| Etiqueta del botón | blanco sobre el degradado verde | 2.0:1 | `hsl(233, 26%, 24%)` | 5.4–6.2:1 |

El degradado de marca se conserva; lo que cambia es el color del texto encima. En el footer
el gris claro sobre azul oscuro ya cumplía (12.1:1) y se mantiene.

### Otros

- Eliminado el bloque `.overflow` duplicado (~120 líneas idénticas).
- Eliminado `position: normal` (valor inexistente).
- Cero `!important` salvo el bloque de `prefers-reduced-motion`, donde es el patrón
  estándar para desactivar animaciones.
- Cero estilos inline.

---

## Fase 7 — Responsive

- Invertido a **mobile-first**: todas las media queries son `min-width`. El original era
  desktop-first con `max-width`.
- Breakpoints normalizados a **480 / 768 / 1024**. El original usaba 875, 960 y 1024, que
  no coincidían entre bloques.
- Eliminadas las alturas en `vh` del hero (`height: 112vh`, `margin-top: -14.2vh`), que se
  descuadraban en móvil con la barra del navegador.
- Verificado sin scroll horizontal en 320, 360, 480, 768, 1024, 1200 y 1440 px, midiendo
  `document.documentElement.scrollWidth` contra `window.innerWidth` en cada ancho.
- Menú móvil completo: abre, cierra, bloquea el scroll de fondo, se cierra al pulsar un
  enlace, se cierra con `Escape` devolviendo el foco, y se cierra solo al pasar a
  escritorio.

---

## Fase 8 — UX / UI

Lo más invasivo de toda la reorganización. El diseño original tenía 11 enlaces vacíos y
11 elementos con afordancia de clic falsa. La regla es que nada finja funcionar, así que
todo lo que no tenía destino real se eliminó o se reconvirtió.

| Elemento | Antes | Ahora |
|---|---|---|
| Nav: Home, About, Contact, Blog, Careers | `href=""` | Home, Why Easybank, Articles → anclas reales a secciones de la página |
| Footer: About Us, Contact, Blog, Careers, Support, Privacy Policy | `href=""` | Las mismas tres anclas |
| Botón «Request Invite» (hero) | Sin destino | «See how it works» → `#features` |
| Botón «Request Invite» (footer) | Sin destino | «Back to top» → `#top` |
| 5 iconos sociales | `cursor: pointer`, sin enlace | Eliminados: no hay cuentas reales que enlazar |
| 4 titulares de artículo | `cursor: pointer` y `:hover`, sin enlace | Encabezados normales, sin afordancia falsa |

Se añadió al footer una línea con dos enlaces que sí existen: el sitio del autor y el
repositorio del proyecto.

Otros cambios:

- Estados completos en todo elemento interactivo: `default`, `:hover`, `:focus-visible`,
  `:active`, y `[aria-disabled]` para el botón. Transiciones de 200 ms.
- Ancho de línea limitado a 68 caracteres en párrafos (`max-width: 68ch`).
- Sin formularios: el proyecto no tenía ninguno y no se añadió, porque no hay servicio al
  que conectarlo.
- Sin gradientes decorativos añadidos: el único degradado es el de marca, que ya estaba.

---

## Fase 9 — JavaScript

`script.js` (347 líneas) se sustituyó por 158 líneas repartidas en un punto de entrada y
dos módulos.

- **jQuery eliminado.** Se usaba solo para `$(fn)`, `.hover()`, `.click()` y
  `.toggleClass()`. Eran 89 KB bloqueando el render desde `<head>`.
- **10 bloques copiados y pegados → 1 `IntersectionObserver`.** El original definía
  `toggleAnimationN1` … `toggleAnimationN10` más sus variantes `delayed*`, y registraba
  20 listeners de `scroll`/`resize` que llamaban a `getBoundingClientRect()` diez veces por
  evento. El escalonado de las tarjetas ahora es `transition-delay` en CSS.
- **Bug corregido:** `isElementInViewport` exigía que el elemento estuviera *entero* dentro
  del viewport (`rect.bottom <= innerHeight`), así que cualquier bloque más alto que la
  pantalla no se animaba nunca. El observador dispara al 10 % de visibilidad.
- **Bug corregido:** el original quitaba las clases de animación al volver arriba
  (`scrollValue3`), reproduciendo la entrada cada vez. Ahora cada elemento se revela una
  vez y deja de observarse.
- Listener de scroll de la cabecera limitado con `requestAnimationFrame`.
- Sin `var`, sin variables globales sueltas: un único espacio de nombres `EasyBank`.
- Comprobación de existencia antes de operar sobre cualquier elemento.
- Delegación de eventos en el panel del menú (cierra con cualquier enlace o con el fondo).
- Respeta `prefers-reduced-motion`.
- Si el JS no se ejecuta, el contenido se ve igual: la clase que oculta los bloques la pone
  un script de una línea en el `<head>`.

Se usan scripts clásicos y no módulos ES para que la página siga funcionando abierta
directamente desde el disco, donde `type="module"` fallaría por CORS.

---

## Fase 10 — Rendimiento

| | Antes | Ahora |
|---|---|---|
| jQuery | 89 KB bloqueando el render | Eliminado |
| CSS | 42,3 KB (con prefijos) | 18,5 KB |
| JS propio | 8,7 KB | 4,1 KB |
| Fuente | `@import` dentro del CSS, sin `preconnect` | `<link>` con `display=swap` y `preconnect` |
| Scripts | Sin `defer` | Los tres con `defer` |
| Listeners de scroll | 20, sin throttle | 1, limitado con `requestAnimationFrame` |
| Peso total de los recursos | ~470 KB + 89 KB de jQuery | 340 KB |

Los tres archivos CSS son todos críticos (cabecera, hero y botón están en el primer
viewport) y suman 18,5 KB, así que se cargan sin diferir.

---

## Fase 11 — QA

Verificado con Chrome sin interfaz, controlado por CDP con reloj real, en 360, 768, 1024
y 1440 px, y también abriendo `index.html` desde `file://`:

- Sin scroll horizontal en 320, 360, 480, 768, 1024, 1200 y 1440 px.
- Cero errores y cero warnings de consola, y cero peticiones fallidas, en `index.html`
  y en `404.html`.
- Las 11 imágenes cargan; todas tienen `alt`, `width` y `height`.
- Un solo `h1`; niveles de encabezado `1,2,3,3,3,3,2,3,3,3,3`, sin saltos.
- Las 6 anclas internas resuelven a un `id` que existe; cero `href=""` y cero `href="#"`.
- Menú móvil: abre, cierra con el botón, con `Escape` (devolviendo el foco) y al pulsar un
  enlace; bloquea y desbloquea el scroll de fondo.
- Cabecera: se compacta al pasar de 110 px de scroll y vuelve a su altura arriba.
- Las animaciones de entrada disparan al hacer scroll.
- Botón de menú de 44×44 px; CTA de 44 px de alto.

---

## Fase 12 — Documentación

- `README.md` reescrito para la estructura nueva.
- Este registro.
- `docs/auditoria.md` con el estado de partida.
- `docs/style-guide.md` (antes `Guides/style-guide.txt`) con la paleta y la tipografía
  del diseño.
- `docs/design/` con los cuatro comps de referencia en WebP.

---

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente desde el disco y sirviéndolo por HTTP.
- Sin rutas absolutas de la máquina local en ningún archivo.
- Todas las rutas internas relativas y en minúsculas.
- No se creó configuración de hosting: el proyecto ya está desplegado en Vercel como sitio
  estático y no la necesita.
