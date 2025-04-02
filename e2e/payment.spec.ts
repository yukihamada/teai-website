import { test, expect } from '@playwright/test';

test('payment flow', async ({ page }) => {
  // 1. 支払いページに直接アクセス
  await page.goto('/payment');
  
  // 2. 支払いフォームが表示されるのを待つ
  await expect(page.locator('form')).toBeVisible();

  // 3. 支払い金額を入力（data-testid属性を使用）
  await page.locator('[data-testid="amount-input"]').fill('1000');

  // 4. テストカード情報を入力
  const cardFrame = page.frameLocator('iframe[src*="stripe.com"]').first();
  await expect(cardFrame).toBeVisible();
  await cardFrame.locator('[placeholder="Card number"]').fill('4242424242424242');
  await cardFrame.locator('[placeholder="MM / YY"]').fill('1230');
  await cardFrame.locator('[placeholder="CVC"]').fill('123');

  // 5. 支払いを実行
  await page.locator('[data-testid="submit-payment"]').click();

  // 6. 支払い完了を確認（最大60秒待機）
  await expect(page.locator('[data-testid="payment-success"]'), 
    "支払い完了メッセージが表示されるまで60秒待機"
  ).toBeVisible({ timeout: 60000 });
});

test('insufficient funds', async ({ page }) => {
  await page.goto('/payment');
  
  await expect(page.locator('form')).toBeVisible();
  
  await page.locator('[data-testid="amount-input"]').fill('1000');

  const cardFrame = page.frameLocator('iframe[src*="stripe.com"]').first();
  await expect(cardFrame).toBeVisible();
  await cardFrame.locator('[placeholder="Card number"]').fill('4000000000009995');
  await cardFrame.locator('[placeholder="MM / YY"]').fill('1230');
  await cardFrame.locator('[placeholder="CVC"]').fill('123');

  await page.locator('[data-testid="submit-payment"]').click();

  // エラーメッセージを確認
  await expect(page.locator('[data-testid="payment-error"]')).toBeVisible();
  await expect(page.locator('[data-testid="payment-error"]')).toContainText('insufficient funds');
});
