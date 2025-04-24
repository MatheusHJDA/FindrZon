// Elements
const searchButton = document.getElementById('searchBtn');
const newSearchButton = document.getElementById('backBtn');
const keywordInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const loader = document.getElementById('loader');

/**
 * Executes the search when the user clicks "Search" or presses Enter.
 */
searchButton.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
        alert('Please enter a keyword.');
        return;
    }

    // Reset and show loader
    resultsContainer.innerHTML = '';
    loader.style.display = 'block';

    try {
        const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();

        // Error from API
        if (data.error) {
            loader.style.display = 'none';
            resultsContainer.innerHTML = `
        <div class="error-box">
          <p>⚠️ ${data.error}</p>
        </div>
      `;
            return;
        }

        // Display results
        loader.style.display = 'none';
        resultsContainer.innerHTML = '';
        data.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
        <img src="${product.imageUrl}" alt="Product image" />
        <div class="card-content">
          <p><strong>Title:</strong> ${product.title}</p>
          <p><strong>Rating:</strong> ${product.rating}</p>
          <p><strong>Reviews:</strong> ${product.reviews}</p>
          <p><strong>Image Link:</strong> ${product.imageUrl}</p>
        </div>
      `;
            resultsContainer.appendChild(card);
        });

        // Hide input and show "New Search" button
        searchButton.style.display = 'none';
        keywordInput.style.display = 'none';
        newSearchButton.style.display = 'inline-block';

    } catch (error) {
        loader.style.display = 'none';
        resultsContainer.innerHTML = `
      <div class="error-box">
        <p>⚠️ Oops! Something went wrong. Try again later.</p>
      </div>
    `;
    }
});

/**
 * Handles the "← New Search" button
 */
newSearchButton.addEventListener('click', () => {
    resultsContainer.innerHTML = '';
    keywordInput.value = '';
    keywordInput.style.display = 'inline-block';
    searchButton.style.display = 'inline-block';
    newSearchButton.style.display = 'none';
});

/**
 * Pressing Enter triggers the search button
 */
keywordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});
