import React from 'react';
import { connect } from 'react-redux';
import selectors from 'quo-redux/selectors';
import CoreComponent from '../CoreComponent';

class DockComponent extends CoreComponent {
  render () {
    switch (this.props.renderType) {
      case 'edit':
        return <EditDockComponent {...this.props}/>
      case 'preview':
        return <PreviewDockComponent {...this.props}/>
      case 'snapshot':
        return <PreviewDockComponent {...this.props}/>
      default:
        return <PreviewDockComponent {...this.props}/>
    }
  }
}

class EditDockComponent extends CoreComponent {

  static mapStateToProps (state) {
    return {
      selections: selectors.selectedComponents(state)
    }
  }

  dockStyling () {
    const { innerWidth, width, height, innerHeight } = this.props.props;
    return {
      height: innerHeight,
      width: innerWidth
      // height: Math.min(innerHeight, height),
      // width:  Math.min(innerWidth, width)
    }
  }

  dockNegativeStylingRight () {
    const { innerWidth, width } = this.props.props;
    return {
      width: Math.max(0, width - innerWidth)
    }
  }

  dockNegativeStylingBottom () {
    const { innerHeight, height, innerWidth, width } = this.props.props;
    return {
      height: Math.max(0, height - innerHeight),
      width: innerWidth
    }
  }

  dragPoints () {
    return (
      <React.Fragment>
        <div className='dock-drag drag-x'></div>
        <div className='dock-drag drag-y'></div>
      </React.Fragment>
    )
  }

  render () {
    const isSelected = this.props.selections.includes(this.props.id);
    return (
      <React.Fragment>
        {
          this.props.children.map(id => {
            return (
              <this.props.wrapper
                id={id}
                key={id}
                selector={this.props.selector}
                propsSelector={this.props.propsSelector}
              />
            )
          })
        }
        { isSelected ?
        <React.Fragment>
        <div className={`dock-wrapper-negative right selected`} style={this.dockNegativeStylingRight()}/>
        <div className={`dock-wrapper-negative bottom selected`} style={this.dockNegativeStylingBottom()}/>
        <div className={`dock-wrapper selected`} style={this.dockStyling()}>
          { this.dragPoints() }
        </div>
        </React.Fragment>
        : null
        }

      </React.Fragment>

    )
  }
}

class PreviewDockComponent extends CoreComponent {
  render () {
    return (
      <React.Fragment>
        {
          this.props.children.map(id => {
            return (
              <this.props.wrapper
                id={id}
                key={id}
                selector={this.props.selector}
                propsSelector={this.props.propsSelector}
              />
            )
          })
        }
      </React.Fragment>
    )
  }
}

EditDockComponent = connect(EditDockComponent.mapStateToProps)(EditDockComponent)


export default DockComponent;
