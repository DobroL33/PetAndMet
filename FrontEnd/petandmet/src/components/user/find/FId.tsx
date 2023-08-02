import { useState, useRef } from 'react'
import Modal from './Modal'
function FId() {
  const divRef = useRef<HTMLDivElement>(null)

  const [showComponent, setShowComponent] = useState<Boolean>(false)
  const [isAuth, setIsAuth] = useState<Boolean>(false)
  const AuthEmail = () => {
    if (divRef.current) {
      const text = divRef.current.innerText
      if (text === '인증번호 받기') {
        setIsAuth(true)
        divRef.current.innerText = '아이디 찾기'
      } else if (text === '아이디 찾기') {
        setShowComponent(true)
      }
    }
  }
  const FindID = (): void => {
    setIsAuth(false)
    setShowComponent(false)
    if (divRef.current) {
      divRef.current.innerText = '인증번호 받기'
    }
  }

  return (
    <div className="mt-4">
      <label className="flex flex-col-reverse relative focus group my-6">
        <input
          type="email"
          name="email"
          required
          className="border-2 border-amber-400 rounded-xl px-4 py-3 leading-9"
        />
        <span className="bg-white absolute text-xl transform -translate-y-3 left-4 transition leading-10 group-focus-within:-translate-y-10">
          이메일
        </span>
      </label>
      {/* 이메일로 인증번호 받기를 누르면 생기게 */}
      <label
        className={`${
          isAuth ? 'flex' : 'hidden'
        } flex-col-reverse relative focus group my-6`}
      >
        <input
          type="text"
          name="authCode"
          required
          className="border-2 border-amber-400 rounded-xl px-4 py-3 leading-9"
        />
        <span className="bg-white absolute text-xl transform -translate-y-3 left-4 transition leading-10 group-focus-within:-translate-y-10">
          인증번호
        </span>
      </label>
      {/* 인증번호 받기 버튼을 누르면 아이디 찾기로 변경 */}
      <div
        ref={divRef}
        className="bg-amber-400 rounded-xl cursor-pointer px-4 py-3"
        onClick={AuthEmail}
      >
        인증번호 받기
      </div>
      {/* 아이디 찾기가 끝나면 Modal 창으로 아이디 알려주기*/}
      {showComponent ? <Modal closeModal={FindID} /> : <></>}
    </div>
  )
}
export default FId
