# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buttons.spec.ts >> Botones de Login >> botón submit existe y es clickeable
- Location: tests-functional/buttons.spec.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /iniciar sesión/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /iniciar sesión/i })

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Botones de Login', () => {
  4   |   test('botón submit existe y es clickeable', async ({ page }) => {
  5   |     await page.goto('/login');
  6   |     const submitBtn = page.getByRole('button', { name: /iniciar sesión/i });
> 7   |     await expect(submitBtn).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
  8   |     await expect(submitBtn).toBeEnabled();
  9   |   });
  10  | 
  11  |   test('botón submit llama al handler', async ({ page }) => {
  12  |     await page.goto('/login');
  13  |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  14  |   });
  15  | 
  16  |   test('botón submit responde a Enter con keyboard', async ({ page }) => {
  17  |     await page.goto('/login');
  18  |     await page.getByLabel(/correo/i).fill('test@example.com');
  19  |     await page.getByLabel(/contraseña/i).fill('password123');
  20  |     await page.keyboard.press('Enter');
  21  |   });
  22  | });
  23  | 
  24  | test.describe('Botones de Gestión de Campañas', () => {
  25  |   test('botón Nueva Campaña existe y es clickeable', async ({ page }) => {
  26  |     await page.goto('/login');
  27  |     await page.getByLabel(/correo/i).fill('admin@example.com');
  28  |     await page.getByLabel(/contraseña/i).fill('admin123');
  29  |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  30  |     await page.waitForURL('/');
  31  |     await page.goto('/campaigns');
  32  |     const newCampaignBtn = page.getByRole('button', { name: /nueva campaña/i });
  33  |     await expect(newCampaignBtn).toBeVisible();
  34  |     await expect(newCampaignBtn).toBeEnabled();
  35  |   });
  36  | 
  37  |   test('botón Cancelar cierra el modal', async ({ page }) => {
  38  |     await page.goto('/login');
  39  |     await page.getByLabel(/correo/i).fill('admin@example.com');
  40  |     await page.getByLabel(/contraseña/i).fill('admin123');
  41  |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  42  |     await page.waitForURL('/');
  43  |     await page.goto('/campaigns');
  44  |     await page.getByRole('button', { name: /nueva campaña/i }).click();
  45  |     const cancelarBtn = page.getByRole('button', { name: /cancelar/i });
  46  |     await expect(cancelarBtn).toBeVisible();
  47  |     await cancelarBtn.click();
  48  |   });
  49  | 
  50  |   test('botón Crear ejecuta acción', async ({ page }) => {
  51  |     await page.goto('/login');
  52  |     await page.getByLabel(/correo/i).fill('admin@example.com');
  53  |     await page.getByLabel(/contraseña/i).fill('admin123');
  54  |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  55  |     await page.waitForURL('/');
  56  |     await page.goto('/campaigns');
  57  |     await page.getByRole('button', { name: /nueva campaña/i }).click();
  58  |     const crearBtn = page.getByRole('button', { name: /^crear$/i });
  59  |     await expect(crearBtn).toBeVisible();
  60  |   });
  61  | });
  62  | 
  63  | test.describe('Botones de Gestión de Usuarios', () => {
  64  |   test('botón Guardar existe en modal de edición', async ({ page }) => {
  65  |     await page.goto('/login');
  66  |     await page.getByLabel(/correo/i).fill('admin@example.com');
  67  |     await page.getByLabel(/contraseña/i).fill('admin123');
  68  |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  69  |     await page.waitForURL('/');
  70  |     await page.goto('/users');
  71  |     const guardarBtn = page.getByRole('button', { name: /guardar/i });
  72  |     await expect(guardarBtn).toBeVisible();
  73  |   });
  74  | 
  75  |   test('botón Eliminar existe en modal de edición', async ({ page }) => {
  76  |     await page.goto('/login');
  77  |     await page.getByLabel(/correo/i).fill('admin@example.com');
  78  |     await page.getByLabel(/contraseña/i).fill('admin123');
  79  |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  80  |     await page.waitForURL('/');
  81  |     await page.goto('/users');
  82  |     const eliminarBtn = page.getByRole('button', { name: /eliminar/i });
  83  |     if (await eliminarBtn.isVisible()) {
  84  |       await expect(eliminarBtn).toBeVisible();
  85  |     }
  86  |   });
  87  | 
  88  |   test('botón Cancelar cierra modal', async ({ page }) => {
  89  |     await page.goto('/login');
  90  |     await page.getByLabel(/correo/i).fill('admin@example.com');
  91  |     await page.getByLabel(/contraseña/i).fill('admin123');
  92  |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  93  |     await page.waitForURL('/');
  94  |     await page.goto('/users');
  95  |     const cancelarBtn = page.getByRole('button', { name: /cancelar/i });
  96  |     await expect(cancelarBtn).toBeVisible();
  97  |     await cancelarBtn.click();
  98  |   });
  99  | });
  100 | 
  101 | test.describe('Botones de Seguimiento de Tareas', () => {
  102 |   test('botón Nueva Tarea existe y es clickeable', async ({ page }) => {
  103 |     await page.goto('/login');
  104 |     await page.getByLabel(/correo/i).fill('admin@example.com');
  105 |     await page.getByLabel(/contraseña/i).fill('admin123');
  106 |     await page.getByRole('button', { name: /iniciar sesión/i }).click();
  107 |     await page.waitForURL('/');
```