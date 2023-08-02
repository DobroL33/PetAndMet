import { useState } from 'react'
import Modal from './Modal'
function FPw() {
  const [showComponent, setShowComponent] = useState<Boolean>(false)
  const AuthEmail = () => {
    setShowComponent(true)
  }
  const FindPW = (): void => {
    setShowComponent(false)
  }
  return (
    <div className="mt-4">
      <label className="flex flex-col-reverse relative focus group my-6">
        <input
          type="text"
          name="id"
          required
          className="border-2 border-amber-400 rounded-xl px-4 py-3 leading-9"
        />

        <span className="bg-white absolute text-xl transform -translate-y-3 left-4 transition leading-10 group-focus-within:-translate-y-10">
          아이디
        </span>
      </label>
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
      <div
        className="bg-amber-400 rounded-xl cursor-pointer px-4 py-3"
        onClick={AuthEmail}
      >
        비밀번호 찾기
      </div>
      {/* Modal 창을 통해 '이메일을 통해 임시 비밀번호가 발급되었습니다.' 라는 문구 보여주기 */}
      {showComponent ? <Modal closeModal={FindPW} /> : <></>}
    </div>
  )
}
export default FPw
