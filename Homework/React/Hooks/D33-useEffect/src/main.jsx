import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)


// limit bạn truyền vào đây là bao nhiêu thì bạn lấy total / cho limit sẽ ra được số trang. Skip ban đầu mặc định là  tức là ban đầu khi vào mặc định là page 1. Đó bạn thêm 2 có là limit và skip để xử lý khi click vào sẽ lấy ra các page tương ưng. còn cái sắp xép thì bạn dùng order nhé. Bạn truyền vào asc hoặc desc để lấy ra bài viết mới nhất hoặc cũ nhất.
// c ó 3 trang là chưa đúng nha bạn. Bạn để ý total nó trả về là 251 cái bài viết và limit là 30 thì bạn lấy 251 / 30 ok anh sẽ tầm 9 trang nhé. Bạn xử lý chuyển trang bằng logic hả. Cái này bạn phải call api lên để lấy về nhé nó cái cái skip ấy. Skip là 0 thì tương ứng với trang số 1, skip = 1 thì sẽ là trang 2 tương tự với những cái sau