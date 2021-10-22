// Loads 

// Loads user information and populates the table on window load
window.onload = function() {
    const userInfoURL = "https://jsonplaceholder.typicode.com/users";
    const todoTaskURL = "https://jsonplaceholder.typicode.com/todos";

    loadUserInfointoTable(userInfoURL, document.querySelector("table"));
    loadUserTodoTasks(todoTaskURL);
}

async function loadUserTodoTasks(url) {
    const response = await fetch(url);
    const data     = await response.json();
    // console.log(data);

    const table = document.querySelector('table');
    // -1 to get rid of the header row
    const rowCount = table.getElementsByTagName('tr').length - 1;

    let allUserTasks = new Array(rowCount);
    let userNum = 1;
    let singleUserTasks = [];
    // This loop will sort the incoming todo tasks into an array of arrays. Each inner
    // array will contain lines of incoming information for a single user.
    for (const lineObject of data) {
        if (lineObject.userId !== userNum) {
            userNum++;
            // Add a single user's tasks to all user's tasks
            allUserTasks[userNum - 1] = singleUserTasks;
            singleUserTasks = [];
        }
        singleUserTasks.push(lineObject.title);
    }
    
    // Store allUserTasks in local storage for later use
    for (var i = 0; i < rowCount; i++) {
        localStorage.setItem(i.toString(), allUserTasks[i]);
    }
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

                // Set relevent attributes to the cell
                newCell.textContent = information;
                newRow.appendChild(newCell);
            })
            
            // Sets the row ID to 'user' for css
            newRow.setAttribute('id', 'user');

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
    const modal = document.getElementById("todoTasks")
    var modalContent = document.getElementById("modal content");
    modalContent.textContent = localStorage.getItem(this.rowIndex)
    modal.style.display = "block";   
}

window.onclick = function(event) {
    var modal = document.getElementById("todoTasks");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }