// Loads 

// Loads user information and populates the table on window load
window.onload = function() {
    const userInfoURL = "https://jsonplaceholder.typicode.com/users";

    loadUserInfointoTable(userInfoURL, document.querySelector("table"));
}

// Gets user information from a url and loads it into the table defined in html
async function loadUserInfointoTable(url, table) {
    try{
        const tableBody = table.querySelector("tbody");

        // Fetch data
        const response = await fetch(url);
        const data     = await response.json();
        //console.log(data);


        // Populate the body of the table
        for (const user of data) {
            let newRow = document.createElement("tr");
            
            // Gather an array of relevent user information and append it to the new row 
            const userInfo = [user.name, user.website, user.email, assembleUserAddress(user)];

            // Appends the relevant information gathered for each user and places it in order
            // into the new row just created.
            // Should be 4 loops (one for each header (name, website, email, address))
            userInfo.forEach(function(information) {
                const newCell = document.createElement("td");

                // Set relevent attributes
                newCell.setAttribute('id', 'name');
                newCell.textContent = information;
                newRow.appendChild(newCell);
            })
            
            // Sets the row ID to 'user' for css
            newRow.setAttribute('id','user');

            // For opening a modal when the row is clicked
            newRow.addEventListener('click', clickRow);

            // Add the whole, newly populated row to the table
            tableBody.appendChild(newRow);
        }
    }
    catch (error) {
        console.error(error);
    }
}

// Concatenates the users' address (street name, city and zipcode) into a single string
function assembleUserAddress(user) {
    return user.address.street + ", " + user.address.city + " " + user.address.zipcode;
}

// Opens a modal with the user's todo information when the row is clicked 
function clickRow() {
    console.log("row clicked");
}
