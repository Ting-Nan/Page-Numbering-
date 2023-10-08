const usersPerPage = 10; // users in one page
const userList = document.getElementById("userList");
const pagination = document.getElementById("pagination");
const totalUsers = document.getElementById("totalUsers");
let userData; 


function init() {
    fetch('https://randomuser.me/api/?results=53')
        .then(response => response.json())
        .then(data => {
            userData = data.results; // userData from API's value
            totalUsers.textContent = userData.length;
            showPage(1); 
            generatePagination();
        })
        .catch(error => console.error("Error fetching data: " + error));
}


function showPage(page) {
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const pageData = userData.slice(startIndex, endIndex);
    renderContacts(pageData);
}

function renderContacts(data) {
    userList.innerHTML = ""; 
    data.forEach(user => {
        
        const listItem = document.createElement("li");
        listItem.classList.add("contact-item", "cf");

        // Create the HTML structure of user information, including avatar, name, email, and date of joining
        const userHTML = `
            <div class="contact-details">
                <img class="avatar" src="${user.picture.thumbnail}">
                <h3>${user.name.first} ${user.name.last}</h3>
                <span class="email">${user.email}</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined ${user.registered.date}</span>
            </div>
        `;

        listItem.innerHTML = userHTML;
        userList.appendChild(listItem); // Add user list item to user list
    });
}

// Generate paging buttons
function generatePagination() {
    pagination.innerHTML = ""; // Clear paging button
    const totalPages = Math.ceil(userData.length / usersPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => showPage(i)); // Click the button to switch pages
        pagination.appendChild(pageButton);
    }
}

// Initialization page
init();

