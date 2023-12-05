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
            <p class="text-[#585858] pl-1"> 3. ${data.features[2] ? data.features[2] : "data is not avilable"}</p>
        </div>
        <div class="flex justify-between items-center pl-4 p-4">
          <div class="text-[13px]">
            <h2 class="font-bold text-lg text-[#111] pb-2">${data.name}</h2>
            <p class="text-[#585858]"><i class="fa-regular fa-calendar-days pr-2"></i>${data.published_in}</P>
          </div>
          <div class="flex justify-center items-center bg-[#FEF7F7] cursor-pointer hover:bg-[#f3a5a5] rounded-full" onClick="showDetailsOfCard('${data.id}')"><i class="fa-solid fa-arrow-right text-[#EB5757] py-[14px] px-[14px] hover:text-white"></i></div>
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
        // dataForSorting is updated from below (eachData.published_in = dataDate;) line.
        // so we get the sorted updated objects here at dataForSorting array of objects. 
        // console.log(dataForSorting);
        // by looping we caught each object existed the array.
        dataForSorting.forEach((eachData) => {
            // console.log(eachData);
            // Split the date by the slash to convert the
            //  date (3/3/2022) into an array of [ '3', '3', '2022' ], for example
            const dateArray = eachData.published_in.split("/");
            // console.log(dateArray);
            // We caught year, month, and day from the array.We subtract 1 from month,
            // because months start counting from 0 in Javascript dates.
            // converting the string into number by parseFloat().
            let day = parseFloat(dateArray[0])
            let month = parseFloat(dateArray[1]) - 1;
            let year = parseFloat(dateArray[2]);
            // console.log(day, month, year);
            // Pass in the different components as year, month, day to get the valid date.
            let dataDate = new Date(year, month, day);
            // console.log(dataDate);
            // Updating the above dataForSorting array objects and pushed the updated year, month and day to 
            //dataForSorting array of objects for sorting out the date
            eachData.published_in = dataDate;
            // console.log(dataForSorting);
            // to know details about above discussion you can go to this below link ....
            // https://hackernoon.com/how-to-sort-an-array-by-date-in-javascript 

        })

        const sortedDate = dataForSorting.sort((a, b) => {
            return (b.published_in) - (a.published_in);
        })
        // console.log(sortedDate.map(data => data.published_in));
        // console.log(sortedDate);
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

const showDetailsContainer = document.getElementById("show-details-container");

const showDetailsOfCard = async (cardId) => {
    // console.log(cardId);
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${cardId}`;
    try {
        const response = await fetch(url);
        const showDetailData = await response.json()
        const data = showDetailData.data;
        displayShowDetailsData(data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayShowDetailsData = (data) => {
    console.log(data);

    showDetailsContainer.innerHTML = `
        <dialog id="my_modal_5" class="modal">
            <div class="modal-box">
                <div class="">
                    <div class="max-w-[420px] h-[400px] m-auto border-[1px] border-[#E7E7E7] rounded-xl p-4">
                        <div class = "w-[100%] h-[60%]"><img class = "w-[100%] h-[100%] rounded-xl" src="${data.image_link[0]}" alt=""></div>
                        <p class="font-bold text-lg py-3 text-center">${data.input_output_examples ? data.input_output_examples[0].input : "no data available"}</P>
                        <p class="text-[#585858] text-center">${data.input_output_examples ? (data.input_output_examples[0].output).slice(0, 99) : "no data available"}</P>
                    </div>
                    <div class="bg-[#FEF7F7] p-4 rounded-xl m-auto max-w-[420px] border-[1px] border-[#EB5757]">
                       <h3 class="font-bold text-lg">${data.description}</h3>
                       <div class="flex justify-evenly gap-2 py-4">
                            <div class="w-[100px] h-[90px] bg-white rounded-2xl flex justify-center items-center"><span class="break-words px-3 text-[#03A30A] font-semibold">${data.pricing ? data.pricing[0].price : "data not avilable"}</span></div>
                            <div class="w-[100px] h-[90px] bg-white rounded-2xl flex justify-center items-center"><span class="break-words px-4 text-[#F28927] font-semibold">${data.pricing ? data.pricing[1].price : "data not avilable"}</span></div>
                            <div class="w-[100px] h-[90px] bg-white rounded-2xl flex justify-center items-center"><span class="break-words px-4 text-[#EB5757] font-semibold">${data.pricing ? data.pricing[2].price : "data not avilable"}</span></div>
                       </div>
                       <div class="flex gap-2 justify-between">
                                <div>
                                    <h1 class="font-bold text-lg"> Features </h1>
                                    <li class="text-[#585858]">${data.features[1].feature_name}</li>
                                    <li class="text-[#585858]">${data.features[2].feature_name}</li>
                                    <li class="text-[#585858]">${data.features[3].feature_name}</li>
                                    <li class="text-[#585858]">${data.features[4] ? data.features[4].feature_name : "no data avilable"}</li>
                                </div>
                                <div>
                                    <h1 class="font-bold text-lg"> Integrations </h1>
                                    <li class="text-[#585858]">${data.integrations ? data.integrations[0] ? data.integrations[0] : "not available" : "no integrations"}</li>
                                    <li class="text-[#585858]">${data.integrations ? data.integrations[1] ? data.integrations[1] : "not available" : "no integrations"}</li>
                                    <li class="text-[#585858]">${data.integrations ? data.integrations[2] ? data.integrations[2] : "not available" : "no integrations"}</li>
                                    <li class="text-[#585858]">${data.integrations ? data.integrations[3] ? data.integrations[3] : "not available" : "no integrations"}</li>
                                    <li class="text-[#585858]">${data.integrations ? data.integrations[4] ? data.integrations[4] : "not available" : "no integrations"}</li>
                                </div>
                        </div>
                    </div>
                     
                </div>   
                <form method="dialog">
                         <div class="flex justify-center pt-4"><button class="btn bg-[#EB5757] outline-none rounded-full hover:bg-[black]"><i class="fa-solid fa-xmark text-white text-xl"></i></button></div>
                </form> 
            </div>
        </dialog>
    `;
    my_modal_5.showModal()
}


loadAiData(true);