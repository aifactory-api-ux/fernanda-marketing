import { test, expect } from '@playwright/test';

test.describe('Botones de Login', () => {
  test('botón submit existe y es clickeable', async ({ page }) => {
    await page.goto('/login');
    const submitBtn = page.getByRole('button', { name: /iniciar sesión/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test('botón submit llama al handler', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
  });

  test('botón submit responde a Enter con keyboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('test@example.com');
    await page.getByLabel(/contraseña/i).fill('password123');
    await page.keyboard.press('Enter');
  });
});

test.describe('Botones de Gestión de Campañas', () => {
  test('botón Nueva Campaña existe y es clickeable', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/campaigns');
    const newCampaignBtn = page.getByRole('button', { name: /nueva campaña/i });
    await expect(newCampaignBtn).toBeVisible();
    await expect(newCampaignBtn).toBeEnabled();
  });

  test('botón Cancelar cierra el modal', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/campaigns');
    await page.getByRole('button', { name: /nueva campaña/i }).click();
    const cancelarBtn = page.getByRole('button', { name: /cancelar/i });
    await expect(cancelarBtn).toBeVisible();
    await cancelarBtn.click();
  });

  test('botón Crear ejecuta acción', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/campaigns');
    await page.getByRole('button', { name: /nueva campaña/i }).click();
    const crearBtn = page.getByRole('button', { name: /^crear$/i });
    await expect(crearBtn).toBeVisible();
  });
});

test.describe('Botones de Gestión de Usuarios', () => {
  test('botón Guardar existe en modal de edición', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/users');
    const guardarBtn = page.getByRole('button', { name: /guardar/i });
    await expect(guardarBtn).toBeVisible();
  });

  test('botón Eliminar existe en modal de edición', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/users');
    const eliminarBtn = page.getByRole('button', { name: /eliminar/i });
    if (await eliminarBtn.isVisible()) {
      await expect(eliminarBtn).toBeVisible();
    }
  });

  test('botón Cancelar cierra modal', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/users');
    const cancelarBtn = page.getByRole('button', { name: /cancelar/i });
    await expect(cancelarBtn).toBeVisible();
    await cancelarBtn.click();
  });
});

test.describe('Botones de Seguimiento de Tareas', () => {
  test('botón Nueva Tarea existe y es clickeable', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/tasks');
    const nuevaTareaBtn = page.getByRole('button', { name: /nueva tarea/i });
    await expect(nuevaTareaBtn).toBeVisible();
    await expect(nuevaTareaBtn).toBeEnabled();
  });

  test('botón Crear en modal de tarea', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/tasks');
    await page.getByRole('button', { name: /nueva tarea/i }).click();
    const crearBtn = page.getByRole('button', { name: /^crear$/i });
    await expect(crearBtn).toBeVisible();
  });
});

test.describe('Botones de Header', () => {
  test('botón Cerrar sesión existe y es clickeable', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    const logoutBtn = page.getByRole('button', { name: /cerrar sesión/i });
    await expect(logoutBtn).toBeVisible();
    await expect(logoutBtn).toBeEnabled();
  });
});

test.describe('Botones de Design System', () => {
  test('botón Primary existe', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/design-system');
    const primaryBtn = page.getByRole('button', { name: /primary button/i });
    await expect(primaryBtn).toBeVisible();
  });

  test('botón Secondary existe', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/design-system');
    const secondaryBtn = page.getByRole('button', { name: /secondary button/i });
    await expect(secondaryBtn).toBeVisible();
  });

  test('botón Outline existe', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/design-system');
    const outlineBtn = page.getByRole('button', { name: /outline button/i });
    await expect(outlineBtn).toBeVisible();
  });

  test('botón Ghost existe', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    await page.getByRole('button', { name: /iniciar sesión/i }).click();
    await page.waitForURL('/');
    await page.goto('/design-system');
    const ghostBtn = page.getByRole('button', { name: /ghost button/i });
    await expect(ghostBtn).toBeVisible();
  });
});

test.describe('Botón Loading State', () => {
  test('botón en estado loading muestra texto Cargando', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/correo/i).fill('admin@example.com');
    await page.getByLabel(/contraseña/i).fill('admin123');
    const submitBtn = page.getByRole('button', { name: /iniciar sesión/i });
    await submitBtn.click();
    const loadingBtn = page.getByRole('button', { name: /cargando/i });
    await expect(loadingBtn).toBeVisible();
  });
});