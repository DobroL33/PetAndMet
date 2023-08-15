import React, { useState, useEffect } from 'react'
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import UserVideoComponent from './UserVideoComponent'
import { joinOvSession } from 'hooks/Live/useOvJoin'

const OPENVIDU_SERVER_URL = 'https://i9b302.p.ssafy.io/ov/openvidu'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'

const JoinOpenVidu = props => {
  const liveId = props.Id
  const [isError, setIsError] = useState(false)
  const [mySessionId, setMySessionId] = useState('')
  // const [myUserName, setMyUserName] = useState(
  //   'Participant' + Math.floor(Math.random() * 100)
  // )
  const [myUserName, setMyUserName] = useState(props.Name)
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined)
  // const [liveId, setLiveId] = useState({
  //   live_id: 1234,
  // })
  const { data, refetch } = joinOvSession(liveId)

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

  const leaveSession = () => {
    if (session) {
      session.disconnect()
    }

    setSession(undefined)
    setSubscribers([])
    setMySessionId('')
    setMyUserName('Participant' + Math.floor(Math.random() * 100))
    setMainStreamManager(undefined)
    setPublisher(undefined)
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
  const handleJoinSession = async () => {
    try {
      await refetch()
      console.log(data)
      setMySessionId(data.response.session_id)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    handleJoinSession()
  }, [data])
  useEffect(() => {
    joinSession()
  }, [mySessionId])
  return (
    <div>
      {isError ? (
        <div>Error</div>
      ) : session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="방송 종료"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {subscribers.map((sub, i) => (
              <div id="main-video" key={sub.id} className="stream-container">
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default JoinOpenVidu
