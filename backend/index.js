import express from 'express';
import { findrzonScrape } from './scraper/findrzonScraper.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/scrape', async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required.' });
    }

    const results = await findrzonScrape(keyword);
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`🔍 FindrZon backend running on http://localhost:${PORT}`);
});
