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
    await this.page.getByTestId('departure-date-dropdown-label-test-id').getByTestId('svg-img').click();
    // Calculate a date at least minDaysAhead in the future
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + minDaysAhead + Math.floor(Math.random() * 10));
    const monthName = targetDate.toLocaleString('default', { month: 'long' });
    const year = targetDate.getFullYear();
    const day = targetDate.getDate();
    // Wait for the correct month to be visible
    const monthTestId = `undefined-month-${monthName}-${year}`;
    await this.page.getByTestId(monthTestId).waitFor({ state: 'visible', timeout: 7000 });
    // Click the day in the calendar
    await this.page.getByTestId(monthTestId)
      .getByTestId(`undefined-calendar-day-${day}`)
      .getByText(day.toString())
      .click();
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
