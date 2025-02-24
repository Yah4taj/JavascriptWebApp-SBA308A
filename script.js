import { getData } from './config.js';

document.addEventListener("DOMContentLoaded", async function () {
    const dropdown = document.getElementById('crypto-select');
    const container = document.getElementById('crypto-container');

    try {
        // Fixed: Using `getData()` instead of `fetchData()`
        const cryptoData = await getData();
        populateDropdown(cryptoData);

        dropdown.addEventListener('change', function () {
            let selectedId = this.value;
            let selectedCrypto = cryptoData.find(crypto => crypto.id === selectedId);
            
            if (selectedCrypto) {
                console.log('Selected Crypto:', selectedCrypto);
                displayData(selectedCrypto);
            } else {
                clearData();
            }
        });
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        container.innerHTML = '<p class="error">Error loading cryptocurrency data. Please try again later.</p>';
        container.style.display = 'block';
    }

    function populateDropdown(cryptoArray) {
        dropdown.innerHTML = '<option value="">-- Choose --</option>';
        cryptoArray.sort((a, b) => a.name.localeCompare(b.name)).forEach(crypto => {
            let option = document.createElement('option');
            option.value = crypto.id;
            option.textContent = `${crypto.name} (${crypto.symbol})`;
            dropdown.appendChild(option);
        });
    }

    function formatNumber(value) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(parseFloat(value));
    }

    function displayData(crypto) {
        const changePercent = parseFloat(crypto.changePercent24Hr);
        const changeClass = changePercent >= 0 ? 'positive-change' : 'negative-change';
        const changeSymbol = changePercent >= 0 ? '+' : '';
    
        container.innerHTML = `
            <h2>${crypto.name} (${crypto.symbol})</h2>
            <p><strong>Rank:</strong> ${crypto.rank}</p>
            <p><strong>Price (USD):</strong> $${parseFloat(crypto.priceUsd).toFixed(2)}</p>
            <p><strong>Market Cap (USD):</strong> $${formatNumber(crypto.marketCapUsd)}</p>
            <p><strong>24h Volume (USD):</strong> $${formatNumber(crypto.volumeUsd24Hr)}</p>
            <p><strong>Change Percent (24h):</strong> <span class="${changeClass}">${changeSymbol}${changePercent.toFixed(2)}%</span></p>
        `;
    
        container.style.display = 'block';
    }
    
    function clearData() {
        container.innerHTML = "";
        container.style.display = 'none';
    }
});


