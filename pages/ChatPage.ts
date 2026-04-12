import { Page, Locator, expect } from '@playwright/test';
import { ActiveChatPage } from '../components/ActiveChatComponent';

export class ChatPage {
    readonly page: Page;
    readonly activeChat: ActiveChatPage;
    private readonly endChatButton: Locator;
    private readonly note: Locator;
    private readonly notificationEndedChat: Locator;
    private readonly submitAsComplete: Locator;
    private readonly dispositionCodeCategory: Locator;
    private readonly dispositionCode: Locator;

    constructor(page: Page) {
        this.page                    = page;
        this.activeChat              = new ActiveChatPage(page);
        this.endChatButton           = page.getByRole('button', { name: 'End Chat' });
        this.note                    = page.getByRole('textbox', { name: 'Note' });
        this.notificationEndedChat   = page.getByRole('status');
        this.submitAsComplete        = page.getByRole('button', { name: 'Submit as Complete' });
        this.dispositionCodeCategory = page.locator('#disposition_group');
        this.dispositionCode         = page.locator('#disposition_ids');
    }

    async sendMessageAndWait(text: string) {
        await this.activeChat.sendMessage(text);
        await this.activeChat.waitForMessageToAppear(text);
    }

    async acceptSuggested() {
        await this.activeChat.acceptSuggestedResponse()
    }

    async endChat(message: string) {
        this.endChatButton.click()
        
        await expect(this.dispositionCodeCategory).toBeVisible();
        await expect(this.dispositionCodeCategory).toBeEnabled();
        await this.dispositionCodeCategory.click();

        await this.page.getByRole('option', { name: 'Add Extras' }).click();

        await this.dispositionCode.click();
        // Here we can create the same solution in loginPage with enum and all possibilities
        await this.page.getByRole('option', { name: 'Additional Driver' }).click();
        await this.note.fill(message);
        await this.submitAsComplete.click();
    }

    async validateEndedChat(message: string) {
        await expect(this.notificationEndedChat.filter({ hasText: 'Chat Ended' })).toBeVisible();
        await expect(this.notificationEndedChat).toContainText("Successfully finished chat with customer");
    }
}