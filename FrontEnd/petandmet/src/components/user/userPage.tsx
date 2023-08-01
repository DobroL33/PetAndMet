import { Routes, Route } from 'react-router-dom'
import LeftMenu from './userpage/LeftMenu'
import Profile from './userpage/Profile'
import Activity from './userpage/Activity'
import FavoriteAnimal from './userpage/FavoriteAnimal'
import Charge from './userpage/Charge'
import DonateList from './userpage/DonateList'
function UserPage() {
  return (
    <div className="flex flex-row h-screen justify-center mt-10">
      {/* 좌측 */}
      <LeftMenu></LeftMenu>
      {/* 메인 */}
      <div className="w-[50%] text-start px-10">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/favorite" element={<FavoriteAnimal />} />
          <Route path="/charge" element={<Charge />} />
          <Route path="/donatelist" element={<DonateList />} />
        </Routes>
      </div>
    </div>
  )
}

export default UserPage
