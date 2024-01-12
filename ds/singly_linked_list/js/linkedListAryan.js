class Node {
	val = 0
	next = null
}

class LinkedList {
	head = null
	size = 0
	get(index) {
		if(this.head && index < this.size && index >= 0) {
			let cursor = this.head
			let pos = 0
			while (index !== pos) {
				cursor = cursor.next
				pos += 1
			}
			return cursor.val
		}
	}
	remove(val) {
		if(this.head) {
			let cursor = this.head
			if (cursor.val === val) {
				const removedNode = cursor.val
				this.head = cursor.next
				return removedNode
			}
			while(cursor.next !== null) {
				if (cursor.next.val === val) {
					const removedNode = cursor.next.val
					cursor.next = cursor.next.next
					return removedNode
				}
				cursor = cursor.next
			}
		} else {
			throw new Error('Value doesn\'t exit')
		}
		throw new Error('Value doesn\'t exit')
	}
	indexOf(val) {
		if(this.head) {
			let cursor = this.head
			let pos = 0
			if (cursor.val === val) {
				return pos
			}
			while(cursor !== null) {
				if (cursor.val === val) {
					return pos
				}
				cursor = cursor.next
			}
		}
		throw new Error('Value doesn\'t exit')
	}
	get(index) {
		if(this.head && index < this.size && index >= 0) {
			let cursor = this.head
			let pos = 0
			if (index === 0) {
				return this.head.val
			} else {
				while(index !== pos) {
					cursor = cursor.next
					pos += 1
				}
				return cursor.val
			}
		} else {
			throw new Error('Index does not exist')
		}
	}
	set(index, val) {
		if(this.head && index < this.size && index >= 0) {
			let cursor = this.head
			let pos = 0
			if (index === 0) {
				this.head.val = val
			} else {
				while(index !== pos) {
					cursor = cursor.next
					pos += 1
				}
				cursor.val = val
			}
		} else {
			throw new Error('Index does not exist')
		}
	}
	removeAt(index) {
		if(this.head && index < this.size && index >= 0) {
			let cursor = this.head
			let pos = 0
			if (index === 0) {
				const removedVal = this.head.val
				this.head = null
			} else {
				while(index - 1 !== pos) {
					cursor = cursor.next
					pos += 1
				}
				const removedVal = cursor.next.val
				cursor.next = cursor.next.next
			}
			return removedVal
		} else {
			throw new Error('Index does not exist')
		}
	}
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
		this.size += 1
	}
	insert(index, val) {
		if (index < 0) throw new Error('Index out of bounds')
		const node = new Node()
		node.val = val
		let pos = 0
		if (index === 0) {
			node.next = this.head
			this.head = node
		} else {
			let cursor = this.head
			while(cursor.next !== null && index - 1 !== pos) {
				cursor = cursor.next
				pos = pos + 1
			}
			if (cursor.next === null && index > pos) {
				throw new Error('Index out of bounds')
			}
			node.next = cursor.next
			cursor.next = node
		}
		size += 1
	}
	popBack() {
		if (this.head) {
			let cursor = this.head
			let returnVal
			if (this.head.next) {
				while(cursor.next.next !== null) {
					cursor = cursor.next
				}
				returnVal = cursor.next.val
				cursor.next = cursor.next.next
			} else {
				returnVal = cursor.next.val
				this.head = null
			}
			this.size -= 1
			return returnVal
		} else {
			throw new Error('List is empty')
		}
	}
	pushFront(val) {
		const node = new Node();
		node.val = val
		node.next = this.head
		this.head = node
		this.size += 1
	}
	popFront() {
		if (this.head) {
			const returnNode = this.head
			this.head = this.head.next
			this.size -= 1
			return returnNode.val
		} else {
			throw new Error('List is empty')
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
console.log(singlyList.get(1)) // 3
console.log(singlyList.get(2)) // 4
singlyList.remove(1)
console.log(singlyList.toArray()) // 8, 4
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
