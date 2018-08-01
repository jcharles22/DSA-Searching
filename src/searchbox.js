import React from 'react';
import BinarySearchTree from './binary-search-tree-drills';

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		const array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
		const sorted = this.trueSort([...array]);
		console.log(sorted);
		this.state = {
			linearCount: 0,
			binaryCount: 0,
			itemLinear: -1,
			itemBinary: -1,
			array: [...array],
			sorted: sorted,
			foundIndexLinear: -1,
			foundIndexBinary: -1
		}
	}
	onLinearChange(event) {
		let item = parseInt(event.currentTarget.value, 10);
		this.linearSearch(item);
	}

	onBinaryChange(event) {
		let itemInput = parseInt(event.currentTarget.value, 10);
		this.binarySearch(itemInput, 0, this.state.sorted.length-1);
	}

	linearSearch(item) {
		let count = 1;
		for (let i = 0; i < this.state.array.length; i++) {
			if (item === this.state.array[i]) {
				return this.setState({
					itemLinear: item,
					linearCount: count++,
					foundIndexLinear: i
				});
			}
			count++;
		}
	}

	binarySearch(item, start, end, count=0) {
		// not found
		if(start > end) {
			return null;
		} else {
			count++;
			const index = Math.floor((start + end)/2);
			const temp = this.state.sorted[index];
			if(item === temp) {
				return this.setState({
					itemBinary: item,
					binaryCount: count,
					foundIndexBinary: index
				});
			} else if(item < temp) {
				return this.binarySearch(item, start, index-1, count);
			} else {	// all that is left is item > temp
				return this.binarySearch(item, index+1, end, count);
			}
		}
	}

	trueSort(arr) {
		const letters = [];
		for(let i=0; i<arr.length; i++) {
			letters.push(String.fromCharCode(arr[i] + 200));
		}
		const tempSorted = letters.sort();
		const sorted = [];
		for(let i=0; i<tempSorted.length; i++) {
			sorted.push(tempSorted[i].charCodeAt(0)-200);
		}
		return [...sorted];
	}

	arrayToString(arr) {
		const complete = [];
		const chunk = [];
		let j = 1;
		for(let i=1; i<arr.length; i++) {
			if(i%30 === 0) {
				chunk.push(<p className="array-chunk" key={Math.ceil(j/15)}>{complete.slice(j, i)}</p>)
				j = i;
			}
			complete.push(<span className="array-item" key={i+"-item"}>{arr[i]}</span>);
		}
		const str = (<div className={"array-row"}>{chunk}</div>);
		return str;
	}


	binarySearchTree(arr=[25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22]) {
		let bst = new BinarySearchTree();
		for(let i=0; i<arr.length; i++) {
			bst.insert(arr[i], arr[i]);
		}
        console.log(...this.inOrder(bst));
	}
	// left, root, right
	inOrder(bst) {
        if(bst.left && bst.right) {
            return [...this.inOrder(bst.left), bst.key, ...this.inOrder(bst.right)];
        } else if(bst.left) {
            return [...this.inOrder(bst.left), bst.key];
        } else if(bst.right) {
            return [bst.key, ...this.inOrder(bst.right)];
        } else {
            return [bst.key];
        }
	}
	// root, left, right
	preOrder(bst) {

	}
	// left, right, root
	postOrder(bst) {

	}

	render() {
        this.binarySearchTree();
		let str1 = this.state.linearCount !== 0 ? `It took ${this.state.linearCount} iterations to find ${this.state.itemLinear} at index ${this.state.foundIndexLinear}` : ``;
		let str2 = this.state.binaryCount !== 0 ? `It took ${ this.state.binaryCount } iteration to find ${ this.state.itemBinary } at index ${this.state.foundIndexBinary}` : ``;

		let arrayStr = this.arrayToString(this.state.array);
		let sortedStr = this.arrayToString(this.state.sorted);

		return (
			<div>
				<h3>The array:</h3>
				<p>{arrayStr}</p>
				<h3>The sorted array:</h3>
				<p>{sortedStr}</p>
				<p>search through linearly</p>
				
				<input id='linear' onChange={e => this.onLinearChange(e)} />
				<div className="answer-box"> 
					{ str1 }
				</div>

				<p>search through with a binary search</p>
				
				<input id='binary' onChange={e => this.onBinaryChange(e)} />
				<div className="answer-box">
					{ str2 }
				</div>
			</div>
		);
	}
}