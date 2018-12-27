import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'quo-redux/actions';
import selectors from 'quo-redux/selectors';

class MessageStack extends Component{
  render(){
    return(
      <div className='message-stack-wrapper'>
        {
          this.props.messages.entrySeq().map(([id, message]) => {
            return <Message message={message} key={id}/>
          })
        }
      </div>
    )
  }
}

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      fade:''
    }
  }

  setSelfDestructTimer(){
    setTimeout(()=>{
      this.setState({fade:'fade-out'});
      setTimeout(()=>{
        const { dispatch } = this.props
        dispatch(actions.MESSAGES_REMOVE(this.props.message));
      },400)
    }, this.props.message.duration)
  }

  componentWillMount(){
    this.setSelfDestructTimer();
  }

  render(){
    return(
      <div className={`ui-message ${this.props.message.type}-message ${this.state.fade}`}>
        { this.props.message.text }
      </div>
    )
  }

}

const mapState = (state) =>{
  return { messages: selectors.messages(state) };
}

Message = connect()(Message)

export default connect(mapState)(MessageStack)
