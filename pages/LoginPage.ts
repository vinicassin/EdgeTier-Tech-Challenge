import { Page } from '@playwright/test';

export enum UserType {
  FullAccess = 'Sign in with Demo (Full Access)',
  Admin      = 'Sign in with Demo (Admin)',
  Agent      = 'Sign in with Demo (Agent)',
  TeamLead   = 'Sign in with Demo (Team Lead)',
}

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async loginAs(userType: UserType) {
    await this.page.getByRole('link', { name: userType }).click();
  }
}