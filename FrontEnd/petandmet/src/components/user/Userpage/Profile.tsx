function Profile() {
  return (
    <>
      <p className="my-10 text-3xl font-bold">계정 관리</p>
      <p className="my-6 text-2xl font-bold">기본 정보</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full h-[30%] flex justify-between py-10 px-10 mb-10">
        {/* 프로필 이미지 */}
        <div className="bg-blue-300 rounded-full w-[200px] h-[200px] mr-10"></div>
        <div className="text-2xl flex flex-col justify-center">
          <p>000님</p>
          <p>이메일 example@example.com</p>
        </div>
        <div className="flex flex-col justify-end">
          <div className="py-2 px-4 bg-amber-400 rounded-3xl">수정하기</div>
        </div>
      </div>
      <p className="my-6 text-2xl font-bold">비밀번호</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full h-[10%] flex justify-between py-6 px-6 mb-10">
        <p className="flex flex-col justify-center">비밀번호를 변경합니다.</p>
        <div className="flex flex-col justify-center">
          <p className="py-2 px-4 bg-amber-400 rounded-3xl">비밀번호 변경</p>
        </div>
      </div>
      <p className="my-6 text-2xl font-bold">계정 삭제</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full h-[10%] flex justify-between py-6 px-6 mb-10">
        <p className="flex flex-col justify-center">계정을 삭제합니다.</p>
        <div className="flex flex-col justify-center">
          <p className="py-2 px-4 bg-red-400 rounded-3xl">계정 삭제</p>
        </div>
      </div>
    </>
  )
}

export default Profile
