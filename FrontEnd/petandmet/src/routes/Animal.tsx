import { Routes, Route } from 'react-router-dom'
import BoardFoam from 'components/Board/BoardForm'
import BoardList from 'components/Board/BoardList'
import BoardDetail from 'components/Board/BoardDetail'
import BoardEdit from 'components/Board/BoardEdit'
import AnimalDetail from 'containers/components/AnimalDetail'
import AnimalUpdate from 'components/Animal/AnimalUpdate'
function Animal() {
  return (
    <>
      <Routes>
        <Route path="/detail/:animal_uuid" element={<AnimalDetail />} />
        <Route path="/update/" element={<AnimalUpdate/>}/>
      </Routes>
    </>
  )
}

export default Animal
