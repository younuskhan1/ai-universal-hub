const loadAiData = async (dataLimit) => {
    showingSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const response = await fetch(url);
        const aiTools = await response.json();
        const aiData = aiTools.data.tools;
        displayAiData(aiData, dataLimit);
    }
    catch (error) {
        console.log(error);
    }
}

const seeMoreContainer = document.getElementById("see-more-container");

const displayAiData = (aiData, dataLimit) => {
    // console.log(aiData);
    // console.log(aiData.map((date) => date.published_in));
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    if (dataLimit && aiData.length > 6) {
        aiData = aiData.slice(0, 6)
        seeMoreContainer.classList.remove("hidden");
    } else {
        seeMoreContainer.classList.add("hidden");
    }
    aiData.forEach(data => {
        // console.log(data);
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
          <div class="text-[13px]">
            <h2 class="font-bold text-lg text-[#111] pb-2">${data.name}</h2>
            <p class="text-[#585858]"><i class="fa-regular fa-calendar-days pr-2"></i>${data.published_in}</P>
          </div>
          <div class="flex justify-center items-center bg-[#FEF7F7] cursor-pointer hover:bg-[#f3a5a5] rounded-full"><i class="fa-solid fa-arrow-right text-[#EB5757] py-[14px] px-[14px] hover:text-white"></i></div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
    })
    showingSpinner(false);
}

const sortedDataByDate = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const dataForSorting = data.data.tools;
        // console.log(dataForSorting);
        dataForSorting.forEach((eachData) => {
            // console.log(eachData);
            const dateArray = eachData.published_in.split("/");
            // console.log(dateArray);
            let day = parseFloat(dateArray[0])
            let month = parseFloat(dateArray[1]) - 1;
            let year = parseFloat(dateArray[2]);
            // console.log(day, month, year);
            let dataDate = new Date(year, month, day);
            // console.log(dataDate);
            eachData.published_in = dataDate;
            // console.log(dataForSorting);

        })

        const sortedDate = dataForSorting.sort((a, b) => {
            return (b.published_in) - (a.published_in);
        })
        // console.log(sortedDate.map(data => data.published_in));
        console.log(sortedDate);
        displayAiData(sortedDate);
    }
    catch (error) {
        console.log(error);
    }
}

const loadingSpinnerContainer = document.getElementById("loading-spinner");

const showingSpinner = (loadingSpinner) => {
    if (loadingSpinner) {
        loadingSpinnerContainer.classList.remove("hidden");
    } else {
        loadingSpinnerContainer.classList.add("hidden");
    }
}
const seeMore = (dataLimit) => {
    loadAiData(dataLimit);
}

loadAiData(true);