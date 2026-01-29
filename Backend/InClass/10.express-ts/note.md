# Setup Express Typescript

- express --> simple dependency
- type script --> dev dependency
- ts-node --> dev dependency
- nodemon --> dev dependency
- @types/express --> dev dependency
- @types/node --> dev dependency

# MVCS

1. Route: dinh ngia duong dan, phuong thuc toi controller nao?

GET / --> homeController.index
POST /users --> userController.create
GET /users --> userController.index

Cung 1 nhom thi gom vao 1 controller(khong tuyet doi)
nhieu cai tuong tu nhau se gom vao 1 controller

2. Controller: bo dieu khien trung tam
- Cac chuc nang cung 1 nhom
- Example: Them nguoi dung, sua nguoi dung, xoa nguoi dung --> useController

Example: Can xay dung chuc nang Block User
Tao controller: blockUserController
--> Cac chuc nang phai len quan den 1 doi tuong

3. Middleware:  bo loc trung gian
- Xu ly request, response truoc khi toi controller

- 2 loai chinh: 
+ Global Middleware: Nam truoc route
+ Route Middleware: Nam sau route

4. Service: xu ly logic nghiep vu
- Nhan request tu controller lam viec voi database thong qua Repository or Model (bat buoc phai co 1 trong 2)
- Tra du lieu ve controller

*** Luu y: khong duoc tra ve response trong service

5. Model: Lam viec truc tiep voi database (CRUD)
- Quy dinh ve cau truc, kieu du lieu cua cac truong database 

- Vi du: users
+ id -> number
+ email -> string

- Thuc hien cac truy van don gian (Thong qua thu vien ORM)

6. Repository
- Dung giua service va model
- Xu ly cac logic phuc tap, co su ket hop nhieu bang trong database
- Thuong 1 Repository se lien ket voi 1 model

Example: Lay danh sach 10 users mua nhieu hang nhat 

7. View / Transformer
- Chiu trach nhiem hien thi du lieu cho client (kieu du lieu gi View quyet dinh)



