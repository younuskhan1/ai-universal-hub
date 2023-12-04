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
        cardDiv.classList = `p-4 border border-[rgba(17, 17, 17, 0.10)] rounded-[12px]`;
        cardDiv.innerHTML = `
        <div class="h-[250px]"><img class = "w-[100%] h-[100%] rounded-xl" src="${data.image}" alt=""></div>
        <div class="pl-4 mt-4 border-b-2 pb-4">
            <h3 class="font-bold text-lg text-[#111]">Features :</h3>
            <p class="text-[#585858] pl-1"> 1. ${data.features[0]}</p>
            <p class="text-[#585858] pl-1"> 2. ${data.features[1]}</p>
            <p class="text-[#585858] pl-1"> 3. ${data.features[2]}</p>
        </div>
        <div>
         <h2>${data.name}</h2>
        </div>
        
        `;
        cardContainer.appendChild(cardDiv);
    })
}


loadAiData();