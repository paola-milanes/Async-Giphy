
// require('dotenv').config();
const API_KEY = 'cxHKI5zTdxg2EaeLMe0PHCP6rJeIXcNU';
async function getImages(query) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en`;
    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.data.length);
            const randomImageUrl = data.data[randomIndex].images.original.url;
            console.log("Random Image URL:", randomImageUrl);

            const allImageUrls = data.data.map(gif => gif.images.original.url);
            console.log("All Image URLs:", allImageUrls);
            return allImageUrls;
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const query = document.getElementById('queryInput').value;
    const images = await getImages(query);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    
    images.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'GIF';
        resultsDiv.appendChild(img);
    });
}); 
// async function helperFunction() {
//     const images = await getImages("dogs");
//     console.log("Retrieved images:", images);
// }

// helperFunction();


console.log(process.env.API_KEY)