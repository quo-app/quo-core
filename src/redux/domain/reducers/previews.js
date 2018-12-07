import { createNewIds, traverseAndAdd } from 'quo-utils/component';
import { ReduxLeaf, ReduxPolyBranch } from  'quo-redux/redux-wrapper';
import { ReduxBranch } from '../../redux-wrapper';

// export const createPreviewInstance = (previewInstances, action) => {
//   // components is an array of root components;
//   // previewing a tab means previewing the root of the tab
//   // previewing a bunch of components mean previewing them and
//   // their children
//   let { allComponents, selectedComponents, previewId } = action.payload;
//   // selected components is an object of components
//   // components
//   let selectedComponentsObj = selectedComponents.map( id => allComponents[id]);
//   let flattenedSelections = _.map(selectedComponentsObj, comp => traverseAndAdd(comp, allComponents));

//   // create new ids here but just make a root instead of having to think of every id in that
//   // array as a root id! genius!
//   flattenedSelections = flattenedSelections.reduce(_.merge, {})
//   let { components } = createNewIds({components: flattenedSelections});

//   // do the state management here!

//   let root = { children: selectedComponents }

//   previewInstances[previewId] = { components, root};
//   return previewInstances
// }

// export const removePreviewInstance = (previewInstances, action) => {
//   return previewInstances
// }

class Preview {
  constructor({ id, title, components, root }){
    this.id = id
    this.title = title
    this.components = components
    this.root = root
  }
  // do the work of copying new ids here
}

class PreviewReducer extends ReduxLeaf {
  __titleUpdate = ({ title }) => {
    this.state.title = title;
    return this.state;
  }
}

let previewReducer = payload => new PreviewReducer({
  slug: 'component',
  children: new Preview(payload)
})

class PreviewInstancesReducer extends ReduxPolyBranch {
  __add = payload => {
    let newPreviewInstance = this.childReducer(payload).state
    this.state = this.state.set(payload.id, newPreviewInstance);
    return this.state
  }
}

const previewInstances = new PreviewInstancesReducer({
  slug: 'previewinstances',
  accessor: 'previewID',
  childReducer: previewReducer,
  children: {}
})

const previews = new ReduxBranch({
  slug:'previews',
  children: {
    previewInstances
  }
})

export default previews
