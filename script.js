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

async function submitMatch(winner,stocks){

    document.querySelectorAll("button").forEach(b=>b.disabled=true);

    const payload={

        timestamp:new Date().toLocaleString(),

        adamChar:document.getElementById("adamChar").value,

        justinChar:document.getElementById("justinChar").value,

        stocksWonBy:stocks,

        winner:winner

    };

    try{

        await fetch(WEB_APP_URL,{

            method:"POST",

            body:JSON.stringify(payload)

        });

        document.getElementById("status").textContent="✓ Logged";

        setTimeout(()=>{

            document.getElementById("status").textContent="";

        },1200);

    }

    catch{

        document.getElementById("status").textContent="❌ Upload Failed";

    }

    document.querySelectorAll("button").forEach(b=>b.disabled=false);

}