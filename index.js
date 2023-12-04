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
    console.log(aiData)
}


loadAiData();