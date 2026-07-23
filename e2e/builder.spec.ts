import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

// E2E de las interacciones que los tests unitarios NO cubren:
// drag & drop, agregar/quitar bloques, pantalla completa y exportar.
// Los asserts de estado se hacen contra el panel de Resumen, que refleja el `order`.

// Nombres de las secciones activas, en orden, leídos del panel de Resumen.
async function activeSections(page: Page): Promise<string[]> {
  return page.locator('aside ol li span.flex-1').allInnerTexts()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Constructor Web')).toBeVisible()
})

test('carga con el rubro por defecto y secciones en el preview', async ({ page }) => {
  // Gimnasio arranca con 10 bloques.
  await expect(page.getByText(/^10 componentes$/)).toBeVisible()
  await expect(page.getByText('10 bloques')).toBeVisible()
  // El preview renderiza al menos una sección real.
  await expect(page.locator('main section').first()).toBeVisible()
})

test('cambiar de rubro recompone la página', async ({ page }) => {
  await page.getByLabel('Rubro').selectOption('comercio')
  // Comercio trae 12 bloques e incluye gadgets de panel.
  await expect(page.getByText(/^12 componentes$/)).toBeVisible()
  await expect(page.locator('aside ol li').getByText('panel').first()).toBeVisible()
})

test('agregar y quitar un bloque actualiza el conteo', async ({ page }) => {
  const before = (await activeSections(page)).length

  // "Galería" no está en el preset de gimnasio → aparece en "Agregar · web".
  await page.getByRole('button', { name: /Galería/ }).click()
  await expect(page.getByText(new RegExp(`^${before + 1} componentes$`))).toBeVisible()

  // Quitar el primer bloque.
  await page.getByLabel('Quitar').first().click()
  await expect(page.getByText(new RegExp(`^${before} componentes$`))).toBeVisible()
})

test('reordenar por teclado cambia el orden', async ({ page }) => {
  const before = await activeSections(page)
  expect(before.length).toBeGreaterThan(1)

  // Tomar el primer asa de arrastre, levantarla, bajar una posición y soltar.
  // Los pequeños waits le dan tiempo al KeyboardSensor de dnd-kit a registrar
  // cada paso del drag (sin ellos, la secuencia de teclas es flaky).
  const firstGrip = page.getByLabel('Arrastrar para reordenar').first()
  await firstGrip.focus()
  await page.keyboard.press('Space') // levantar
  await page.waitForTimeout(200)
  await page.keyboard.press('ArrowDown') // mover una posición abajo
  await page.waitForTimeout(200)
  await page.keyboard.press('Space') // soltar

  await expect(async () => {
    const after = await activeSections(page)
    // El que era primero ahora está segundo (swap con el vecino).
    expect(after[0]).toBe(before[1])
    expect(after[1]).toBe(before[0])
  }).toPass()
})

test('pantalla completa abre y cierra el overlay', async ({ page }) => {
  await page.getByRole('button', { name: 'Pantalla completa' }).click()
  await expect(page.getByText('Vista previa a pantalla completa')).toBeVisible()
  await page.getByRole('button', { name: 'Salir' }).click()
  await expect(page.getByText('Vista previa a pantalla completa')).not.toBeVisible()
})

test('enviar el diseño por WhatsApp al número fijo con el brief completo', async ({ page }) => {
  const link = page.getByRole('link', { name: /Enviar mi diseño por WhatsApp/ })
  await expect(link).toBeVisible()

  const href = await link.getAttribute('href')
  expect(href).toContain('https://wa.me/542923504415?text=')

  // El texto prellenado es el diseño completo (negocio + secciones).
  const msg = decodeURIComponent(href!.split('text=')[1])
  expect(msg).toContain('*Negocio:*')
  expect(msg).toContain('*Secciones (')

  // Ya no existen los formatos de export anteriores.
  await expect(page.getByRole('button', { name: 'Prompt' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'JSON' })).toHaveCount(0)
})
