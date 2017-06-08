var THREE = require('three');
var WHS = require('whs');
var _=require('lodash')
var defs = {

}

export class Border extends WHS.Box {

  constructor(params){
    super(_.assign(defs, params));
  }
  build(params = this.params) {
    var ret = super.build(params);
    
    return ret;    
  }
}

