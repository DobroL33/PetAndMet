import React, { useState, useEffect } from 'react'
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import UserVideoComponent from './UserVideoComponent'
import { useOpenSessionInfo } from 'hooks/Live/useSessionInfo'
import { createOvSession } from 'hooks/Live/useOvOpen'

const OPENVIDU_SERVER_URL = 'https://i9b302.p.ssafy.io/ov/openvidu'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'
const DEFAULT_SESSION = 'Session'

const App = () => {
  const [mySessionId, setMySessionId] = useState(DEFAULT_SESSION)
  const [myUserName, setMyUserName] = useState(
    'Participant' + Math.floor(Math.random() * 100)
  )
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [isSubscriber, setIsSubscriber] = useState(false)
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined)
  const { sessionId, setSessionId } = useOpenSessionInfo()
  const [createSessionInfo, setCreateSessionInfo] = useState({
    center_uuid: '',
    session_name: '',
    session_id: '',
    center_item_id: {},
    animal_uuid: '',
  })
  const openLive = createOvSession()

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

      if (!isSubscriber) {
        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        })

        await mySession.publish(publisher)

        const devices = await OV.getDevices()
        const videoDevices = devices.filter(
          device => device.kind === 'videoinput'
        )
        const currentVideoDeviceId = publisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId
        const currentVideoDevice = videoDevices.find(
          device => device.deviceId === currentVideoDeviceId
        )

        setMainStreamManager(publisher)
        setPublisher(publisher)
        setCurrentVideoDevice(currentVideoDevice)
        // console.log('세션 아이디', mySessionId)
      }
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
    setMySessionId(DEFAULT_SESSION)
    setMyUserName('Participant' + Math.floor(Math.random() * 100))
    setMainStreamManager(undefined)
    setPublisher(undefined)
    setIsSubscriber(false)
  }

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices()
      const videoDevices = devices.filter(
        device => device.kind === 'videoinput'
      )

      if (videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(
          device => device.deviceId !== currentVideoDevice.deviceId
        )

        if (newVideoDevice) {
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: false,
          })

          await session.unpublish(mainStreamManager)
          await session.publish(newPublisher)

          setCurrentVideoDevice(newVideoDevice)
          setMainStreamManager(newPublisher)
          setPublisher(newPublisher)
        }
      }
    } catch (error) {
      console.error('Error switching camera:', error)
    }
  }

  const getToken = async () => {
    let sessionIdTemp = mySessionId
    if (mySessionId === DEFAULT_SESSION) {
      sessionIdTemp = await createSession()
    }
    return await createToken(sessionIdTemp)
  }

  const createSession = async () => {
    console.log('Creating session...')
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/api/sessions`,
        {},
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        }
      )
      // console.log(response.data.id)
      setMySessionId(response.data.id)
      setSessionId(response.data.id)
      handleChange('session_id', response.data.id)
      // openLive.mutate(createSessionInfo)
      return response.data.id
    } catch (error) {
      console.error('Error creating session:', error)
      return ''
    }
  }
  // useEffect(() => {
  //   console.log('Session ID updated in A component')
  // }, [setSessionId])
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
      return ''
    }
  }
  const handleChange = (fieldName, value) => {
    setCreateSessionInfo(prevState => ({
      ...prevState,
      [fieldName]: value,
    }))
  }
  useEffect(() => {
    if (createSessionInfo.session_id !== '') {
      openLive.mutate(createSessionInfo)
    }
  }, [createSessionInfo.session_id])
  return (
    <div>
      {session === undefined ? (
        <div>
          <div>
            <h1> Join a video session </h1>
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
              value={createSession.animal_uuid}
              onChange={e => handleChange('animal_uuid', e.target.value)}
              className="border-2"
            />
            <p>
              <button
                name="commit"
                type="submit"
                value="JOIN"
                onClick={joinSession}
              >
                접속
              </button>
            </p>
          </div>
        </div>
      ) : null}
      {session !== undefined ? (
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
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="카메라 전환"
            />
          </div>

          {/* <div id="main-video" className="col-md-6">
            <UserVideoComponent streamManager={mainStreamManager} />
          </div> */}

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {/* {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null} */}
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

export default App
