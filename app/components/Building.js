var THREE = require('three');
var WHS = require('whs');
var _=require('lodash')


export class Building extends WHS.Cylinder {

  constructor(params){
    var defs = {
      geometry: {
        buffer: true,
        radiusTop: 10,
        radiusBottom: 10,
        height: 50
      },
      
      shadow: {
        cast: true,
        receive: true,
      },
      material: new THREE.MeshStandardMaterial({
        shading: THREE.FlatShading,
        roughness: 0.9,
        emissive: 0xee5624
      }),
      rotation: {}
    }
    super(_.assign(defs, params));
    let self = this;
    this.name = 'pippo_' + new Date().getTime();
    this.yShift = defs.geometry.height/2;
    this.on('mouseover', () => {self.material.color.set(0x00000);});
    this.on('mouseout', () => {self.material.color.set(0xffffff);});
  }
  build(params = this.params) {    
    return super.build(params); 
    
  }
  animation(){
    var self = this;
    let l = new WHS.Loop(() => {
       //self.yShift += 0.02;
       //self.position.y += 0.02;
    });
    l.enabled = true;
    return l;
  }
  y(){
    return this.yShift;
  }
}

