package main

import (
	"errors"
	"fmt"
)

type Node struct {
	value int
	next  *Node
}

type SinglyLinkedList struct {
	Head *Node
}

func initNewNode(value int) *Node {
	return &Node{value: value, next: nil}
}

func createNewSinglyLinkedList() *SinglyLinkedList {
	return &SinglyLinkedList{Head: nil}
}

func (sLL *SinglyLinkedList) pushFront(val int) {
	newNode := initNewNode(val)
	newNode.next = sLL.Head
	sLL.Head = newNode
}

func (sLL *SinglyLinkedList) pushBack(val int) {
	newNode := initNewNode(val)
	if sLL.Head == nil {
		sLL.Head = newNode
		return
	}

	currentNode := sLL.Head
	for currentNode.next != nil {
		currentNode = currentNode.next
	}
	currentNode.next = newNode
}

func (sLL *SinglyLinkedList) insert(idx, val int) error {
	if idx < 0 {
		return errors.New("Index cannot be negative")
	}

	if idx == 0 {
		sLL.pushFront(val)
		return nil
	}

	newNode := initNewNode(val)
	i := 0
	currentNode := sLL.Head
	var previousNode *Node

	for i < idx && currentNode != nil {
		previousNode = currentNode
		currentNode = currentNode.next
		i++
	}

	if currentNode == nil {
		return errors.New("Index greater than list range")
	}

	previousNode.next = newNode
	newNode.next = currentNode
	return nil
}

func (sLL *SinglyLinkedList) popFront() (int, error) {
	if sLL.Head == nil {
		return 0, errors.New("Empty SLL")
	}

	poppedNode := sLL.Head
	sLL.Head = poppedNode.next
	return poppedNode.value, nil
}

func (sLL *SinglyLinkedList) popBack() (int, error) {
	if sLL.Head == nil {
		return 0, errors.New("Empty SLL")
	}

	if sLL.Head.next == nil {
		HeadVal := sLL.Head.value
		sLL.Head = nil
		return HeadVal, nil
	}

	prevNode := sLL.Head
	nextNode := prevNode.next

	for nextNode.next != nil {
		prevNode = nextNode
		nextNode = prevNode.next
	}
	prevNode.next = nil
	return nextNode.value, nil
}

func (sLL *SinglyLinkedList) remove(val int) error {
	if sLL.Head == nil {
		return errors.New("Empty SLL")
	}

	if sLL.Head.value == val {
		sLL.Head = sLL.Head.next
		return nil
	}

	prevNode := sLL.Head
	nextNode := prevNode.next

	for nextNode != nil {
		if nextNode.value == val {
			prevNode.next = nextNode.next
			return nil
		}
		prevNode = nextNode
		nextNode = prevNode.next
	}

	return nil
}

func (sLL *SinglyLinkedList) removeAt(idx int) error {
	if idx < 0 {
		return errors.New("Index cannot be negative")
	}

	if idx == 0 {
		return sLL.remove(sLL.Head.value)
	}

	prevNode := sLL.Head
	nextNode := prevNode.next
	i := 1

	for i <= idx && nextNode != nil {
		if i == idx {
			prevNode.next = nextNode.next
			return nil
		}
		prevNode = nextNode
		nextNode = prevNode.next
		i += 1
	}

	return errors.New("Index greater than list range")
}

func (sLL *SinglyLinkedList) get(idx int) (int, error) {
	if idx < 0 {
		return 0, errors.New("Index cannot be negative")
	}

	currentNode := sLL.Head
	i := 0

	for i <= idx && currentNode != nil {
		if i == idx {
			return currentNode.value, nil
		}
		currentNode = currentNode.next
		i += 1
	}

	return 0, errors.New("Index greater than list range")
}

func (sLL *SinglyLinkedList) indexOf(value int) int {
	currentNode := sLL.Head
	i := 0

	for currentNode != nil {
		if currentNode.value == value {
			return i
		}
		currentNode = currentNode.next
		i += 1
	}

	return -1
}

func (sLL *SinglyLinkedList) set(idx, val int) error {
	if idx < 0 {
		return errors.New("Index cannot be negative")
	}

	currentNode := sLL.Head
	i := 0

	for i <= idx && currentNode != nil {
		if i == idx {
			currentNode.value = val
			return nil
		}
		currentNode = currentNode.next
		i += 1
	}

	return errors.New("Index greater than list range")
}

func (sLL *SinglyLinkedList) toArray() []int {
	resultArr := []int{}
	currentNode := sLL.Head
	for currentNode != nil {
		resultArr = append(resultArr, currentNode.value)
		currentNode = currentNode.next
	}
	return resultArr
}

func main() {
	sLL := createNewSinglyLinkedList()
	sLL.pushFront(2)
	sLL.pushFront(8)
	sLL.pushFront(9)
	sLL.pushBack(45)
	fmt.Println(sLL.toArray())
	// 9,8,2,45
	frontValue, _ := sLL.popFront()
	fmt.Println(frontValue)
	// 9
	fmt.Println(sLL.toArray())
	// 8,2,45
	backValue, _ := sLL.popBack()
	fmt.Println(backValue)
	// 45
	fmt.Println(sLL.toArray())
	// 8,2
	sLL.pushFront(69)
	sLL.pushFront(420)
	fmt.Println(sLL.toArray())
	// 420,69,8,2
	sLL.remove(69)
	sLL.removeAt(2)
	fmt.Println(sLL.toArray())
	// 420,8
	valueAt1, _ := sLL.get(1)
	fmt.Println(valueAt1)
	// 8
	fmt.Println(sLL.indexOf(420))
	// 0
	fmt.Println(sLL.indexOf(554))
	// -1
	sLL.set(0, 69)
	fmt.Println(sLL.toArray())
	// 69,8
}
