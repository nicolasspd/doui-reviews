# Protocolos de Scaffolding y Rescate de Archivos del IDE

## 1. Detección y Rescate de Buffers no Guardados
Cuando un archivo activo en el editor reporte cursor en líneas avanzadas (> 0) pero el archivo en el sistema de archivos tenga tamaño 0 bytes:
- NO pedir inmediatamente al usuario que lo vuelva a pegar si está trabajando en él.
- Localizar el archivo de respaldo temporal en:
  `%APPDATA%\Antigravity IDE\Backups\` o `%APPDATA%\Antigravity\Backups\`.
- Omitir la primera línea (metadatos del editor con URL y etag).
- Extraer el contenido restante y escribirlo en disco con codificación UTF-8 explícita.

## 2. Creación de Apps Next.js en Rutas con Espacios
Las restricciones de nombres de paquetes de npm impiden que `create-next-app` inicialice directamente en carpetas con espacios (ej. `proyecto reviews`):
- Inicializar en un subdirectorio temporal con nombre slug (ej. `temp-app`).
- Mover los archivos a la raíz `./` con PowerShell o bash.
- Eliminar el directorio temporal.

## 3. Principios de Diseño para B2B SaaS
- Integrar la jerarquía editorial de Anthropic Frontend Design (contrastes definidos, tipografía nítida, sin tells de IA ni degradados púrpuras genéricos).
- Respaldar con UI/UX Pro Max para paletas, espaciados y estados completos (empty, loading, error, success).
- Incorporar acentos de Aceternity UI y Motion para transiciones y microinteracciones con propósito.
