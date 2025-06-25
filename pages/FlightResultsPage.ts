import { Page, expect } from '@playwright/test';

// Page Object for SpiceJet Flight Results Page
export class FlightResultsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async waitForResults() {
    // Wait for the results container or flight cards to appear
    await this.page.waitForSelector('[data-testid="flight-card"]', { timeout: 20000 });
  }

  async getFirstFlightPrice(): Promise<string> {
    // Adjust selector as per actual DOM
    const priceLocator = this.page.locator('[data-testid="flight-card"] [data-testid*="price"]').first();
    await expect(priceLocator).toBeVisible();
    const price = await priceLocator.textContent();
    return price ? price.trim() : '';
  }
}
