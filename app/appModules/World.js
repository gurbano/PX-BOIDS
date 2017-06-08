import {Terreno} from '../components/Terreno';
import {Saturn} from '../components/planets/Saturn';
import {Building} from '../components/Building';
import {Border} from '../components/Border';
import {PinPoint} from '../components/PinPoint';
var WHS = require('whs');
var THREE = require('three');

var FACTORY = {
	building: function(){
		return new Building();
	}
}

const entMap = {
	
};

var updateEnt = function(id, ent){
	entMap[id].position.set(ent.position.x,ent.position.y + entMap[id].y(),ent.position.z); //THREE entity
}
var refreshEntities = function(){
	var self = this;
	Object.keys(this.world.entities).map(function(key){
		let ent = self.world.entities[key];
		if (!entMap[key]){
			//create the 3d entity and add it to the app
			entMap[key] = FACTORY[ent.type]();
			self.app.add(entMap[key])
			self.app.addLoop(entMap[key].animation());
			self.app.mouse.track(entMap[key]);
		}
		updateEnt(key, ent);//update position, etc
	})
}


var blendings = [ "NoBlending", "NormalBlending", "AdditiveBlending", "SubtractiveBlending", "MultiplyBlending" ];

export class World {
  constructor(app) {
  	this.app = app;
    this.init();
    this.world = {};
  }
  init(){
  	var MILLE = 500;
  	var self = this;
  	/*load the terrain, skydome, lights, etc.etc*/
  	console.log('initing world');

  	//this.app.add(new Border({start: new THREE.Vector3(100,0,100),end: new THREE.Vector3(100,0,100)}));
  	this.app.add(new PinPoint({position: new THREE.Vector3(-MILLE/2, 0, MILLE/2)}));
  	this.app.add(new PinPoint({position: new THREE.Vector3(MILLE/2, 0, MILLE/2)}));
  	this.app.add(new PinPoint({position: new THREE.Vector3(-MILLE/2, 0, -MILLE/2)}));
  	this.app.add(new PinPoint({position: new THREE.Vector3(MILLE/2, 0, -MILLE/2)}));
  	/*this.app.add(new Border({
  		position: new THREE.Vector3(0,499,0),  
		geometry: {
		    width: MILLE,
		    height: MILLE,
		    depth: MILLE
		},
		 material: new THREE.MeshBasicMaterial({
		    transparent : true,
		    opacity: 0.25,
			blending : THREE[ 'AdditiveBlending' ],
			side: THREE.DoubleSide,
		  }),
		  shadow:{
		    receive: true
		  },
	}));
	*/
    
  	var terreno = new Terreno()
  	this.app.mouse.track(terreno);
  	terreno.on('mousemove', (arg) => {
  		arg.point.y = 1;
  		//mousePoint.position = arg.point;
	});
  	this.app.add(terreno);

  	var saturno = new Saturn({
  		orbita: function(angle){
  			let radius = 500;
  			return{ 
  				x: 0,
  				y: 0 + (Math.cos(angle)*radius)*1.1,
  				z: 0 + Math.sin(angle)*radius
  			}
  		}
  	});
	this.app.add(saturno);
	this.app.addLoop(saturno.animation());

  

  	

  }

  refresh(server){
  	/*add/update all the entities*/
  	this.world = server.getWorld();
  	refreshEntities.bind(this)();
  }
  
}
