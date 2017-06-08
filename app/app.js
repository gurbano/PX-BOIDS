// Core
import {App} from '@whs/core/App';
import {Loop} from '@whs/core/Loop';
var WHS = require('whs');
import {
  Vector3,
  PCFSoftShadowMap
} from 'three';

import {
  ElementModule,
  SceneModule,
  CameraModule,
  RenderingModule,
  VirtualMouseModule,
} from '@whs:app';

import {Server} from './server/Server'
import {OrbitModule} from '@whs:controls/orbit';
import {FancyMaterialModule} from './modules/FancyMaterialModule';
import {WorldEngine} from './appModules/WorldEngine';
const fogModule = new WHS.app.FogModule({color: 0xaaaaaa, near: 100, far: 2000});
// Components


import {BasicComponent} from './components/BasicComponent';
const mouse = new VirtualMouseModule();
const app = new App([
  new ElementModule({
    container: document.getElementById('app')
  }),
  new SceneModule(),
  new CameraModule({
      position: new Vector3(0, 180, -500),
      far: 2000,
      near: 1
  }),
  //new RenderingModule({bgColor: 0x000001}),
  new WHS.app.RenderingModule({
    bgColor: 0x162129,
    renderer: {
      antialias: true,
      shadowmap: {
        type: PCFSoftShadowMap
      }
    }
  }, {shadow: true}),
  new OrbitModule(),
  //fogModule,
  mouse,
]);
app.server = new Server();
app.mouse = mouse;

const EARTH = new WorldEngine(app);

EARTH.start();




/*


var b = new Building({modules: [new FancyMaterialModule(app)]});
app.add(b);
app.addLoop(b.animation());

*/

//app.add(new BasicComponent({modules: [new FancyMaterialModule(app)]}));





