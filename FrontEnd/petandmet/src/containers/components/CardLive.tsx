import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { domain } from 'hooks/customQueryClient'
import useAnimal from 'hooks/Animal/useAnimal'

interface Live {
  live_id: number | null
  thumbnail: string | null
  session_name: string | null
  animal_uuid: string | null
  center_uuid: string | null
}

interface Animal {
  animal_uuid: string | null
  // animal_photo_url: string | null;
  name: string | null
  age: string | null
  specie: string | null
  breed: string | null
}

interface CardLiveInfoProps {
  live: Live
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const AnimalInfo = ['방 제목', '동물 이름', '품종']

function CardLiveInfo({ live }: CardLiveInfoProps) {
  if (!live) {
    return null // 또는 로딩 중이라는 메시지나 다른 표시를 반환
  }
  const [animal, setAnimal] = useState<any>()

  useEffect(() => {
    const url = `${domain}/animal/detail?uuid=${live.animal_uuid}`
    axios
      .get(url)
      .then(response => {
        // 응답에서 받은 데이터를 저장
        const animalData = response.data.response

        // animal_uuid 값을 추가
        setAnimal({
          ...animalData,
          animal_uuid: live.animal_uuid,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }, [live.animal_uuid])

  let animalsToShow: any = []

  const navigate = useNavigate()

  const { setAnimalData } = useAnimal()

  const handleCardClick = () => {
    if (live.animal_uuid && animal) {
      setAnimalData({
        animal_uuid: live.animal_uuid,
        name: animal.name,
        age: animal.age,
        gender: animal.gender,
        breed: animal.breed,
        center_uuid: live.center_uuid,
      })
      navigate(`/live/streaming/${live.live_id}`)
    }
  }

  return (
    <Card sx={{ width: '100%', borderRadius: 3 }} onClick={handleCardClick}>
      <CardContent sx={{ padding: '0 !important', textAlign: 'left' }}>
        <div className="">
          {animal ? (
            <img
              src={animal.photo_url}
              alt=""
              className="rounded-xl h-full shadow-xl"
            />
          ) : (
            <></>
          )}
        </div>
        <div className="text-md p-4">
          {AnimalInfo.map((info, idx) => (
            <div key={idx}>
              <span> {info} : </span>
              <span>
                {info === '방 제목' && live?.session_name}
                {info === '동물 이름' && animal?.name}{' '}
                {/* "이름" 대신 "동물 이름"으로 변경 */}
                {info === '품종' && animal?.breed}
              </span>
              <br />
            </div>
          ))}
          {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        </div>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>  
      </CardActions> */}
    </Card>
  )
}

export default CardLiveInfo
export {}
