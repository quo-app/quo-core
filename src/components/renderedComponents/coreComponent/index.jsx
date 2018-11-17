import React, { PureComponent } from 'react';

import ImageComponent from './components/ImageComponent';
import ShapeComponent from './components/ShapeComponent';
import TextComponent from './components/TextComponent';

class ComponentRenderCore extends PureComponent {
  render = () => {
    switch (this.props.component.class) {
      case 'shape':
        return (<ShapeComponent component={ this.props.component }></ShapeComponent>)
      case 'text':
        return (<TextComponent component={ this.props.component }></TextComponent>)
      case 'image':
        return <ImageComponent component={this.props.component} />
      default:
        const Wrapper = this.props.wrapper
        return (
          <React.Fragment>
            {
              this.props.component.children.map(id => {
                return (
                  <Wrapper
                    id={id}
                    key={id}
                    source={this.props.source}
                  />
                )
              })
            }
          </React.Fragment>
        )
    }
  }
}

export default ComponentRenderCore
