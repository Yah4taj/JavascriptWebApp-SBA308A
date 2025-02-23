import { fetchData, postData } from "./api.js";



document.addEventListener("DOMContentLoaded", async function () {
    const dropdown = document.getElementById('crypto-select');
    const container = document.getElementById('crypto-container');

    let cryptoData = await cryptoData();
    populateDropdown(cryptoData);

    dropdown.addEventListener('change', function () {
        let selectedId = this.value;
        let selectedCrypto = cryptoData.find(crypto => crypto.id === selectedId);
        
        // Log the selected crypto to the console

        if (selectedCrypto) {
            console.log('Selected Crypto:', selectedCrypto);
            displayData(selectedCrypto);
        } else {
            clearData();
        }
    });

    function populateDropdown(cryptoArray) {
        dropdown.innerHTML = '<option value="">-- Choose --</option>';
        cryptoArray.forEach(crypto => {
            let option = document.createElement('option');
            option.value = crypto.id;
            option.textContent = `${crypto.name} (${crypto.symbol})`;
            dropdown.appendChild(option);
        });
    }

    function displayData(crypto) {
        container.innerHTML = `
            <h2>${crypto.name} (${crypto.symbol})</h2>
            <p><strong>Rank:</strong> ${crypto.rank}</p>
            <p><strong>Price (USD):</strong> $${parseFloat(crypto.priceUsd).toFixed(2)}</p>
            <p><strong>Market Cap (USD):</strong> $${parseFloat(crypto.marketCapUsd).toFixed(2)}</p>
            <p><strong>24h Volume (USD):</strong> $${parseFloat(crypto.volumeUsd24Hr).toFixed(2)}</p>
             <p><strong>Change Percent:</strong>${(crypto.changePercent24Hr)}</p>
        `;
        container.style.display = 'block';
    }

    function clearData() {
        container.innerHTML = "";
        container.style.display = 'none';
    }
});
