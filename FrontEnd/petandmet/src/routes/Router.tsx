import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'components/User/Login'
import Register from 'components/User/Register'
import FindAccount from 'components/User/FindAccount'
import UserPage from 'components/User/UserPage'
import MainPage from 'components/Main/MainPage'
import LiveList from 'components/Live/LiveList'
import AdoptCheckList from 'components/Adopt/AdoptCheckList'
import AdoptProcess from 'components/Adopt/AdoptProcess'
import AnimalList from 'components/Animal/AnimalList'
import AdoptReviewList from 'components/Board/AdoptReviewList'
import AdoptReviewForm from 'components/Board/AdoptReviewForm'
import DonateReviewForm from 'components/Board/DonateReviewForm'
import DonateReviewList from 'components/Board/DonateReviewList'
import NoticeForm from 'components/Board/NoticeForm'
import NoticeList from 'components/Board/NoticeList'
import QnaForm from 'components/Board/QnaForm'
import QnaList from 'components/Board/QnaList'
import VolunteerPage from 'components/Volunteer/VolunteerPage'
import WalkPage from 'components/Volunteer/walkpage'
import Navbar from 'components/Main/Navbar'
import AdoptReviewDetail from 'components/Board/AdoptReviewDetail'
import DonateReviewDetail from 'components/Board/DonateReviewDetail'
import NoticeDetail from 'components/Board/NoticeDetail'
import QnaDetail from 'components/Board/QnaDetail'
import CenterPage from 'components/Center/CenterPage'
import Charge from 'components/Donate/Charge'
import ItemList from 'components/Item/ItemList'
import ItemDetail from 'containers/components/ItemDetail'
import StreamingPage from 'components/Streaming/StreamingPage'
import AnimalDetail from 'containers/components/AnimalDetail'
import Live from 'components/Live/OpenVidu'
import Live2 from 'components/Live/OpenViduJoin'
import AdoptUpdate from 'components/Board/AdoptReviewUpdate'
import DonateUpdate from 'components/Board/DonateReviewUpdate'
import NoticeUpdate from 'components/Board/NoticeUpdate'
import QnaUpdate from 'components/Board/QnaUpdate'
import UpdateCenter from 'components/Center/Update/CenterUpdate'
import ItemRegister from 'components/Center/CenterItemEnroll'
import UpdateCenterItem from 'components/Center/Update/CenterUpdateItem'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
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
        <Route path="/qnaform" element={<QnaForm />} />
        <Route path="/qna" element={<QnaList />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/walk" element={<WalkPage />} />
        <Route
          path="/adopt/review/detail/:id"
          element={<AdoptReviewDetail />}
        />
        <Route
          path="/donate/review/detail/:id"
          element={<DonateReviewDetail />}
        />
        <Route path="/comm/notice/detail/:id" element={<NoticeDetail />} />
        <Route path="/comm/qna/detail/:id" element={<QnaDetail />} />
        <Route path="/admin" element={<CenterPage />} />
        <Route path="/donate/charge" element={<Charge />} />
        <Route path="/donate/item" element={<ItemList />} />
        <Route path="/donate/item/:id" element={<ItemDetail />} />
        <Route path="/livelist/streaming/:id" element={<StreamingPage />} />
        <Route path="/animal/detail/:animal_uuid" element={<AnimalDetail />} />
        <Route path="/live/:id" element={<Live />} />
        <Route path="/openlive" element={<Live />} />
        <Route path="/live2/:id" element={<Live2 />} />
        <Route path='/adopt/review/detail/update/:id' element={<AdoptUpdate/>}/>
        <Route path='/donate/review/detail/update/:id' element={<DonateUpdate/>}/>
        <Route path='/comm/notice/detail/update/:id' element={<NoticeUpdate/>}/>
        <Route path='/comm/qna/detail/update/:id' element={<QnaUpdate/>}/>
        <Route path='/admin/update' element={<UpdateCenter/>}/>
        <Route path='/item/enroll' element={<ItemRegister/>}/>
        <Route path='/item/update' element={<UpdateCenterItem/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
