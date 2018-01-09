import React, {Component} from 'react'
import AlertContainer from 'react-alert'

class Flash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    time: 20000,
    theme: 'light',
    transition: 'scale'
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({alert: nextProps.alert})
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.show;
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.showAlert(this.state.alert);
  }

  showAlert = (alert) => {
    this.msg.show(alert.msg, {
      type: alert.type,
    });
    this.clearAlert();
  }

  clearAlert = () => {
    this.props.clearAlert();
  }

  render () {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </div>
    )
  }
}

export default Flash;
