import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import List from 'containers/components/List'
import { useNavigate } from 'react-router-dom'


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
  ]
  
  function AdoptList() {
    let navigate = useNavigate()

    const goToCreateForm = () => {
      navigate('/adoptreviewform')
    }

    return (
    <>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          style={{ color: '#FFA629', fontWeight: 'bold' }}
        >
          입양 후기
        </Typography>
        <List rows={rows}></List>
      </div>
      <div style={{textAlign : 'end', width : '90%'}}>
      <Button sx={{bgcolor : '#FFBC5F', color : 'white', 
                  '&:hover': {
                    bgcolor: 'orange', // Change the hover color to orange
                    },
                  }}
                  onClick={goToCreateForm}
        >작성</Button>
       </div>
    </>
  )
}

export default AdoptList
export {}
