

// import { API_KEY,BASE_URL } from "./config";


export async function fetchData() {
    try {
        const response = await fetch(`${BASE_URL}/search?q=${id}`, {
            method: "GET",
            headers: {

                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

export async function postData() {
    try {
        const response = await fetch(`${BASE_URL}/submit`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Post error:", error);
        return null;
    }
}
