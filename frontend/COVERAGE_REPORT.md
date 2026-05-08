# COVERAGE_REPORT.md

---

## Pruebas Funcionales de Botones

| Métrica | Valor |
|---------|-------|
| Estado | CRÍTICA |
| Botones testeados | 17 |
| Botones pasados | 0 |
| Botones fallidos | 17 |

### Detalle de Botones

| Componente | Botón | Tipo | Estado |
|------------|-------|------|--------|
| Login | Submit | submit | FAIL |
| Login | Submit | keyboard-enter | FAIL |
| GestionCampanas | Nueva Campaña | button | FAIL |
| GestionCampanas | Cancelar | button | FAIL |
| GestionCampanas | Crear | button | FAIL |
| GestionUsuarios | Guardar | button | FAIL |
| GestionUsuarios | Eliminar | button | FAIL |
| GestionUsuarios | Cancelar | button | FAIL |
| SeguimientoTareas | Nueva Tarea | button | FAIL |
| SeguimientoTareas | Crear | button | FAIL |
| Header | Cerrar sesión | button | FAIL |
| DesignSystemOverview | Primary Button | button | FAIL |
| DesignSystemOverview | Secondary Button | button | FAIL |
| DesignSystemOverview | Outline Button | button | FAIL |
| DesignSystemOverview | Ghost Button | button | FAIL |
| Login | Loading state | button | FAIL |

### Botones No Testeados
- Button 'Exportar Reporte' en MetricasReportes.tsx (fuera del alcance inicial)
- BackButton en DetalleCampana.tsx (no es un componente Button estándar)

### Fallos Detectados
- `botón submit existe y es clickeable` — timeout esperando que el botón sea visible
  - Archivo: frontend/src/pages/Login.tsx
  - Causa: la página no carga correctamente o el selector no encuentra el botón
- `botón Nueva Campaña existe y es clickeable` — timeout esperando login o navegación
  - Archivo: frontend/src/pages/GestionCampanas.tsx
  - Causa: el flujo de login no completa exitosamente en el entorno de test
- Todos los tests fallan por timeout del webServer o falla en flujo de autenticación