const axios = require('axios');
const cheerio = require('cheerio');

async function fetchProductDetails(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);

    // Get the product name using its ID
    const productName = $('#productTitle').text().trim();

    // Get the first price found in 'a-offscreen' spans
    const price = $('span.a-offscreen').first().text().trim();

    // Try to find the model number, safely handling cases where it might not exist
    const modelNumberHeader = $('th').filter(function () {
      return $(this).text().trim() === 'Item model number';
    }).next('td');

    // If the model number is found, get the text; otherwise, use null
    const modelNumber = modelNumberHeader.length ? modelNumberHeader.text().trim() : null;

    return {
      name: productName,
      price: price,
      modelNumber: modelNumber
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

// Example usage with an Amazon product URL
fetchProductDetails('https://www.amazon.com/dp/B0831N8PWL/')
  .then(details => console.log(details))
  .catch(err => console.error(err));
