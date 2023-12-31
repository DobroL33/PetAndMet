import React, { Component } from 'react'

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props)
    this.videoRef = React.createRef()
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current)
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current)
    }
  }

  render() {
    return (
      <video
        className="min-w-[900px] rounded-xl"
        autoPlay={true}
        ref={this.videoRef}
      />
    )
  }
}
