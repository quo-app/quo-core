// import { createNewIds, traverseAndAdd } from 'quo-utils/component';
import { ReduxLeaf, ReduxPolyBranch, createReduxBranch  } from  'redux-shrub';

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
class ID extends ReduxLeaf {
  _newState = ({ id }) => id
}

class Title extends ReduxLeaf {
  _newState = ({ title }) => title
  update = state => ({ title }) => title
}

class Components extends ReduxLeaf {
  _newState = ({ components }) => components
}

class Root extends ReduxLeaf {
  _newState = ({ root }) => root
}

const Preview = createReduxBranch('preview', {
  id:  new ID({ slug: 'id'}),
  title: new Title({ slug: 'title'}),
  components: new Components({ slug: 'components'}),
  root: new Root({ slug: 'root'})
})

const previewInstances = new ReduxPolyBranch({
  slug: 'previewinstances',
  accessor: 'previewID',
  childReducer: Preview
})

const previews = createReduxBranch('previews', { previewInstances })

export default previews
