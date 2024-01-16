import { strict as assert } from 'node:assert';
import { describe, it, beforeEach } from 'node:test';

class Node {
    val = 0;
    next = null;
}

class LinkedList {
    head = null;
	pushFront (val) {
        const node = new Node();
        node.val = val;
        node.next = this.head;
        this.head = node;
    }
	pushBack (val) {
        const node = new Node();
        node.val = val;
        if (this.head) {
            let cursor = this.head;
            while (cursor.next !== null) {
                cursor = cursor.next;
            }
            cursor.next = node;
        } else {
            this.head = node;
        }
    }
	insert(index, val) {
        if (index < 0) throw new Error("Index out of bounds");
        const node = new Node();
        node.val = val;
        let pos = 0;
        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let cursor = this.head;
            while (cursor.next !== null && index - 1 !== pos) {
                cursor = cursor.next;
                pos = pos + 1;
            }
            if (cursor.next === null && index > pos) {
                throw new Error("Index out of bounds");
            }
            node.next = cursor.next;
            cursor.next = node;
        }
    }
	popFront() {
        if (this.head) {
            const returnNode = this.head;
            this.head = this.head.next;
            this.size -= 1;
            return returnNode.val;
        } else {
            throw new Error("List is empty");
        }
    }
	popBack() {
        if (this.head) {
            let cursor = this.head;
            let returnVal;
            if (this.head.next) {
                while (cursor.next.next !== null) {
                    cursor = cursor.next;
                }
                returnVal = cursor.next.val;
                cursor.next = cursor.next.next;
            } else {
                returnVal = cursor.next.val;
                this.head = null;
            }
            return returnVal;
        } else {
            throw new Error("List is empty");
        }
    }
    remove(val) {
        if (this.head) {
            let cursor = this.head;
            if (cursor.val === val) {
                const removedNode = cursor.val;
                this.head = cursor.next;
                return removedNode;
            }
            while (cursor.next !== null) {
                if (cursor.next.val === val) {
                    const removedNode = cursor.next.val;
                    cursor.next = cursor.next.next;
                    return removedNode;
                }
                cursor = cursor.next;
            }
        } else {
            throw new Error("Value doesn't exist");
        }
        throw new Error("Value doesn't exist");
    }
	removeAt(index) {
        if (this.head && index < this.size && index >= 0) {
            let cursor = this.head;
            let pos = 0;
            if (index === 0) {
                const removedVal = this.head.val;
                this.head = null;
            } else {
                while (index - 1 !== pos) {
                    cursor = cursor.next;
                    pos += 1;
                }
                const removedVal = cursor.next.val;
                cursor.next = cursor.next.next;
            }
            return removedVal;
        } else {
            throw new Error("Index does not exist");
        }
    }
    indexOf(val) {
        if (this.head) {
            let cursor = this.head;
            let pos = 0;
            if (cursor.val === val) {
                return pos;
            }
            while (cursor !== null) {
                if (cursor.val === val) {
                    return pos;
                }
                cursor = cursor.next;
            }
        }
        throw new Error("Value doesn't exist");
    }
    set(index, val) {
        if (this.head && index >= 0) {
            let cursor = this.head;
            let pos = 0;
            if (index === 0) {
                this.head.val = val;
            } else {
                while (index !== pos) {
                    cursor = cursor.next;
                    pos += 1;
                }
                cursor.val = val;
            }
        } else {
            throw new Error("Index does not exist");
        }
    }
	toArray() {
        let cursor = this.head;
        const output = [];
        while (cursor != null) {
            output.push(cursor.val);
            cursor = cursor.next;
        }
        return output;
    }
	get(index) {
        if (this.head && index >= 0) {
            let cursor = this.head;
            let pos = 0;
            while (index !== pos) {
                cursor = cursor.next;
                pos += 1;
            }
            return cursor.val;
        }
    }
}

describe('LinkedList Tests', () => {
    let singlyList;

    beforeEach(() => {
        singlyList = new LinkedList();
    });

    it('should handle pushFront and toArray operations', () => {
        singlyList.pushFront(3);
        singlyList.pushFront(8);
        singlyList.pushFront(5);
        assert.deepStrictEqual(singlyList.toArray(), [5, 8, 3]);
    });

    it('should handle popFront operation', () => {
        singlyList.pushFront(3);
        singlyList.pushFront(8);
        singlyList.pushFront(5);
        let value = singlyList.popFront();
        assert.strictEqual(value, 5);
        assert.deepStrictEqual(singlyList.toArray(), [8, 3]);
    });

    it('should handle pushBack and popBack operations', () => {
        singlyList.pushBack(4);
        singlyList.pushBack(69);
        assert.deepStrictEqual(singlyList.toArray(), [4, 69]);
        let value = singlyList.popBack();
        assert.strictEqual(value, 69);
        assert.deepStrictEqual(singlyList.toArray(), [4]);
    });

    it('should handle get operation', () => {
        singlyList.pushFront(4);
        singlyList.pushFront(8);
        assert.strictEqual(singlyList.get(1), 4);
    });

    it('should handle remove operation when item doesn\'t exist', () => {
        singlyList.pushFront(4);
        singlyList.pushFront(8);
        assert.throws(() => {
            singlyList.remove(0);
        }, /Value doesn't exist/);
    });

    it('should handle operations on an empty list', () => {
        assert.throws(() => {
            singlyList.popBack();
        }, /List is empty/);
        assert.throws(() => {
            singlyList.popFront();
        }, /List is empty/);
    });
});
