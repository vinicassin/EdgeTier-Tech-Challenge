import { MenuComponent } from '../components/MenuComponent';
import { ChatPage } from '../pages/ChatPage';
import { test } from '../fixtures/utils.fixtures';

test.describe('E2E — Chat Flow', () => {
  test('should allow agent to reply to user and complete chat successfully without using suggestions @smoke @test-0001 @chat-feature @e2e', async ({ page, loginPage }) => {
    const menuComponent = new MenuComponent(page);
    const chatPage = new ChatPage(page);
    const CHAT_CLOSED_MESSAGE = "The chat was closed due to lack of information."

    await menuComponent.goToChat();

    await chatPage.selectChatByIndex(0)
    
    await chatPage.sendMessageAndWait("Hello User, How can I help you?");
    // At this point, we can simulate the user's response either via mocking or
    // by calling an endpoint authenticated as the user to achieve a more realistic scenario.
    
    await chatPage.endChat(CHAT_CLOSED_MESSAGE);

    // At this stage, we should verify that the chat has been completed successfully and removed from the active chats list.
    await chatPage.validateEndedChat();
  });

  test('should allow agent to reply to user and complete chat successfully using suggestions @test-0002 @chat-feature @e2e', async ({ page }) => {
    const menuComponent = new MenuComponent(page);
    const chatPage = new ChatPage(page);
    const CHAT_CLOSED_MESSAGE = "The chat was closed due to lack of information."

    await menuComponent.goToChat();
    await chatPage.selectChatByIndex(0)

    await chatPage.acceptSuggested();
    
    await chatPage.endChat(CHAT_CLOSED_MESSAGE);
    await chatPage.validateEndedChat();
  });
});
