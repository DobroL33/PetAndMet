import { Routes, Route } from 'react-router-dom'
import ItemRegister from 'components/Center/CenterItemEnroll'
import UpdateCenterItem from 'components/Center/update/UpdateItem'
import CenterPage from 'components/Center/CenterPage'
import UpdateCenter from 'components/Center/update/UpdateCenter'
import CenterWalk from 'components/Volunteer/Walk/walkCenter'
import WalkUpdate from 'containers/components/WalkUpdate'
function Center(){
    return(
        <>
        <Routes>
            <Route path="/" element={<CenterPage />} />
            <Route path="/item/*">
                <Route path="enroll" element={<ItemRegister/>}/>
                <Route path="update" element={<UpdateCenterItem/>}/>
            </Route>
            <Route path="/center/*">
                <Route path="update" element={<UpdateCenter/>}/>
            </Route>
            <Route path="/walk/*">
                <Route path="" element={<CenterWalk/>}/>
                <Route path="update" element={<WalkUpdate/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default Center