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
  var exists = this.find(x, y);
  if(exists){
    return exists;
  }
  var quadrant = this._determineQuadrant(x, y);
  if(this.children[quadrant]){
    return this.children[quadrant].add(x, y);
  } else {
    var newChild = new Quadtree(x, y);
    this.children[quadrant] = newChild;
    return newChild;
  }
}

Quadtree.prototype.find = function(x, y){
  /* Returns either the node with the given coordinates or null */
  if(this.coordinates[0] === x && this.coordinates[1] === y){
    return this;
  } else {
    var quadrant = this._determineQuadrant(x, y);
    if(this.children[quadrant]){
      return this.children[quadrant].find(x, y);
    }
  }
  return null;
}

Quadtree.prototype.findInRange = function(topRight, topLeft, bottomLeft, bottomRight){
  /* Returns a list of nodes with coordinates within the input rectangle */
  var nodesInRange = [];
  if(this._inRange(topRight, bottomLeft)) nodesInRange.push(this);

  var quadrantsToCheck = {};
  for(var i = 0; i < arguments.length; i++){
    var quadrant = this._determineQuadrant.apply(this, arguments[i]);
    quadrantsToCheck[quadrant] = true;
  }

  for(quadrant in quadrantsToCheck){
    if(this.children[quadrant]){
      var childNodesInRange = this.children[quadrant].findInRange(topRight, topLeft, bottomLeft, bottomRight);
      nodesInRange.push.apply(nodesInRange, childNodesInRange);  // this concatenates the two arrays
    }
  }
  return nodesInRange;
}

/* ---EXTRA CREDIT--- */
Quadtree.prototype.remove = function(x, y){
  /* Removes the node with the given coordinates */

}

Quadtree.prototype._determineQuadrant = function(x, y){
  var xQuad = 'Left';
  var yQuad = 'bottom';
  if(x >= this.coordinates[0]) xQuad = 'Right';
  if(y >= this.coordinates[1]) yQuad = 'top';
  return yQuad + xQuad;
}

Quadtree.prototype._inRange = function(topRight, bottomLeft){
  if(this.coordinates[0] <= topRight[0] && this.coordinates[0] >= bottomLeft[0]){
    if(this.coordinates[1] <= topRight[1] && this.coordinates[1] >= bottomLeft[1]){
      return true;
    }
  }
  return false;
}
