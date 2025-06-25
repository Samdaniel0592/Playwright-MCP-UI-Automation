// Playwright test for SpiceJet flight search scenario
// @smoke @regression
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FlightResultsPage } from '../pages/FlightResultsPage';
// import { testData } from '../helpers/testData'; // Uncomment if helpers/testData.ts exists

test.describe('SpiceJet Flight Search', () => {
  test('should search for flights and print price', async ({ context, page }) => {
    // Grant geolocation permission to avoid browser popup
    await context.grantPermissions(['geolocation'], { origin: 'https://www.spicejet.com' });
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.selectOneWayTrip();
    await homePage.selectFromAirport('MAA');
    await homePage.selectToAirport('DEL');
    await homePage.selectRandomFutureDate(10);
    await homePage.setAdultPassengers(2);
    await homePage.clickSearchFlights();

    const resultsPage = new FlightResultsPage(page);
    await resultsPage.waitForResults();
    const price = await resultsPage.getFirstFlightPrice();
    console.log('First available flight price:', price);
  });
});
