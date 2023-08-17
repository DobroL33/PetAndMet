import React, { useState, useEffect } from 'react'
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import UserVideoComponent from './UserVideoComponent'
import { joinOvSession } from 'hooks/Live/useOvJoin'

const OPENVIDU_SERVER_URL = 'https://i9b302.p.ssafy.io/ov/openvidu'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'

const JoinOpenVidu = props => {
  const liveId = props.Id
  const [isError, setIsError] = useState(true)
  const [mySessionId, setMySessionId] = useState('')
  const [myUserName, setMyUserName] = useState(props.Name)
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const { data, refetch, isSuccess } = joinOvSession(liveId)

  const deleteSubscriber = streamManager => {
    const updatedSubscribers = subscribers.filter(sub => sub !== streamManager)
    setSubscribers(updatedSubscribers)
  }

  const joinSession = async () => {
    console.log('Joining session...')
    const OV = new OpenVidu()
    OV.enableProdMode()

    const mySession = OV.initSession()
    setSession(mySession)

    mySession.on('streamCreated', event => {
      const subscriber = mySession.subscribe(event.stream, undefined)
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber])
    })

    // streamDestroyed 이벤트 리스너 등록
    mySession.on('streamDestroyed', event => {
      deleteSubscriber(event.stream.streamManager)
    })

    // exception 이벤트 리스너 등록
    mySession.on('exception', exception => {
      console.warn(exception)
    })
    try {
      const token = await getToken() // getToken 함수 구현 필요
      await mySession.connect(token, { clientData: myUserName })
    } catch (error) {
      console.log('세션 연결 오류:', error.code, error.message)
    }
  }

  const getToken = async () => {
    let sessionIdTemp = mySessionId
    return await createToken(sessionIdTemp)
  }
  const createToken = async sessionId => {
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data.token
    } catch (error) {
      console.error('Error creating token:', error)
      setIsError(true)
      throw error
    }
  }
  useEffect(() => {
    handleJoinSession()
  }, [data])
  const handleJoinSession = async () => {
    try {
      await refetch()
      console.log(data)
      if (isSuccess) {
        setMySessionId(data.response.session_id)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    if (mySessionId !== '') {
      joinSession()
      setIsError(false)
    }
  }, [mySessionId])

  useEffect(() => {
    console.log(subscribers)
  }, [subscribers])

  return (
    <div>
      {isError && session === undefined ? (
        <div>Error</div>
      ) : (
        <>
          {subscribers.length > 0 ? (
            <div id="session">
              <div id="video-container" className="col-md-6">
                {subscribers.map((sub, i) => (
                  <div
                    id="main-video"
                    key={i + 'V'}
                    className="stream-container"
                  >
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </>
      )}
    </div>
  )
}

export default JoinOpenVidu
