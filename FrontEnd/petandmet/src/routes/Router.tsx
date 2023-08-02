import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import FindAccount from '../components/user/FindAccount'
import UserPage from '../components/user/UserPage'

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
