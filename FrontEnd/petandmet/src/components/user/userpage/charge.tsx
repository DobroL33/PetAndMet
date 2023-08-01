function Charge() {
  return (
    <>
      <p className="my-10 text-3xl font-bold">후원 관리</p>
      <p className="my-6 text-2xl font-bold">포인트 내역</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full flex justify-start gap-4 py-5 px-10 mb-10">
        <p>현재 포인트 : </p>
        <p>50000</p>
      </div>
      <div className="flex justify-end">
        <p className="py-2 px-4 bg-amber-400 rounded-3xl cursor-pointer">
          충전 하기
        </p>
      </div>
    </>
  )
}
export default Charge
