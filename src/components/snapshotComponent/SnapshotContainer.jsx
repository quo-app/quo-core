import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import SnapshotComponent from './SnapshotComponent';
import { convertSnapshotToImage } from './utils';

export default class SnapshotContainer extends Component {

  static propTypes = {
    source: PropTypes.shape({
      location: PropTypes.string,
      filetype: PropTypes.string,
      page: PropTypes.string,
    }).isRequired,
    component: PropTypes.object.isRequired,
    padding: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    })
  } 

  static defaultProps = {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }

  constructor(props){ 
    super(props);
    this.state = {}
  }

  getContainerDimensions = () => {
    let dims =  ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect();
    let paddingHorizontal = this.props.padding.left + this.props.padding.right;
    let paddingVertical = this.props.padding.top + this.props.padding.bottom;
    return {
      w: dims.width - paddingHorizontal,
      h: dims.height - paddingVertical,
    }
  }

  getComponentDimensions = () => {
    return {
      w: this.props.component.state.states.composite.props.width,
      h: this.props.component.state.states.composite.props.height
    } 
  }

  componentDidMount = () => {

    let data  = {
      id: this.props.component.id,
      cDimensions : this.getContainerDimensions(),
      eDimensions : this.getComponentDimensions(),
    }
    
    let { image, scale } = convertSnapshotToImage(data);
    let fullImage = convertSnapshotToImage({...data, full:true});

    this.setState({snapshotImage: image, scale: scale});

    this.props.onRender(fullImage.image);

  }

  render = () => {
    let alt = `Snapshot of the component ${this.props.component.name}.`
    return (
      <React.Fragment>
        {
          this.state.snapshotImage
          ?
            <img src={this.state.snapshotImage} style={{transform:`scale(${this.state.scale})`}} alt={alt}/>
          :
            <div style={{display:'none'}}>
              <SnapshotComponent
                source = {this.props.source}
                id = {this.props.component.id}
                isParent
              />
            </div>
        }
      </React.Fragment>
    )
  }
}