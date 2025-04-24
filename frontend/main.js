const searchBtn = document.getElementById('searchBtn');
const backBtn = document.getElementById('backBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
    const keyword = searchInput.value.trim();
    if (!keyword) return alert('Please enter a keyword.');

    resultsDiv.innerHTML = '';
    document.getElementById('loader').style.display = 'block';

    try {
        const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();

        if (data.error) {
            resultsDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
            return;
        }

        resultsDiv.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
        <img src="${item.imageUrl}" alt="Product image" />
        <div class="card-content">
          <p><strong>Title:</strong> ${item.title}</p>
          <p><strong>Rating:</strong> ${item.rating}</p>
          <p><strong>Reviews:</strong> ${item.reviews}</p>
          <p><strong>Image Link:</strong> ${item.imageUrl}</p>
        </div>
      `;
            resultsDiv.appendChild(card);
        });

        document.getElementById('loader').style.display = 'none';

        backBtn.style.display = 'inline-block';
        searchInput.style.display = 'none';
        searchBtn.style.display = 'none';

    } catch (err) {
        document.getElementById('loader').style.display = 'none';
        resultsDiv.innerHTML = `
            <div class="error-box">
             <p>⚠️ Oops! Something went wrong. Try again later.</p>
            </div>
        `;
    }

});

backBtn.addEventListener('click', () => {
    resultsDiv.innerHTML = '';
    searchInput.value = '';
    searchInput.style.display = 'inline-block';
    searchBtn.style.display = 'inline-block';
    backBtn.style.display = 'none';
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});