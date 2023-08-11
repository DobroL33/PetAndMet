import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import UserVideoComponent from "./UserVideoComponent";

const OPENVIDU_SERVER_URL = "https://i9b302.p.ssafy.io/ov/openvidu";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";
const DEFAULT_SESSION = "Session";

class App extends Component {
  constructor(props) {
    super(props);

    // HTML 렌더링 위한 구성 요소 초기 상태
    this.state = {
      mySessionId: DEFAULT_SESSION, //세션명, 부모로 부터 전달됨
      myUserName: "Participant" + Math.floor(Math.random() * 100), //사용자의 닉네임
      session: undefined, //OpenVidu의 세션 객체
      mainStreamManager: undefined, //현재 사용자의 스트림
      publisher: undefined, //사용자의 퍼블리셔 객체
      subscribers: [], //구독중인 다은 사용자들의 스트림 매니저 배열
      isSubscriber: false,
    };

    //메서드 바인딩
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  //컴포넌트가 렌더링 된 후 호출
  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    // this.joinSession();
  }

  //컴포넌트 언마운트 되기 전에 호출
  componentWillUnmount() {
    console.log("leave");
    this.leaveSession();
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  //페이지를 닫거나 리로드 할 때 이벤트 발생
  onbeforeunload(event) {
    this.leaveSession();
  }

  //컴포넌트 내에서 사용자 입력에 따라 상태 업데이트
  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value, //세션명 변경
    });
  }

  //컴포넌트 내에서 사용자 입력에 따라 상태 업데이트
  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value, //사용자명 변경
    });
  }

  handleCheckboxChange(event) {
    this.setState({
      isSubscriber: event.target.checked,
    });
  }

  //컴포넌트 내에서 메인 비디오 스트림을 관리
  handleMainVideoStream(stream) {
    //현재 메인 스트림 매니저와 주어진 스트림이 같지 않은 경우 업데이트
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  //구독자 제거
  //streamManager: 제거하려는 구독자의 스트림 매니저
  deleteSubscriber(streamManager) {
    //현재 구독자 목록
    let subscribers = this.state.subscribers;
    //제거하려는 구독자의 스트림 매니저가 현재 구독자 목록에 있는지 확인
    let index = subscribers.indexOf(streamManager, 0);
    //구독자 찾은 경우
    if (index > -1) {
      //찾은 인덱스를 사용하여 구독자 목록에서 제거
      subscribers.splice(index, 1);
      //변경된 구독자 목록을 상태 업데이트하여 컴포넌트 리렌더링
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    console.log(this.state);
    //1. openvidu 객체 생성
    this.OV = new OpenVidu();
    //socket 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log를 띄우지 않게 하는 모드
    this.OV.enableProdMode();
    //2. 세션 시작
    this.setState(
      {
        session: this.OV.initSession(), //initSesison 생성
      },
      () => {
        var mySession = this.state.session;

        //3. 세션에서 이벤트가 발생할 때 수행할 작업 지정

        //새로운 스트림이 수신될 때마다 구독자 추가
        mySession.on("streamCreated", (event) => {
          //event.stream으로 전달된 스트림을 구독자에 추가
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // 구독자 상태 업데이트
          this.setState({
            subscribers: subscribers,
          });
        });

        //스트림이 삭제될 때마다
        mySession.on("streamDestroyed", (event) => {
          //구독자 목록에서 스트림 제거
          this.deleteSubscriber(event.stream.streamManager);
        });

        //예외 발생 시 처리
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        //4. 토큰을 받아 세션에 연결

        //OpenVidu 서버에서 토큰 받기
        this.getToken().then((token) => {
          console.log("받은 토큰:", token);
          mySession
            //token: OpenVidu 서버에서 받은 토큰
            //{ clientData: this.state.myUserName }: 'streamCreated' 이벤트에서 모든 사용자가 검색, 사용자의 이름으로 DOM에 추가
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              //5. 카메라 스트림 얻기
              //원하는 속성을 사용하여 publisher 초기화
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, //기본 마이크 사용시 undefined
                videoSource: undefined, //기본 웹캠 사용시 undefined
                publishAudio: true, //소리 활성화 여부
                publishVideo: true, //비디오 활성화 여부
                resolution: "640x480", //비디오 해상도 설정
                frameRate: 30, //비디오 프레임
                insertMode: "APPEND", //비디오 타겟 삽입 방식
                mirror: false, //비디오 거울 반전 여부
              });

              console.log("구독자 여부: ", this.state.isSubscriber);

              //6. 호스트인 경우만 스트림 시작
              if (this.state.isSubscriber == false) {
                mySession.publish(publisher);

                //현재 사용중인 비디오 장치 가져오기
                var devices = await this.OV.getDevices();
                var videoDevices = devices.filter((device) => device.kind === "videoinput");
                var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                var currentVideoDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);

                //state 저장
                this.setState({
                  currentVideoDevice: currentVideoDevice,
                  mainStreamManager: publisher,
                  publisher: publisher,
                });
              }
            })
            .catch((error) => {
              console.log("세션 연결 오류:", error.code, error.message);
            });
        });
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    //7. 'disconnect'를 호출하여 세션 종료
    if (mySession) {
      mySession.disconnect();
    }

    //모든 속성 비우기
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: DEFAULT_SESSION,
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
      isSubscriber: false,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter((device) => device.deviceId !== this.state.currentVideoDevice.deviceId);

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: false,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  //OpenVidu 세션 및 스트림을 표시하는 화면 구성 정의
  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input className="form-control" type="text" id="userName" value={myUserName} onChange={this.handleChangeUserName} required />
                </p>
                <p>
                  <label> Session: </label>
                  <input className="form-control" type="text" id="sessionId" value={mySessionId} onChange={this.handleChangeSessionId} required />
                </p>
                <p>
                  <input type="checkbox" id="myCheckbox" onChange={this.handleCheckboxChange} /> 구독자 여부
                </p>
                <p className="text-center">
                  <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                </p>
              </form>
            </div>
          </div>
        ) : null}
        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{mySessionId}</h1>
              <input className="btn btn-large btn-danger" type="button" id="buttonLeaveSession" onClick={this.leaveSession} value="Leave session" />
              <input className="btn btn-large btn-success" type="button" id="buttonSwitchCamera" onClick={this.switchCamera} value="Switch Camera" />
            </div>

            {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null}
            <div id="video-container" className="col-md-6">
              {/* {this.state.publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null} */}
              {this.state.subscribers.map((sub, i) => (
                <div id="main-video" key={sub.id} className="stream-container">
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */

  //토큰 가져오기
  async getToken() {
    //세션명이 기본값인 경우
    if (this.state.mySessionId === DEFAULT_SESSION) {
      this.state.mySessionId = await this.createSession();
    }
    return await this.createToken(this.state.mySessionId);
  }

  //새로운 세션 생성
  async createSession() {
    console.log("세션 생성 시작");
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "/api/sessions",
      {},
      {
        headers: {
          Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.id);
    return response.data.id;
  }

  //토큰 생성
  async createToken(sessionId) {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "/api/sessions/" + sessionId + "/connection",
      {},
      {
        headers: {
          Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.token;
  }
}

export default App;
