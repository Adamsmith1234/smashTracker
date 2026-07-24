const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwytzx24Njel13hSOw7qrEQBDRZL-QBI0hlcA7SDJkXzwElSMAMKx13qZrhm8Q1OCTtow/exec";

console.log("Script loaded");

window.onload = () => {

    populate("adamChar");
    populate("justinChar");

    loadSelections();

};

function populate(id){

    const select = document.getElementById(id);

    characters.forEach(character=>{

        const option=document.createElement("option");

        option.value=character;
        option.textContent=character;

        select.appendChild(option);

    });

    select.onchange=saveSelections;

}

function saveSelections(){

    localStorage.setItem("adamChar",document.getElementById("adamChar").value);
    localStorage.setItem("justinChar",document.getElementById("justinChar").value);

}

function loadSelections(){

    if(localStorage.getItem("adamChar"))
        document.getElementById("adamChar").value=localStorage.getItem("adamChar");

    if(localStorage.getItem("justinChar"))
        document.getElementById("justinChar").value=localStorage.getItem("justinChar");

}

function submitMatch(winner, stocks) {

    const payload = {
        timestamp: new Date().toLocaleString(),
        adamChar: document.getElementById("adamChar").value,
        justinChar: document.getElementById("justinChar").value,
        stocksWonBy: stocks,
        winner: winner
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = WEB_APP_URL;
    form.target = "hidden_iframe";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "data";
    input.value = JSON.stringify(payload);

    form.appendChild(input);
    document.body.appendChild(form);

    form.submit();

    document.getElementById("status").textContent = "✓ Logged";

    setTimeout(() => {
        document.getElementById("status").textContent = "";
        form.remove();
    }, 1000);
}