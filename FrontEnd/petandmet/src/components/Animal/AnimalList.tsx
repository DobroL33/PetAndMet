import { Box, Pagination } from '@mui/material'
import CardInfo from 'containers/components/Card'
import { useEffect, useState } from 'react'
import { useAnimalList, Animal } from 'hooks/Animal/useAnimalList'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

function AnimalList() {
  const [animalToShow, setAnimalsToShow] = useState<Animal[]>()
  const { data, refetch } = useAnimalList()
  const location = useLocation()
  const showPagination = location.state as Boolean
  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (data) {
      setAnimalsToShow(data.response)
    }
  }, [data])

  const [currentPage, setCurrentPage] = useState<number>(0)
  const animalsPerPage = 8
  const totalAnimals = animalToShow?.length || 0
  const totalPages = Math.ceil(totalAnimals / animalsPerPage)
  const startIndex = currentPage * animalsPerPage
  const endIndex = startIndex + animalsPerPage

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 my-3">
        {animalToShow !== undefined &&
          animalToShow.slice(startIndex, endIndex).map(animal => {
            return <CardInfo key={animal.animal_uuid} animal={animal} />
          })}
      </div>
      <Box>
        {showPagination && (
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            page={currentPage + 1}
            onChange={(event, page) => handlePageChange(event, page - 1)}
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        )}
      </Box>
    </>
  )
}
export default AnimalList
