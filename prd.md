# PRD — ReviewFlow

## 0. Regla principal del proyecto

**Este documento es la biblia del producto.**

Todo cambio funcional, técnico, visual, de arquitectura, modelo de datos, flujo, métrica o decisión relevante que se implemente en el proyecto DEBE quedar documentado y actualizado en este PRD.

No se debe implementar una modificación importante y dejar el PRD desactualizado.

### Regla de mantenimiento

Después de cada cambio relevante:

1. Revisar este PRD.
2. Actualizar las secciones afectadas.
3. Agregar la nueva decisión si cambia el comportamiento esperado.
4. Actualizar modelo de datos si corresponde.
5. Actualizar estados, flujos o permisos si corresponde.
6. Actualizar criterios de aceptación.
7. Registrar decisiones que puedan afectar futuras implementaciones.
8. El código y el PRD deben representar el mismo producto.

**Si existe contradicción entre el código y el PRD, se debe detener la implementación, determinar cuál representa la decisión más reciente y actualizar ambos.**

---

# 1. Visión del producto

ReviewFlow es un SaaS B2B para negocios locales que permite transformar la experiencia posterior a una atención en un sistema estructurado de:

- recopilación de feedback;
- solicitud de reviews;
- gestión de reputación;
- generación de cupones;
- validación de cupones mediante QR;
- analytics;
- automatización de comunicaciones;
- seguimiento de satisfacción del cliente.

El producto será utilizado directamente por negocios locales.

Ejemplos de clientes:

- restaurantes;
- clínicas;
- peluquerías;
- barberías;
- centros médicos;
- talleres;
- gimnasios;
- spas;
- dentistas;
- inmobiliarias;
- servicios profesionales;
- concesionarios;
- retail;
- hoteles;
- cualquier negocio con atención recurrente a clientes.

---

# 2. Problema

Los negocios locales tienen tres problemas principales:

### Problema 1 — No capturan sistemáticamente la experiencia

Después de una atención, normalmente no existe ningún mecanismo para saber:

- qué tan satisfecho quedó el cliente;
- qué salió mal;
- qué servicio recibió;
- cuándo ocurrió;
- qué empleado o sucursal estuvo involucrado;
- qué problemas se repiten.

### Problema 2 — Las reviews se solicitan manualmente

El negocio depende de que el trabajador diga:

> "Si quedaste conforme, déjanos una reseña en Google."

La mayoría de las veces esto no ocurre de forma consistente.

### Problema 3 — No existe un loop entre feedback y recompra

El negocio obtiene una review, pero no necesariamente consigue:

- recuperar clientes insatisfechos;
- incentivar una nueva visita;
- identificar problemas operacionales;
- generar campañas;
- convertir feedback en datos.

ReviewFlow debe cerrar ese loop.

---

# 3. Principio de producto

El producto no debe posicionarse simplemente como:

> "Una herramienta para conseguir más reviews."

Debe posicionarse como:

> **Customer feedback + reputation + retention infrastructure for local businesses.**

La review es solamente uno de los outputs.

El sistema debe convertir:

**Atención → Feedback → Insight → Acción → Retención**

y, cuando corresponda:

**Atención → Solicitud neutral de review → Google**

---

# 4. Restricción crítica de compliance

El sistema NO debe implementar review gating.

No se debe diseñar un flujo donde:

- 5 estrellas → Google;
- 1-4 estrellas → se oculta Google.

Tampoco se debe:

- solicitar exclusivamente reviews positivas;
- impedir reviews negativas;
- ofrecer descuentos a cambio de publicar una review;
- ofrecer descuentos a cambio de modificar o eliminar una review negativa.

El flujo debe permitir que la experiencia sea auténtica y que la solicitud de review sea neutral.

### Diseño permitido del producto

El cliente puede:

1. recibir una solicitud de feedback;
2. indicar su valoración;
3. escribir feedback;
4. recibir un cupón por completar una interacción definida por el negocio;
5. recibir una invitación neutral a compartir su experiencia públicamente.

El cupón NO puede estar condicionado a:

- publicar una review de Google;
- entregar 5 estrellas;
- cambiar una review;
- eliminar una review.

La aplicación debe tener una configuración explícita:

`Coupon eligibility = Feedback completed`

y nunca:

`Coupon eligibility = Positive Google review`

---

# 5. Objetivos

## Objetivo principal

Crear el sistema SaaS más simple para que un negocio local pueda:

> enviar feedback automáticamente, entender qué está pasando con sus clientes y convertir esa información en acciones de reputación y retención.

## Objetivos secundarios

- aumentar el volumen de feedback recopilado;
- automatizar solicitudes;
- reducir el trabajo manual;
- detectar clientes insatisfechos;
- recuperar clientes;
- aumentar recurrencia;
- generar campañas;
- medir satisfacción;
- administrar promociones;
- eliminar procesos manuales de cupones.

---

# 6. Usuario principal

El MVP tendrá un modelo simple:

## 1 Business = 1 cuenta principal

Un negocio tendrá inicialmente un único usuario administrador.

Ejemplo:

`restaurant@business.com`

Ese usuario puede:

- acceder al dashboard;
- ver feedback;
- configurar campañas;
- crear cupones;
- validar cupones;
- configurar Google;
- configurar emails;
- ver analytics;
- configurar branding;
- administrar su negocio.

### Futuro

La arquitectura DEBE permitir posteriormente:

- múltiples usuarios;
- roles;
- sucursales;
- empleados;
- managers;
- franquicias.

Pero no es necesario implementar RBAC completo en MVP.

---

# 7. Modelo SaaS

ReviewFlow será multi-tenant.

Cada negocio representa un tenant.

Todas las entidades principales deben estar asociadas a:

`business_id`

Nunca asumir que un usuario puede acceder a información de otro negocio.

La autorización debe verificarse server-side.

---

# 8. Arquitectura recomendada

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion
- Recharts
- Lucide Icons
- React Hook Form
- Zod
- TanStack Query

## Backend

Next.js App Router / Route Handlers / Server Actions según el caso.

Separar claramente:

- UI;
- dominio;
- acceso a datos;
- servicios externos;
- jobs;
- analytics.

## Database

PostgreSQL.

ORM:

- Prisma o Drizzle.

Preferencia inicial:

**Drizzle + PostgreSQL**

por control explícito del schema y queries.

## Authentication

Diseñar abstraction layer para poder utilizar:

- Supabase Auth;
- Clerk;
- Auth.js.

El sistema debe evitar acoplar el dominio a un proveedor de auth.

## Email

Resend.

Templates:

React Email.

## QR

Generación de QR en frontend/backend.

Cada cupón tendrá un identificador/token único.

## Storage

Object storage para:

- logos;
- assets del negocio;
- futuras imágenes.

## Jobs

Sistema de jobs para:

- emails;
- reminders;
- campañas;
- expiración de cupones;
- analytics;
- reintentos.

---

# 9. Arquitectura conceptual

```text
                    ┌─────────────────────┐
                    │      BUSINESS       │
                    │       ACCOUNT       │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          Customers        Campaigns       Settings
                │              │
                ▼              ▼
          Feedback Requests ─────────────┐
                │                         │
                ▼                         ▼
            Feedback                   Analytics
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
   Google CTA         Coupon
                         │
                         ▼
                   QR Validation
```

---

# 10. Core user journey

## Journey A — Negocio configura ReviewFlow

1. Usuario crea cuenta.
2. Ingresa nombre del negocio.
3. Ingresa logo.
4. Selecciona categoría.
5. Configura Google Business Profile URL.
6. Configura email.
7. Personaliza colores.
8. Configura mensaje de feedback.
9. Configura incentivo de feedback.
10. El sistema genera su link de feedback.
11. El usuario puede copiar el link o QR.

---

# 11. Journey B — Cliente termina atención

El negocio genera una solicitud:

```text
Customer
    ↓
Review Request
    ↓
Unique Feedback URL
```

Ejemplo:

`https://app.domain.com/r/abc123`

El link debe ser único.

Debe permitir tracking.

---

# 12. Landing pública de feedback

Esta es una de las partes más importantes del producto.

Debe sentirse como una experiencia premium, no como un formulario tradicional.

## Pantalla

Logo del negocio.

Mensaje:

> ¿Cómo fue tu experiencia?

Cinco estrellas grandes.

Opcionalmente:

- selección mediante emojis;
- interacción visual;
- microanimación.

Después de seleccionar:

> Cuéntanos un poco más.

Textarea.

Opcional:

- nombre;
- email;
- teléfono.

No pedir información innecesaria.

---

# 13. Estado de feedback

Cada feedback tendrá:

- rating;
- comentario;
- customer;
- fecha;
- servicio;
- campaign;
- request;
- coupon;
- source;
- status.

Ratings:

```text
1
2
3
4
5
```

---

# 14. Feedback flow

Después de enviar rating:

### Siempre

Guardar feedback.

### Opcional

Solicitar comentario.

### Después

Mostrar acciones según configuración.

Ejemplo:

> Gracias por compartir tu experiencia.

Luego:

> ¿Te gustaría compartir tu experiencia públicamente?

Botón:

**Compartir en Google**

El CTA debe ser presentado de forma neutral.

No mostrar:

> "Si nos pusiste 5 estrellas, déjanos una review."

No mostrar:

> "Ayúdanos solo si estás satisfecho."

---

# 15. Feedback negativo

Si el cliente entrega una valoración baja:

Mostrar:

> Gracias por contarnos. Queremos entender qué ocurrió.

Textarea:

> ¿Qué podríamos haber hecho mejor?

Opcionalmente:

> ¿Quieres que alguien del equipo te contacte?

Campos:

- email;
- teléfono;
- preferencia de contacto.

Esto genera un ticket interno de recuperación.

---

# 16. Feedback positivo

Si el cliente entrega una valoración alta:

Mostrar:

> Gracias por tu feedback.

Y después:

> Si quieres compartir tu experiencia públicamente, puedes hacerlo aquí.

CTA:

**Dejar una review**

Este CTA debe estar disponible según la configuración del negocio sin utilizar el rating como mecanismo de exclusión.

---

# 17. Coupon Engine

El producto tendrá un sistema propio de cupones.

## Objetivo

Permitir que el negocio entregue incentivos por acciones internas legítimas, por ejemplo:

- completar feedback;
- participar en una encuesta;
- próxima visita;
- campaña específica.

El incentivo nunca debe depender de publicar una review de Google.

---

# 18. Tipos de cupón

MVP:

### Porcentaje

Ejemplo:

`10% OFF`

### Monto fijo

Ejemplo:

`$5.000 OFF`

### Beneficio

Ejemplo:

`Café gratis`

### Segunda visita

Ejemplo:

`20% OFF en tu próxima visita`

---

# 19. Coupon entity

Cada cupón debe tener:

```text
id
business_id
customer_id
campaign_id
code
qr_token
discount_type
discount_value
minimum_purchase
expires_at
status
issued_at
redeemed_at
redeemed_by
```

Status:

```text
ACTIVE
REDEEMED
EXPIRED
CANCELLED
```

---

# 20. QR

Cada cupón debe generar un QR único.

El QR NO debe contener directamente toda la información sensible.

Debe contener un token:

```text
coupon_token
```

Ejemplo:

```text
rf_8d7f92a1...
```

El backend resuelve el token.

---

# 21. Coupon validation

El negocio podrá abrir:

`/validate`

La interfaz debe permitir:

- escanear QR;
- ingresar código manualmente.

Al escanear:

```text
VALID COUPON

10% OFF

Customer:
John

Expires:
Oct 15, 2026

[ Redeem Coupon ]
```

Al confirmar:

```text
Coupon redeemed successfully.
```

Debe ser imposible redimir dos veces.

La operación debe ser transaccional.

---

# 22. Dashboard

El dashboard es uno de los elementos centrales del SaaS.

No debe parecer un dashboard administrativo genérico.

Debe parecer un producto premium de analytics.

---

# 23. Dashboard principal

Header:

```text
Good morning, Business Name

Here's what happened with your customers.
```

Selector:

```text
Last 7 days
Last 30 days
Last 90 days
Custom
```

---

# 24. KPI cards

Primera fila:

### Feedback

`1,284`

`+18.4%`

### Average rating

`4.6`

### Response rate

`72%`

### Recovery opportunities

`38`

### Coupons issued

`421`

### Coupons redeemed

`187`

---

# 25. Main chart

Gráfico:

### Customer satisfaction over time

X:

fecha

Y:

rating promedio

Permitir:

- 7 días;
- 30 días;
- 90 días;
- custom.

Mostrar tooltip rico.

---

# 26. Rating distribution

Donut/bar chart:

```text
5 ★  72%
4 ★  16%
3 ★   7%
2 ★   3%
1 ★   2%
```

Nunca esconder ratings bajos.

---

# 27. Feedback trend

Chart:

```text
Feedback received
Google clicks
Coupon issued
Coupon redeemed
Recovery cases
```

Permitir activar/desactivar series.

---

# 28. Recent feedback

Tabla/cards:

```text
★★★★★
"Excelente atención..."
Maria
2 minutes ago

★★★★
"Todo bien pero..."
Pedro
18 minutes ago

★★
"Esperé demasiado..."
Carlos
1 hour ago
```

Click abre drawer.

---

# 29. Feedback detail drawer

Mostrar:

- rating;
- comentario;
- cliente;
- fecha;
- servicio;
- empleado si existe;
- campaña;
- request;
- coupon;
- Google CTA clicked;
- recovery status.

Actions:

- contact customer;
- create coupon;
- mark resolved;
- add internal note.

---

# 30. Recovery system

Los ratings bajos generan:

```text
Recovery Opportunity
```

Estados:

```text
OPEN
CONTACTED
RESOLVED
CLOSED
```

Dashboard:

```text
Open recovery cases: 12
Resolved this month: 38
Average resolution time: 4h 21m
```

---

# 31. Reviews page

Sidebar:

```text
Overview
Feedback
Customers
Campaigns
Coupons
Analytics
Settings
```

Feedback page:

- filters;
- rating;
- date;
- campaign;
- service;
- status;
- search.

---

# 32. Customer profile

Cada customer puede tener:

```text
Customer
├── Feedback history
├── Ratings
├── Comments
├── Coupons
├── Redemptions
├── Campaign interactions
└── Recovery cases
```

Esto permitirá posteriormente construir:

> Customer Lifetime Feedback Profile

---

# 33. Campaigns

Una campaña representa una configuración de solicitudes.

Ejemplo:

```text
Post Visit Feedback

Trigger:
Customer completed service

Channel:
Email

Delay:
15 minutes

Message:
How was your experience?

Coupon:
10% next visit

Status:
Active
```

---

# 34. Campaign builder

Crear campaña mediante wizard:

### Step 1

Name

### Step 2

Trigger

### Step 3

Channel

### Step 4

Message

### Step 5

Feedback configuration

### Step 6

Coupon

### Step 7

Preview

### Step 8

Activate

---

# 35. Trigger system

MVP:

### Manual

Usuario genera feedback request.

### API

POST:

```text
/api/v1/feedback-requests
```

### CSV

Importar clientes.

### Future

Integraciones:

- POS;
- CRM;
- booking systems;
- Shopify;
- WooCommerce;
- Calendly;
- Stripe;
- WhatsApp;
- Zapier;
- Make.

La arquitectura debe permitir agregar triggers posteriormente.

---

# 36. API

Diseñar API-first.

Endpoint conceptual:

```http
POST /api/v1/feedback-requests
```

Payload:

```json
{
  "customer": {
    "name": "John",
    "email": "john@example.com"
  },
  "service": "Haircut",
  "employee": "Maria",
  "reference": "appointment_123"
}
```

Response:

```json
{
  "id": "req_123",
  "feedback_url": "https://app.domain.com/r/abc123",
  "status": "pending"
}
```

---

# 37. Feedback request states

```text
CREATED
SENT
DELIVERED
OPENED
STARTED
COMPLETED
EXPIRED
```

Analytics debe registrar cada transición.

---

# 38. Event tracking

Cada interacción relevante debe generar un evento.

Ejemplos:

```text
feedback_request_created
feedback_email_sent
feedback_email_opened
feedback_link_clicked
feedback_started
rating_selected
feedback_submitted
google_cta_clicked
coupon_issued
coupon_viewed
coupon_redeemed
recovery_created
recovery_resolved
```

Esto permite analytics y debugging.

---

# 39. Email system

Usar Resend.

Cada email debe tener:

- responsive HTML;
- branding del negocio;
- logo;
- CTA;
- unsubscribe cuando corresponda;
- tracking;
- fallback text.

Templates:

### Feedback request

Subject:

> ¿Cómo fue tu experiencia?

### Reminder

> ¿Nos cuentas cómo fue tu visita?

### Coupon

> Tu beneficio está listo

### Recovery

Email interno al negocio:

> New customer recovery opportunity

---

# 40. Email architecture

Crear abstraction:

```text
EmailProvider
    ├── ResendProvider
    └── FutureProvider
```

Nunca llamar directamente a Resend desde componentes UI.

---

# 41. Branding

Cada negocio podrá configurar:

- logo;
- primary color;
- secondary color;
- business name;
- welcome message;
- thank-you message.

Pero el sistema debe mantener límites de diseño.

No permitir que el usuario destruya la legibilidad.

---

# 42. Design system

El producto debe tener un design system propio basado en shadcn/ui.

No utilizar componentes arbitrarios de diferentes librerías sin criterio.

Principios:

- consistencia;
- contraste;
- jerarquía;
- whitespace;
- estados claros;
- responsive;
- accesibilidad;
- motion con propósito.

---

# 43. Dirección visual

La estética objetivo:

**Premium B2B SaaS + hospitality + modern analytics.**

No:

- dashboard corporativo aburrido;
- purple AI gradient;
- exceso de glassmorphism;
- neon;
- cyberpunk;
- demasiadas cards;
- tablas gigantes;
- UI genérica generada por IA.

Sí:

- tipografía editorial;
- números grandes;
- whitespace;
- gráficos limpios;
- microinteracciones;
- superficies con profundidad sutil;
- animaciones suaves;
- estados cuidadosamente diseñados.

La interfaz debe sentirse más cercana a:

```text
Linear
+
Stripe
+
Vercel
+
modern hospitality software
```

que a:

```text
generic admin dashboard
```

---

# 44. Motion

Usar Motion únicamente donde aporte comprensión o sensación de calidad.

Ejemplos:

### Dashboard

KPI numbers animan al aparecer.

### Charts

Entrada progresiva.

### Feedback

Las estrellas tienen microinteracción al seleccionar.

### Coupon

QR aparece mediante transición.

### Success

Microanimación al completar una acción.

### Navigation

Transiciones discretas entre páginas.

Evitar:

- animaciones constantes;
- parallax innecesario;
- bouncing;
- efectos que retrasen acciones.

Debe existir soporte para:

`prefers-reduced-motion`.

---

# 45. Responsive

Mobile-first.

La página pública de feedback debe ser especialmente buena en móvil.

Dashboard:

### Desktop

Sidebar + content.

### Tablet

Collapsible sidebar.

### Mobile

Bottom navigation / compact navigation.

Los principales KPIs deben mantenerse legibles.

---

# 46. Accessibility

WCAG como objetivo.

Requisitos:

- keyboard navigation;
- visible focus states;
- semantic HTML;
- ARIA cuando corresponda;
- contraste;
- labels;
- touch targets;
- reduced motion;
- screen-reader friendly forms.

---

# 47. Loading states

Nunca mostrar pantallas vacías.

Usar:

- skeletons;
- optimistic updates cuando sea seguro;
- loading indicators;
- empty states.

Ejemplo:

```text
No feedback yet

Once your first customer completes a feedback request,
their experience will appear here.

[ Send your first request ]
```

---

# 48. Error states

Cada error debe tener:

1. explicación humana;
2. acción posible;
3. technical detail sólo cuando corresponda.

Ejemplo:

```text
We couldn't send this email.

The email provider temporarily rejected the request.

[ Retry ]
```

---

# 49. Onboarding

El onboarding debe durar menos de 5 minutos.

Steps:

```text
01 Business
02 Branding
03 Google
04 Feedback
05 Coupon
06 Test
07 Launch
```

Al terminar:

```text
You're ready.

Send your first feedback request.
```

---

# 50. QR del negocio

El negocio podrá generar:

### QR feedback

```text
Scan to share your experience
```

### QR campaign

QR asociado a campaña específica.

### Future

QR para:

- mesa;
- caja;
- recepción;
- ticket;
- packaging.

---

# 51. Public feedback URL

Cada negocio tendrá:

```text
/review/{business_slug}
```

Pero cada request individual tendrá token.

Esto permite:

- QR permanente;
- links únicos;
- tracking;
- campaign attribution.

---

# 52. Security

Requisitos:

- tenant isolation;
- server-side authorization;
- signed tokens;
- rate limiting;
- CSRF protection donde aplique;
- input validation;
- SQL injection protection;
- XSS protection;
- encrypted secrets;
- audit logs.

No exponer:

- customer email;
- customer phone;
- internal notes;

en URLs públicas.

---

# 53. Anti-abuse

El sistema debe detectar:

- demasiadas solicitudes desde una misma IP;
- múltiples submissions sospechosos;
- spam;
- bots;
- coupon brute force;
- repeated redemption attempts.

No bloquear automáticamente clientes reales sin señales suficientes.

---

# 54. Database model

## Business

```text
id
name
slug
logo_url
primary_color
google_review_url
created_at
updated_at
```

## User

```text
id
email
name
created_at
```

## BusinessUser

```text
business_id
user_id
role
```

## Customer

```text
id
business_id
name
email
phone
created_at
updated_at
```

## FeedbackRequest

```text
id
business_id
customer_id
campaign_id
token
service
employee
status
sent_at
opened_at
completed_at
expires_at
created_at
```

## Feedback

```text
id
business_id
feedback_request_id
customer_id
rating
comment
contact_requested
created_at
```

## Campaign

```text
id
business_id
name
trigger
channel
delay
status
created_at
updated_at
```

## Coupon

```text
id
business_id
customer_id
campaign_id
feedback_id
code
qr_token
discount_type
discount_value
status
expires_at
issued_at
redeemed_at
```

## CouponRedemption

```text
id
coupon_id
business_id
redeemed_by
redeemed_at
location
metadata
```

## RecoveryCase

```text
id
business_id
feedback_id
status
priority
assigned_to
created_at
resolved_at
```

## Event

```text
id
business_id
customer_id
feedback_request_id
type
metadata
created_at
```

---

# 55. Multi-tenancy

Every query must enforce:

```text
business_id = authenticated_business_id
```

Nunca confiar en:

```text
business_id
```

enviado desde frontend.

El backend debe obtener el tenant desde la sesión/autorización.

---

# 56. Analytics architecture

No calcular todos los analytics directamente desde las tablas transaccionales en cada request.

Inicialmente puede hacerse mediante queries optimizadas.

A medida que crezca:

```text
Events
   ↓
Aggregation jobs
   ↓
Analytics tables
   ↓
Dashboard
```

---

# 57. Core metrics

## Acquisition

- feedback requests sent;
- delivery rate;
- open rate;
- click rate;
- completion rate.

## Satisfaction

- average rating;
- rating distribution;
- ratings by day;
- ratings by campaign;
- ratings by service;
- ratings by employee;
- ratings by location.

## Reputation

- Google CTA clicks;
- Google outbound clicks;
- feedback volume.

No asumir que un click equivale a una Google review publicada.

## Retention

- coupons issued;
- coupons redeemed;
- redemption rate;
- recovery cases;
- recovery resolution.

---

# 58. Dashboard formula definitions

### Response rate

```text
completed_feedback_requests
/
delivered_feedback_requests
```

### Coupon redemption rate

```text
redeemed_coupons
/
issued_coupons
```

### Average rating

```text
SUM(ratings) / COUNT(ratings)
```

### Recovery resolution rate

```text
resolved_cases
/
total_recovery_cases
```

Todas las métricas deben documentar su fórmula en código o analytics documentation.

---

# 59. Settings

Sections:

```text
Business
Branding
Feedback
Coupons
Google
Email
Notifications
Integrations
Account
Billing
```

---

# 60. Google configuration

El usuario podrá ingresar:

```text
Google review URL
```

También podrá validar el link.

Mostrar preview:

```text
Customers will be sent to:
Google Business Profile
[Preview]
```

No automatizar publicación de reviews.

---

# 61. Billing

Arquitectura preparada para SaaS subscription.

Planes futuros:

### Starter

Feedback básico.

### Growth

Automations + coupons + analytics.

### Pro

Multi-location + advanced analytics + integrations.

No implementar billing antes de validar el producto.

Pero `subscription` debe existir como concepto en arquitectura.

---

# 62. Future multi-location

Una cuenta empresarial podrá tener:

```text
Organization
    ├── Location 1
    ├── Location 2
    ├── Location 3
```

Actualmente:

```text
Business ≈ Organization + single Location
```

La arquitectura no debe impedir la evolución.

---

# 63. Integrations roadmap

Prioridad futura:

1. POS
2. Booking software
3. Shopify
4. WooCommerce
5. Stripe
6. WhatsApp
7. Zapier
8. Make
9. CRM
10. Google Business Profile

---

# 64. WhatsApp

Debe diseñarse como channel abstraction:

```text
NotificationChannel
    ├── Email
    ├── SMS
    └── WhatsApp
```

No construir lógica de campaña específica para email.

La campaña debe seleccionar channel.

---

# 65. API keys

Para integraciones:

```text
API Keys
```

Cada negocio podrá generar:

```text
rf_live_xxxxxxxxx
```

Nunca almacenar secrets en texto plano.

Guardar hash cuando sea posible y mostrar el secret solamente una vez.

---

# 66. Webhooks

Future:

```text
POST /api/v1/webhooks
```

Events:

```text
feedback.completed
feedback.created
coupon.issued
coupon.redeemed
recovery.created
recovery.resolved
```

---

# 67. Audit log

Registrar acciones administrativas:

```text
campaign.created
campaign.updated
coupon.created
coupon.redeemed
settings.updated
google_url.updated
customer.exported
```

---

# 68. Export

El negocio podrá exportar:

- feedback;
- customers;
- coupons;
- analytics.

Formatos:

- CSV;
- posteriormente XLSX.

---

# 69. Privacy

Customer data debe tratarse como información privada.

El sistema debe:

- minimizar datos;
- permitir eliminación;
- permitir exportación;
- documentar retención;
- evitar exponer PII públicamente.

Diseñar para cumplir normativa aplicable según mercado.

---

# 70. Empty states

Cada sección debe tener un empty state útil.

Ejemplo:

## Reviews

```text
No customer feedback yet.

Your first responses will appear here.

[ Create feedback request ]
```

## Coupons

```text
No coupons yet.

Create an incentive for your next campaign.

[ Create coupon ]
```

---

# 71. Notification center

Dashboard tendrá notification center.

Ejemplos:

```text
3 customers need follow-up
2 campaigns are paused
1 email integration needs attention
```

---

# 72. Search

Global search futura:

```text
Search customers, feedback, coupons...
```

Shortcut:

`⌘ K`

Debe quedar preparado aunque no sea MVP.

---

# 73. Command menu

Implementar posteriormente con:

- search;
- navigation;
- actions.

Ejemplos:

```text
Go to Feedback
Create Campaign
Generate QR
Validate Coupon
Search Customer
```

---

# 74. MVP

El MVP DEBE incluir:

### Authentication

- signup;
- login;
- logout.

### Business

- create business;
- logo;
- branding.

### Feedback

- generate request;
- public feedback page;
- rating;
- comment;
- thank-you screen.

### Google

- configurable Google review URL;
- neutral CTA.

### Coupons

- create campaign coupon;
- issue coupon;
- generate QR;
- validate QR;
- redeem coupon.

### Dashboard

- feedback count;
- average rating;
- rating distribution;
- recent feedback;
- coupons issued;
- coupons redeemed.

### Email

- send feedback request;
- basic branded email.

### Analytics

- requests;
- opens;
- completions;
- ratings;
- coupon metrics.

---

# 75. MVP NOT included

No implementar inicialmente:

- WhatsApp;
- SMS;
- POS integrations;
- multi-location;
- complex RBAC;
- AI sentiment analysis;
- automated responses;
- CRM;
- advanced segmentation;
- billing;
- white-label;
- public review aggregation from multiple platforms.

---

# 76. Phase 2

Después de validar MVP:

- WhatsApp;
- multiple campaigns;
- advanced analytics;
- customer profiles;
- recovery workflow;
- segmentation;
- scheduled campaigns;
- CSV import;
- integrations.

---

# 77. Phase 3

- multi-location;
- roles;
- enterprise;
- API;
- webhooks;
- integrations;
- advanced retention;
- AI insights.

---

# 78. AI future layer

AI NO es el core inicial.

Posteriormente podrá analizar:

```text
Feedback
    ↓
Theme extraction
    ↓
Problem clusters
    ↓
Business insights
```

Ejemplo:

> "Customers mentioning waiting time increased 34% this month."

Pero AI debe explicar sus insights con links a los feedbacks subyacentes.

Nunca inventar conclusions.

---

# 79. AI features futuras

### Sentiment

- positive;
- neutral;
- negative.

### Topic extraction

Ejemplos:

- waiting time;
- service;
- price;
- staff;
- cleanliness;
- quality.

### Weekly summary

```text
What customers are saying this week
```

### Recommended actions

Siempre presentadas como recomendaciones, no acciones automáticas irreversibles.

---

# 80. Product differentiation

ReviewFlow no debe competir únicamente por:

> "mandamos un link para pedir reviews."

El moat potencial debe estar en:

```text
Feedback data
+
Automation
+
Customer recovery
+
Coupons
+
Retention
+
Analytics
```

El sistema debe convertirse progresivamente en el operating layer entre una atención y la siguiente visita.

---

# 81. Design quality requirements

Antes de considerar una pantalla terminada, revisar:

### Visual

- typography;
- hierarchy;
- spacing;
- color;
- density;
- alignment;
- empty states.

### UX

- primary action obvious;
- feedback clear;
- errors recoverable;
- no unnecessary clicks;
- mobile usable.

### Motion

- meaningful;
- fast;
- subtle;
- reduced-motion compatible.

### Accessibility

- keyboard;
- focus;
- contrast;
- semantic labels.

### Performance

- avoid unnecessary client components;
- lazy load heavy charts;
- optimize images;
- avoid excessive JS.

---

# 82. Anti-patterns

NO utilizar:

- Inter automáticamente sin analizar alternativas;
- purple gradient por defecto;
- glassmorphism everywhere;
- giant hero gradients;
- excessive rounded cards;
- random animations;
- fake metrics;
- decorative charts without data;
- generic dashboard templates;
- unnecessary modals;
- huge sidebars;
- five different UI libraries.

---

# 83. Component architecture

```text
components/
    ui/
    dashboard/
    feedback/
    coupons/
    campaigns/
    analytics/
    customers/
    settings/
    onboarding/
```

Domain components deben ser independientes de las páginas cuando sea posible.

---

# 84. Service architecture

```text
lib/
    auth/
    db/
    email/
    coupons/
    feedback/
    analytics/
    campaigns/
    google/
    events/
    security/
```

---

# 85. Server/client boundary

Preferir Server Components.

Usar Client Components únicamente cuando se necesite:

- interaction;
- browser API;
- animation;
- state;
- scanner;
- charts.

---

# 86. Testing

Mínimo:

### Unit

- coupon validation;
- coupon expiration;
- rating calculations;
- analytics formulas;
- token generation.

### Integration

- feedback request;
- feedback submission;
- coupon issuance;
- coupon redemption.

### E2E

Critical journey:

```text
Business signup
→ Create request
→ Customer opens link
→ Customer submits rating
→ Coupon issued
→ Business scans QR
→ Coupon redeemed
```

---

# 87. Acceptance criteria MVP

El MVP no está terminado hasta que:

- un negocio puede registrarse;
- puede configurar su Google URL;
- puede generar una feedback request;
- un cliente puede abrir el link en móvil;
- puede enviar rating;
- puede enviar feedback;
- el negocio puede ver el feedback;
- dashboard actualiza métricas;
- coupon puede ser generado;
- QR puede ser escaneado;
- coupon puede ser redeemed;
- no se puede redeemear dos veces;
- email puede enviarse;
- tenant isolation funciona;
- responsive funciona;
- accessibility básica funciona;
- errores están manejados;
- loading states existen;
- empty states existen;
- PRD está actualizado.

---

# 88. Definition of Done

Una feature sólo está terminada cuando:

```text
[ ] Functional
[ ] Tested
[ ] Responsive
[ ] Accessible
[ ] Loading state
[ ] Empty state
[ ] Error state
[ ] Analytics event
[ ] Security reviewed
[ ] PRD updated
```

---

# 89. Development workflow

Antes de implementar una feature:

1. Leer PRD.
2. Identificar impacto.
3. Diseñar flujo.
4. Actualizar modelo si corresponde.
5. Implementar.
6. Testear.
7. Revisar UX.
8. Revisar responsive.
9. Revisar accessibility.
10. Actualizar PRD.

---

# 90. AI coding rules

El agente de desarrollo DEBE:

- leer este PRD antes de modificar arquitectura;
- no inventar funcionalidades fuera del PRD;
- no eliminar funcionalidades sin documentarlo;
- no cambiar stack sin justificarlo;
- no introducir dependencias innecesarias;
- reutilizar componentes existentes;
- mantener design system;
- mantener consistencia visual;
- actualizar el PRD después de cambios relevantes.

---

# 91. Design-agent instructions

Antes de crear cualquier pantalla:

1. Entender el objetivo de la pantalla.
2. Identificar el usuario.
3. Identificar la acción primaria.
4. Definir jerarquía visual.
5. Mantener el design system.
6. Elegir motion con propósito.
7. Evitar estética genérica de IA.
8. Diseñar estados:
   - default;
   - hover;
   - active;
   - loading;
   - empty;
   - error;
   - success;
   - disabled.

9. Revisar mobile.
10. Revisar accessibility.

---

# 92. Product principle

**Every screen must answer one question clearly.**

Ejemplos:

Dashboard:

> What is happening with my customers?

Feedback:

> What are customers saying?

Campaigns:

> How am I collecting feedback?

Coupons:

> What benefits have I issued and redeemed?

Analytics:

> What patterns are emerging?

Settings:

> How do I control the system?

---

# 93. North Star Metric

La métrica principal del producto será:

## Completed Customer Feedback

Porque representa la acción central del sistema:

```text
Customer interaction
→ feedback captured
```

Supporting metrics:

- feedback completion rate;
- average rating;
- recovery rate;
- coupon redemption;
- repeat customer rate;
- campaign ROI.

---

# 94. Future North Star

A medida que el producto evolucione, la métrica estratégica podrá convertirse en:

## Customer Experience Actions

Es decir:

```text
Feedback
+
Recovery
+
Retention
```

porque el valor económico final no es solamente conseguir una review.

---

# 95. Product thesis

ReviewFlow debe evolucionar desde:

> "review collection tool"

hacia:

> **Customer experience operating system for local businesses.**

La primera versión captura feedback.

La segunda automatiza acciones.

La tercera convierte feedback en customer retention.

La cuarta conecta directamente con el stack operacional del negocio.

---

# 96. Immediate build order

## Sprint 1

- project setup;
- auth;
- database;
- tenant model;
- design system;
- dashboard shell;
- business settings.

## Sprint 2

- feedback request;
- public feedback page;
- rating;
- comments;
- events.

## Sprint 3

- dashboard;
- analytics;
- feedback table;
- feedback detail.

## Sprint 4

- coupon engine;
- QR generation;
- QR scanner;
- redemption.

## Sprint 5

- email;
- campaign builder;
- onboarding.

## Sprint 6

- polish;
- animations;
- accessibility;
- responsive;
- testing;
- security;
- deployment.

---

# 97. First version visual target

El primer prototipo debe tener como mínimo estas pantallas:

```text
/login

/onboarding

/dashboard

/feedback

/feedback/[id]

/customers

/customers/[id]

/campaigns

/campaigns/new

/coupons

/coupons/[id]

/validate

/analytics

/settings
```

Public:

```text
/r/[token]
```

---

# 98. Final product principle

No construir una colección de features.

Construir un loop:

```text
          CUSTOMER
              │
              ▼
        SERVICE ENDS
              │
              ▼
       FEEDBACK REQUEST
              │
              ▼
          RATING
              │
      ┌───────┴────────┐
      │                │
      ▼                ▼
   INSIGHT          PUBLIC CTA
      │
      ▼
   RECOVERY
      │
      ▼
     COUPON
      │
      ▼
   NEXT VISIT
      │
      └───────────────► CUSTOMER
```

Ese loop es el producto.

Todo feature futuro debe responder:

> ¿Esto mejora este loop, mejora la monetización del loop o aumenta la capacidad de escalarlo?

Si no cumple ninguna de esas condiciones, no debe entrar al core del producto.

---

# 101. Onboarding Express (< 3 minutos) y Magic Auto-Setup

El onboarding a la plataforma cuenta con dos modalidades calibradas:
1. **Magic Auto-Setup ("Configurar por mí" en < 1 minuto)**:
   - Requiere únicamente **Nombre del restaurante/negocio** y **Link de la página web / Google Maps / Instagram**.
   - Pipeline de autoconfiguración:
     - Detección inteligente de rubro gastronómico y generación de enlace a Google Reviews.
     - Selección automática de fondo curado de alta hostelería con filtro de contraste oscuro (45%).
     - Activación de regla de filtro: 4 y 5★ derivados a Google Maps con 1 clic; 1 a 3★ capturados en privado.
     - Creación de cupón de retorno: "Postre de cortesía de la casa o 15% OFF en tu próxima visita".
     - Generación de atril y QR de mesas listo para imprimir.
2. **Configuración Guiada en 3 Pasos Rápidos (< 3 minutos)**:
   - Paso 1 (45 seg): Identidad básica y enlace web/Maps.
   - Paso 2 (45 seg): Diseño de fondo (presets curados de hostelería o degradados) y logo.
   - Paso 3 (30 seg): Beneficio del cupón de fidelización y activación de filtro.

---

# 102. Auditoría y Trazabilidad de Cupones (Veces Ocupados)

Cada cupón emitido en ReviewFlow cuenta con seguimiento granular de redención:
- **usageCount**: Contador en tiempo real de cuántas veces ha sido ocupado el beneficio en caja.
- **maxUsages**: Límite de usos permitidos (1 uso para cupones individuales de cliente, o N usos para promociones de atril/campaña).
- **redemptions**: Historial auditable con timestamp, cajero/personal responsable, monto de boleta y notas.
- **Métricas Globales**: KPI cards en `/coupons` con Total Emitidos, Total Veces Ocupados, Pendientes de Canje y Tasa de Redención (%).

---

# 103. Estándar de Contraste Light Mode (WCAG AAA)

Para evitar elementos lavados o de baja legibilidad:
- Textos primarios en `text-slate-900` o `text-slate-950` con pesos `font-bold` o `font-black`.
- Textos secundarios en `text-slate-700` o `text-slate-800` (eliminando grises débiles como `text-slate-400` en cuerpos de texto).
- Cajas de iconos con fondos pasteles enriquecidos (`bg-emerald-50`, `bg-amber-50`, `bg-rose-50`, `bg-blue-50`, `bg-teal-50`) con bordes contrastantes (`border-*-200/300`).
- Barras de distribución con fondo de pista `bg-slate-200` y etiquetas numéricas `font-mono text-xs font-bold text-slate-800`.
- Gráficas de Recharts con líneas de cuadrícula `stroke="#e2e8f0"`, ejes con etiquetas `#64748b` y grosor de trazo en 600.

---

# 104. Diferenciación de Usuarios (Super Admin doui vs Cliente)

La plataforma distingue estrictamente dos perfiles de usuario:

### 1. Super Admin (doui core team)
- **Acceso Global**: Consola centralizada en `/admin` con monitoreo de todos los clientes (tenants), volumen global de reseñas, MRR y retención.
- **Multitenant Switcher**: Selector de local en el Header para cambiar de contexto en tiempo real entre restaurantes sin cerrar sesión.
- **Capacidad de Impersonación**: Botón "Entrar como este Cliente" para auditar y operar cualquier local con la vista exacta que tiene el dueño.
- **Navegación Prioritaria**: Acceso directo con insignia dorada `👑 Consola Super Admin` en Sidebar y Header.

### 2. Cliente (Dueño de Restaurante / Local)
- **Alcance Operativo Exclusivo**: Acceso restringido únicamente al dashboard, métricas, clientes, feedback y caja POS de su propio negocio.
- **Sin Distracciones de Plataforma**: Ocultamiento de configuraciones globales, facturación SaaS y selectores multitenant.
- **Acceso Protegido**: Al intentar navegar a `/admin`, el sistema muestra una pantalla informativa de permisos y permite alternar roles para fines de prueba y demostración.


