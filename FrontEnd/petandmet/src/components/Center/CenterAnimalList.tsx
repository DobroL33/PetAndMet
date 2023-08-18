import { Box } from '@mui/material'
import CardInfo from 'containers/components/customCard'
import { AninmalSearchListStore, Animal } from 'hooks/Animal/AnimalListStore'
import { LiveListSearchStore, Live } from 'hooks/Live/LiveSearchStore'

function CenterAnimalList() {
  const animalList = AninmalSearchListStore()
  const liveList = LiveListSearchStore()
  const animals = animalList.animals
  const lives = liveList.lives

  if (animals && animals.length > 0) {
    return (
      <>
        <Box
          sx={{
            mt: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 이 부분을 추가하여 카드를 자동으로 정렬합니다.
            gap: '20px', // 카드 간 간격 설정
            height: '100%',
            paddingY: '16px',
          }}
        >
          {animals.map((animal: Animal) => {
            let filteredLives: Live[] = []
            if (lives !== null && lives !== undefined) {
              filteredLives = lives.filter(
                live => live.animal_uuid === animal.uuid
              )
            }
            return (
              <CardInfo
                key={animal.uuid}
                animal={animal}
                lives={filteredLives}
              />
            )
          })}
        </Box>
      </>
    )
  } else {
    return (
      <>
        <h1>등록된 보호 동물이 없습니다.</h1>
      </>
    )
  }
}
export default CenterAnimalList
