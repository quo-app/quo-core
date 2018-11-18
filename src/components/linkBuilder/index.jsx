import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import actions from 'quo-redux/actions';
import { getState } from 'quo-redux/state';

import { Card, DropdownCard } from 'quo-ui/cards';
import { Button } from 'quo-ui/buttons';

const trigger = (id, text, actions) => ({ id, text, actions })
const propChange = (id,text,props) => ({ id, text, props })
const getText = obj => _.mapValues(obj, o => o.text)

const data = {
  defaultTrigger: 'hover',
  triggers: {
    hover: trigger('hover','Hover', { enables:['onMouseEnter'], disables:['onMouseLeave'] }),
    press: trigger('press','Press', { enables:['onMouseDown'], disables:['onMouseUp'] }),
    click: trigger('click','Click', { enables:['onFocus'], disables:['onBlur'] })
  },
  defaultPropChange: 'appears',
  propChanges: {
    appears: propChange('appears','Appears(red)', { fill:{r:255,g:0,b:0,a:1} }),
    slidesIn: propChange('slidesIn','Slides In(green)', { fill:{r:0,g:255,b:0,a:1} }),
    pageChange: propChange('pageChange','Page Change(blue)', { fill:{r:0,g:0,b:255,a:1} })
  }
}

class LinkBuilder extends Component {

  static propTypes = {
    onBackClick : PropTypes.function
  }

  constructor (props) {
    super(props);
    this.data = data;
  }

  componentDidMount(){
    let { actions } = this.data.triggers[this.data.defaultTrigger];
    let { props } = this.data.propChanges[this.data.defaultPropChange];
    this.updateLinkBuilder({ ...actions, props})
  }

  createLink = () => {
    const { dispatch } = this.props;
    dispatch(actions.CREATE_LINK());
  }

  updateLinkBuilder = (data) => {
    const { dispatch } = this.props;
    dispatch(actions.UPDATE_LINK_BUILDER_DATA({ ...data }));
  }

  render () {
    return (
      <React.Fragment>
        <Button onClick={this.props.onBackClick}>Back to Links</Button>
        <Card title='Primary Element'>
            { this.props.links.source ? this.props.links.source : 'Source not selected' }
          </Card>

          <DropdownCard
            title='Action'
            defaultValue={data.defaultTrigger}
            options={getText(data.triggers)}
            onChange={(key)=>{
              let { actions } = data.triggers[key];
              this.updateLinkBuilder({ ...actions });
            }}
          />

          <Card title='Linked Element'>
            { this.props.links.target ? this.props.links.target : 'Target not selected' }
          </Card>

          <DropdownCard
            title='Property Change'
            defaultValue={data.defaultPropChange}
            options={getText(data.propChanges)}
            onChange={(key)=>{
              let { props } = data.propChanges[key]
              this.updateLinkBuilder({ props })
            }}
          />
          <Button onClick={this.createLink}>Create Link</Button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  let app = getState(state,'app');
  // the stuff below is to be able to render a snapshot
  // if there is a source component included
  if(app.linkBuilder.source && app.linkBuilder.source !== ''){
    //find the component
  }
  else if (app.linkBuilder.target && app.linkBuilder.target !== '' ){
    //find the component
  }

  return { links: app.linkBuilder }
}

export default connect(mapStateToProps)(LinkBuilder)