import {
  joinOvSession,
  JoinData,
  Center,
  Animal,
  JoinSession,
} from 'hooks/Live/useOvJoin'
import { useState } from 'react'

function JoinLive() {
  const [liveId, setLiveId] = useState<JoinSession>({
    live_id: 0,
  })
  const [joinData, setJoinData] = useState<JoinData>({
    thumbnail: '',
    center: {
      uuid: '',
    },
    animal: {
      uuid: '',
      name: '',
      age: 0,
      specie: '',
      breed: '',
      find_place: '',
      enter_date: '',
      photo_url: '',
    },
    live_id: 0,
    session_id: '',
    session_name: '',
  })

  const { data, refetch } = joinOvSession('')
  const handleLiveId = (id: string) => {
    setLiveId(prevState => ({
      ...prevState,
      live_id: Number(id),
    }))
  }
  const handleJoinSession = async () => {
    try {
      refetch()
      console.log(data)
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      <div>
        <input
          type="text"
          value={liveId.live_id}
          onChange={e => handleLiveId(e.target.value)}
          className="border-2"
        />
      </div>
      <button onClick={handleJoinSession} className="bg-black-200">
        버튼
      </button>
    </>
  )
}
export default JoinLive
