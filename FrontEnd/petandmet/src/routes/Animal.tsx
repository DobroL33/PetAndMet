import { Routes, Route } from 'react-router-dom'
import AnimalDetail from 'containers/components/AnimalDetail'
import AnimalUpdate from 'components/Animal/AnimalUpdate'
import AnimalEnroll from 'components/Animal/AnimalEnroll'

function Animal() {
  return (
    <>
      <Routes>
        <Route path="/detail/:animal_uuid" element={<AnimalDetail />} />
        <Route path="/update/" element={<AnimalUpdate/>}/>
        <Route path="/enroll/" element={<AnimalEnroll/>}/>
      </Routes>
    </>
  )
}

export default Animal
