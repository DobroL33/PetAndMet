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

interface props {
  animalData: Animal
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateSession({ animalData, setIsModal }: props) {
  const animal = animalData
  const location = useLocation()
  const navigate = useNavigate()
  const openLive = createOvSession()
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
        // navigate(`/live/${data.response.live_id}`, {
        //   state: createSessionInfo,
        // })
        window.open(`/live/${data.response.live_id}`, '_blank')
        setIsModal(false)
      },
    })
  }
  return (
    <div className="bg-gray-400/75 h-80 w-64 rounded-tl-xl rounded-br-xl overflow-hidden flex flex-col justify-between py-8 px-4">
      <div className="flex justify-center text-2xl">
        <p>{animal.name}</p>
      </div>
      <label className="flex flex-col-reverse relative focus group my-6">
        <input
          type="text"
          name="title"
          value={createSessionInfo?.session_name}
          onChange={e => handleSessionName(e.target.value)}
          className="border-2 border-gray-300 rounded-xl px-2 leading-9"
        />
        <span
          className={`${
            createSessionInfo?.session_name
              ? '-translate-y-10'
              : 'group-focus-within:-translate-y-10'
          } absolute text-md transform left-4 transition leading-10 group-focus-within:-translate-y-10`}
        >
          방송 제목
        </span>
      </label>
      <div className="flex justify-around">
        <button
          name="commit"
          type="submit"
          onClick={handleStreaming}
          className="bg-green-500 hover:bg-green-300 z-20 min-w-[40%] rounded-md text-gray-100 py-1 px-2"
        >
          방송 시작
        </button>
        <div
          onClick={() => setIsModal(false)}
          className="cursor-pointer bg-red-500 hover:bg-red-300 z-20 min-w-[40%] rounded-md text-gray-100 py-1 px-2"
        >
          취소
        </div>
      </div>
    </div>
  )
}

export default CreateSession
