import axios from 'axios';
import { JSDOM } from 'jsdom';
import { sleep } from '../utils/sleep.js';

export async function findrzonScrape(keyword) {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    };

    try {
        await sleep(3000); // delay para evitar bloqueios

        const response = await axios.get(url, { headers });
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const productElements = document.querySelectorAll('div.s-main-slot > div[data-component-type="s-search-result"]');
        const results = [];

        for (let i = 0; i < productElements.length && results.length < 15; i++) {
            const el = productElements[i];

            const title = el.querySelector('h2 span')?.textContent?.trim() || 'Title not found';
            const rating = el.querySelector('.a-icon-alt')?.textContent?.trim() || 'Rating not available';
            const reviews = el.querySelector('[aria-label*="ratings"]')?.textContent?.trim() || 'No reviews';
            const imageUrl = el.querySelector('img')?.src || 'Image not found';

            results.push({ title, rating, reviews, imageUrl, imageLink: `Image Link: ${imageUrl}` });
        }

        return results;
    } catch (error) {
        console.error('Scraping error:', error.message);
        return { error: 'Try again later. Amazon may be blocking access.' };
    }
}
