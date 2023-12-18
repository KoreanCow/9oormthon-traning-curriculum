const list = document.getElementById('list');
const createBtn = document.getElementById('create_btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새 아이템 객체 생성
    const item = {
        id: new Date().getTime(), 
        text: '', 
        complete: false
    }

    // 배열 처음에 새 아이템 추가
    todos.unshift(item);
    
    // 요소 생성하기
    const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

    // 리스트 요소 안에 방금 생성한 아이템 요소 추가 
    list.prepend(itemEl);
    
    inputEl.removeAttribute('disabled');
    inputEl.focus();
    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const acticonsEl = document.createElement('div');
    acticonsEl.classList.add('acticons');

    const editBtnEl = document.createElement('button');
    editBtnEl.innerText = 'Edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('remove_btn');
    removeBtnEl.innerText = 'Remove';
 
    
    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        inputEl.style.backgroundColor = 'lightgreen';
            
        }else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    });

    inputEl.addEventListener('blur',() => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    });

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
        saveToLocalStorage();
    });

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    });

    acticonsEl.append(editBtnEl);
    acticonsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(acticonsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);

    localStorage.setItem('my_todos', data);
};

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if(data) {
        todos = JSON.parse(data);
    }
}

function displatTodos() {
    loadFromLocalStorage();

    for( let i = 0; i < todos.length; i++ ) {
        const item = todos[i];
        const { itemEl } =  createTodoElement(item);

        list.appendChild(itemEl);
    }
}

displatTodos();