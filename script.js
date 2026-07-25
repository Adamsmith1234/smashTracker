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

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://docs.google.com/forms/d/e/1FAIpQLSfRI5Wxk5JSJkgb3LSNR_YsW_5SR9ktL7uFsbv74-FgrExfcw/formResponse";
    form.target = "hidden_iframe";

    const fields = {
        "entry.1339757873": new Date().toLocaleString(),
        "entry.1925487194": document.getElementById("adamChar").value,
        "entry.1218706185": document.getElementById("justinChar").value,
        "entry.308357173": stocks,
        "entry.1698128890": winner
    };

    for (const key in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    form.remove();

    document.getElementById("status").textContent = "✓ Logged";

    setTimeout(() => {
        document.getElementById("status").textContent = "";
    }, 1000);
}