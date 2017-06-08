
export class Server {
  constructor() {
  	this.world = {
      entities: {
        '01':{type:'building', position: {x:200,y:0,z:0}},
        '02':{type:'building', position: {x:-200,y:0,z:0}},
      },
      npcs: {},
      pcs: {},
      statics: {},
    }
  }
  init(){
  	
  }
  start(){

  }
  getWorld(){
    return this.world;
  }
  
}
