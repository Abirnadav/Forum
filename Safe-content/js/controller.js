'use strict';



console.log('Todos Starting');
var gImportance = 0;

function onInit() {

    renderPost();


}

function renderPost() {

    var posts = getPostsForDisplay();

    var strHTMLs = posts.map(getPostHTML)

    // console.log('strHTMLs', strHTMLs);
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');

    document.querySelector('.total-todos').innerText = getTotalCount()
    document.querySelector('.active-todos').innerText = getActiveCount()

}

function getPostHTML(todo) {
    const className = (todo.isDone) ? 'done' : '';
    return `<li class="${className} todoBlock" onclick="onToggleTodo('${todo.id}')">
   <span class="userPosted">Posted By: ${gUserName}</span>
    <br/>
    <br/>
           <span class="postTxt">${todo.txt}</span><br/>
            <span class="date">${todo.createdAt}</span>
            <button class="delBtn" onclick="onRemoveTodo(event, '${todo.id}')">x</button> 
        </li>`
}

function onRemovePost(event, todoId) {
    if (gUserName !== 'abir') {
        alert('You are not an Admin')
        return;
    }
    event.stopPropagation();
    if (!confirm('Are You sure?')) return;
    removeTodo(todoId)
    renderPost();
}

function onAddPost() {
    var txt = document.querySelector('#modalInput').value;
    if (txt === '') {
        alert('Oops You must Enter a A Todo!')
        return
    }

    addPost(txt, gImportance)
    renderPost();

}

function onTogglePost(todoId) {
    toggleTodo(todoId)
    renderPost();
}

function onFilterChange(filterBy) {
    // console.log('Filtering by: ', filterBy);
    setFilter(filterBy);
    renderPost();
}


function onSortChange(newSort) {
    gSortBy = newSort
    sortPostsForDisplay()
    renderPost()
}

function toggleLogInModal() {
    var elModalLogIn = document.querySelector('.logInModal')
    elModalLogIn.classList.toggle('hide')
}

function toggleModal() {
    var elModal = document.querySelector('.createPostModal')
    elModal.classList.toggle('hide')
}

function onUserLogIn() {

    var userName = document.querySelector('#userBox').value;
    if (userName === '' || userName !== 'abir') {
        alert('Please Enter a Valid User name!')
        return
    }
    if (userName === 'abir') {

        var pass = document.querySelector('#passwordBox').value;
        if (pass !== '1234') {
            alert('Password does not match!')
            return
        }
        gUserName = userName;



    }

    //check username against password



    renderPost();
    toggleLogInModal()
    var elBtn = document.querySelector('.navbtn')
    elBtn.innerText = 'Log out'
}





/// new

const gUsers = [{
        name: 'abir',
        password: '1234',
        isAdmin: true,
    },
    {
        name: 'nevo',
        password: '1234',
        isAdmin: false,
    },
    {
        name: 'todobom',
        password: '1234',
        isAdmin: true,
    }
]