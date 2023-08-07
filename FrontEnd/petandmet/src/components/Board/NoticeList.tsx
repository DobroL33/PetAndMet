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
  createData('1', '<Link to="/">공지사항1</Link>', 'Pet & Met', 100),
  createData('2', '공지사항2', 'Pet & Met', 101),
  createData('3', '공지사항3', 'Pet & Met', 102),
  createData('4', '공지사항4', 'Pet & Met', 103),
  createData('5', '공지사항5', 'Pet & Met', 104),
  createData('6', '공지사항6', 'Pet & Met', 105),
  createData('7', '공지사항7', 'Pet & Met', 106),
  createData('8', '공지사항8', 'Pet & Met', 100),
  createData('9', '공지사항9', 'Pet & Met', 107),
  createData('10', '공지사항10', 'Pet & Met', 108),
  createData('11', '공지사항11', 'Pet & Met', 11),
  createData('12', '공지사항12', 'Pet & Met', 120),
  createData('13', '공지사항13', 'Pet & Met', 130),
  createData('14', '공지사항14', 'Pet & Met', 140),
  createData('15', '공지사항15', 'Pet & Met', 150),
]

function NoticeList() {
  return (
    <>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          style={{ color: '#FFA629', fontWeight: 'bold' }}
        >
          공지사항
        </Typography>
        <List rows={rows}></List>
      </div>
    </>
  )
}

export default NoticeList
export {}
