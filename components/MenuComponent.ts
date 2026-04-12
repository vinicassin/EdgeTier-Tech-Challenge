import { Page, Locator } from '@playwright/test';

export class MenuComponent {
  readonly page: Page;

  private readonly chatLink: Locator;
  private readonly homeLink: Locator;
  private readonly emailLink: Locator;
  private readonly searchLink: Locator;
  private readonly templatesLink: Locator;
  private readonly signOutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.chatLink      = page.getByRole('link', { name: 'Chat', exact: true });
    this.homeLink      = page.getByRole('link', { name: 'Home' });
    this.emailLink     = page.getByRole('link', { name: 'Email' });
    this.searchLink    = page.getByRole('link', { name: 'Search' });
    this.templatesLink = page.getByRole('link', { name: 'Templates' });
    this.signOutLink   = page.getByRole('link', { name: 'Sign Out' });
  }

  async goToChat() {
    await this.chatLink.click();
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async goToEmail() {
    await this.emailLink.click();
  }

  async signOut() {
    await this.signOutLink.click();
  }

  // I created a separate function for each action because they require different locators (search, templates, and sign out).
}