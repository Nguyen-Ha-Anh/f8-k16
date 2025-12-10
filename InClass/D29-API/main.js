fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    console.log("Danh sách user:", data);
  });

//bai 1
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => res.json())
  .then(user => {
    console.log('user name:', user.name);
    
  })

//bai 2
async function loadUser() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
    const user = await res.json();
    console.log("User 2:", user.name);
}

loadUser();

//THEN
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => {
      console.log("res là gì:", res);
      return res.json();
  })
  .then(data => {
      console.log("data là gì:", data);
  });

  //ASYNC-AWAIT
  async function loadUser() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    console.log("res:", res);

    const data = await res.json();
    console.log("data:", data);
}

loadUser();
