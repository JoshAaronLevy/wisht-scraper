const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const { fetchProductDetails } = require('./index');

app.use(express.json());

// Enable CORS for all routes (safe for development, review for production)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const details = await fetchProductDetails(url);
    res.json(details);
    console.log('Product details fetched:', details);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch product details' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
