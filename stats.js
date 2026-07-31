google.charts.load('current');
google.charts.setOnLoadCallback(loadData);

function loadData() {
    const query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1voX7TObG3X7AZQkPsSCob7XhWxhwJeXrbABtnHVwswc/gviz/tq?gid=0'
    );

    query.send(handleData);
}

function handleData(response) {

    if (response.isError()) {
        alert(response.getMessage());
        return;
    }

    const table = response.getDataTable();

    let adamWins = 0;
    let justinWins = 0;

    const adamChars = {};
    const justinChars = {};

    const adamRecords = {};
    const justinRecords = {};

    const matches = [];

    for (let i = 0; i < table.getNumberOfRows(); i++) {

        const adam = table.getValue(i, 2);
        const justin = table.getValue(i, 3);
        const stocks = table.getValue(i, 4);
        const winner = table.getValue(i, 5);

        matches.push({ adam, justin, stocks, winner });

        if (winner === "Adam")
            adamWins++;
        else
            justinWins++;

        adamChars[adam] = (adamChars[adam] || 0) + 1;
        justinChars[justin] = (justinChars[justin] || 0) + 1;

        if (!adamRecords[adam])
            adamRecords[adam] = { wins: 0, losses: 0 };

        if (!justinRecords[justin])
            justinRecords[justin] = { wins: 0, losses: 0 };

        if (winner === "Adam") {
            adamRecords[adam].wins++;
            justinRecords[justin].losses++;
        } else {
            adamRecords[adam].losses++;
            justinRecords[justin].wins++;
        }
    }

    //----------------------------------
    // Overall Record
    //----------------------------------

    const total = adamWins + justinWins;
    const adamPct = (adamWins / total * 100).toFixed(1);
    const justinPct = (justinWins / total * 100).toFixed(1);

    document.getElementById("overall").innerHTML = `
        <h3>Adam ${adamWins}</h3>
        <div class="bar">
            <div class="adamBar" style="width:${adamPct}%"></div>
        </div>
        ${adamPct}%<br><br>

        <h3>Justin ${justinWins}</h3>
        <div class="bar">
            <div class="justinBar" style="width:${justinPct}%"></div>
        </div>
        ${justinPct}%
    `;

    //----------------------------------
    // Current Streak
    //----------------------------------

    let streakWinner = matches[matches.length - 1].winner;
    let streak = 0;

    for (let i = matches.length - 1; i >= 0; i--) {

        if (matches[i].winner === streakWinner)
            streak++;
        else
            break;

    }

    document.getElementById("streak").innerHTML =
        `<h4>${streakWinner} × ${streak}</h4>`;

    //----------------------------------
    // Most Played
    //----------------------------------

    function topCharacter(chars) {

        let best = "";
        let count = 0;

        for (const c in chars) {

            if (chars[c] > count) {
                count = chars[c];
                best = c;
            }

        }

        return `${best} (${count})`;

    }

    document.getElementById("mains").innerHTML = `
        Adam: ${topCharacter(adamChars)}<br>
        <br>
        Justin: ${topCharacter(justinChars)}
    `;

    //----------------------------------
    // Character Records
    //----------------------------------

    function build(records) {

        let html = "";

        const sorted = Object.keys(records).sort((a, b) => {

            const gamesA = records[a].wins + records[a].losses;
            const gamesB = records[b].wins + records[b].losses;

            return gamesB - gamesA;

        });

        sorted.forEach(char => {

            const wins = records[char].wins;
            const losses = records[char].losses;

            const pct = ((wins / (wins + losses)) * 100).toFixed(0);

            html += `
                <div class="charRow">
                    <span>${char}</span>
                    <span>${wins}-${losses} (${pct}%)</span>
                </div>
            `;

        });

        return html;

    }

    document.getElementById("characterRecords").innerHTML =
        `<h3>Adam</h3>${build(adamRecords)}
         <hr>
         <h3>Justin</h3>${build(justinRecords)}`;

    //----------------------------------
    // Last 10 Matches
    //----------------------------------

    let recentHTML = "";

    matches.slice(-10).reverse().forEach(match => {

        //const icon = match.winner === "Adam" ? "🟢" : "🔴";

        recentHTML += `
            <div class="recentMatch">
                ${match.winner}<br>

                <i>${match.adam} vs ${match.justin}
                (+${match.stocks})</i>
            </div>
        `;

    });

    document.getElementById("recent").innerHTML = recentHTML;

}