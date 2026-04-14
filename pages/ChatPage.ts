import { Page, Locator, expect } from '@playwright/test';
import { ActiveChatComponent } from '../components/ActiveChatComponent';
import { ChatListComponent } from '../components/ChatListComponent';
import { NOTIFICATIONS } from '../fixtures/chat.fixtures';

export class ChatPage {
    private readonly page: Page;
    private readonly activeChat: ActiveChatComponent;
    private readonly chatList: ChatListComponent;
    private readonly endChatButton: Locator;
    private readonly note: Locator;
    private readonly notificationEndedChat: Locator;
    private readonly submitAsComplete: Locator;
    private readonly dispositionCodeCategory: Locator;
    private readonly dispositionCode: Locator;

    constructor(page: Page) {
        this.page                    = page;
        this.activeChat              = new ActiveChatComponent(page);
        this.chatList                = new ChatListComponent(page);
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

    async selectChatByIndex(index: number) {
        await this.chatList.selectChat(index)
    }

    async endChat(message: string) {        
        await this.endChatButton.click()
        await this.dispositionCodeCategory.click();
        await this.page.getByRole('option', { name: 'Add Extras' }).click();

        await this.dispositionCode.click();
        await this.page.getByRole('option', { name: 'Additional Driver' }).click();
        // Here we can create the same solution in loginPage with enum and all possibilities
        
        await this.note.fill(message);
        await this.submitAsComplete.click();
    }

    async validateEndedChat() {
        await expect(this.notificationEndedChat.filter({ hasText: NOTIFICATIONS.chatEndedTitle })).toBeVisible();
        await expect(this.notificationEndedChat).toContainText(NOTIFICATIONS.chatEndedMessage);
    }
}