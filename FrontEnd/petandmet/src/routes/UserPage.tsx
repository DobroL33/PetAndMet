import { Routes, Route } from 'react-router-dom'
import LeftMenu from 'components/User/Userpage/LeftMenu'
import Profile from 'components/User/Userpage/Profile'
import Activity from 'components/User/Userpage/Activity'
import FavoriteAnimal from 'components/User/Userpage/FavoriteAnimal'
import Charge from 'components/User/Userpage/Charge'
import DonateList from 'components/User/Userpage/DonateList'
function UserPage() {
  return (
    <div className="flex flex-row h-screen justify-center mt-10">
      {/* 좌측 */}
      <LeftMenu></LeftMenu>
      {/* 메인 */}
      <div className="w-[50%] text-start px-10">
        <Routes>
          <Route path="/" element={<Profile />} />
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
