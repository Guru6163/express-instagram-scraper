// routes/portfolio.js
import express from 'express';
const router = express.Router();
import scrapeInstagramProfile from '../lsd-scraper.js';

async function fetchInstagramData(userId, lsd, csrfToken) {
    console.log("Called")
  const fetch = (await import('node-fetch')).default;

  const headers = {
    accept: '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'content-type': 'application/x-www-form-urlencoded',
    priority: 'u=1, i',
    'sec-ch-prefers-color-scheme': 'dark',
    'sec-ch-ua':
      '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-full-version-list':
      '"Google Chrome";v="125.0.6422.78", "Chromium";v="125.0.6422.78", "Not.A/Brand";v="24.0.0.0"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-model': '"Nexus 5"',
    'sec-ch-ua-platform': '"Android"',
    'sec-ch-ua-platform-version': '"6.0"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-asbd-id': '129477',
    'x-csrftoken': csrfToken,
    'x-fb-friendly-name': 'PolarisProfilePostsQuery',
    'x-fb-lsd': lsd,
    'x-ig-app-id': '1217981644879628',
    Referer: 'https://www.instagram.com/guruf.codes/',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  const body = `av=17841406923169464&__d=www&__user=0&__a=1&__req=4&__hs=19867.HYP:instagram_web_pkg.2.1..0.1&dpr=3&__ccg=UNKNOWN&__rev=1013745717&__s=vlcc2s:uejg2t:6sw022&__hsi=7372626254011750282&__dyn=7xe5WwlEnwn8K2Wmm0NonwgU7S6EdF8aUco38w5ux609vCwjE1xoswaq0yE1VohwnU6a3a0EA2C0iK0D830wae4UaEW2G1NwwwNwKwHw8W1uwc-0iS2S3qazo7u1xwIw8O321LwTwKG1pg2Xwr86C1mwrd6goK689UrAwHxW6Uf9EO&__csr=&__comet_req=7&fb_dtsg=NAcOLgAzt5tVZvSTjtU7VqwC_flpJBr8aZP7i0hRM78e2F4oIm_oZHQ:17855905060073950:1715494743&jazoest=26298&lsd=${lsd}&__spin_r=1013745717&__spin_b=trunk&__spin_t=1716573316&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisProfilePostsQuery&variables={"data":{"count":50,"include_relationship_info":true,"latest_besties_reel_media":true,"latest_reel_media":true},"username":"${userId}","__relay_internal__pv__PolarisShareMenurelayprovider":false}&server_timestamps=true&doc_id=7452141388216801`;
  
  const resp = await fetch('https://www.instagram.com/api/graphql', {
    headers,
    body: body,
    method: 'POST',
  });

  const data = await resp.json();
  return data.data.xdt_api__v1__feed__user_timeline_graphql_connection.edges
}

router.get('/portfolio', async (req, res) => {
  try {
    const [xFbLsdValue, CSRFToken, userId] = await scrapeInstagramProfile();
    const posts = await fetchInstagramData(userId, xFbLsdValue, CSRFToken);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
