import { SketchToAssetComponent } from 'quo-parser/assetComponent';
import { createReduxBranch, ReduxLeaf } from 'redux-shrub';
import { Map } from 'immutable';

class AssetContainer extends ReduxLeaf {
  _newState = () => Map({})
  clear = state => payload => this._newState()
}

class SketchAssetContainer extends AssetContainer {
  add = state => payload => {
    let newPage = SketchToAssetComponent(payload);
    return state.set(newPage.id, newPage);
  }
}

const imageAssets = new AssetContainer({ slug: 'imageAssets' })
const sketchAssets = new SketchAssetContainer({ slug: 'sketchAssets' })

const assets = createReduxBranch('assets', {
  sketch: sketchAssets,
  image: imageAssets,
}, {
  includeSlugInChildSelectors: true,
})

export default assets