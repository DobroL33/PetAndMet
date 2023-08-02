import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/user/login'
import Register from '../components/user/register'
import FindAccount from '../components/user/FindAccount'
import UserPage from '../components/user/userPage'

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
