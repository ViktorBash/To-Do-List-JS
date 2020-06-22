var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');  // For search functionality

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem)
// Filter Event
filter.addEventListener('keyup', filterItems);

function addItem(e) {
    e.preventDefault();  // Stop the normal submission of the form from happening

    // Get input value
    var newItem = document.getElementById('addItem').value;
    // Create new li element
    var li = document.createElement('li')
    // Add class to li element
    li.className = "list-group-item";
    // Add text node with input value
    li.appendChild(document.createTextNode(newItem));

    itemList.appendChild(li);

    // Create del button element
    var deleteButton = document.createElement('button');
    // Add classes to button
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    // Append text node
    deleteButton.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteButton)

    // Reset the value in the input field
    var inputField = document.getElementById('addItem')
    inputField.value = "";

}

function removeItem(e) {
    if (e.target.classList.contains('delete')){
        var li = e.target.parentElement;
        itemList.removeChild(li);
    }

}

function filterItems(e) {
    // Convert all text to lowercase
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

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