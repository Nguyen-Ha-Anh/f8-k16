import { useState, useEffect } from "react";
import "./App.css";

const tabs = ["Newest", "Oldest"];
// const pages = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function App() {
  const [posts, setPosts] = useState([]);
  const [displayPost, setDisplayPost] = useState([]); //show data
  const [detail, setDetail] = useState(null); //on/off modal
  const [type, setType] = useState("Newest");
  const [indexNum, setIndexNum] = useState(1);
  console.log(type);

  // loading
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  //search
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  //order
  const [limit] = useState(30);
  const [order, setOrder] = useState("desc");
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)

  console.log(total);
  

  // check zalo mình với
  //call API
  useEffect(() => {
    setLoadingList(true);

    // const skip = (indexNum - 1) * limit

    fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${currentPage}&sortBy=id&order=${order}`) // ở đoạn này bạn thêm sortby và order vô đây là được
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setTotal(data.total);
      })
      .finally(() => {
        setLoadingList(false);
      });
  }, [currentPage, order]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  //search + sort
  useEffect(() => {
    let result = [...posts];

    if (debounced) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(debounced.toLocaleLowerCase())
      );
    }

    // result.sort((a, b) => (order === "desc" ? b.id - a.id : a.id - b.id));

    // const sorted = [...posts].sort((a, b) => {
    //   if (order === 'desc') {
    //     return b.id - a.id
    //   } else {
    //     return a.id - b.id
    //   }
    // })
    setDisplayPost(result);
    setIndexNum("1");
  }, [debounced, posts]);

  //pagination logic
  // này là bạn xử lý logic ở bên frontend hết rồi thực ra bạn chỉ cần call api và bên BE nó sẽ tự xử lý mấy cái này
  //  const start = (indexNum - 1) * limit;
  //const end = start + limit;
  //const paginatedPosts = displayPost.slice(start, end);

  const totalPages = Math.ceil(total / limit);

  //const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

 
  const handleChangePage =  (page) => {
    setCurrentPage(page - 1)
    
  }


  if(loadingList) return <span>đang tải...</span>
  

  return (
    <div>
      <div className="max-w-[80%] mx-auto py-5">
        <h1 className="text-center text-3xl font-bold mb-3">Blogs</h1>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border outline-none px-3 py-2 mb-3 border-gray-400"
          placeholder="Search.."
        />
        <button
          className="
        border px-3 py-2 
        hover:bg-green-800
        hover:text-white
        mb-3
        border-gray-400"
        >
          Add new
        </button>

        <div className="flex gap-2 mb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              style={
                type === tab
                  ? {
                      backgroundColor: "yellow",
                    }
                  : {}
              }
              onClick={() => {
                setType(tab);
                setIndexNum(0); // reset page
                setOrder(tab === "Newest" ? "desc" : "asc");
              }}
              className="border py-2 px-3 cursor-pointer hover:bg-yellow-200 border-gray-400"
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          {/* {loading && <p>Loading..</p>} */}

          {displayPost.map((post) => (
            <div key={post.id} className="border border-gray-400 p-3 mb-3">
              <h2 className="text-2xl font-medium mb-3">{post.title}</h2>
              <p>{post.body}</p>
              <div className="flex mt-2 justify-between items-center">
                <button
                  className="
                    border px-3 py-2 
                    rounded-full 
                    cursor-pointer
                    hover:bg-green-800
                    hover:text-white"
                  onClick={() => {
                    setDetail(null);
                    setLoadingDetail(true);

                    fetch(`https://dummyjson.com/posts/${post.id}`)
                      .then((res) => res.json())
                      .then((data) => {
                        setDetail(data);
                      })
                      .finally(() => {
                        setLoadingDetail(false);
                      });
                  }}
                >
                  More
                </button>
                <div className="flex gap-2">
                  <span className="cursor-pointer">Edit</span>
                  <span className="cursor-pointer text-red-600">Delete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              style={
                i === currentPage
                  ? {
                      color: "#fff",
                      backgroundColor: "green",
                    }
                  : {}
              }
              onClick={() =>{
                 handleChangePage(i+1)
              }}
              className="border border-gray-400 block py-2 px-4"
            >
              {i + 1}
            </button>
          ))}
        </div>
        {(detail || loadingDetail) && (
          <div
            className="fixed border bg-black/50 items-center justify-center inset-0"
            onClick={() => setDetail(null)}
          >
            <div className="bg-[#fff] p-10 mx-auto w-[80%] mt-50 rounded-md">
              {loadingDetail ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <p className="text-xl">Loading..</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-3">{detail.title}</h2>
                  <hr />
                  <p className="mt-5">{detail.body}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// chỗ mình bôi đen nhé 
// fetch('https://dummyjson.com/posts?sortBy=title&order=asc')

// bạn thấy nó gọi đến posts và sortBy theo title. Thì ở đây bạn thay bằng id giúp mình. Id q tượng trưng cho cái cũ nhất. ID lowns nhất là cũ nhất.
// còn cái từ khoá order thì bạn truyền vào asc hoặc desc. asc là lấy ra nhỏ dần, desc là id tăng dần
// thì ở trên lúc call api bạn tạo cho mình 1 thằng state là order mặc định là asc. khi click vào cũ nhất thì xét lại state thành desc
// đó bạn thấy api nó trả về khác đúng không
// ở trên mình nhầm nhé asc là id tăng dần, desc là giảm dần. tức là asc là bài viết cũ nhất, desc là bài viết mới nhất