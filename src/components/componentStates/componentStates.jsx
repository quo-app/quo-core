import React from 'react';
import { connect } from 'react-redux';
// import { EDIT_STATE_CHANGE } from '../../redux/actions';

class ComponentStates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected : props.editState,
      states : ['none','hover','pressed','focused'],
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    this.setState({selected : e.target.innerHTML.toLowerCase()});
    // const { dispatch } = this.props;
    // dispatch(EDIT_STATE_CHANGE(e.target.innerHTML.toLowerCase()));
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      selected:nextProps.editState,
    });
  }

  render(){
    return(
      <div className='component-states-container'>
        {this.state.states.map((state,key)=>{
          let selected = this.state.selected === state ? 'selected' : '';
          return(
            <div className={`component-state-box component-state-${selected}`} onClick={this.onClick} key={key}>
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </div>
          );
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  //change this
  return { editState:'none', }
}


export default connect(mapStateToProps)(ComponentStates);
