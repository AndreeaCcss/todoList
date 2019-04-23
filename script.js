var ul = document.getElementById('list');
var li;

var addButton = document.getElementById('add');
addButton.addEventListener('click', addItem)

var removeButton = document.getElementById('remove');
removeButton.addEventListener('click', removeItem)

function addItem () {
    var input = document.getElementById('input');
    var item = input.value;

    ul = document.getElementById("list");
    var textnode = document.createTextNode(item)

    if(item === "") {
        return false;
        // add a p tag- value : enter your todo
    
    } else {
        //create li
        li = document.createElement('li');
        li.setAttribute('class', 'items');

        var id = nextId();
        li.setAttribute('id', id);
        // create checkbox
        var checkbox =  document.createElement('input')
        // assign a type to element - li -  by calling .type
        checkbox.type = "checkbox";
        // assign id or class and then the value that you wish to assign
        checkbox.setAttribute('id', 'check');

        // create label
        var label = document.createElement('label');
        // add  properties to label
        label.setAttribute('for', 'item')//optional
        // add these elements to webpage
        // we use the ul and we append child
        //  ul.appendChild(label);
        li.appendChild(checkbox);
        label.appendChild(textnode);
        li.appendChild(label);
        // check this out
        ul.insertBefore(li, ul.childNodes[0]);
        
        setTimeout(() => {
            li.className = 'visual'
        }, 2);
         
        addToStorage(id, input.value);
        input.value = '';
    }
};

// remove elements from page and local storage 
function removeItem(){
    li = ul.children;
    for(let index = 0; index < li.length; index++){
        // 0 because the first child od an li is input
        // the specific li is selected with index but you also have to make sure the input tag is checked
        while(li[index] && li[index].children[0].checked) {
            console.log(li[index].children[0])
            removeFromLocalStorage(li[index].id);
            ul.removeChild(li[index]);
        }
    }
};

// store todos in local storage

function addToStorage(id, lastInput){
    // parse in case there's something in localStorage
    var data = JSON.parse(localStorage.getItem('todoList') || "[]");
    data.push({ id: id, value: lastInput });
    localStorage.setItem('todoList', JSON.stringify(data));
};

function removeFromLocalStorage(id) {
    var data = JSON.parse(localStorage.getItem('todoList') || "[]");
    // remove
    data.forEach(function(obj) {
     //   console.log(obj.id);
        if(obj.id == parseInt(id)) {
            let index = data.indexOf(obj);
            data.splice(index, 1);
        }
    });

    localStorage.setItem('todoList', JSON.stringify(data));
}

function nextId(){
    // get last id 
    // if its empty 
    var data = parseInt(localStorage.getItem('counter') || '0') ;
    // issues a new one
    localStorage.setItem('counter', data + 1);
     // returns it
    return data;
}


