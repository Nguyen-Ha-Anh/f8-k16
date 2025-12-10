const BASE_URl =`https://dummyjson.com`;
const postListEl = document.querySelector('.js-post-list');

const fetchPosts = async () => {
    const response = await fetch(`${BASE_URl}/posts`);
    const posts = await response.json();
    console.log(posts);
    
}
fetchPosts();


