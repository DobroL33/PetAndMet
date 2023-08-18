import { Link, useLocation } from 'react-router-dom'

function LeftMenu() {
  const location = useLocation()
  const path = location.pathname.replace(
    location.pathname.split('/').slice(-1)[0],
    ''
  )
  return (
    <div className="w-[12%] rounded-3xl py-6 px-6 text-start h-[500px] border-4 border-amber-400 text-lg font-semibold">
      <div className="mb-10">
        <p className="text-gray-500 my-2">내 정보 관리</p>
        <Link to={`/mypage/profile`}>
          <p className="pl-6 py-2 hover:bg-amber-300 rounded-2xl cursor-pointer">
            계정 관리
          </p>
        </Link>
        <Link to={`/mypage/activity`}>
          <p className="pl-6 py-2 hover:bg-amber-300 rounded-2xl cursor-pointer">
            나의 활동
          </p>
        </Link>
      </div>
      <div className="mb-10">
        <p className="text-gray-500 my-2">관심 동물</p>
        <Link to={`/mypage/favorite`}>
          <p className="pl-6 py-2 hover:bg-amber-300 rounded-2xl cursor-pointer">
            관심 동물
          </p>
        </Link>
      </div>
      <div className="mb-10">
        <p className="text-gray-500 my-2">후원 관리</p>
        <Link to={`/mypage/charge`}>
          <p className="pl-6 py-2 hover:bg-amber-300 rounded-2xl cursor-pointer">
            포인트 내역
          </p>
        </Link>
        <Link to={`/mypage/donatelist`}>
          <p className="pl-6 py-2 hover:bg-amber-300 rounded-2xl cursor-pointer">
            후원 목록
          </p>
        </Link>
      </div>
    </div>
  )
}
export default LeftMenu
