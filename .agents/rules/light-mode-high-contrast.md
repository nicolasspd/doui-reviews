# Estándares de Alto Contraste en Light Mode (WCAG AAA)

## 1. Jerarquía Tipográfica y Colores de Texto
- **Prohibición estricta**: Prohibido usar `text-slate-400` o `text-slate-500` para cuerpos de texto, tablas, etiquetas o subtítulos sobre fondos blancos (`#ffffff`) o claros (`bg-slate-50`).
- **Textos Primarios y Títulos**: Usar `text-slate-900` para títulos, encabezados de tarjeta y métricas clave.
- **Textos Secundarios y Metadatos**: Usar como piso mínimo `text-slate-700` o `text-slate-600` para garantizar legibilidad en pantallas de brillo reducido o bajo la luz del sol.
- **Badges y Etiquetas de Estado**: Siempre combinar fondo suave + borde definido + texto oscuro (`bg-emerald-50 text-emerald-800 border-emerald-200`).

## 2. Contenedores de Iconos y Componentes Gráficos
- **Eliminación de artefactos Dark Mode**: Prohibido dejar contenedores oscuros (`bg-slate-700`, `bg-slate-800`, `#1e293b`) en interfaces Light Mode.
- **Contenedores tonales pastel**: Usar cajas con fondo tintado suave y borde acentuado acorde a la semántica:
  - **Calificaciones / Estrellas / Warning**: `bg-amber-50 text-amber-700 border border-amber-200`
  - **Éxito / Aprobado / Verificado**: `bg-emerald-50 text-emerald-700 border border-emerald-200`
  - **Google / Enlaces / Info**: `bg-blue-50 text-blue-700 border border-blue-200`
  - **Cupones / Ofertas / Recompensas**: `bg-purple-50 text-purple-700 border border-purple-200`
  - **Acciones Críticas / Alertas**: `bg-rose-50 text-rose-700 border border-rose-200`

## 3. Barras de Progreso y Rieles de Indicadores
- **Fondo del riel visible**: Todo riel o fondo de barra de progreso debe utilizar `bg-slate-200` o `bg-slate-300`, nunca fondos oscuros heredados ni blanco indistinguible.
- **Indicador de llenado**: Colores vibrantes y saturados (`bg-emerald-500`, `bg-indigo-600`, `bg-amber-500`) con bordes limpios.

## 4. Visualización de Datos y Gráficos (Recharts / SVG)
- **Ejes y Ticks numéricos**: Las propiedades `tick` de `XAxis` e `YAxis` deben declarar explícitamente `fill="#475569"` o `fill="#64748b"` con `fontWeight: 600` y `fontSize: 12` para evitar números fantasmas o ilegibles.
- **Rejilla cartesiana (CartesianGrid)**: `stroke="#e2e8f0"` o `strokeDasharray="3 3"` con opacidad visible.
- **Tooltips flotantes**: Fondo blanco puro (`bg-white`), borde fino `border-slate-200`, sombra elevada (`shadow-xl`) y textos en `text-slate-800`.
