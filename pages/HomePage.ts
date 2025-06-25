import { Page, expect } from '@playwright/test';

// Page Object for SpiceJet Home Page
export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.spicejet.com/');
  }

  async handleAllowPopup() {
    // Try to click 'Allow' on browser popup if present
    // This may need to be customized based on actual popup selectors
    try {
      const allowButton = this.page.locator('button:has-text("Allow")');
      if (await allowButton.isVisible({ timeout: 3000 })) {
        await allowButton.click();
      }
    } catch (e) {
      // Ignore if not present
    }
    // Dismiss overlays if any
    try {
      const overlayClose = this.page.locator('[data-testid="overlay-close"]');
      if (await overlayClose.isVisible({ timeout: 2000 })) {
        await overlayClose.click();
      }
    } catch (e) {}
  }

  async selectOneWayTrip() {
    await this.page.getByText('one way', { exact: false }).click();
  }

  async selectFromAirport(code: string) {
    await this.page.locator('[data-testid="to-testID-origin"] input').click();
    await this.page.getByText(code, { exact: false }).first().click();
  }

  async selectToAirport(code: string) {
    await this.page.locator('[data-testid="to-testID-destination"] input').click();
    await this.page.getByText(code, { exact: false }).first().click();
  }

  async selectRandomFutureDate(minDaysAhead: number) {
    // Open date picker
    await this.page.locator('[data-testid="departure-date-dropdown-label-test-id"]').click();
    // Wait for the calendar to appear
    await this.page.waitForSelector('//div[contains(@data-testid, "month")] | //div[contains(@data-testid, "calendar")]', { timeout: 7000 });
    // Use the provided XPath to select a date (e.g., 6th of the month, second occurrence)
    // You can randomize the number if needed, but for now, use the provided example
    const dateXpath = "(//div[text()='6'])[2]";
    await this.page.locator(`xpath=${dateXpath}`).click();
  }

  async setAdultPassengers(count: number) {
    await this.page.locator('[data-testid="home-page-travellers"]').click();
    const adultPlus = this.page.locator('[data-testid="Adult-testID-plus-one-cta"]');
    for (let i = 1; i < count; i++) {
      await adultPlus.click();
    }
    await this.page.locator('[data-testid="traveller-done-cta"]').click();
  }

  async clickSearchFlights() {
    await this.page.locator('[data-testid="home-page-flight-cta"]').click();
  }
}
