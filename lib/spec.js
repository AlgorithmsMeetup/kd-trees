var expect = chai.expect;

describe('the quadtree constructor', function(){
  var quadtree;
  beforeEach(function(){
    quadtree = new Quadtree(0, 0);
  });
  it('should create a new quadtree', function(){
    expect(quadtree).to.be.an.instanceof(Quadtree)
  });
  it('should contain only null children upon creation', function(){
    for(var child in quadtree.children){
      expect(quadtree.children[child]).to.equal(null);
    }
  });
  it('should throw an error if initial coordinates are not input', function(){
    expect(Quadtree).to.throw(Error);
  });
});

describe('the add method', function(){
  var quadtree;
  beforeEach(function(){
    quadtree = new Quadtree(0, 0);
  });
  it('should add a new child node to the correct quadrant of the parent tree', function(){
    quadtree.add(1, 1)
    expect(quadtree.children.topRight).to.be.instanceof(Quadtree);
    expect(quadtree.children.topLeft).to.be.null;
    expect(quadtree.children.bottomRight).to.be.null;
    expect(quadtree.children.bottomLeft).to.be.null;
  });
  it('should not overwrite nodes when a node is added to a quadrant that already has a child', function(){
    quadtree.add(1, 1);
    quadtree.add(2, 2);
    expect(quadtree.children.topRight.coordinates).to.deep.equal([1, 1]);
  });
  it('should make no change when the given coordinates already exist in the tree', function(){
    quadtree.add(1, 1);
    quadtree.add(2, 0);
    quadtree.add(1, 1);
    expect(quadtree.children.topRight.children.bottomRight.coordinates).to.deep.equal([2, 0]);
  });
  it('should pass new node coordinates to a child if a child is already present in the quadrant', function(){
    quadtree.add(2, 2);
    quadtree.add(1, 1);
    expect(quadtree.children.topRight.children.bottomLeft.coordinates).to.deep.equal([1, 1]);
  });
  it('should be able to add a node on an axis', function(){
    quadtree.add(0, -1);
    expect(quadtree.children.bottomRight || quadtree.children.bottomLeft).to.be.instanceof(Quadtree);
  });
});

describe('the find method', function(){
  var quadtree;
  beforeEach(function(){
    quadtree = new Quadtree(0, 0);
  });
  it('should return null when the given coordinates are not within the tree', function(){
    expect(quadtree.find(1, 2)).to.be.null;
  });
  it('should return the node of the given coordinates when they exist in the tree', function(){
    quadtree.add(1, 1);
    expect(quadtree.find(1, 1)).to.equal(quadtree.children.topRight);
    quadtree.add(2, 2);
    expect(quadtree.find(2, 2)).to.equal(quadtree.children.topRight.children.topRight);
  });
});

describe('the findInRange method', function(){
  var quadtree;
  var testCoordinatesInRange = [[1, 1], [1, 2], [-1,-1], [-1, 0]];
  var testCoordinatesOutOfRange = [[10, 10], [-7, 3], [-4, 10]];
  var testCoordinates = testCoordinatesInRange.concat(testCoordinatesOutOfRange);
  var coordinatesInRange;
  var coordinateList = {};
  beforeEach(function(){
    quadtree = new Quadtree(0, 0);
    for(var i = 0; i < testCoordinates.length; i++){
      quadtree.add.apply(quadtree, testCoordinates[i]);
    }
    coordinatesInRange = quadtree.findInRange([5, 5], [-3, 5], [-3, -3], [-3, 5]);
    for(var node in coordinatesInRange){
      coordinateList[JSON.stringify(coordinatesInRange[node].coordinates)] = true;
    }
  });
  it('should return a list of nodes within the given range', function(){
    for(var i = 0; i < testCoordinatesInRange.length; i++){
      expect(JSON.stringify(testCoordinatesInRange[i]) in coordinateList).to.be.true;
    }
  });
  it('should not include nodes that are not in the given range (unless they are children of a node in range)', function(){
    for(var i = 0; i < testCoordinatesOutOfRange.length; i++){
      expect(JSON.stringify(testCoordinatesOutOfRange[i]) in coordinateList).to.be.false;
    }
  });
});

xdescribe('the remove method', function(){
  var quadtree;
  beforeEach(function(){
    quadtree = new Quadtree(0, 0);
    quadtree.add(2, 2);
    quadtree.add(3, 0);
    quadtree.add(1, 1);
  });
  it('should remove the target node', function(){
    quadtree.remove(1, 1);
    expect(quadtree.find(1, 1)).to.be.null;
  });
  it('should not remove children of the target node', function(){
    quadtree.remove(1, 1);
    expect(quadtree.find(3, 0)).to.be.instanceof(Quadtree);
    expect(quadtree.find(1, 1)).to.be.instanceof(Quadtree);
  });
});
