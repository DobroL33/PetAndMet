import { useState } from 'react'
import { useLoginMutation, LoginCredentials } from 'hooks/User/useLoginMutation'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const login = useLoginMutation()
  let navigate = useNavigate()

  const handleLogin = async () => {
    try {
      if (id.length >= 30) {
        toast.info('아이디가 입력 범위를 벗어났습니다')
        return
      }
      const credentials: LoginCredentials = { id, password }
      await login.mutateAsync(credentials)
      navigate('/')
    } catch (error) {
      setId('')
      setPassword('')
      toast.error('존재하지 않는 계정입니다')
    }
  }
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }
  const handleFoundAccount = async () => {
    navigate('/faccount')
  }
  const handleRegister = async () => {
    navigate('/register')
  }
  return (
    <>
      <section className="flex flex-col items-center h-[50%] my-auto">
        <div className="bg-white mx-auto w-1/4 flex items-center justify-center my-auto">
          <div className="w-full h-100 text-center">
            <h1 className="text-3xl font-bold leading-tight mb-6">로그인</h1>
            <div>
              <input
                type="email"
                name=""
                value={id}
                placeholder="아이디"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={e => setId(e.target.value)}
                onKeyDown={e => activeEnter(e)}
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                name=""
                value={password}
                placeholder="비밀번호"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => activeEnter(e)}
              />
            </div>

            <div className="text-right mt-2">
              <a
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700 cursor-pointer"
                onClick={handleFoundAccount}
              >
                계정을 잃어버리셨나요?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-amber-400 hover:bg-amber-500 focus:bg-amber-500 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              onClick={handleLogin}
            >
              로그인
            </button>
            <p className="mt-8 text-sm">
              계정이 없으신가요?{' '}
              <a
                className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                onClick={handleRegister}
              >
                회원가입
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
