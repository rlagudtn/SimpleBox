class Box{
  constructor(id, name) {
    this._name = name;
    this._id = id;
  }
  
  get name(){
    return this._name;
  }

  get id(){
    return this._id;
  }
}


export default Box;