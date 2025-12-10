//bai1
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothing", price: 40 },
  { id: 4, name: "Shoes", category: "Clothing", price: 60 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
];
//1
const filterProducts = products.filter(product => product.category === 'Electronics');
console.log(filterProducts);
//2
const sumProducts = filterProducts.reduce((sum, product) => sum + product.price, 0);
console.log(sumProducts);
//3 
const productByCategory = products.reduce((result, product) => {
  if (!result[product.category]) {
    result[product.category] = [];
  }
  result[product.category].push(product);
  
  return result;
}, {});

//bai2
const students = [
  { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
  { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
  { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
];
//1
const avgScores = students.map(student => {
  const scores = Object.values(student.scores);
  const avg = scores.reduce((acc, cur) => acc + cur, 0) / scores.length;
  return Object.assign({}, student), {avg}
})
console.log(avgScores);
//2
const topStudent = avgScores.reduce((max, student) => student.avg > max.avg ? student : max);
console.log(topStudent);
//3
const sortAvgStudent = avgScores.sort((a, b) => b.avg - a.avg);
console.log(sortAvgStudent);

//bai3
const orders = [
  {
    orderId: 101,
    customer: "John",
    items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  },
  {
    orderId: 102,
    customer: "Alice",
    items: [
      { name: "Phone", price: 500, quantity: 2 },
      { name: "Charger", price: 50, quantity: 3 },
    ],
  },
  {
    orderId: 103,
    customer: "Bob",
    items: [{ name: "Headphones", price: 200, quantity: 2 }],
  },
];
//1
const totalOrder = orders.map(order => {
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {...order, total};
})
console.log(totalOrder);
//2
const topOrder = totalOrder.reduce((max, order) => order.total > max.total ? order : max);
console.log(topOrder);
//3
const getOrders = orders
  .flatMap(order => order.items)
  .reduce((result , item) => {
    if (!result[item.name]) {
      result[item.name] = {name: item.name, quantity: item.quantity};
    } else {
      result[item.name].quantity += item.quantity;
    }
    return result;
  }, {})
  console.log(getOrders);
  
//bai4
const employees = [
  { id: 1, name: "Mai", department: "IT", salary: 1200 },
  { id: 2, name: "Nam", department: "HR", salary: 800 },
  { id: 3, name: "Hà", department: "IT", salary: 1500 },
  { id: 4, name: "Linh", department: "Marketing", salary: 900 },
  { id: 5, name: "Phúc", department: "IT", salary: 1100 },
];
//1
const sumDepartments = employees.reduce((result, emp) => {
  // neu chua co phong ban => tao phong ban va gan luong dau tien
  if (!result[emp.department]) {
    result[emp.department] = emp.salary;
  } else {
    // neu da co phong ban => cong them luong
    result[emp.department] += emp.salary;
  }
  // tra ve ket qua sau moi vong lap
  return result
}, {})

//2
const highestSalary = employees.reduce((result, emp) => {
  //neu chua co, gan luon nhan vien dau tien la nhan vien cao nhat
  if (!result[emp.department]) {
    result[emp.department] = emp;
  } else if (emp.salary > result[emp.department].salary) {
    result[emp.department] = emp; // thay doi khi luong cao hon
  }
  return result;
}, {});

//3
const employeeByDept = employees.reduce((result, emp) => {
  if (!result[emp.department]) {
    result[emp.department] = [emp]; //tao mang lan dau
  } else {
    result[emp.department].push(emp); //push them nhan vien
  }
  return result;
})

const watchHistory = [
  { userId: 1, videoId: "A1", duration: 10 },
  { userId: 2, videoId: "B1", duration: 15 },
  { userId: 1, videoId: "A1", duration: 20 },
  { userId: 3, videoId: "C1", duration: 30 },
  { userId: 2, videoId: "B1", duration: 5 },
  { userId: 1, videoId: "A2", duration: 25 },
  { userId: 3, videoId: "C1", duration: 15 },
];
//1
const totalDuration = watchHistory.reduce((result, item) => {
  if (!result[item.videoId]) {
    result[item.videoId] = item.duration;
  } else {
    result[item.videoId] += item.duration;
  }
  return result
}, {})
console.log(totalDuration);
