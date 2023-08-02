import React from 'react'
function Login() {
  return (
    <section className="flex flex-col items-center h-screen">
      <div className="bg-white mx-auto w-1/4 flex items-center justify-center my-auto">
        <div className="w-full h-100 text-center">
          <h1 className="text-3xl font-bold leading-tight mb-6">로그인</h1>
          <div>
            <input
              type="email"
              name=""
              placeholder="아이디"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              name=""
              placeholder="비밀번호"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
            />
          </div>

          <div className="text-right mt-2">
            <a
              href="#"
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >
              계정을 잃어버리셨나요?
            </a>
          </div>

          <button
            type="submit"
            className="w-full block bg-amber-400 hover:bg-amber-500 focus:bg-amber-500 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
          >
            로그인
          </button>
          {/* 
          <hr className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <span className="ml-4">Log in with Google</span>
            </div>
          </button> */}

          <p className="mt-8 text-sm">
            계정이 없으신가요?{' '}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              회원가입
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
