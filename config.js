
export const API_KEY = "f1bdd5ed-a9c7-4354-b8c9-a07606b450ae";
export const BASE_URL = "https://api.coincap.io/v2/assets"


async function getData() {
    try {
        let response = await fetch('https://api.coincap.io/v2/assets');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

getData();


    