const companyA = [

{ id: 1, name: "Minh", age: 25 },

{ id: 2, name: "An", age: 30 },

{ id: 3, name: "Bình", age: 28 },

{ id: 4, name: "Dũng", age: 25 }

];

const companyB = [

{ id: 5, name: "Bình", age: 32 },

{ id: 6, name: "Chi", age: 28 },

{ id: 7, name: "An", age: 29 },

{ id: 8, name: "Dũng", age: 25 }

];

//cach 1
// const result = [];

// for (let personA of companyA) {
//     const personB = companyB.find(p => p.name === personA.name);

//     if (personB) {
//         result.push({
//             name: personA.name,
//             ageA: personA.age,
//             ageB: personB.age
//         });
//     }
// }
// console.log(result);

//cah 2
// const result = companyA
//   .filter(a => companyB.some(b => b.name === a.name))
//   .map(a => {
//       const b = companyB.find(b => b.name === a.name);
//       return { name: a.name, ageA: a.age, ageB: b.age };
//   });

//bai 1
// const nums = [1, 2, 3, 4, 5];
// for (let num of nums) {
//     if (num % 2 === 0) {
//         console.log('even');
//     } else {
//         console.log('odd');
//     }
// }

// //bai 2
// const words = ['apple', 'banana', 'cat', 'dog'];
// for (let word of words) {
//     if (word.length > 3) {
//         console.log(word);
//     }
// }

// //bai 3
// const users = [
//   { name: "An", age: 20 },
//   { name: "Bình", age: 30 },
//   { name: "Chi", age: 25 }
// ];
// for (let user of users) {
//     if (user.age > 25) {
//         console.log(user.name);
//     }
// }

// //bai 4
// const total = [];

// const a = ["An", "Bình", "Chi"];
// const b = ["Bình", "Dũng", "An"];

// for (let nameA of a) {
//     if (b.includes(nameA)) {
//         total.push(nameA)
//     }
// }

// //bai 5
// for (let personA of a) {
//     const personB = b.find(p => p.name === personA.name)
//     if (personB) {
//         total.push(personA.name)
//     }
// }
// console.log(total);

//bai 1
const nums = [3, 6, 7, 10, 15];
for (let num of nums) {
    if (num > 5) console.log(num);
}

//bai 2 - lay ten bat dau bang chu 'B'
const names = ["An", "Bình", "Chi", "Dũng"];
for (let name of names) {
    if (name.startsWith('B')) {
        console.log(name);
    }
}

//bai 3
const users = [
  { name: "An", age: 17 },
  { name: "Bình", age: 22 },
  { name: "Chi", age: 19 }
];
for (let user of users) {
    if (user.age >= 18) console.log(user);
}

//bai 4 - chi lay ten
for (let user of users) {
    if (user.age >= 18) {
        console.log(user.name);
    }
}


//bai 5
const result = [];

const a = ["An", "Bình", "Chi"];
const b = ["Chi", "Lan", "An"];

for (let nameA of a) {
    if (b.includes(nameA)) {
        result.push(nameA)
    }
}
console.log(result);

//bai 6
const total = [];

const c = [
  { name: "An" },
  { name: "Bình" },
  { name: "Chi" }
];

const d = [
  { name: "Chi" },
  { name: "An" }
];
for (let personC of c) {
    const personD = d.find(p => p.name === personC.name)

    if (personD) {
        total.push(personC)
    }
}
console.log(total);

// them from khi in ra
// if (personD) {
//     total.push({
//         name: personC.name,
//         from: "A"
//     });
// }

//bai 1
const numbers = [4, 9, 12, 15, 20];
for (let number of numbers) {
    if (number % 4 === 0) console.log(number);
}

//bai 2
const words = ["dog", "elephant", "cat", "tiger"];
for (let word of words) {
    if (word.length > 3 && word.includes('e')) {
        console.log(word);
    }
}

//bai 3
const students = [
  { name: "Lan", score: 8 },
  { name: "Minh", score: 4 },
  { name: "An", score: 6 }
];
for (let student of students) {
    if (student.score >= 5) {
        console.log(student);
    }
}

//bai 4 - lay danh sach name xuat hien o ca 2 team
// const teamA = [
//   { id: 1, name: "Lan" },
//   { id: 2, name: "Minh" },
//   { id: 3, name: "An" }
// ];

// const teamB = [
//   { id: 4, name: "An" },
//   { id: 5, name: "Lan" }
// ];
// const resultName = [];

// for (let personA of teamA) {
//     const found = teamB.find(n => n.name === nameA.name)

//     if (found) {
//         resultName.push(personA.name);
//     }
// }
// console.log(resultName);


