import { Routes, Route } from 'react-router-dom'
import LeftMenu from './userpage/leftMenu'
import Profile from './userpage/profile'
function UserPage() {
  return (
    <div className="flex flex-row h-screen justify-center mt-10">
      {/* 좌측 */}
      <LeftMenu></LeftMenu>
      {/* 메인 */}
      <div className="w-[50%] text-start px-10">
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default UserPage
