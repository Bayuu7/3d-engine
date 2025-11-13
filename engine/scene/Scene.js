export class Environment {
  constructor(){ this.backgroundColor = [0.05,0.05,0.08,1.0]; }
}
export class Scene {
  constructor(name='Scene'){
    this.name = name;
    this.entities = [];
    this.environment = new Environment();
  }
  add(e){ this.entities.push(e); }
  clear(){ this.entities = []; }
}
