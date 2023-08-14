import {
  Container,
  Grid,
  Typography,
  LinearProgress,
  Button,
} from '@mui/material'
import pay from 'images/kakaopay.png'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const options = [5000, 10000, 15000, 20000, 50000]

interface CenterItem {
  center_item_id: number
  center_uuid: string
  item_name: string
  item_target_price: number
  item_url: string | null
}

function ItemDetail() {
  const [selectedOption, setSelectedOption] = useState<number>(0)
  const [donate, setDonate] = useState<boolean>(false)
  const [point, setPoint] = useState<number>(10000)
  const navigate = useNavigate()
  const location = useLocation()
  const item = location.state as CenterItem
  console.log('item', item)

  const handleOptionChange = (value: number) => {
    setSelectedOption(value)
  }
  const handleToggle = () => {
    setDonate(prevDonate => !prevDonate)
  }
  const goToBack = () => {
    navigate(-1)
  }

  const diffPoint = () => {
    if (point - selectedOption < 0) {
      alert('보유 포인트가 부족합니다. 충전하러 가기')
    } else {
      setPoint(prevPoint => prevPoint - selectedOption)
      alert('후원이 완료되었습니다.')
    }
    console.log(point)
  }

  return (
    <>
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            후원 물품
          </Typography>
        </div>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          marginBottom={10}
        >
          <Grid item xs={4} textAlign="center">
            <img src={pay} alt="" width="100%" />
          </Grid>
          <Grid item xs={8} textAlign="left">
            <Typography variant="body1" marginBottom={2.5}>
              물품 명 : {item?.item_name}
            </Typography>
            <Typography variant="body1" marginBottom={2.5}>
              목표 가격 : {item?.item_target_price}원
            </Typography>
            <Typography variant="body1" marginBottom={2.5}>
              남은 금액 : {item?.item_target_price - selectedOption}원
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(selectedOption / item?.item_target_price) * 100}
              sx={{ width: '50%', height: 15, mb: 2.5 }}
            />

            {donate ? (
              <Grid
                container
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <Grid item xs={6} md={6}>
                  {options.map(option => (
                    <div key={option}>
                      <label>
                        <input
                          type="radio"
                          value={option}
                          checked={selectedOption === option}
                          onChange={() => handleOptionChange(option)}
                        />
                        {option}원
                      </label>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    sx={{ bgcolor: 'blue', color: 'black' }}
                    onClick={diffPoint}
                  >
                    결제하기
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button
              sx={{ bgcolor: 'blue', color: 'black' }}
              onClick={handleToggle}
            >
              후원하기
            </Button>
            <Button sx={{ bgcolor: 'red', color: 'black' }} onClick={goToBack}>
              돌아가기
            </Button>
            <Button sx={{ bgcolor: 'blue', color: 'black' }}>수정</Button>
            <Button sx={{ bgcolor: 'red', color: 'black' }} disableRipple>
              삭제
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ItemDetail
export {}
