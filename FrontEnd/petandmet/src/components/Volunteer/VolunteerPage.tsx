import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { Button, colors } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import * as React from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import newLogo from 'images/new_logo.jpg'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

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

function CustomCard({ title, content }: { title: string; content: string }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="80" image={newLogo} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>{/* Add your button actions here */}</CardActions>
      <CustomButton>산책 신청하기</CustomButton>
      <CustomButton>봉사 신청하기</CustomButton>
    </Card>
  )
}

// 1. VolunteerPage에서의 center 의 state를 받는다.
// 2. 해당 state 에는 보호소 관련 DB 데이터를 받을 수 있다 => 등록된 보호소 개수만큼 mapping
// 2-1 보호소가 4개를 넘어가면 그 다음 Carousel 에서 보여주기
// 3. 두가지 선택지 (산책하기, 봉사하기) 중 선택
// 3-1 산책하기를 누르면 해당 보호소를 선택한 상태 state를 담은채로 WalkPage(산책페이지)로 이동. (Zustand로 상태 관리)
// 3-2 봉사하기를 누르면 해당 보호소에 직접 연락을 할 수 있는 연락처 or 봉사 관련 게시판에 봉사 내용 신청

function VolunteerPage() {
  // 여기있는 데이터를 DB에서 받아와서 쓸 거임
  const [center] = useState([
    {
      id: 0,
      title: '대전 동물 보호센터',
      content: '대전 어딘가',
    },

    {
      id: 1,
      title: '경기 동물 센터',
      content: '경기 어딘가',
    },

    {
      id: 2,
      title: '우리도 살리센터',
      content: 'B302',
    },
    {
      id: 3,
      title: '안돼 돌아가',
      content: '법원 어딘가',
    },
    {
      id: 4,
      title: '테스트에용',
      content: '실험실 어딘가',
    },
    {
      id: 5,
      title: '테스트에용',
      content: '실험실 어딘가',
    },
  ]) // 여기를 DB에서 받는걸로 바꿔줄거

  const itemsPerPage = 4
  const totalPages = Math.ceil(center.length / itemsPerPage)

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const [currentPage, setCurrentPage] = useState<number>(0)

  return (
    <>
      <CssBaseline />
      <h4 className="text-3xl text-yellow-500 font-extrabold my-9">봉사활동</h4>
      <Container
        sx={{
          mt: 5,
          display: 'flex',
          bgcolor: '#FFE8A3',
          height: '100%',
          width: '60%',
          borderRadius: 5,
        }}
      >
        <Container
          sx={{
            my: 5,
            mx: 3,
            display: '',
            bgcolor: '#ffffff',
            height: '90%',
            width: '98%',
            borderRadius: 5,
          }}
        >
          <Box sx={{ width: '100%' }} marginY={5} marginLeft={3}>
            <Grid container rowSpacing={5}>
              {center
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map(centerItem => (
                  <Grid key={centerItem.id} item xs={5} md={6}>
                    <CustomCard
                      title={centerItem.title}
                      content={centerItem.content}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          {/* Pagination buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                sx={{ margin: '0.5rem' }}
                variant={currentPage === index ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Container>
      </Container>
    </>
  )
}

export default VolunteerPage
