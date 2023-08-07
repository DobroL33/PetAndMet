import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import { Button, Container, Grid } from '@mui/material'
import logo from 'images/logo.png'
import { styled } from '@mui/material/styles'

function createData(
  관리번호: string,
  공고번호: string,
  입양상태: string,
  지역분류: string,
  종류: string,
  품종: string,
  성별: string,
  발견장소: string,
  구조일: string,
  공고일: string,
  입양신청시작일시: string,
  입소당시나이: string
) {
  return {
    관리번호,
    공고번호,
    입양상태,
    지역분류,
    종류,
    품종,
    성별,
    발견장소,
    구조일,
    공고일,
    입양신청시작일시,
    입소당시나이,
  }
}

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFA629',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'orange',
  },
  margin: '5px',
}))

export default function AnimalDetail() {
  type AnimalData = ReturnType<typeof createData>

  const [animalData, setAnimalData] = useState<AnimalData[]>([])
  const rows = [
    createData(
      '23-1-213',
      '미지정',
      '임시보호',
      '동구',
      '개',
      '믹스',
      '수컷',
      '000동 000 부근',
      '2023-07-18',
      '미지정',
      '미지정',
      '2년(추정)'
    ),
  ]
  useState(() => {
    setAnimalData(rows)
  })

  return (
    <Container>
      <Grid>
        <img src={logo} alt="ddd" />
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
        <Table sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
          <TableBody>
            <TableCell sx={{ backgroundColor: '#FFBC5F', width: '20%' }}>
              <TableRow>관리번호</TableRow>
              <hr />
              <TableRow>공고번호</TableRow>
              <hr />
              <TableRow>입양상태</TableRow>
              <hr />
              <TableRow>지역분류</TableRow>
              <hr />
              <TableRow>종류</TableRow>
              <hr />
              <TableRow>품종</TableRow>
            </TableCell>
            {rows.map(row => (
              <TableCell key={row.관리번호} sx={{ width: '30%' }}>
                <TableRow component="th" scope="row">
                  {row.관리번호}
                </TableRow>
                <hr />
                <TableRow>{row.공고번호}</TableRow>
                <hr />
                <TableRow>{row.입양상태}</TableRow>
                <hr />
                <TableRow>{row.지역분류}</TableRow>
                <hr />
                <TableRow>{row.종류}</TableRow>
                <hr />
                <TableRow>{row.품종}</TableRow>
              </TableCell>
            ))}

            <TableCell sx={{ backgroundColor: '#FFBC5F', width: '20%' }}>
              <TableRow>성별</TableRow>
              <hr />
              <TableRow>발견장소</TableRow>
              <hr />
              <TableRow>구조일</TableRow>
              <hr />
              <TableRow>공고일</TableRow>
              <hr />
              <TableRow>입양신청시작일시</TableRow>
              <hr />
              <TableRow>입소당시나이</TableRow>
            </TableCell>
            {rows.map(row => (
              <TableCell key={row.관리번호} sx={{ width: '30%' }}>
                <TableRow>{row.성별}</TableRow>
                <hr />
                <TableRow>{row.발견장소}</TableRow>
                <hr />
                <TableRow>{row.구조일}</TableRow>
                <hr />
                <TableRow>{row.공고일}</TableRow>
                <hr />
                <TableRow>{row.입양신청시작일시}</TableRow>
                <hr />
                <TableRow>{row.입소당시나이}</TableRow>
              </TableCell>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid sx={{ margin: '30px', display: '' }}>
        <CustomButton>사용자 - 돌아가기</CustomButton>
        <CustomButton>관리자 - 작성 & 수정</CustomButton>
        <CustomButton>관리자 -삭제</CustomButton>
      </Grid>
    </Container>
  )
}
