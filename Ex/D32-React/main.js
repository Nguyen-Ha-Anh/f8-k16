// //bai 4
// function Number() {
//     const [numbers, setNumbers] = React.useState('');
//     //mang chua cac so de hien thi
//     const [value, setValue] = React.useState([]);
//     //ham xu ly
//     function addNumbers() {
//         if (numbers === '') return; //input rong thi khong them


//         setValue(prev => [...prev, Number(numbers)]) //them so vao mang
//         setNumbers(''); // clear input
//     }
//     return (
//         <div>
//             <input
//             value={numbers}
//             type="number"
//             onChange={(e) => setNumbers(e.target.value)}
//             />
//             <button onClick={addNumbers}>Add</button>
//             <div>
//                 {/* fill len giao dien */}
//                 {value.map((num, index) => (
//                     <p key={index}>{num}</p>
//                 ))}
//             </div>
//         </div>
//     )
// }

// ReactDOM.createRoot(document.querySelector('#root')).render(<Number/>);

function Test() {
    const [names, setNames] = React.useState(['A', 'B', 'C']);
    const [nameInput, setNameInput] = React.useState('');

    function handleAdd() {
        if (nameInput.trim() === '') return;

        setNames(prev => [...prev, nameInput]);
        setNameInput('');
    }

    function handleRemove(index) {
        setNames(prev => prev.filter((item, _index) => _index !== index))
    }

    return (
        <div>
            <h2>Name List</h2>

            <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>

            {names.map((name, index) => (
                <div key={index}>{name} <button onClick={() => handleRemove(index)}>x</button></div>
            ))}
            
        </div>
    )
}

ReactDOM.createRoot(document.querySelector('#root')).render(<Test/>)