const axios = require('axios');
const cheerio = require('cheerio');
const { scrapeAmazonProduct } = require('./sites/amazon');

async function fetchProductDetails(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);

    if (url.includes('amazon.com')) {
      return scrapeAmazonProduct($);
    }

  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

fetchProductDetails(productUrl)
  .then(details => console.log(details))
  .catch(err => console.error(err));

module.exports = {
  fetchProductDetails
};
