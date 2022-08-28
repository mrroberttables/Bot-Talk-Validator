function populateStatsTable(stats) {
    let table = document.getElementById('statsBody');
    table.innerHTML = '';

    for(var i = 0; i < Object.keys(Difficulty).length; i++) {
        let row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = DifficultyNames[i];
        var cell2 = row.insertCell(1);
        cell2.innerHTML = stats.getGamesPlayed(i);
        var cell3 = row.insertCell(2);
        cell3.innerHTML = stats.getGamesWon(i);
        var cell3 = row.insertCell(3);
        cell3.innerHTML = secondsToTime(stats.getBestTime(i));
    }
    // <tr>
    //     <td>Beginner</td>
    //     <td id="beginnerPlayed"></td>
    //     <td id="beginnerWon"></td>
    //     <td id="beginnerBest"></td>
    // </tr>
}

function secondsToTime(sec) {
    if(sec != null) {
        let minutes = Math.floor(sec / 60);
        let seconds = (sec % 60).toString().padStart(2,'0');;

        return minutes + ":" + seconds;
    }

    return '--';
    
}

function remove(array, value) {
    return array.filter(function(val) { return value !== val});
}