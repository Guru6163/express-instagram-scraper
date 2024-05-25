// lsd-scraper.js
import puppeteer from 'puppeteer';

async function scrapeInstagramProfile() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Intercept requests
  await page.setRequestInterception(true);

  let xFbLsdValue;
  let CSRFToken;
  let userId = 'mirrormagicinfo.in';

  page.on('request', interceptedRequest => {
    // Check if it's a GraphQL request
    if (interceptedRequest.url().includes('/graphql')) {
      const xFbLsd = interceptedRequest.headers()['x-fb-lsd'];
      const csrfToken = interceptedRequest.headers()['x-csrftoken'];
      // Assign the value to a variable
      xFbLsdValue = xFbLsd;
      CSRFToken = csrfToken;
    }
  
    // Continue request
    interceptedRequest.continue();
  });

  // Navigate to Instagram profile
  await page.goto(`https://www.instagram.com/${userId}/`);

  // Wait for some time or perform other actions as needed

  // Close the browser
  await browser.close();
  console.log({xFbLsdValue, CSRFToken, userId});
  // Return the value of xFbLsd
  return [xFbLsdValue, CSRFToken, userId];
}

export default scrapeInstagramProfile;
