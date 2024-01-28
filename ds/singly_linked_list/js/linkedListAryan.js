const assert = require('node:assert');
const { describe, it, beforeEach } = require('node:test');

class Node {
    val = 0;
    next = null;
}

class LinkedList {
    head = null;
    pushFront(val) {
        const node = new Node();
        node.val = val;
        node.next = this.head;
        this.head = node;
    }
    pushBack(val) {
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
        let cursor = this.head;
        if (index === 0) {
            node.next = this.head
            this.head = node
            return
        }
        if (this.head) {
            while (cursor.next !== null && pos + 1 !== index) {
                cursor = cursor.next;
                pos = pos + 1;
            }
            if (index > pos + 1) {
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
                returnVal = cursor.val;
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
        if (this.head && index >= 0) {
            let cursor = this.head;
            let pos = 0;
            let removedVal;
            if (index === 0) {
                removedVal = this.head.val;
                this.head = this.head.next;
            } else {
                while (pos + 1 !== index && cursor.next.next !== null) {
                    cursor = cursor.next;
                    pos += 1;
                }
                if (pos + 1 < index) {
                    throw new Error("Index does not exist");
                }
                removedVal = cursor.next.val;
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
            while (cursor !== null) {
                if (cursor.val === val) {
                    return pos;
                }
                cursor = cursor.next;
                pos += 1;
            }
        }
        throw new Error("Value doesn't exist");
    }
    set(index, val) {
        if (this.head && index >= 0) {
            let cursor = this.head;
            let pos = 0;
            while (index !== pos && cursor !== null) {
                cursor = cursor.next;
                pos += 1;
            }
            if (cursor === null) {
                throw new Error("Index does not exist");
            }
            cursor.val = val;
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
            while (index !== pos && cursor !== null) {
                cursor = cursor.next;
                pos += 1;
            }
            if (cursor === null) {
                throw new Error("Index does not exist");
            }
            return cursor.val;
        } else {
            throw new Error("Index does not exist");
        }
    }
}

describe('LinkedList Tests', () => {
    let singlyList;

    beforeEach(() => {
        singlyList = new LinkedList();
    });

    it('should handle pushFront operation', () => {
        singlyList.pushFront(10);
        singlyList.pushFront(23);
        singlyList.pushFront(25);
        assert.strict.deepStrictEqual(singlyList.toArray(), [25, 23, 10]);
    });

    it('should handle pushBack operation', () => {
        singlyList.pushBack(20);
        singlyList.pushBack(21);
        singlyList.pushBack(420);
        assert.strict.deepStrictEqual(singlyList.toArray(), [20, 21, 420]);
    });

    it('should handle insert operation, and let insert at front and also after last element', () => {
        singlyList.pushFront(32);
        singlyList.pushFront(37);
        singlyList.insert(0, 30);
        assert.strict.deepStrictEqual(singlyList.toArray(), [30, 37, 32]);
        singlyList.insert(1, 320)
        assert.strict.deepStrictEqual(singlyList.toArray(), [30, 320, 37, 32]);
        singlyList.insert(3, 420);
        assert.strict.deepStrictEqual(singlyList.toArray(), [30, 320, 37, 420, 32]);
        singlyList.insert(5, 69);
        assert.strict.deepStrictEqual(singlyList.toArray(), [30, 320, 37, 420, 32, 69]);
        assert.strict.throws(() => { singlyList.insert(-1, 40); }, /Index out of bounds/);
        assert.strict.throws(() => { singlyList.insert(8, 50); }, /Index out of bounds/);
    });

    it('should handle popFront operation', () => {
        singlyList.pushFront(60);
        singlyList.pushFront(80);
        assert.strict.strictEqual(singlyList.popFront(), 80);
        assert.strict.strictEqual(singlyList.popFront(), 60);
        assert.strict.throws(() => { singlyList.popFront(); }, /List is empty/);
    });

    it('should handle popBack operation', () => {
        singlyList.pushBack(70);
        singlyList.pushBack(12);
        singlyList.pushFront(33);
        assert.strict.strictEqual(singlyList.popBack(), 12);
        assert.strict.strictEqual(singlyList.popBack(), 70);
        assert.strict.strictEqual(singlyList.popBack(), 33);
        assert.strict.throws(() => { singlyList.popBack(); }, /List is empty/);
    });

    it('should handle remove operation', () => {
        singlyList.pushFront(80);
        singlyList.pushFront(90);
        assert.strict.strictEqual(singlyList.remove(80), 80);
        assert.strict.throws(() => { singlyList.remove(100); }, /Value doesn't exist/);
        assert.strict.deepEqual(singlyList.toArray(), [90]);
    });

    it('should handle removeAt operation', () => {
        singlyList.pushFront(110);
        singlyList.pushFront(120);
        singlyList.pushBack(1220);
        singlyList.pushFront(320);
        assert.strict.deepEqual(singlyList.toArray(), [320, 120, 110, 1220]);
        assert.strict.strictEqual(singlyList.removeAt(1), 120);
        assert.strict.throws(() => { singlyList.removeAt(4); }, /Index does not exist/);
        assert.strict.deepEqual(singlyList.toArray(), [320, 110, 1220]);
    });

    it('should handle indexOf operation', () => {
        singlyList.pushFront(99130);
        singlyList.pushBack(13034324);
        singlyList.pushFront(132220);
        singlyList.pushFront(120);
        singlyList.pushFront(130);
        assert.strict.deepEqual(singlyList.toArray(), [130, 120, 132220, 99130, 13034324]);
        assert.strict.strictEqual(singlyList.indexOf(130), 0);
        assert.strict.strictEqual(singlyList.indexOf(99130), 3);
        assert.strict.strictEqual(singlyList.indexOf(132220), 2);
        assert.strict.throws(() => { singlyList.indexOf(10); }, /Value doesn't exist/);
    });

    it('should handle set operation and only replace value at existing index', () => {
        singlyList.pushFront(150);
        singlyList.pushFront(130);
        singlyList.pushFront(120);
        singlyList.set(0, 160);
        assert.strict.deepStrictEqual(singlyList.toArray(), [160, 130, 150]);
        singlyList.set(2, 10);
        assert.strict.deepStrictEqual(singlyList.toArray(), [160, 130, 10]);
        assert.strict.throws(() => { singlyList.set(3, 170); }, /Index does not exist/);
    });

    it('should handle get operation', () => {
        singlyList.pushFront(180);
        singlyList.pushBack(200);
        singlyList.pushBack(220);
        assert.strict.strictEqual(singlyList.get(0), 180);
        assert.strict.strictEqual(singlyList.get(2), 220);
        assert.strict.throws(() => { singlyList.get(-1) }, /Index does not exist/);
        assert.strict.throws(() => { singlyList.get(3) }, /Index does not exist/);
    });

    it('should handle toArray operation', () => {
        singlyList.pushFront(190);
        singlyList.pushBack(200);
        singlyList.pushBack(200);
        assert.strict.deepStrictEqual(singlyList.toArray(), [190, 200, 200]);
    });
});
