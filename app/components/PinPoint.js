var THREE = require('three');
var WHS = require('whs');
var _=require('lodash')
var defs = {
  geometry: {
    buffer: true,
    radiusTop: 5,
    radiusBottom: 5,
    height: 150
  },
  
  shadow: {
    cast: true
  },
  material: new THREE.MeshStandardMaterial({
    shading: THREE.FlatShading,
    roughness: 0.9,
    emissive: 0x22ff24
  }),
  rotation: {}
}

export class PinPoint extends WHS.Cylinder {

  constructor(params){
    super(_.assign(defs, params));
  }
  build(params = this.params) {
    var ret = super.build(params);
    
    return ret;    
  }
}

