import { Page, Locator, expect } from '@playwright/test';

export class ChatListPage {
  readonly page: Page;

  private readonly chatItems: Locator;
  private readonly maxChatsWarning: Locator;

  constructor(page: Page) {
    this.page = page;
    this.chatItems = page.locator('[data-testid="chat-list-item"]');
    this.maxChatsWarning = page.getByText('You are currently handling the maximum number of chats');
  }

  async selectChatByCustomerName(name: string) {
    await this.page.getByRole('listitem').filter({ hasText: name }).click();
  }

  async waitForChatToAppear(customerName: string) {
    await expect(
      this.page.getByRole('listitem').filter({ hasText: customerName })
    ).toBeVisible({ timeout: 10_000 });
  }

  async isAtMaxCapacity(): Promise<boolean> {
    return this.maxChatsWarning.isVisible();
  }

  async getOpenChatsCount(): Promise<number> {
    return this.chatItems.count();
  }
}
