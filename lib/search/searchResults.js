function searchResults(objectArray) {
    document.getElementById("searchResults").innerHTML = '';//clear everything first
    //css style edits are temporary, will be moved to a dedicated style file
    document.getElementById("searchResults").style.cssText = 'height:15rem;width:70rem;overflow-y:scroll;background-color:rgb(204, 204, 204)';

    //create table and table body
    var searchResultsDiv = document.createElement("table");
    var tableBody = document.createElement("tbody");
    tableBody.style.cssText = 'text-indent:2rem';// Temporary styling
    searchResultsDiv.appendChild(tableBody);

    //id, opening, rated, speed, status, variant, winner--------------------------------------------------
    function createHeader(string) {
        var tableHeader = document.createElement("th");
        tableHeader.innerHTML = string;
        tableBody.appendChild(tableHeader);
    }
    createHeader("Date");
    createHeader("OPENING");
    createHeader("BLACK");
    createHeader("WHITE");
    createHeader("SPEED");
    createHeader("WINNER");
    createHeader("ADD");
    if (objectArray) {
        //insert Data--------------------------------------------------------------------------------------
        function insertData(object) {
            var tableRow = document.createElement("tr");
            //tr.setAttribute('data-PGN', object.moves); //sets hidden variable with pgn
            tableBody.appendChild(tableRow);
            var dateobj = new Date(object.createdAt);
            var date = (dateobj.getMonth() + 1) + "/" + dateobj.getDate() + "/" + dateobj.getFullYear();

            var dataArray = [date, object.opening.name, object.players.black.user.name, object.players.white.user.name, object.speed, object.winner];
            for (var i in dataArray) {
                var tableData = document.createElement("td");
                tableData.innerHTML = dataArray[i];
                tableRow.appendChild(tableData);
            }
            let createButton = document.createElement('td');
            createButton.innerHTML = '<button class="button">Add</button>';
            createButton.onclick = () => createBoard(object.moves);
            tableRow.appendChild(createButton);
        }
        //Insert everysingle data in objectArray
        for (var i in objectArray) {
            insertData(objectArray[i]);
        }
    }
    document.getElementById("searchResults").appendChild(searchResultsDiv);
}
