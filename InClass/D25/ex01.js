const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');

next.addEventListener('click' , () => {
    const itemActive = document.querySelector('.products .active');
    const nextEl = itemActive.nextElementSibling;
    if(nextEl) {
        itemActive.classList.remove('active');
        nextEl.classList.add('active');
    } else {
        itemActive.classList.remove('active')
        const firstItem = document.querySelector('.products h2:first-child');
        firstItem.classList.add('active');
    }
})

prev.addEventListener('click', () => {
    const itemActive = document.querySelector('.products .active');
    const prevEl = itemActive.previousElementSibling;
    if (prevEl) {
        itemActive.classList.remove('active');
        prevEl.classList.add('active');
    } else {
        itemActive.classList.remove('active');

        const lastItem = document.querySelector('.products h2:last-child');
        lastItem.classList.add('active');
    }
})