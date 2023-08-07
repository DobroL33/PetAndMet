import Typography from '@mui/material/Typography'
import List from 'containers/components/List'

interface Data {
  num: string
  title: string | JSX.Element
  writter: string
  view: number
  date: string
}

function createData(
  num: string,
  title: string | JSX.Element,
  writter: string,
  view: number
): Data {
  const currentDate: Date = new Date()
  const date: string = currentDate.toISOString()
  return { num, title, writter, view, date }
}

const rows = [
  //데이터 받아서 링크 연결하여 세부페이지 이동 예정
  createData('1', '<Link to="/">질문내용1</Link>', 'Pet & Met', 100),
  createData('2', '질문내용2', 'Pet & Met', 101),
  createData('3', '질문내용3', 'Pet & Met', 102),
  createData('4', '질문내용4', 'Pet & Met', 103),
  createData('5', '질문내용5', 'Pet & Met', 104),
  createData('6', '질문내용6', 'Pet & Met', 105),
  createData('7', '질문내용7', 'Pet & Met', 106),
  createData('8', '질문내용8', 'Pet & Met', 100),
  createData('9', '질문내용9', 'Pet & Met', 107),
  createData('10', '질문내용10', 'Pet & Met', 108),
  createData('11', '질문내용11', 'Pet & Met', 11),
  createData('12', '질문내용12', 'Pet & Met', 120),
  createData('13', '질문내용13', 'Pet & Met', 130),
  createData('14', '질문내용14', 'Pet & Met', 140),
  createData('15', '질문내용15', 'Pet & Met', 150),
]

function QnaList() {
  return (
    <>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          style={{ color: '#FFA629', fontWeight: 'bold' }}
        >
          Q & A 게시판
        </Typography>
        <List rows={rows}></List>
      </div>
    </>
  )
}

export default QnaList
export {}
