import { Page, Locator, expect } from '@playwright/test';

export class ActiveChatComponent {
  private readonly page: Page;
  private readonly messageInput: Locator;
  private readonly sendButton: Locator;
  private readonly customerName: Locator;
  private readonly suggestedResponseCards: Locator;
  private readonly chatMessageContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.messageInput = page.getByRole('textbox');
    this.sendButton = page.getByRole('button', { name: 'Submit message' });
    this.customerName = page.locator('[data-testid="chat-header-name"]');
    this.suggestedResponseCards = page.locator('[data-testid="suggested-response-card"]');
    this.chatMessageContainer = page.locator('.chat-messages__message__container')
  }

  async sendMessage(text: string) {
    await this.messageInput.fill(text);
    await this.sendButton.click();
  }

  async waitForMessageToAppear(text: string) {
    await expect(
      this.chatMessageContainer.filter({ hasText: text })
    ).toBeVisible({ timeout: 8_000 });
  }

  async acceptSuggestedResponse() {
    this.page.getByRole("img", { name: "button-icon", exact: true })
  }

  async dismissSuggestedResponse(cardTitle: string) {
    const card = this.page.locator('[data-testid="suggested-response-card"]')
      .filter({ hasText: cardTitle });
    await card.getByRole('button', { name: '✗' }).click();
  }

  async getSuggestedResponseCount(): Promise<number> {
    return this.suggestedResponseCards.count();
  }
}
