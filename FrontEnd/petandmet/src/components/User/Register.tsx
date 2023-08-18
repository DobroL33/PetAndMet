import { useState, useEffect } from 'react'
import {
  RegisterCredential,
  useRegisterMutation,
} from 'hooks/User/useRegisterMutation'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function Register() {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [roleType, setRoleType] = useState<string>('USER')
  const [centerName, setCenterName] = useState<string>('')
  const [centerAddress, setCenterAddress] = useState<string>('')
  const [centerPhone, setCenterPhone] = useState<string>('')
  const [centerEmail, setCenterEmail] = useState<string>('')

  const register = useRegisterMutation()
  const navigate = useNavigate()

  const CheckIsEmpty = (): boolean => {
    if (id.length >= 30) {
      toast.info('아이디가 입력 범위를 벗어났습니다')
      return false
    }
    if (id.length === 0) {
      toast.error('아이디가 비어있습니다.')
      return false
    }
    if (password.length === 0) {
      toast.error('비밀번호가 비어있습니다.')
      return false
    }
    if (email.length === 0) {
      toast.error('이메일이 비어있습니다.')
      return false
    }
    if (phone.length === 0) {
      toast.error('전화번호가 비어있습니다.')
      return false
    }
    if (name.length === 0) {
      toast.error('이름이 비어있습니다.')
      return false
    }

    if (roleType === 'CENTER') {
      if (centerPhone.length === 0) {
        toast.error('센터 번호가 비어있습니다.')
        return false
      }
      if (centerName.length === 0) {
        toast.error('센터 이름이 비어있습니다.')
        return false
      }
      if (centerAddress.length === 0) {
        toast.error('센터 주소가 비어있습니다.')
        return false
      }
      if (centerEmail.length === 0) {
        toast.error('센터 이메일이 비어있습니다.')
        return false
      }
    }

    return true
  }

  const handleRegister = () => {
    try {
      if (CheckIsEmpty()) {
        return
      }
      const credentials: RegisterCredential = {
        id,
        password,
        email,
        phone,
        name,
        role_type: roleType,
        center_name: centerName,
        center_address: centerAddress,
        center_phone: centerPhone,
        center_email: centerEmail,
      }
      register.mutateAsync(credentials)
      navigate('/')
    } catch (error) {}
  }
  const handleRole = (role: string) => {
    setRoleType(role)
  }

  return (
    <section className="flex flex-col items-center h-screen">
      <div className="bg-white mx-auto w-1/4 flex items-center justify-center my-auto">
        <div className="w-full h-100 text-center gap-4">
          <h1 className="text-3xl font-bold leading-tight mb-6">회원가입</h1>

          <div className="flex flex-row justify-evenly my-4">
            <div
              className={`${
                roleType === 'USER' ? 'bg-amber-300' : 'bg-gray-300'
              }  hover:bg-amber-400 cursor-pointer flex w-full items-center justify-center select-none text-lg rounded-xl py-4 mr-4`}
              onClick={() => handleRole('USER')}
            >
              일반 회원
            </div>
            <div
              className={`${
                roleType === 'CENTER' ? 'bg-amber-300' : 'bg-gray-300'
              } hover:bg-amber-400 cursor-pointer w-full flex items-center justify-center select-none  text-lg rounded-xl py-2`}
              onClick={() => handleRole('CENTER')}
            >
              보호소
            </div>
          </div>
          <div className="my-4">
            <input
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              placeholder="아이디 ex) ssafy"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호 ex) *********"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
            />
          </div>
          <div className="my-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일 ex)ssafy@ssafy.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="이름 ex)김싸피"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-row my-4">
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="전화번호 ex)000-0000-0000"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
            />
          </div>
          {roleType === 'CENTER' ? (
            <>
              <div className="flex flex-row my-4">
                <input
                  type="text"
                  value={centerName}
                  onChange={e => setCenterName(e.target.value)}
                  placeholder="센터 이름"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex flex-row my-4">
                <input
                  type="text"
                  value={centerAddress}
                  onChange={e => setCenterAddress(e.target.value)}
                  placeholder="센터 주소"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex flex-row my-4">
                <input
                  type="text"
                  value={centerPhone}
                  onChange={e => setCenterPhone(e.target.value)}
                  placeholder="센터 번호"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex flex-row my-4">
                <input
                  type="text"
                  value={centerEmail}
                  onChange={e => setCenterEmail(e.target.value)}
                  placeholder="센터 이메일"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                />
              </div>
            </>
          ) : null}

          <button
            type="submit"
            className="w-full block bg-amber-400 hover:bg-amber-500 focus:bg-amber-500 font-semibold rounded-lg
            px-4 py-3"
            onClick={handleRegister}
          >
            회원가입
          </button>
          <p className="mt-8 text-sm">
            계정이 이미 있으신가요?{' '}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              로그인
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register
