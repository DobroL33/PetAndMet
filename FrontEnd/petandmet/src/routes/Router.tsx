import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/user/login'
import Register from '../components/user/register'
import FindID from '../components/user/findID'
import FindPW from '../components/user/findPW'
import UserPage from '../components/user/userPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fid" element={<FindID />} />
        <Route path="/fpw" element={<FindPW />} />
        <Route path="/mypage/*" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
