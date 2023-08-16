import { Routes, Route } from 'react-router-dom'
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
