import { Routes, Route } from 'react-router-dom'
import BoardFoam from 'components/Board/BoardForm'
import BoardList from 'components/Board/BoardList'
import BoardDetail from 'components/Board/BoardDetail'
import BoardEdit from 'components/Board/BoardEdit'

function Board() {
  return (
    <>
      <Routes>
        <Route path="/notice/*">
          <Route path="list" element={<BoardList />}></Route>
          <Route path="write" element={<BoardFoam />}></Route>
          <Route path="detail/:id" element={<BoardDetail />}></Route>
          <Route path="edit/:id" element={<BoardEdit />}></Route>
        </Route>
        <Route path="/adopt/*">
          <Route path="list" element={<BoardList />}></Route>
          <Route path="write" element={<BoardFoam />}></Route>
          <Route path="detail/:id" element={<BoardDetail />}></Route>
          <Route path="edit/:id" element={<BoardEdit />}></Route>
        </Route>
        <Route path="/support/*">
          <Route path="list" element={<BoardList />}></Route>
          <Route path="write" element={<BoardFoam />}></Route>
          <Route path="detail/:id" element={<BoardDetail />}></Route>
          <Route path="edit/:id" element={<BoardEdit />}></Route>
        </Route>
        <Route path="/qna/*">
          <Route path="list" element={<BoardList />}></Route>
          <Route path="write" element={<BoardFoam />}></Route>
          <Route path="detail/:id" element={<BoardDetail />}></Route>
          <Route path="edit/:id" element={<BoardEdit />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default Board
