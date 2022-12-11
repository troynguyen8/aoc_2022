class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class Stack {
    // Top of the stack as a Node
    #stackHead = null;

    constructor(stackName) {
        this.stackName = stackName;
    }

    peek() {
        return this.#stackHead?.value ?? undefined;
    }

    pop() {
        if (!this.#stackHead) {
            return undefined;
        }

        const returnValue = this.peek();
        this.#stackHead = this.#stackHead.next;

        return returnValue;
    }

    push(element) {
        const newTopOfStack = new Node(element);
        newTopOfStack.next = this.#stackHead;

        this.#stackHead = newTopOfStack;
    }

    // Pushes a batch of elements to be kept in order on the stack
    pushBatch(elements) {
        for (let i = elements.length - 1; i >= 0; i--) {
            this.push(elements[i]);
        }
    }

    toString() {
        let stackAsArray = [];
        let nodeIterator = this.#stackHead;
        while (nodeIterator) {
            stackAsArray.push(nodeIterator.value);
            nodeIterator = nodeIterator.next;
        }

        return stackAsArray.join(',');
    }
}
