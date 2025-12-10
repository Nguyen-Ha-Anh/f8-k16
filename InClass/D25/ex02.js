const linkList = document.querySelectorAll('.menu > li > a');
linkList.forEach((linkEl) => {
    const liEl = linkEl.parentElement;
    const submenuEl = linkEl.nextElementSibling;
    if (submenuEl) {
        liEl.classList.add('has-children');
        linkEl.addEventListener('click' , (e) => {
            //tranh mac dinh the <a> co href 
            e.preventDefault();
            //lay ra cai nao dang mo
            const liActive = document.querySelector('.menu li.active');
            liEl.classList.toggle('active');
            //neu dang mo => dong lai
            if (liActive) {
                liActive.classList.remove('active');
            }
        })
    }    
})