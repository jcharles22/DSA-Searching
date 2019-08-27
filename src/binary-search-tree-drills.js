
export default class BinarySearchTree {
	
	constructor(key=null, value=null, parent=null) {
		this.key = key;
		this.value = value;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}

	insert(key, value) {

		if(this.key === null) {
			this.key = key;
			this.value = value;
		} else if(key < this.key) {
			if(this.left === null) {
				this.left = new BinarySearchTree(key, value, this);
			} else {
				this.left.insert(key, value);
			}
		} else {
			if(this.right === null) {
				this.right = new BinarySearchTree(key, value, this);
			} else {
				this.right.insert(key, value);
			}
		}
	}

	find(key) {
		if(this.key === key) {
			return this.value;
		} else if(key < this.key && this.left) {
			return this.left.find(key);
		} else if(key > this.key && this.right) {
			return this.right.find(key);
		} else {
			return null;
		}
	}

	remove(key) {
		if(this.key === key) {
			if(this.right && this.left) {
				let min = this.right.findMin();
				this.value = min.value;
				this.key = min.key;
				min.remove(min.key);
			} else if(this.left) {
				this._replaceWith(this.left);
			} else if(this.right) {
				this._replaceWith(this.right);
			} else {
				this._replaceWith(null);
			}
		} else if(key < this.key && this.left) {
			this.left.remove(key);
		} else if(key > this.key && this.right) {
			this.right.remove(key);
		} else {
			return new Error("key not found");
		}
	}

	height() {
		let bottomNodes = this._findBottomNodes();
		let currentMaxHeight = 0;
		let count = 0;
		for(let i=0; i<bottomNodes.length; i++) {
			let iter = bottomNodes[i];
			while(iter) {
				count++;
				iter = iter.parent;
			}
			currentMaxHeight = count > currentMaxHeight ? count : currentMaxHeight;
			count = 0;
		}
		return currentMaxHeight;
	}

	isBalanced() {
		let bottomNodes = this._findBottomNodes();
		let heights = [];
		let count = 0;
		for(let i=0; i<bottomNodes.length; i++) {
			let iter = bottomNodes[i];
			while(iter) {
				count++;
				iter = iter.parent;
			}
			heights.push(count);
			count = 0;
		}
		let uniformHeight = 0;
		// return heights;
		while(count < heights.length) {
			if(count === 0) {
				uniformHeight = heights[0];
			} else {
				if(uniformHeight !== heights[count]) {
					return false;
				}
			}
			count++;
		}
		return true;
	}

	printKeys() {
		if(this.left && this.right) {
			return `${this.key}--> (${this.left.printKeys()}) <|> (${this.right.printKeys()})`;
		} else if(this.left) {
			return `${this.key}--> (${this.left.printKeys()}) <|`;
		} else if(this.right) {
			return `${this.key}--> |> (${this.right.printKeys()})`;
		} else {
			return `${this.key}`;
		}
	}

	_findBottomNodes() {
		if(!this.left && !this.right) {
			return [this];
		} else if(this.left && this.right) {
			return [...this.left._findBottomNodes(), ...this.right._findBottomNodes()];
		} else if(this.left) {
			return [...this.left._findBottomNodes()];
		} else {
			return [...this.right._findBottomNodes()];
		}
	}

	_replaceWith(node) {
		if(this.parent) {
			if(this === this.parent.left) {
				this.parent.left = node;
			} else if(this === this.parent.right) {
				this.parent.right = node;
			}
			if(node) {
				node.parent = this.parent;
			}
		} else {
			if(node) {
				this.value = node.value;
				this.key = node.key;
				this.left = node.left;
				this.right = node.right;
			} else {
				this.value = null;
				this.key = null;
				this.left = null;
				this.right = null;
			}
		}
	}

	_findMin() {
		if(!this.left) {
			return this;
		}
		this.left._findMin();
	}
}

