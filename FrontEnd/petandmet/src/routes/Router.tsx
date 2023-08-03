import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/User/Login'
import Register from '../components/User/Register'
import FindAccount from '../components/User/FindAccount'
import UserPage from '../components/User/UserPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faccount" element={<FindAccount />} />
        <Route path="/mypage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
