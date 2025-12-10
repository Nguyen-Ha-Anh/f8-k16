const container = ReactDOM.createRoot(document.querySelector("#root"));

// const h1 = React.createElement(
//   "h1",
//   {
//     id: "title",
//     className: "title",
//     onClick: () => {
//       console.log("ok");
//     },
//   },
//   "F8 - hoc react khong kho"
// );
// container.render(h1);

// const h2 = React.createElement("h2", null, "REACT");

// const div = React.createElement('div', null, h1, h2);

// const wrapper = React.createElement(React.Fragment, null, h1, h2);
const title = <h2>hello anh em</h2>;
const classA = "class-a";
const check = false;
const isAuth = false;
const id = 1;
// const wrapper =
// <>
//     <a href={`https://fullstack.edu.vn/khoa-hoc/${id}`}></a>
//     <h1
//     className="title"
//     style={
//         {
//             color: 'red',
//             background: 'blue',
//         }
//     }>F8 - Hoc React khong kho</h1>
//     <h2 className={check ? classA : 'acb'}>Hello ae</h2>
//     {title}
//     <button
//     onClick={() => {
//         console.log('clicked');

//     }}>Click me!</button>
// </>;

const todos = [
  {
    id: 1,
    title: "Todo 1",
  },
  {
    id: 2,
    title: "Todo 2",
  },
];
const myArr = todos.map((todo) => (
  <h1 key={todo.id}>
    {todo.title} <button onClick={() => handleRemove(todo.id)}>x</button>
  </h1>
));
const handleClick = () => {
  console.log("clicked");
};
const handleRemove = (id) => {
  console.log(id);
};

const User = ({ name, email }) => {
  // console.log(name);
  return (
    <div>
      <h2>Nguoi dung: {name}</h2>
      <h2>Email: {email ?? "empty"}</h2>
    </div>
  );
};

const Product = (props) => {
  return (
    <div>
      <h2>Product </h2>
      {props.children}
    </div>
  );
};

const Counter = () => {
  //Trang thai (State) : the hien du lieu trong 1 component
  //Khi trang thai thay doi --> component se tu dong thay doi
  // kich hoat goi lai (re-render)
  //de quan ly trang thai => dung ham React.useState()
  // Goi la hook (ham nao co use deu la hook)
  //Cu phap: const [tenState, hamThayDoiState] = React.useState(giatrimacdinh)
  const [count, setCount] = React.useState(0);
  const [msg, setMsg] = React.useState("");
  const [news, setNews] = React.useState("");
  const [data, setData] = React.useState([]);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleInput = (e) => {
    setMsg(e.target.value);
  };
  const handleClickBtn = () => {
    if (!msg) {
      setNews("enter please");
    } else {
      setNews("");
      setData((prev) => [...prev, msg]);
      setMsg("");
    }
  };
  const handleDelete = (index) => {
    console.log(index);

    setData(data.filter((item, _index) => _index !== index));
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <input onChange={handleInput} placeholder="Enter something.."></input>
      <button onClick={handleClickBtn}>Add</button>
      {news && <span style={{ color: "red" }}>{news}</span>}
      <div>Value: {msg}</div>
      <ul>
        {data.map((item, index) => {
          return (
            <li key={index}>
              {item}{" "}
              <button
                onClick={(e) => {
                  handleDelete(index);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

//event handler --> mac dinh se co event object
// const handleChange = (e) => {
//   console.log(e.target.value);
// };

const wrapper = (
  <>
    <div>
      <Counter />
    </div>
    {/* <User name="Anh An"  email='admin@gmail.com'/>
    <User name="Anh Son" />
    <Product>
        <h3>Product 1</h3>
        <h3>Product 2</h3>
    </Product>
    <div>{myArr}</div>
    <input onChange={handleChange}></input>
    <button onClick={handleClick}>Click me</button> */}
  </>
);
container.render(wrapper);

//fragment
//JSX = JavaScript XML (browser khong hieu)
//Javascript Compiler (Babel, SWC,..)
//React: JSX --> React Element --> React Dom --> Browser
