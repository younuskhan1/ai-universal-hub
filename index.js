const loadAiData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const response = await fetch(url);
        const aiTools = await response.json();
        const aiData = aiTools.data.tools;
        displayAiData(aiData);
    }
    catch (error) {
        console.log(error);
    }
}
const displayAiData = (aiData) => {
    const cardContainer = document.getElementById("card-container");
    aiData.forEach(data => {
        console.log(data);
        const cardDiv = document.createElement("div");
        cardDiv.classList = `"w-[30%]"`
        cardDiv.innerHTML = `
        <div><img class = w-"[100%]" src="${data.image ? data.image : "./missing-images/jasper-image.webp"}" alt=""></div>
        
        
        `;
        cardContainer.appendChild(cardDiv);
    })
}


loadAiData();