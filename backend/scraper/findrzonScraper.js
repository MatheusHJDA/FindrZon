import axios from 'axios';
import { JSDOM } from 'jsdom';
import { sleep } from '../utils/sleep.js';

/**
 * Scrapes product data from Amazon.com based on a search keyword.
 * @param {string} keyword - The search term to look for.
 * @returns {Promise<Array|Object>} List of product data or an error object.
 */
export async function findrzonScrape(keyword) {
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const requestHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    };

    try {
        // Wait to reduce the chance of being blocked by Amazon
        await sleep(3000);

        const response = await axios.get(searchUrl, { headers: requestHeaders });
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const productCards = document.querySelectorAll('div.s-main-slot > div[data-component-type="s-search-result"]');
        const extractedProducts = [];

        for (let i = 0; i < productCards.length && extractedProducts.length < 15; i++) {
            const product = productCards[i];

            const title = product.querySelector('h2 span')?.textContent?.trim() || 'Title not found';
            const rating = product.querySelector('.a-icon-alt')?.textContent?.trim() || 'Rating not available';
            const reviewCount = product.querySelector('[aria-label*="ratings"]')?.textContent?.trim() || 'No reviews';
            const imageUrl = product.querySelector('img')?.src || 'Image not found';

            extractedProducts.push({
                title,
                rating,
                reviews: reviewCount,
                imageUrl,
                imageLink: `Image Link: ${imageUrl}`,
            });
        }

        return extractedProducts;
    } catch (err) {
        console.error('Scraping failed:', err.message);
        return { error: 'Try again later. Amazon may be blocking access.' };
    }
}