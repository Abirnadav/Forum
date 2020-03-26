'use strict';

const KEY = 'theTodos';

var gPost = _createPosts();
var gFilterBy = 'all';
var gSortBy = 'createdAt';
var gUserName = 'Guest'

function sortPostsForDisplay() {
    gPost.sort(sortBy);

    function sortBy(a, b) {
        console.log(a)
        if (a[gSortBy] > b[gSortBy]) return -1
        if (a[gSortBy] == b[gSortBy]) return 0
        return 1
    }
}

function getPostsForDisplay() {
    if (gFilterBy === 'all') return gPost;
    const posts = gPost.filter(todo =>
        (todo.isDone && gFilterBy === 'done') ||
        (!todo.isDone && gFilterBy === 'active'))
    return posts;
}

function removePost(postId) {
    const idx = gPost.findIndex(post => post.id === postId)
    gPost.splice(idx, 1);
    _savePostsToStorage()
}

function addPost(txt, importance) {
    const post = _createPost(txt, importance);
    gPost.unshift(post);
    _savePostsToStorage()
}

function togglePost(postId) {
    const post = gPost.find(post => post.id === postId)
    post.isDone = !post.isDone;
    _savePostsToStorage()
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function getTotalCount() {
    return gPost.length
}

function getActiveCount() {
    const activeTodos = gPost.filter(post => !post.isDone)
    return activeTodos.length;
}

function _savePostsToStorage() {
    saveToStorage(KEY, gPost)
}

function _createPosts() {
    var posts = loadFromStorage(KEY)
    if (posts && posts.length) return posts;
    posts = [];
    posts.push(_createPost('Im', 2))
    posts.push(_createPost('Not Ready', 1))
    posts.push(_createPost('Yet!', 3))
    saveToStorage(KEY, posts)

    return posts;
}

function _createPost(txt, importance) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: getTime(),
        importance: importance,
    }
}

function makeId(length = 5) {
    var id = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
}

function getTime() {
    var currentdate = new Date();
    var dateTime = '' + currentdate.getDate() + '/' +
        (currentdate.getMonth() + 1) + '/' +
        currentdate.getFullYear() + ' At ' +
        currentdate.getHours() + ':' +
        currentdate.getMinutes() + ':' +
        currentdate.getSeconds();
    console.log(dateTime)
    return dateTime
}