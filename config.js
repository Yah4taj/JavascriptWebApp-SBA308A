

export const API_KEY = "f1bdd5ed-a9c7-4354-b8c9-a07606b450ae";
export const BASE_URL = "https://api.coincap.io/v2/assets";

export async function getData() {
    try {
        const response = await fetch(BASE_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data; // Returns just the data array
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
}
getData().then(data => console.log(data)).catch(error => console.error(error));