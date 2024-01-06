class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Node | None = None


class LinkedList:

    def __init__(self):
        self.head: Node | None = None

    def push_front(self, val: int) -> None:
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node

    def push_back(self, val: int) -> None:
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            return

        current_node = self.head
        while current_node.next:
            current_node = current_node.next
        current_node.next = new_node

    def insert(self, index: int, val: int) -> None:
        if index < 0:
            raise ValueError("Index must be non-negative.")
        if index == 0:
            self.push_front(val)
        new_node = Node(val)
        i = 0
        current_node = self.head
        previous_node = None
        while current_node and i < index:
            previous_node = current_node
            current_node = current_node.next
            i += 1

        if not current_node:
            raise IndexError("Index out of range")

        previous_node.next = new_node
        new_node.next = current_node

    def pop_front(self) -> int | None:
        if not self.head:
            return
        popped_node = self.head
        if popped_node:
            self.head = popped_node.next
            return popped_node.data

    def pop_back(self) -> int | None:
        if not self.head:
            return
        if not self.head.next:
            popped_node = self.head
            self.head = None
            return popped_node.data

        current_node = self.head
        next_node = current_node.next
        while next_node.next:
            current_node = next_node
            next_node = next_node.next
        current_node.next = None
        return next_node.data

    def remove(self, val: int) -> bool:
        if not self.head:
            return False

        if self.head.data == val:
            self.head = self.head.next
            return True

        current_node = self.head
        while current_node.next:
            if current_node.next.data == val:
                current_node.next = current_node.next.next
                return True
            current_node = current_node.next
        return False

    def remove_at(self, index: int) -> int | None:
        if index < 0:
            raise ValueError("Index must be non-negative.")
        if not self.head:
            return None

        if index == 0:
            value = self.head.data
            self.head = self.head.next
            return value

        current_node = self.head
        previous_node = None
        i = 0
        while index > i and current_node:
            previous_node = current_node
            current_node = current_node.next
            i += 1

        if not current_node:
            return None

        value = previous_node.next.data
        previous_node.next = current_node.next
        return value

    def get(self, index: int) -> int:
        if index < 0:
            raise ValueError("Index must be non-negative.")
        current_node = self.head
        i = 0
        while current_node:
            if i == index:
                return current_node.data
            i += 1
            current_node = current_node.next
        if not current_node:
            raise IndexError("Index out of range")

    def index_of(self, val: int) -> int:
        i = 0
        current_node = self.head
        while current_node:
            if current_node.data == val:
                return i
            current_node = current_node.next
            i += 1
        return -1

    def to_array(self) -> list[int]:
        result = []
        current_node = self.head
        while current_node:
            result.append(current_node.data)
            current_node = current_node.next
        return result

    def set(self, index: int, val: int) -> None:
        if index < 0:
            raise ValueError("Index must be non-negative.")
        i = 0
        current_node = self.head
        while current_node and i < index:
            current_node = current_node.next
            i += 1

        current_node.data = val

        if not current_node:
            raise IndexError("Index out of range")


if __name__ == "__main__":
    def create_linked_list_from_array(value: list[int]) -> LinkedList:
        ll = LinkedList()
        for val in value:
            ll.push_back(val)
        return ll


    input_list = [1, 3, 4, 7, 8]

    # push_front
    linked_list = create_linked_list_from_array(input_list)
    linked_list.push_front(2)
    assert linked_list.to_array() == [2, *input_list]

    # push_back
    linked_list = create_linked_list_from_array(input_list)
    linked_list.push_back(8)
    assert linked_list.to_array() == [*input_list, 8]

    # insert
    linked_list = create_linked_list_from_array(input_list)
    linked_list.insert(index=3, val=10)
    assert linked_list.to_array() == [1, 3, 4, 10, 7, 8]

    # pop_front
    linked_list = create_linked_list_from_array(input_list)
    popped = linked_list.pop_front()
    assert popped == 1
    assert linked_list.to_array() == [3, 4, 7, 8]

    linked_list = create_linked_list_from_array([1])
    popped = linked_list.pop_front()
    assert popped == 1
    assert linked_list.to_array() == []

    linked_list = create_linked_list_from_array([])
    popped = linked_list.pop_front()
    assert popped is None
    assert linked_list.to_array() == []

    # pop_back
    linked_list = create_linked_list_from_array(input_list)
    popped = linked_list.pop_back()
    assert popped == 8
    assert linked_list.to_array() == [1, 3, 4, 7]

    linked_list = create_linked_list_from_array([])
    popped = linked_list.pop_back()
    assert popped is None
    assert linked_list.to_array() == []

    linked_list = create_linked_list_from_array([1])
    popped = linked_list.pop_back()
    assert popped == 1
    assert linked_list.to_array() == []

    # remove
    linked_list = create_linked_list_from_array(input_list)
    removed = linked_list.remove(3)
    assert removed is True
    assert linked_list.to_array() == [1, 4, 7, 8]

    linked_list = create_linked_list_from_array([1])
    removed = linked_list.remove(3)
    assert removed is False
    assert linked_list.to_array() == [1]

    linked_list = create_linked_list_from_array([])
    removed = linked_list.remove(3)
    assert removed is False
    assert linked_list.to_array() == []

    linked_list = create_linked_list_from_array([1, 2])
    removed = linked_list.remove(2)
    assert removed is True
    assert linked_list.to_array() == [1]

    # remove_at
    linked_list = create_linked_list_from_array(input_list)
    removed = linked_list.remove_at(3)
    assert removed == 7
    assert linked_list.to_array() == [1, 3, 4, 8]

    linked_list = create_linked_list_from_array([1])
    removed = linked_list.remove_at(3)
    assert removed is None
    assert linked_list.to_array() == [1]

    linked_list = create_linked_list_from_array([])
    removed = linked_list.remove_at(3)
    assert removed is None
    assert linked_list.to_array() == []

    linked_list = create_linked_list_from_array([1, 2])
    removed = linked_list.remove_at(1)
    assert removed == 2
    assert linked_list.to_array() == [1]

    # get
    linked_list = create_linked_list_from_array(input_list)
    item = linked_list.get(3)
    assert item == 7

    linked_list = create_linked_list_from_array([1])
    item = linked_list.get(0)
    assert item == 1

    # index_of
    linked_list = create_linked_list_from_array(input_list)
    index = linked_list.index_of(3)
    assert index == 1

    linked_list = create_linked_list_from_array([1])
    index = linked_list.index_of(1)
    assert index == 0

    linked_list = create_linked_list_from_array([])
    index = linked_list.index_of(3)
    assert index == -1

    linked_list = create_linked_list_from_array([1, 2])
    index = linked_list.index_of(1)
    assert index == 0

    # set
    linked_list = create_linked_list_from_array(input_list)
    linked_list.set(1, 9)
    assert linked_list.to_array() == [1, 9, 4, 7, 8]

    linked_list = create_linked_list_from_array([1])
    linked_list.set(0, 9)
    assert linked_list.to_array() == [9]

    linked_list = create_linked_list_from_array([1, 2])
    linked_list.set(1, 9)
    assert linked_list.to_array() == [1, 9]
