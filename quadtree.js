var Quadtree = function(x, y){
  if(typeof x !== 'number' || typeof y !== 'number'){
    throw new Error('You must supply coordinate to the initial node!');
  }
  this.coordinates = [x, y];
  this.children = {
    topRight: null,
    topLeft: null,
    bottomLeft: null,
    bottomRight: null
  }
}

Quadtree.prototype.add = function(x, y){
  /* Adds a new node to the tree with the given coordinates */

}

Quadtree.prototype.find = function(x, y){
  /* Returns either the node with the given coordinates or null */

}

Quadtree.prototype.findInRange = function(topRight, topLeft, bottomLeft, bottomRight){
  /* Returns a list of nodes with coordinates within the input rectangle */

}

/* ---EXTRA CREDIT--- */
Quadtree.prototype.remove = function(x, y){
  /* Removes the node with the given coordinates */

}
