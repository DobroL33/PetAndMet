function DonateList() {
  return (
    <>
      <p className="my-10 text-3xl font-bold">후원 관리</p>
      <p className="my-6 text-2xl font-bold">후원 목록</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full flex-col justify-between py-5 px-10 mb-10">
        <div className="align-middle inline-block min-h-[39rem] min-w-full shadow overflow-hidden bg-white px-8 pt-3 pb-6 border-2 border-gray-300 rounded-xl">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                  <span className="cursor-pointer">제목</span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                  <span className="cursor-pointer">작성자</span>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-blue-500 tracking-wider">
                  <span className="cursor-pointer">작성일</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr v-for="item in items">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 w-[40%]">
                  <div className="text-sm leading-5 text-gray-800 text-center cursor-pointer overflow-hidden line-clamp-1">
                    제목1
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 w-[20%]">
                  <div className="text-sm leading-5 text-blue-900 text-center">
                    김싸피
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5 text-center w-[20%]">
                  2023.07.31
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 라이브러리 적용해야함 */}
        <div className="bg-white px-4 pt-4 flex items-center flex-wrap justify-center">
          <ul className="inline-flex">
            <li>
              <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 rounded-l-lg focus:shadow-outline hover:bg-green-100">
                Prev
              </button>
            </li>
            <li>
              <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 focus:shadow-outline">
                1
              </button>
            </li>
            <li>
              <button className="px-4 py-2 text-white transition-colors duration-150 bg-green-600 border border-r-0 border-green-600 focus:shadow-outline">
                2
              </button>
            </li>
            <li>
              <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 focus:shadow-outline hover:bg-green-100">
                3
              </button>
            </li>
            <li>
              <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-green-600 rounded-r-lg focus:shadow-outline hover:bg-green-100">
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default DonateList
