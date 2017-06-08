import {World} from './World'
var WHS = require('whs');
export class WorldEngine {
  constructor(app) {
  	this.tick = 0;
    this.app = app;
    this.world = new World(app);
  }
  start(){
  	var self = this;
    let l = new WHS.Loop(() => {
       //console.log(self.tick++)
       if (++self.tick%100 == 0){
       		console.log('tick')
       		self.world.refresh(self.app.server)
       }
    });
    l.enabled = true;
	this.app.addLoop(l);  	
    this.app.start();
  }
}
