import { Routes, Route } from 'react-router-dom'
import ItemRegister from 'components/Center/CenterItemEnroll'
import UpdateCenterItem from 'components/Center/update/UpdateItem'
import CenterPage from 'components/Center/CenterPage'

function Center(){
    return(
        <>
        <Routes>
            <Route path="/" element={<CenterPage />} />
            <Route path="/item/*">
                <Route path="enroll" element={<ItemRegister/>}/>
                <Route path="update" element={<UpdateCenterItem/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default Center