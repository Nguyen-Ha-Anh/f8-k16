function TodoApp() {
  const [task, setTask] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  const [editing, setEditing] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  function handleAddTask() {
    //remove trim
    const trimmed = task.trim();

    //if input is empty
    if (!trimmed) return;

    //check if task exists
    const existed = todos.some(
      (todo) => todo.toLowerCase() === trimmed.toLocaleLowerCase()
    );

    if (existed) {
      alert("this task already exists");
      return;
    }
    //add task
    setTodos([...todos, trimmed]);

    //reset input
    setTask("");
  }

  // value input
  function handleInput(e) {
    setTask(e.target.value);
  }

  //remove value
  function handleRemove(index) {
    const newTodos = todos.filter((todo, _index) => _index !== index);
    setTodos(newTodos);
  }

  //edit value
  function handleEdit(index) {
    setEditing(index); // editing
    setEditText(todos[index]); // fill old text into input
  }

  function saveEdit(index) {
    const newTodos = [...todos];
    newTodos[index] = editText.trim();
    setTodos(newTodos);
    setEditing(null);
    setEditText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }

  //UI
  return (
    <div
      className="flex items-center"
      style={{ minHeight: "100vh", backgroundColor: "#8758ff" }}
    >
      <div className="w-[450px] x-[300px] bg-[#1a1a40] p-10 mx-auto rounded-md">
        <h1 className="text-3xl text-[#fff] mb-5 flex justify-center">
          Get Things Done !
        </h1>
        <div className="flex">
          <input
            value={task}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className="
                outline-none
                border
                border-[#8758ff]
                w-full
                px-3
                py-2
                placeholder-gray-500
                text-sm
                text-white"
            type="text"
            placeholder="What is the task today?"
          />
          <button
            className="
                add-task
                bg-[#8758ff]
                w-25
                text-sm
                text-white"
            type="submit"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
        <div className="task mt-5 space-y-3">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="flex bg-[#8758ff] px-3 py-2 text-white rounded-md justify-between items-center"
            >
              {editing === index ? (
                <div className="flex">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="
                outline-none
                border
                border-[#8758ff]
                w-full
                px-3
                py-2
                placeholder-gray-500
                text-sm
                text-white"
                    type="text"
                  />
                  <button
                    className="
                add-task
                bg-[#8758ff]
                w-25
                text-sm
                text-white"
                    type="submit"
                    onClick={() => saveEdit(index)}
                    onKeyDown={handleKeyDown}
                  >
                    Save Edit
                  </button>
                </div>
              ) : (
                <span className="text-white">{todo}</span>
              )}

              {/* action */}
              <div className="flex items-center">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={() => handleEdit(index)}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                    fill="white"
                  />
                </svg>
                <svg
                  className="cursor-pointer ml-2"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="white"
                  onClick={() => handleRemove(index)}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6.52381C3 6.12932 3.32671 5.80952 3.72973 5.80952H8.51787C8.52437 4.9683 8.61554 3.81504 9.45037 3.01668C10.1074 2.38839 11.0081 2 12 2C12.9919 2 13.8926 2.38839 14.5496 3.01668C15.3844 3.81504 15.4756 4.9683 15.4821 5.80952H20.2703C20.6733 5.80952 21 6.12932 21 6.52381C21 6.9183 20.6733 7.2381 20.2703 7.2381H3.72973C3.32671 7.2381 3 6.9183 3 6.52381Z"
                    fill="white"
                  />
                  <path
                    d="M11.6066 22H12.3935C15.101 22 16.4547 22 17.3349 21.1368C18.2151 20.2736 18.3052 18.8576 18.4853 16.0257L18.7448 11.9452C18.8425 10.4086 18.8913 9.64037 18.4498 9.15352C18.0082 8.66667 17.2625 8.66667 15.7712 8.66667H8.22884C6.7375 8.66667 5.99183 8.66667 5.55026 9.15352C5.1087 9.64037 5.15756 10.4086 5.25528 11.9452L5.51479 16.0257C5.69489 18.8576 5.78494 20.2736 6.66513 21.1368C7.54532 22 8.89906 22 11.6066 22Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("todo-list")).render(<TodoApp />);


// check zalo mình phát