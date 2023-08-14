import { createOvSession, CreateSession } from 'hooks/Live/useOvOpen'
import { useOpenSessionInfo } from 'hooks/Live/useSessionInfo'
import { useState, useEffect } from 'react'
function OpenLive() {
  const [createSession, setCreateSession] = useState<CreateSession>({
    center_uuid: '',
    session_name: '',
    session_id: '',
    center_item_id: [],
    animal_uuid: '',
  })
  const [session, setSession] = useState<string>('')
  const { sessionId } = useOpenSessionInfo()
  const openLive = createOvSession()
  const handleChange = (fieldName: keyof CreateSession, value: string) => {
    setCreateSession(prevState => ({
      ...prevState,
      [fieldName]: value,
    }))
  }
  const handleOpenLive = () => {
    console.log(sessionId)
    // openLive.mutate(createSession)
  }
  useEffect(() => {
    console.log('Updated sessionId:', sessionId)
  }, [sessionId])
  return (
    <div className="flex w-1/2">
      <div className="flex flex-col justify-center">
        <input
          type="text"
          value={createSession.center_uuid}
          onChange={e => handleChange('center_uuid', e.target.value)}
          className="border-2"
        />
        <input
          type="text"
          value={createSession.session_name}
          onChange={e => handleChange('session_name', e.target.value)}
          className="border-2"
        />
        <input
          type="text"
          value={createSession.session_id}
          onChange={e => handleChange('session_id', e.target.value)}
          className="border-2"
        />
        <input
          type="text"
          value={createSession.animal_uuid}
          onChange={e => handleChange('animal_uuid', e.target.value)}
          className="border-2"
        />
        <button onClick={handleOpenLive}>생성</button>
      </div>
    </div>
  )
}
export default OpenLive
