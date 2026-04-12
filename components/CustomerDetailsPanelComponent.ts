import { Page, Locator, expect } from '@playwright/test';

export class CustomerDetailsPanelPage {
  readonly page: Page;

  private readonly chatDetailsTab: Locator;
  private readonly propertyDetailsTab: Locator;
  private readonly historyTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.chatDetailsTab = page.getByRole('tab', { name: 'Chat Details' });
    this.propertyDetailsTab = page.getByRole('tab', { name: 'Property Details' });
    this.historyTab = page.getByRole('tab', { name: 'History' });
  }

  private getFieldValue(label: string): Locator {
    return this.page.locator('[data-testid="detail-panel"]')
      .getByText(label)
      .locator('xpath=following-sibling::*[1]');
  }

  async assertCustomerName(expected: string) {
    await expect(this.getFieldValue('Name')).toHaveText(expected);
  }

  async assertBookingId(expected: string) {
    await expect(this.getFieldValue('Booking ID')).toHaveText(expected);
  }

  async assertEmail(expected: string) {
    await expect(this.getFieldValue('Email Address')).toHaveText(expected);
  }

  async assertPolicyType(expected: string) {
    await expect(this.getFieldValue('Policy Type')).toContainText(expected);
  }

  async openHistoryTab() {
    await this.historyTab.click();
  }

  async assertConversationInHistory(customerName: string) {
    await this.openHistoryTab();
    await expect(
      this.page.locator('[data-testid="history-list"]').getByText(customerName)
    ).toBeVisible({ timeout: 8_000 });
  }
}
