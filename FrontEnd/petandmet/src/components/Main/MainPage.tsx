import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Button, StyledComponentProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import MainLive from 'components/Live/LiveList'
import AnimalList from 'components/Animal/AnimalList'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnimalList, Animal } from 'hooks/Animal/useAnimalList'
import Introduce from './Introduce'
import AdoptionReview from './AdoptionReview'
import Notice from './Notice'

interface CustomButtonProps extends StyledComponentProps {
  isActive: boolean
}

const btn = ['라이브', '보호동물']
const CustomButton = styled(Button)(({ isActive }: CustomButtonProps) => ({
  backgroundColor: isActive ? '#FF6F26' : '#FFA629',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#FF6F26',
  },
  margin: '5px',
}))

function MainPage() {
  const [channel, setChannel] = useState(0)
  const [isActive, setIsActive] = useState([true, false, false])
  let navigate = useNavigate()
  const goToLiveList = () => {
    navigate('/livelist')
  }
  const goToAnimalList = () => {
    navigate('/animallist', { state: 'true' })
  }
  const goToVolunteer = () => {
    navigate('/volunteer')
  }
  const handleButtonClick = (idx: number) => {
    setChannel(idx)
    const newIsActive = isActive.map((_, i) => i === idx)
    setIsActive(newIsActive)
  }
  const [showPagination, setShowPagination] = useState<boolean>(false)

  return (
    <div className="flex justify-center">
      <div className="w-[60%] flex flex-col justify-center">
        <CssBaseline />
        <Introduce></Introduce>
        <Notice></Notice>
        {/* <AdoptionReview></AdoptionReview> */}
        <div className="rounded-xl shadow-xl mt-10 py-3 px-6 bg-amber-300 flex flex-col justify-center">
          <Box
            sx={{
              display: 'flex',
              padding: '0 !important 16px',
            }}
          >
            {btn.map((b, idx) => (
              <CustomButton
                key={idx}
                isActive={isActive[idx]}
                onClick={() => handleButtonClick(idx)}
              >
                {b}
              </CustomButton>
            ))}
          </Box>

          {channel === 1 ? <AnimalList /> : <MainLive />}

          <CustomButton
            isActive={isActive[channel]}
            onClick={
              channel === 1
                ? goToAnimalList
                : channel === 2
                ? goToVolunteer
                : goToLiveList
            }
          >
            {btn[channel]} 더보기
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default MainPage
