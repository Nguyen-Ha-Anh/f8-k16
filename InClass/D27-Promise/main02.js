//bai 1
function delay2s() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, 2000);
  });
}
delay2s().then((msg) => console.log(msg));
//msg khong can khai bao vi no la tham so cua ham trong then()
// msg chinh la gia tri nhan tu resolve()
//msg chi la ten bien, dat ten gi cung duoc

//bai 2
function checkEvenOdd(num) {
  return new Promise((resolve, reject) => {
    if (num % 2 === 0) {
      resolve("even");
    } else {
      reject("odd");
    }
  });
}

checkEvenOdd(7)
  .then((result) => {
    console.log("result:", result);
  })
  .catch((error) => {
    console.log("error:", error);
  });

//bai 3
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "user" + id,
      });
    }, 1000);
  });
}

getUser(1)
  .then((user1) => {
    console.log(user1);
    return getUser(2);
  })
  .then((user2) => {
    console.log(user2);
    return getUser(3);
  })
  .then((user3) => {
    console.log(user3);
  });

//bai 4
function print(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(text);
      resolve();
    }, 1000);
  });
}
print("cau 1")
  .then(() => print("cau 2"))
  .then(() => print("cau 3"));

//bai 5
function checkScore(score) {
  return new Promise((resolve, reject) => {
    if (score >= 5) {
      resolve("pass");
    } else {
      reject("fail");
    }
  });
}

//cach goi then
checkScore(8)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
checkScore(3)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

//bai 6 - de giong bai 3
async function loadUsers() {
  await loadUsers("cau 1");
  await loadUsers("cau 2");
  await loadUsers("cau 3");
}
loadUsers();

//bai 7 - de giong bai 5
async function testAge() {
    try {
        const msg = await checkAge(16);
        console.log(msg);
    } catch (err) {
        console.error(err);
    }
}
testAge();

//bai 8 - dung promise.all()
function getUser(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({id, name: 'user' + id})
        }, 1000);
    });
}
async function loadUsers() {
    const u1 = await getUser(1);
    console.log(u1);
    
    const u2 = await getUser(1);
    console.log(u2);

    const u3 = await getUser(1);
    console.log(u3);
}
loadUsers();
//bai 9 promise.race()

//bai 10: giai thich tai sap step 3 khong chay
