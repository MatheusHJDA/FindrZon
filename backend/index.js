import express from 'express';
import cors from 'cors';
import { findrzonScrape } from './scraper/findrzonScraper.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS to allow requests from the frontend
app.use(cors());

/**
 * GET /api/scrape
 * Example: /api/scrape?keyword=iphone
 * Returns a list of products scraped from Amazon.com
 */

app.get('/api/scrape', async (req, res) => {
    const { keyword } = req.query;

    // Validate query parameter
    if (!keyword) {
        return res.status(400).json({ error: 'Missing required parameter: keyword' });
    }

    try {
        const products = await findrzonScrape(keyword);
        res.json(products);
    } catch (err) {
        console.error('Failed to fetch data:', err.message);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 FindrZon API is running at http://localhost:${PORT}`);
});
