class Employee {
    constructor(name, age, salary) {
        this.name = name;
        this.age =age;
        this.salary = salary;
    }
    getInfo() {
        console.log(`${this.name} - ${this.age} - ${this.salary}`);
    }
}
class Developer extends Employee {
    constructor(name, age, salary, programmingLanguage) {
        super(name, age, salary);
        this.programmingLanguage = programmingLanguage;
    }
    getInfo() {
        super.getInfo();
        console.log(`${this.programmingLanguage}`);
        
    }
}
class Manager extends Employee {
    constructor(name, age, salary) {
        super(name, age, salary);
        this.employee = []
    }
    addEmployee(employee) {
        this.employee.push(employee)
    }
}
const dev1 = new Developer("John", 28, 5000, "JavaScript");
const dev2 = new Developer("Jane", 30, 5500, "Python");
const manager = new Manager("Alice", 35, 8000);
manager.addEmployee(dev1);
manager.addEmployee(dev2);
manager.getInfo();