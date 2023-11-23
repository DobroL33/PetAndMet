import { Box } from '@mui/material'
import CardInfoLive from 'containers/components/CardLive'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface LiveListProps {
  num?: number
}

function LiveList({ num = 16 }: LiveListProps) {
  const [liveToShow, setLivesToShow] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('https://i9b302.p.ssafy.io/api/v1/live?page=0&size=16')
      .then(response => {
        console.log(response.data)
        const Lives = response.data.response.lives
        setLivesToShow(Lives)
      })
      .catch(error => {
        console.error(error)
      })
  }, [num])

  let livesToShow: any = []

  if (num !== undefined) {
    livesToShow = liveToShow.slice(0, num) // liveToShow의 첫 num개의 요소만 사용
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 my-3">
        {livesToShow.map((live: any, idx: number) => (
          <CardInfoLive key={idx} live={live} />
        ))}
      </div>
    </>
  )
}

export default LiveList
export {}
