import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAccessToken } from 'hooks/useAccessToken'
import { Animal } from 'hooks/Animal/AnimalListStore'
import { createOvSession } from 'hooks/Live/useOvOpen'

interface CreateSessionInfo {
  center_uuid: string
  session_name: string
  session_id: string
  center_item_id: []
  animal_uuid: string
}

function CreateSession() {
  const location = useLocation()
  const navigate = useNavigate()
  const openLive = createOvSession()
  const animal = location.state as Animal
  const { centerUuid } = useAccessToken()
  const [createSessionInfo, setCreateSessionInfo] = useState<CreateSessionInfo>(
    {
      center_uuid: centerUuid,
      session_name: '',
      session_id: '',
      center_item_id: [],
      animal_uuid: animal.uuid,
    }
  )

  const handleSessionName = (value: string) => {
    setCreateSessionInfo(prevState => ({
      ...prevState,
      session_name: value,
    }))
  }
  const handleStreaming = () => {
    openLive.mutate(createSessionInfo, {
      onSuccess: data => {
        navigate(`/live/${data.response.live_id}`, {
          state: createSessionInfo,
        })
      },
    })
  }
  return (
    <div>
      <div>
        <p>{createSessionInfo.center_uuid}</p>
        <h1>방송 제목</h1>
        <input
          type="text"
          value={createSessionInfo?.session_name}
          onChange={e => handleSessionName(e.target.value)}
          className="border-2"
        />
        <h1>동물 이름</h1>
        {animal.name}
        <p>
          <button name="commit" type="submit" onClick={handleStreaming}>
            방송 시작
          </button>
        </p>
      </div>
    </div>
  )
}

export default CreateSession
