document.addEventListener('DOMContentLoaded', function() {
    const newItemInput = document.getElementById('new-item');
    const addItemButton = document.getElementById('add-item');
    const itemsList = document.getElementById('items');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Saving...';
    loadingIndicator.style.display = 'none';
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    loadingIndicator.style.padding = '10px';
    loadingIndicator.style.borderRadius = '5px';
    loadingIndicator.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    document.body.appendChild(loadingIndicator);

    loadItems();

    addItemButton.addEventListener('click', addItem);
    itemsList.addEventListener('click', handleItemClick);

    function addItem() {
        const itemText = newItemInput.value.trim();
        if (itemText === '') {
            alert('Please enter an item.');
            return;
        }
        const item = createItemElement(itemText);
        itemsList.appendChild(item);
        saveItems();
        newItemInput.value = '';
    }

    function handleItemClick(event) {
        const li = event.target.closest('li');
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            const checkbox = event.target;
            li.classList.toggle('completed', checkbox.checked);
            updateCompletedTasksCount();
            showLoadingIndicator();
            saveItems();
            document.dispatchEvent(new Event('updateAchievements'));
        }
    }

    function createItemElement(text) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input', 'me-2');
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(text));
        
        const deleteSpan = document.createElement('span');
        deleteSpan.textContent = 'Delete';
        deleteSpan.classList.add('badge', 'bg-danger', 'ms-2');
        deleteSpan.style.cursor = 'pointer';
        deleteSpan.addEventListener('click', () => {
            li.remove();
            saveItems();
        });
        li.appendChild(deleteSpan);

        return li;
    }

    function updateCompletedTasksCount() {
        const completedTasks = getCompletedTasksCount();
        localStorage.setItem('completedTasks', completedTasks);
    }

    function getCompletedTasksCount() {
        const items = JSON.parse(localStorage.getItem('todo-items')) || [];
        return items.filter(item => item.completed).length;
    }

    function showLoadingIndicator() {
        loadingIndicator.style.display = 'block';
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
        }, 1000);
    }

    function loadItems() {
        const items = JSON.parse(localStorage.getItem('todo-items')) || [];
        items.forEach(item => {
            const itemElement = createItemElement(item.text);
            itemElement.querySelector('input').checked = item.completed;
            itemsList.appendChild(itemElement);
        });
    }

    function saveItems() {
        const items = [];
        itemsList.querySelectorAll('li').forEach(li => {
            const checkbox = li.querySelector('input');
            items.push({
                text: li.childNodes[1].textContent.trim(),
                completed: checkbox.checked
            });
        });
        localStorage.setItem('todo-items', JSON.stringify(items));
    }
});
