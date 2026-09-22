# Protocolo de Roles Multi-Tenant y Onboarding Express B2B

## 1. Arquitectura de Roles (Super Admin vs. Cliente)
- **Consola Global de Plataforma (`/admin`)**:
  - Proveer siempre una vista ejecutiva dedicada a los operadores del SaaS con métricas consolidadas (MRR total, volumen agregado de interacciones/reseñas, clientes activos, churn).
  - Directorio multi-tenant con búsqueda y estado en vivo de cada cuenta cliente.
- **Herramientas de Impersonación y Switcher de Tenant**:
  - Incluir en el encabezado (`Header`) un selector desplegable de organizaciones para que el Super Admin pueda visualizar cualquier cuenta cliente en tiempo real con 1 clic.
  - El sidebar y las vistas operativas deben reflejar inmediatamente el contexto de datos del tenant seleccionado.
- **Conmutador de Rol en Vivo**:
  - En entornos de desarrollo, staging o demo de ventas, colocar un pill o botón de conmutación de rol en el Header ("Super Admin" ⇄ "Cliente") para validar ambos flujos sin necesidad de cerrar e iniciar sesión.
- **Login Rápido de Validación (1-Click Demo Login)**:
  - En la página de `/login`, incorporar accesos directos con tarjetas seleccionables para ingresar instantáneamente como Super Admin o como Cliente demo.

## 2. Onboarding Ultra-Rápido (< 3 Minutos para Comercios/SMBs)
- **Eliminación de Fricción Operacional**: Dueños de restaurantes, clínicas y comercios locales no completan configuraciones que superen los 3 minutos.
- **Arquitectura Dual de Onboarding**:
  1. **Modo Magic Auto-Setup ("Configurar por mí")**:
     - Solicita exclusivamente el Nombre del Negocio y su Link de Google Maps / Web.
     - Aplica automáticamente plantillas preconfiguradas, reglas de filtrado inteligentes y enlaces de redirección.
     - Tiempo total de activación: inferior a 60 segundos.
  2. **Modo Asistido en 3 Pasos (Guided Wizard)**:
     - Máximo 3 etapas: 1. Identidad de Marca (~1 min) → 2. Enlaces de Reseñas (~1 min) → 3. Incentivo / Cupón (~1 min).
     - Cada paso debe indicar explícitamente su duración estimada en minutos.
     - Controles de selección rápida (tarjetas cliqueables, colores sugeridos) en lugar de inputs vacíos complejos.
- **Entregables Inmediatos**:
  - Al completar el onboarding, presentar en pantalla el Código QR descargable, el enlace directo acortado para compartir por WhatsApp y el botón para probar el flujo de cara al cliente.

## 3. Trazabilidad y Ciclo de Vida de Cupones/Incentivos
- **Métricas de Canje en Tiempo Real**:
  - Cada oferta o incentivo debe almacenar `usageCount`, `maxUsages` (o ilimitado) y porcentaje de consumo.
- **Registro Inmutable de Redenciones (`redemptions`)**:
  - Auditar cada canje con: nombre del cliente, fecha/hora exacta, calificación otorgada y estado del voucher (`redeemed` vs `pending`).
- **Seguridad en Punto de Venta**:
  - Incluir botón de validación de cajero ("Marcar como canjeado") con confirmación visual de éxito para evitar el reuso indebido del mismo incentivo.
