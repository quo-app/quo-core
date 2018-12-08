import { SketchParser } from 'quo-parser';
import { ReduxBranch, ReduxLeaf } from 'quo-redux/redux-wrapper';
import { Map } from 'immutable';

class AssetContainer extends ReduxLeaf {
  static initialState = () => Map({})
  __clear = AssetContainer.initialState
}

class SketchAssetContainer extends AssetContainer {
  __add = payload => {
    // do something with the payload here
    let newPage = new SketchParser.AbstractPage(payload);
    this.state = this.state.set(newPage.id, newPage);
    return this.state;
  }
}

const imageAssets = new AssetContainer({
  slug: 'imageAssets',
  children: SketchAssetContainer.initialState()
})

const sketchAssets = new SketchAssetContainer({
  slug: 'sketchAssets',
  children: AssetContainer.initialState()
})

const assets = new ReduxBranch({
  slug: 'assets',
  children: {
    sketch: sketchAssets,
    image: imageAssets,
  }
})

export default assets