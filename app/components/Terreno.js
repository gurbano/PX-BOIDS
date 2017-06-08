var THREE = require('three');
var WHS = require('whs');

var defs = {
  geometry: {
    width: 1 * 1000,
    height: 1 * 1000
  },

  material: new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide
  }),
  shadow:{
    receive: true,
     cast: false
  },
  rotation: {
    x: - Math.PI / 2
  }
}

export class Terreno extends WHS.Plane {
  constructor(){
    super(defs);
  }
}

