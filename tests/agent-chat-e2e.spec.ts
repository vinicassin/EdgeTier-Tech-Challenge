import { test } from '@playwright/test';
import { LoginPage, UserType } from '../pages/LoginPage';
import { MenuComponent } from '../components/MenuComponent';
import { ChatPage } from '../pages/ChatPage';


test.describe('E2E — Chat Flow', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.loginAs(UserType.Agent);
  });
  
  test('should allow agent to reply to user and complete chat successfully without using suggestions @smoke @test-0001 @chat-feature @e2e', async ({ page }) => {
    const menuComponent = new MenuComponent(page);
    const chatPage = new ChatPage(page);
    const CHAT_CLOSED_MESSAGE = "The chat was closed due to lack of information."

    await menuComponent.goToChat();

    await chatPage.sendMessageAndWait("Hello User, How can I help you?");
    // At this point, we can simulate the user's response either via mocking or
    // by calling an endpoint authenticated as the user to achieve a more realistic scenario.

    await chatPage.endChat(CHAT_CLOSED_MESSAGE);

    // At this stage, we should verify that the chat has been completed successfully and removed from the active chats list.

    await chatPage.validateEndedChat(CHAT_CLOSED_MESSAGE);
  });

  

});
