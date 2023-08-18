import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import logo from 'images/logo.png'
import { useNavigate } from 'react-router-dom'
interface Animal {
  animal_uuid: string | null,
  animal_photo_url: string | null,
  name: string | null,
  age: number | null,
  specie: string | null,
  breed: string | null,
}

interface CardInfoProps {
  animal: Animal // 동물 데이터를 받아오는 props
}

const AnimalInfo = ['이름', '나이', '종류', '품종']

function CardInfo({ animal }: CardInfoProps) {

  const navigate = useNavigate()
  const handleCardClick = () => {
    if (animal.animal_uuid) {
      console.log('Clicked animal UUID:', animal.animal_uuid)
      navigate(`/animal/detail/${animal.animal_uuid}`)
    }
  }

  return (
    <Card sx={{ maxWidth: 250, borderRadius: 3 }} onClick={handleCardClick}>
      {animal.animal_photo_url &&
      typeof animal.animal_photo_url === 'string' ? (
        <CardMedia
          component="img"
          image={animal.animal_photo_url}
          style={{ width: '100%' }}
          alt={logo}
        />
      ) : (
        <CardMedia
          component="img"
          image={logo}
          style={{ width: '100%' }}
          alt={logo}
        />
      )}
      <CardContent sx={{ padding: '0 !important', textAlign: 'left' }}>
        <div className="mt-3 text-md">
          {AnimalInfo.map((info, idx) => (
            <div key={idx}>
              <span>{info} : </span>
              <span>
                {info === '이름' && animal.name}
                {info === '나이' && animal.age}
                {info === '종류' && animal.specie}
                {info === '품종' && animal.breed}
              </span>
              <br />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardInfo
export {}
