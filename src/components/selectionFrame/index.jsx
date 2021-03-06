import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import selectors from 'quo-redux/selectors';

class SelectionFrame extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      target:undefined,
      position: {
        x:0,
        y:0,
      },
      size:{
        w:0,
        h:0,
      },
      scale:1
    }

  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.selection.length === 0){
      this.hideSelectionFrame();
    }
    else{
      this.setTarget(nextProps)
      this.calculateScale(nextProps)
    }
  }

  hideSelectionFrame () {
    this.setState({
      visible:false
    })
  }

  isSelectionSingle (selection) {
    return selection.length === 1
  }

  setTarget (nextProps) {
    if(this.isSelectionSingle(nextProps.selection)){
      let el = document.getElementById(`component-${nextProps.selection[0]}`);
      this.setState({
        visible:true,
        target:el,
      })
    }
  }

  calculateScale (nextProps) {

    if(this.isSelectionSingle(nextProps.selection)){
      let el = document.getElementById(`component-${nextProps.selection[0]}`);
      let elDims = el.getBoundingClientRect();
      let style = window.getComputedStyle(el);
      let styleWidth = style.width.slice(0,-2);
      let computedWidth = elDims.width

      this.setState({
        scale: computedWidth / styleWidth
      })

    }
  }

  render () {

    if (this.state.target) {

      let style = { transform:`scale(${1/this.state.scale})` }
      let lineStyleH = { transform: `scale(1,${1/this.state.scale})`}
      let lineStyleV = { transform: `scale(${1/this.state.scale}, 1)`}

      return(
        ReactDOM.createPortal(

            this.state.visible ?
              <React.Fragment>
                <div className='selection-line top h' style={lineStyleH} tabIndex='0'></div>
                <div className='selection-line bottom h' style={lineStyleH} tabIndex='0'></div>
                <div className='selection-line left v' style={lineStyleV} tabIndex='0'></div>
                <div className='selection-line right v' style={lineStyleV} tabIndex='0'></div>
                <div className='selection-frame top left' style={style} tabIndex='0'></div>
                <div className='selection-frame top middle-w' style={style} tabIndex='0'></div>
                <div className='selection-frame top right' style={style} tabIndex='0'></div>
                <div className='selection-frame bottom left' style={style} tabIndex='0'></div>
                <div className='selection-frame bottom middle-w' style={style} tabIndex='0'></div>
                <div className='selection-frame bottom right' style={style} tabIndex='0'></div>
                <div className='selection-frame middle-h left' style={style} tabIndex='0'></div>
                <div className='selection-frame middle-h right' style={style} tabIndex='0'></div>
             </React.Fragment>
              :
              null,
              this.state.target
        )
      )
    }
    else{
      return null
    }
  }
}

function mapStateToProps(state) {
  return { selection: selectors.selectedComponents(state) };
}

export default connect(mapStateToProps)(SelectionFrame);
