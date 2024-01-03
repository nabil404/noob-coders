class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Node | None = None


class LinkedList:

    def __init__(self):
        self.head: Node | None = None

    def get(self, index: int) -> int:
        current_node = self.head
        i = 0
        while current_node:
            if i == index:
                return current_node.data
            i += 1
            current_node = current_node.next
        return -1

    def insert_head(self, val: int) -> None:
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node

    def insert_tail(self, val: int) -> None:
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            return

        current_node = self.head
        while current_node.next:
            current_node = current_node.next
        current_node.next = new_node

    def remove(self, index: int) -> bool:
        if not self.head:
            return False

        if index < 0:
            return False

        if index == 0:
            self.head = self.head.next
            return True

        current_node = self.head
        previous_node = None
        i = 0
        while index > i and current_node:
            previous_node = current_node
            current_node = current_node.next
            i += 1

        if not current_node:
            return False

        previous_node.next = current_node.next
        return True

    def get_values(self) -> list[int]:
        response = []
        current_node = self.head
        while current_node:
            response.append(current_node.data)
            current_node = current_node.next
        return response
