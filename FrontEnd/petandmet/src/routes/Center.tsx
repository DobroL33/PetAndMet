import { Routes, Route } from 'react-router-dom'
import ItemRegister from 'components/Center/CenterItemEnroll'
import UpdateCenterItem from 'components/Center/update/UpdateItem'
import CenterPage from 'components/Center/CenterPage'
import UpdateCenter from 'components/Center/update/UpdateCenter'
import WalkUpdate from 'components/Center/update/WalkUpdate'
function Center() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CenterPage />} />
        <Route path="/item/*">
          <Route path="enroll" element={<ItemRegister />} />
          <Route path="update" element={<UpdateCenterItem />} />
        </Route>
        <Route path="update" element={<UpdateCenter />} />
        <Route path="walk" element={<WalkUpdate />} />
      </Routes>
    </>
  )
}

export default Center
