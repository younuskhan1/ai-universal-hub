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
        <div class="flex justify-between items-center pl-4 p-4">
          <div>
            <h2 class="font-bold text-lg text-[#111]">${data.name}</h2>
            <p class="text-[#585858]"><i class="fa-regular fa-calendar-days pr-2"></i>${data.published_in}</P>
          </div>
          <div class="flex justify-center items-center bg-[#FEF7F7] cursor-pointer hover:bg-[#f3a5a5] rounded-full"><i class="fa-solid fa-arrow-right text-[#EB5757] py-[14px] px-[14px] hover:text-white"></i></div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
    })
}


loadAiData();