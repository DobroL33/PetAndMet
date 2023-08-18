import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import MainLive from 'components/Live/LiveList'
import AnimalList from 'components/Animal/AnimalList'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'css/noticeItem.css'

interface Animal {
  animal_uuid: string | null
  animal_photo_url: string | undefined
  name: string | null
  age: string | null
  specie: string | null
  breed: string | null
  gender: string | null
  character: string | null
}

interface AnimalIntroduceInfoProps {
  animal: Animal
}

function NoticeItem({ animal }: AnimalIntroduceInfoProps) {
  const imageStyle = {
    width: '100%', // 이미지 너비를 50%로 설정
    height: '100%', // 높이는 자동 조절
  }
  const iStyle = {
    display: 'flex',
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center', // 수직 가운데 정렬
  }
  const tagStyle = {
    padding: '5px',
    fontSize: '12px',
    color: '#fff',
    fontWeight: '500',
    background: '#397dce',
    borderRadius: '25px',
    margin: '10px 0',
  }

  const borderedStyle = {
    border: '0.1px solid grey', // 밑줄을 표현하는 border 스타일을 추가
    marginRight: '10px',
    borderRadius: '0 0 13px 13px',
    borderWidth: '0 1px 1px 1px',
    borderStyle: 'solid',
    borderColor: '#e1e1e1',
  }
  const strongStyle = {
    fontSize: '18px',
    color: '#212121',
    fontWeight: 500,
  }
  const pStyle = {
    fontSize: '15px',
    color: '#717171',
    fontWeight: '400',
  }
  const gender = animal.gender == 'MALE' ? '수컷' : '암컷'

  return (
    <div className="overflow-hidden bg-gray-200 rounded-xl shadow-xl">
      <div className="cursor-pointer ">
        <i style={iStyle} className="a w-full h-52 rounded-xl">
          <img src={animal.animal_photo_url} style={imageStyle} alt="" />
        </i>
        <div>
          <span style={tagStyle}>입양가능</span>
          <br />
          <strong style={strongStyle}>{animal.breed}</strong>
          <p style={pStyle}>{gender}</p>
        </div>
      </div>
    </div>
  )
}

export default NoticeItem
