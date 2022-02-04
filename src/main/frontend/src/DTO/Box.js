class Box{
  constructor(id,title){
    this._title=title;
    this._id=id;
  }
  
  get title(){
    return this._title;
  }

  get id(){
    return this._id;
  }
}

class Pandora extends Box{
  constructor(id,title,count){
    super(id,title);
    this._count=count;
  }
  get count(){
    return this._count;
  }
  decreaseCount(){
    this._count-=1;
  }

}

export {Box,Pandora};