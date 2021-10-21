// Loads 

// Loads user information and populates the table on window load
window.onload = function() {
    const userInfoURL = "https://jsonplaceholder.typicode.com/users"

    loadUserInfointoTable(userInfoURL, document.querySelector("table"));
}

// Gets user information from a url and loads it into the table defined in the html
async function loadUserInfointoTable(url, table) {
    try{
        const tableBody   = table.querySelector("tbody");

        // Fetch data
        const response = await fetch(url);
        const data     = await response.json();
        console.log(data);

        // Clear the table if it has already been populated
        // todo

        // Populate the body of the table
        for (const user of data) {
            const newRow = document.createElement("tr");

            // Gather an array of relevent user information and append it to the new row 
            const userInfo = [user.name, user.website, user.email, "placeholder"];
            // Should be 4 loops (one for each piece of information)
            userInfo.forEach(function(information) {
                const newCell = document.createElement("td");

                newCell.textContent = information;
                newRow.appendChild(newCell);
            })

            // Add the whole, newly populated row to the table
            tableBody.appendChild(newRow);
        }
    }
    catch (error) {
        console.error(error);
    }
}