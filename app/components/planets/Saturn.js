var THREE = require('three');
var WHS = require('whs');
var _=require('lodash')


export class Saturn extends WHS.Tetrahedron {

  constructor(params){
    var defs = {
      geometry: {
        radius: 50,
        detail: 2
      },
      shadow:{
        cast: false,
      },
      material: new THREE.MeshStandardMaterial({
        color: 0xee5624,
        shading: THREE.FlatShading,
        roughness: 0.9,
        emissive: 0x270000
      })
    }
    super(_.assign(defs, params));
    let self = this;
    this.orbita = params.orbita;
    this.on('mouseover', () => {self.material.color.set(0x00000);});
    this.on('mouseout', () => {self.material.color.set(0xee5624);});

    var light = new WHS.PointLight( {
     light: {
        color: 0xffffff,
        intensity: 1,
        distance: 0
      },
      shadow: {
        cast:true,
        mapSize: {
          width: 1024,
          height: 1024
        },
        far: 15000,
        near: .5
      },
      position: {
        x: 100,
        z: 100,
        y: 100
      },
    });
    light.addTo(this);
    this.light = light;

  }
  build(params = this.params) {    
    return super.build(params); 
    
  }
  animation(){
    var self = this;
    let l = new WHS.Loop((clock) => {
       /*ORBITA*/
       //self.rotation.y += 0.05;
       let angle = (clock.getElapsedTime()%3600)/10;
       let pos = self.orbita(angle);
       self.position.set(pos.x,pos.y,pos.z);       
       self.light.native.intensity = Math.max(0.4, Math.cos(angle) * 1.5);    


    });
    l.enabled = true;
    return l;
  }
}

/* ORBITA
    var radius = 507.106781187;
    let l = new WHS.Loop((clock) => {
      let angle = (clock.getElapsedTime()%360)/1;
      mousePoint.position.y = 0 + Math.cos(angle)*radius;
    mousePoint.position.z = 0 + Math.sin(angle)*radius;
    light.position.y = 0 + Math.cos(angle)*radius;
    light.position.z = 0 + Math.sin(angle)*radius;
    light.native.intensity = Math.max(0.4, Math.cos(angle) * 2.5);    
    });
    l.enabled = true;
    this.app.addLoop(l)


*/