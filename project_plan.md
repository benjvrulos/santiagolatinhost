# Santiago Host Latin

## 1. Project Description
Santiago Host Latin es una plataforma de experiencias culturales y de baile latino en Santiago de Chile. Ofrece servicios consolidados de recorridos históricos con clases de baile, experiencias nocturnas guiadas y programas de integración para extranjeros residentes.

Target users: Turistas internacionales, nómadas digitales, estudiantes extranjeros y profesionales que buscan experiencias seguras y auténticas en Santiago.

Core value: Descubrir Santiago con seguridad a través de un anfitrión local bilingüe, conectando la cultura, historia y pasión del baile latino en un ambiente profesional y acogedor.

## 2. Page Structure
- `/` - Home (landing narrativa de 14 secciones):
  1. Portada (Hero) con selector English | Español | 中文 próximamente
  2. What's happening tonight (Tonight in Santiago)
  3. Choose your Santiago (3 formas + los 6 paquetes expandibles)
  4. La Plataforma (flujo LOCAL SMEs → Santiago Latin Host → International travelers)
  5. Starting with Latin dance. Built to scale.
  6. How it works (Discover / Book / Pay securely / Live Santiago)
  7. Why travelers choose us (diferenciales + frase emocional)
  8. This is what Santiago feels like (reels)
  9. For local partners (con formulario de postulación)
  10. International markets (English-first + expansión Asia & China)
  11. Why now? (contexto + tesis empresarial)
  12. El fundador (Benjamín Cortés)
  13. Prueba de ejecución (Sercotec Capital Semilla Emprende 2026)
  14. Cierre + Reserva (formulario)
- `/experiencia/:id` - Detalle de cada experiencia

## 3. Core Features
- [x] Hero narrativo con selector de idioma y CTA a "Tonight" y experiencias
- [x] Sección "Tonight in Santiago" con actividad destacada y próximas
- [x] "Choose your Santiago" con 3 categorías + grid de 6 paquetes expandible
- [x] Sección plataforma con diagrama de flujo del modelo de negocio
- [x] Hoja de ruta (built to scale)
- [x] Cómo funciona en 4 pasos
- [x] Diferenciales + frase emocional
- [x] Galería de reels enlazada a Instagram
- [x] Sección de partners locales con formulario de postulación
- [x] Mercados internacionales + expansión Asia/China
- [x] Sección "Why now"
- [x] Sección del fundador
- [x] Prueba de ejecución (Sercotec)
- [x] Cierre con CTA y accesos rápidos
- [x] Formulario de reserva/contacto
- [x] Multilingüe (Español / Inglés)
- [x] Diseño responsive y animaciones de aparición

## 4. Data Model Design
No se requiere base de datos para esta fase. Las reservas y las postulaciones de partners se gestionan a través de formularios.
- Reserva de experiencia: formulario de reserva.
- Partner application: formulario de postulación de partners locales.

## 5. Backend / Third-party Integration Plan
- Supabase: No requerido en esta fase
- Shopify: No requerido
- Stripe: No requerido
- WhatsApp: Enlace directo para consultas
- Reserva online real (Bókun u similar): planificado para una fase posterior

## 6. Development Phase Plan

### Phase 1: Landing Page Completa
- Goal: Construir la landing page completa con las 14 secciones, internacionalización, diseño responsive y los formularios funcionales.
- Deliverable: Página web completa lista para publicar.

### Phase 2: Contenido real (videos y fotos)
- Goal: Reemplazar las imágenes placeholder por el video del hero, los reels reales de Benja y la foto del fundador.
- Deliverable: Home con contenido audiovisual real.