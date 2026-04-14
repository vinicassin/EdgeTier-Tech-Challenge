import { Page, Locator, expect } from '@playwright/test';

export class ChatListComponent {
  private readonly page: Page;
  private readonly chatItems: Locator;
  private readonly maxChatsWarning: Locator;

  constructor(page: Page) {
    this.page = page;
    this.chatItems = page.locator('[data-testid="chat-list-item"]');
    this.maxChatsWarning = page.getByText('You are currently handling the maximum number of chats');
  }

  async selectChat(index: number) {
    await this.page.locator('.chat-list-item__content').nth(index).click();
  }

  async selectChatByCustomerName(name: string) {
    await this.page.getByRole('listitem').filter({ hasText: name }).click();
  }

  async waitForChatToAppear(customerName: string) {
    await expect(
      this.page.getByRole('listitem').filter({ hasText: customerName })
    ).toBeVisible({ timeout: 10_000 });
  }

}
