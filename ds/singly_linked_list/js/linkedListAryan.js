class Node {
	val = 0
	next = null
}

class LinkedList {
	head = null
	pushBack(val) {
		const node = new Node()
		node.val = val
		if(this.head) {
			let cursor = this.head
			while(cursor.next !== null) {
				cursor = cursor.next
			}
			cursor.next = node
		} else {
			this.head = node	
		}
	}
	popBack() {
		if (this.head) {
			let cursor = this.head
			if (this.head.next) {
				while(cursor.next.next !== null) {
					cursor = cursor.next
				}
				const returnNode = cursor.next
				cursor.next = cursor.next.next
				return returnNode.val
			}
		} else {
			throw new Error('List is empty!')
		}
	}
	pushFront(val) {
		const node = new Node();
		node.val = val
		node.next = this.head
		this.head = node
	}
	popFront() {
		if (this.head) {
			const returnNode = this.head
			this.head = this.head.next
			return returnNode.val
		} else {
			throw new Error('List is empty!')
		}
	}
	toArray() {
		let cursor = this.head
		const output = []
		while(cursor != null) {
			output.push(cursor.val)
			cursor = cursor.next
		}
		return output
	}
}

// Tester code

const singlyList = new LinkedList()
singlyList.pushFront(3)
singlyList.pushFront(8)
singlyList.pushFront(5)
console.log(singlyList.toArray()) // 5, 8, 3
let value = singlyList.popFront()
console.log(value) // 5
console.log(singlyList.toArray()) // 8, 3
singlyList.pushBack(4)
console.log(singlyList.toArray()) // 8, 3, 4
singlyList.pushBack(69)
console.log(singlyList.toArray()) // 8, 3, 4, 69
value = singlyList.popBack()
console.log(value) // 69
console.log(singlyList.toArray()) // 8, 3, 4
const emptyList = new LinkedList()
try {
	emptyList.popBack()
} catch(e) {
	console.log(e.message)
}
try {
	emptyList.popFront()
} catch(e) {
	console.log(e.message)
}
