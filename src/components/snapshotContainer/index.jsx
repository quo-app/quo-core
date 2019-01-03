import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import { fSafe } from 'quo-utils';

import { SnapshotComponent } from 'quo-components/renderedComponents';

import { convertSnapshotToImage } from './utils';

export default class SnapshotContainer extends Component {

  static propTypes = {
    selector: PropTypes.func.isRequired,
    propsSelector: PropTypes.func.isRequired,
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
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    }
  }

  state = {}

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
      w: this.props.propsSelector(this.props.component).width,
      h: this.props.propsSelector(this.props.component).height
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

    fSafe(this.props.onRender, fullImage.image)

  }

  render = () => {
    let alt = `Snapshot of an ${this.props.component.title}.`
    return (
      <React.Fragment>
        {
          this.state.snapshotImage
          ?
            <img src={this.state.snapshotImage} style={{transform:`scale(${this.state.scale})`}} alt={alt}/>
          :
            <div style={{display:'none'}}>
              <SnapshotComponent
                selector = {this.props.selector}
                propsSelector = {this.props.propsSelector}
                id = {this.props.component.id}
                isParent
              />
            </div>
        }
      </React.Fragment>
    )
  }
}