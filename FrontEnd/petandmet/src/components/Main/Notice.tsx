import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import MainLive from 'components/Live/LiveList'
import AnimalList from 'components/Animal/AnimalList'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NoticeItem from './NoticeItem'
import {
  CenterUuidCredential,
  useAnimalSearch,
} from 'hooks/Animal/useAnimalSearch'

interface AdoptionStatusCredential {
  adoptionsStatus: string | null
}

function Notice() {
  const aStyle = {
    display: 'flex',
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center', // 수직 가운데 정렬
    marginTop: '20px',
  }
  const divStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    margin: '20px 0',
  }
  const h3Style = {
    fontSize: '24px',
    fontFamily: 'SCoreDream',
    color: '#212121',
    fontWeight: 700,
    letterSpacing: '-1px',
  }
  const pStyle = {
    marginLeft: '13px',
    fontSize: '16px',
    fontFamily: 'SCoreDream',
    color: '#414141',
    fontWeight: 400,
  }

  const [credential, setCredential] = useState<CenterUuidCredential>({
    center_uuid: undefined,
    adoptionStatus: 'POSSIBLE',
    size: 5,
  })
  const [animal, setAnimal] = useState([])
  const {
    data: animalData,
    refetch: refetchAnimal,
    isLoading: animalLoading,
    isSuccess: animalSuccess,
  } = useAnimalSearch(credential)

  useEffect(() => {
    if (animalData !== undefined) {
      setAnimal(animalData.response.animals)
    }
  }, [animalData])

  return (
    <>
      <div style={divStyle}>
        <h3 style={h3Style}>입양가능</h3>
        <p style={pStyle}>#새로운 가족을 기다리고 있어요</p>
      </div>
      <div className="flex justify-between gap-4">
        {animal.map((animal: any, idx: number) => (
          <NoticeItem key={idx} animal={animal} />
        ))}
      </div>
    </>
  )
}

export default Notice
