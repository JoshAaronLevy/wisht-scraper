const scrapeAmazonProduct = ($) => {
  const productName = $('#productTitle').text().trim();

  const price = $('span.a-offscreen').first().text().trim();

  const modelNumberHeader = $('th').filter(function () {
    return $(this).text().trim() === 'Item model number';
  }).next('td');

  const modelNumber = modelNumberHeader.length ? modelNumberHeader.text().trim() : null;

  return {
    name: productName,
    price: price,
    modelNumber: modelNumber
  };
};

module.exports = {
  scrapeAmazonProduct
};
