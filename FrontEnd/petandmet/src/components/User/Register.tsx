import { useState } from 'react'
import {
  RegisterCredential,
  useRegisterMutation,
} from '../../hooks/User/useRegisterMutation'

function Register() {
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [role_type, setRoleType] = useState<string>('USER')

  const register = useRegisterMutation()

  const handleRegister = () => {
    const credentials: RegisterCredential = {
      id,
      password,
      email,
      phone,
      name,
      role_type,
    }
    console.log(credentials)
    register.mutate(credentials)
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
                role_type === 'USER' ? 'bg-amber-300' : 'bg-gray-300'
              }  hover:bg-amber-400 cursor-pointer flex w-full items-center justify-center select-none text-lg rounded-xl py-4 mr-4`}
              onClick={() => handleRole('USER')}
            >
              일반 회원
            </div>
            <div
              className={`${
                role_type === 'CENTER' ? 'bg-amber-300' : 'bg-gray-300'
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
