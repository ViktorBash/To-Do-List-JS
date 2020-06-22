// Get some elements from the HTML for the functions later on
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');  // For search functionality

// Load in previous items from localStorage
function loadItems() {
    Object.keys(localStorage).forEach(function (key) {
        let loadedText = localStorage.getItem(key);

        // Create the list element and later on the deleteButton that will be a child of it
        let li = document.createElement('li');
        li.className = 'list-group-item';

        let deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm float-right delete';
        deleteButton.appendChild(document.createTextNode('Delete'));

        // Add it to the itemList to get it onto the HTML
        li.appendChild(document.createTextNode(loadedText));
        li.appendChild(deleteButton);
        itemList.append(li)
    });
}
loadItems();

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem)
// Filter Event
filter.addEventListener('keyup', filterItems);

function addItem(e) {
    e.preventDefault();  // Stop the normal submission of the form from happening

    // Create the list item using the input from the user
    let newItem = document.getElementById('addItem').value;
    let li = document.createElement('li')
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(newItem));

    // Add it to the HTML
    itemList.appendChild(li);

    // Create and add the deleteButton that goes on the list item
    let deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    deleteButton.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteButton)

    // Reset the value in the input field to be blank
    let inputField = document.getElementById('addItem')
    inputField.value = "";

    // Add to local storage for next session
    localStorage.setItem(newItem, newItem)
}

function removeItem(e) {
    if (e.target.classList.contains('delete')){
        let li = e.target.parentElement;
        let textContent = li.firstChild;
        console.log(textContent)
        textContent = textContent.nodeValue;
        console.log("hi:" + textContent)
        localStorage.removeItem(textContent)
        itemList.removeChild(li);
    }
}

function filterItems(e) {
    // Convert all input text to lowercase
    let text = e.target.value.toLowerCase();
    let items = itemList.getElementsByTagName('li');

    // Sorting feature to either show or hide a list item based on if part of it matches the input
    Array.from(items).forEach(function(item) {
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) !== -1 ) {
            item.style.display = 'block';
        }
        else {
            item.style.display = 'none';
        }
    });
}