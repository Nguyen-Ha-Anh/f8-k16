//resolve & reject only used promise

// function sayAfter1s(text, callback) {
//     setTimeout(() => {
//         console.log(text);
//         if (callback) callback();
//     }, 1000);
// };

// sayAfter1s('hi', () => {
//     sayAfter1s('im Andy', () => {
//         sayAfter1s('im studying callback');
//     });
// })

// function sum(a, b, callback) {
//     const result = a + b;
//     callback(result);
// }

// //bai 3
// function checkEven(num, callback) {
//     if (num % 2 === 0) {
//         callback('even')
//     } else {
//         callback('odd')
//     }
// }

//bai 4
// function printAfter1s(text, callback) {
//     setTimeout(() => {
//         console.log(text);
//         if (callback) callback();
//     }, 1000);
// }

// printAfter1s('cau 1', () => {
//     printAfter1s('cau 2', () => {
//         printAfter1s('cau 3');
//     });
// })

// //bai 5
// function fetchUser(id, callback) {
//     setTimeout(() => {
//         const data = {
//             id: id,
//             name: 'user' + id
//         };
//         callback(data)
//     }, 1500);
// }

// fetchUser(1, function(user1) {
//     console.log('user 1', user1);
    
//     fetchUser(2, function(user2) {
//         console.log('user 2', user2);
        
//         fetchUser(3, function(user3) {
//             console.log('user 3', user3);
            
//         })
//     })
// })

//PROMISE
function wait1s() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('done')
        }, 1000)
    })
}

wait1s().then(console.log())

wait1s()
  .then(() => console.log("Câu 1"))
  .then(wait1s)
  .then(() => console.log("Câu 2"))
  .then(wait1s)
  .then(() => console.log("Câu 3"));

// bai 1
function printNumber(num, callback) {
    setTimeout(() => {
        console.log(num);
        callback();
    })
}
printNumber(10, () => {
    console.log('done bro');
})

//bai 2
function checkEvenOdd(num, callback) {
    if (num % 2 === 0) {
        callback('even');
    } else {
        callback('odd');
    }
}

checkEvenOdd(7, (result) => {
    console.log('result:', result);
})

// bai 3
function runAfter1s(callback) {
    setTimeout(() => {
        callback();
    }, 1000);
}
runAfter1s(() => console.log('done after 1s'));

//bai 4
function printAfter1s(text, callback) {
    setTimeout(() => {
        console.log(text);
        callback();
    }, 1000)
}

printAfter1s('cau 1', () => {
    printAfter1s('cau 2', () => {
        printAfter1s('cau 3')
    })
})

//bai 5
function wait1s() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('done after 1s')
        }, 1000);
    })
}

wait1s().then(msg => console.log(msg));

//bai 6

function printPromise(text) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(text);
            resolve();
        }, 1000)
    });
}

printPromise('cau1')
    .then(() => printPromise('cau2'))
    .then(() => printPromise('cau3'))

//bai 7
function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age < 18) {
            reject('not old enough');
        } else {
            resolve('old enough');
        }
    });
}
checkAge(16)
    .then(console.log)
    .catch(console.error)

const ids = [1, 3, 4];
for (let i = 0; i < ids.length; i++) {
    const userId = ids[i];
    getUser(userId).then((data) => {
        console.log(data);
    })
}

//THEN
function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({id, name: 'user' + id});
        }, 1000);
    });
}

function getPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({userId, postId: 101, title: 'Post of user' + useId})
        }, 1000);
    });
}
function getComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({postId, commentId: 666, text: 'comment of post' + postId})
        }, 1000);
    });
}
getUser(1)
.then(user => {
    console.log('user:', user);
    return getPosts(user.id);
})
.then(post => {
    console.log('post:', post);
    return getComments(post.postId)
})
.then(comment => {
    console.log('comment:', comment);
})
.catch(err => {
    console.error('error:', err);   
})

//async/await
async function run() {
    try {
        const user = await getUser(1);
        console.log("User:", user);

        const post = await getPosts(user.id);
        console.log("Post:", post);

        const comment = await getComments(post.postId);
        console.log("Comment:", comment);
    } catch (err) {
        console.error("ERROR:", err);
    }
}

run();
