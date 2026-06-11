# Product

## Register

brand

## Users

Tres audiencias paralelas que llegan al sitio con preguntas distintas:

- **Padres y familias** evaluando si la LDG UDEM es una carrera viable económica y profesionalmente. Quieren claridad sobre rutas de empleo y salarios reales, no marketing.
- **Aspirantes y alumnos actuales** explorando proyección profesional al egresar. Necesitan referencias concretas: tipos de trabajo, habilidades requeridas, ejemplos de egresados.
- **Dirección académica UDEM** usando la página como material de apoyo en pláticas, ferias y reuniones de programa.

Contexto de uso: mayormente desktop en reuniones informativas y mobile cuando padres exploran por su cuenta. La página de Trayectoria es a menudo el primer contacto sustantivo, no la home.

## Product Purpose

Portfolio institucional del programa Licenciatura en Diseño Gráfico (LDG) de la Universidad de Monterrey (UDEM). La página de Trayectoria, en particular, explica los seis caminos profesionales reales del egresado (freelance con grandes marcas, motion, fundador de estudio, in-house, dirección creativa y estrategia) con datos concretos e ingresos de la disciplina con fuente oficial (IMCO Compara Carreras 2025). Éxito = padres entienden el ROI de la carrera y alumnos visualizan su futuro con confianza.

## Brand Personality

**Académico, sobrio, institucional.** El tono es el de un programa universitario que se toma en serio a sí mismo, no el de una agencia de diseño. La personalidad transmite rigor, autoridad académica y madurez. Aunque la ejecución visual es editorial y contemporánea, la voz nunca debe sonar a estudio creativo cool ni a startup. Es UDEM hablando sobre su programa, no diseñadores intentando impresionar.

## Anti-references

- **Sitios universitarios genéricos:** portales académicos con sliders, headers azul corporativo, fotos de archivo de estudiantes sonriendo, plantillas WordPress de universidades. Aburridos y olvidables.
- **SaaS landing templates:** clones de Linear / Stripe / Vercel con gradientes pastel, hero-metric pattern (big number + small label + supporting stats), cards idénticas en grid. Banales y fuera de tono.
- **Portfolio AI-slop:** glassmorphism por defecto, neón sobre negro, hero genérico "Hi, I'm X", cards con icono + título + texto repetidas hasta el infinito.
- **Behance/Dribbble shot aesthetic:** decoración sin contenido, mockups por mockups, todo es mock y nada es real.

## Design Principles

1. **Practicar lo que se predica.** Es un portfolio de LDG; el diseño es la primera prueba de competencia del programa. Cada elección visual debe defenderse como un diseñador defendería un proyecto.
2. **Datos antes que adjetivos.** Para padres y dirección, números concretos (años en mercado, ingreso promedio, tamaño de equipo) pesan más que copy aspiracional.
3. **Editorial, no creativo-pirotécnico.** Tipografía masiva, jerarquías claras, layouts asimétricos editoriales. El motion es de entrada y con propósito narrativo (lenguaje de delineante: trazos que se dibujan, contadores, sellos), nunca infinito ni decorativo, y todo respeta `prefers-reduced-motion`.
4. **Tono institucional con ejecución contemporánea.** UDEM puede sonar formal y verse moderno al mismo tiempo. La tensión es deliberada.
5. **Concreto y específico.** Nombres reales de egresados, fotos reales, proyectos reales. Genéricos ("Alumno 1", stock photos) son sinónimo de no terminado.

## Sistema visual

El sistema vigente es **«Plano de Taller»** (confirmado 2026-06-11): el programa que evalúa con rúbricas y especificaciones se presenta como carpeta de revisión técnica, unificado en las tres páginas. Papel #F1ECDF, tinta #1B1612, amarillo UDEM #FFE000 (marcador), vermilion #B23818 (cotas, sellos, datos). Anton + Atkinson Hyperlegible + JetBrains Mono + Spectral itálica. La fuente de verdad de tokens, componentes y motion es `DESIGN.md`.

## Accessibility & Inclusion

Requisitos básicos sin compromisos formales WCAG. Ya implementado: `prefers-reduced-motion`, contraste suficiente en texto principal, navegación por teclado funcional vía botones nativos. Mejoras razonables conforme aparezcan necesidades reales, sin sobrediseñar para escenarios hipotéticos.
