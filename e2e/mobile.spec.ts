import { test, expect } from '@playwright/test'

// Regresión de la vista de celular: antes el layout era una grilla de 3 columnas
// fija (300px + preview + 300px), así que en un teléfono la columna del preview
// colapsaba a 0px y la página desbordaba ~225px en horizontal.

test.use({ viewport: { width: 375, height: 812 } })

const overflowX = () =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Constructor Web')).toBeVisible()
})

test('no desborda en horizontal en ninguna pestaña', async ({ page }) => {
  for (const tab of ['Secciones', 'Vista', 'Resumen']) {
    await page.getByRole('button', { name: tab, exact: true }).click()
    expect(await page.evaluate(overflowX)).toBe(0)
  }
})

test('se ve un solo panel por vez y las pestañas lo cambian', async ({ page }) => {
  const catalogo = page.locator('aside').first()
  const vista = page.locator('main')
  const resumen = page.locator('aside').nth(1)

  // Arranca en la vista previa: es el producto que el cliente vino a ver.
  await expect(vista).toBeVisible()
  await expect(catalogo).toBeHidden()
  await expect(resumen).toBeHidden()

  await page.getByRole('button', { name: 'Secciones', exact: true }).click()
  await expect(catalogo).toBeVisible()
  await expect(vista).toBeHidden()
  await expect(resumen).toBeHidden()

  await page.getByRole('button', { name: 'Resumen', exact: true }).click()
  await expect(resumen).toBeVisible()
  await expect(catalogo).toBeHidden()
  await expect(vista).toBeHidden()
})

test('el preview se ve con ancho real, no colapsado', async ({ page }) => {
  const marco = page.locator('main > div').first()
  const caja = await marco.boundingBox()
  expect(caja).not.toBeNull()
  // Antes quedaba en 0px. Ahora tiene que ocupar casi todo el ancho del teléfono.
  expect(caja!.width).toBeGreaterThan(300)
  await expect(page.locator('main section').first()).toBeVisible()
})

test('el CTA de WhatsApp es alcanzable desde el celular', async ({ page }) => {
  await page.getByRole('button', { name: 'Resumen', exact: true }).click()
  const link = page.getByRole('link', { name: /Enviar mi diseño por WhatsApp/ })
  await expect(link).toBeVisible()
  expect(await link.getAttribute('href')).toContain('https://wa.me/542923504415?text=')
})
