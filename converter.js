const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';


async function populateCurrencyOptions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const currencyCodes = Object.keys(data.rates);
        const fromCurrency = document.getElementById('fromCurrency');
        const toCurrency = document.getElementById('toCurrency');

        currencyCodes.forEach(code => {
            const option1 = document.createElement('option');
            option1.value = code;
            option1.textContent = code;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = code;
            option2.textContent = code;
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = 'USD';
        toCurrency.value = 'EUR';
    } catch (error) {
        console.error('Error fetching currency codes:', error);
    }
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultField = document.getElementById('result');

    if (!amount || isNaN(amount)) {
        resultField.textContent = 'Please enter a valid amount.';
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
    
        const fromRate = data.rates[fromCurrency];
        const toRate = data.rates[toCurrency];
        const conversionRate = toRate / fromRate;
        const convertedAmount = (amount * conversionRate).toFixed(2);

        resultField.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        resultField.textContent = 'Error fetching conversion rate. Please try again.';
    }
}
document.addEventListener('DOMContentLoaded', populateCurrencyOptions);
