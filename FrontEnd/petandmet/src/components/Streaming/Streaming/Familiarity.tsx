import ProgressBar from 'react-bootstrap/ProgressBar'

// 스트리밍 페이지를 불러오면 바로 함께 DB에서 % 숫자를 가져오게 한다.
// Zustand에서

function Familiarity() {
  return (
    <>
      <ProgressBar striped variant="warning" now={60} />;
    </>
  )
}

export default Familiarity
