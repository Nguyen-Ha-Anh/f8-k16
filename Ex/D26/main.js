const items = document.querySelectorAll('.items');
const menu = document.getElementsByClassName('context-menu');

let currentItem = null;

document.addEventListener('context-menu', function(e) {
    e.preventDefault();
})

items.forEach(item => {
    item.addEventListener('contextmenu', function(e) {
        currentItem = item;

        menu.style.display = 'block';
        menu.style.left = e.pageX + 'px';
        menu.style.top = e.pageY + 'px';
    })
});

document.addEventListener('click', function(e) {
    if (!menu.contains(e.target)) {
        menu.style.display = 'none'
    }
});

// document.getElementsByClassName('renameBtn').addEventListener('click' , () => {
//     const span = currentItem.querySelector('span');
//     const newName = 
// })

document.getElementById("deleteBtn").addEventListener("click", () => {
    currentItem.remove();
    menu.style.display = "none";
});