import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/User/Login'
import Register from '../components/User/Register'
import FindAccount from '../components/User/FindAccount'
import UserPage from '../components/User/UserPage'
import MainPage from '../components/Main/MainPage'
import LiveList from '../components/Live/LiveList'
import AdoptCheckList from '../components/Adopt/AdoptCheckList'
import AdoptProcess from '../components/Adopt/AdoptProcess'
import AnimalList from '../components/Animal/AnimalList'
import AdoptReviewList from '../components/Board/AdoptReviewList'
import AdoptReviewForm from '../components/Board/AdoptReviewForm'
import DonateReviewForm from '../components/Board/DonateReviewForm'
import DonateReviewList from '../components/Board/DonateReviewList'
import NoticeForm from '../components/Board/NoticeForm'
import NoticeList from '../components/Board/NoticeList'
import QnaForm from '../components/Board/QnaForm'
import QnaList from '../components/Board/QnaList'
import VolunteerPage from '../components/Volunteer/VolunteerPage'
import WalkPage from '../components/Volunteer/walkpage'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faccount" element={<FindAccount />} />
        <Route path="/mypage/*" element={<UserPage />} />
        <Route path="/livelist" element={<LiveList />} />
        <Route path="/adoptchecklist" element={<AdoptCheckList />} />
        <Route path="/adpotprocess" element={<AdoptProcess />} />
        <Route path="/animallist" element={<AnimalList />} />
        <Route path="/adoptreview" element={<AdoptReviewList />} />
        <Route path="/adoptreviewform" element={<AdoptReviewForm />} />
        <Route path="/donatereviewform" element={<DonateReviewForm />} />
        <Route path="/donatereview" element={<DonateReviewList />} />
        <Route path="/noticeform" element={<NoticeForm />} />
        <Route path="/notice" element={<NoticeList />} />
        <Route path="/qnadorm" element={<QnaForm />} />
        <Route path="/qna" element={<QnaList />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/walk" element={<WalkPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
