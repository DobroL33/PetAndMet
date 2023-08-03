function Activity() {
  return (
    <>
      <p className="my-10 text-3xl font-bold">나의 활동</p>
      <p className="my-6 text-2xl font-bold">내가 작성한 글</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full h-[65%] flex flex-col justify-between py-5 px-10 mb-10">
        <div>
          <ul className="flex rounded-xl px-4 py-2 bg-amber-400">
            <li className="px-2 py-2 rounded-xl cursor-pointer bg-white">
              입양 후기
            </li>
            <li className="px-2 py-2 rounded-xl cursor-pointer">후원 후기</li>
            <li className="px-2 py-2 rounded-xl cursor-pointer">Q&A</li>
          </ul>
        </div>
        <div className="border-4 border-amber-300 rounded-xl">
          <ul>
            <li>
              <div className="flex text-center mx-4">
                <p className="w-1/5 flex flex-col justify-center border-b-4 border-amber-400">
                  번호
                </p>
                <p className="w-1/5 bg-amber-400 py-1 flex flex-col justify-center border-b-4 border-white">
                  보호소 이름
                </p>
                <p className="w-3/5 flex flex-col justify-center border-b-4 border-amber-400">
                  제목
                </p>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4 border-b-2 border-white">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
            <li>
              <div className="flex text-center mx-4">
                <p className="w-1/5 flex flex-col justify-center">1111</p>
                <p className="w-1/5 bg-amber-400 py-2 flex flex-col justify-center">
                  A보호소
                </p>
                <p className="w-3/5 flex flex-col justify-center">테스트1</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">더보기</div>
      </div>
    </>
  )
}

export default Activity
