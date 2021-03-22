class PriorityQueue
{
    constructor(initialHeap = [], comparator = function(a, b){
        return a > b
    })
    {
        this.heap = initialHeap;
        this.comparator = comparator
    }
    size()
    {
        return this.heap.length;
    }
    empty()
    {
        return this.heap.length === 0;
    }
    parent(i)
    {
        return Math.floor((i-1)/2);
    }
    left(i)
    {
        return (2*i + 1)
    }
    right(i)
    {
        return 2*(i+ 1)
    }
    peek()
    {
        return this.heap[0]
    }
    push(value)
    {
        this.heap.push(value)
        this.bubbleUp(this.size() - 1)
    }
    pop()
    {
        const outValue  = this.peek();
        this.swap(0, this.size() - 1);
        this.heap.pop();
        this.bubbleDown(0);
        return outValue;
    }
    swap(i, j)
    {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }
    bubbleUp(i)
    {
        while(i > 0 && this.comparator(this.heap[i], this.heap[this.parent(i)]))
        {
            this.swap(i,this.parent(i))
            i = this.parent(i)
        }
    }
    bubbleDown(i)
    {
        while (this.left(i) < this.size())
        {
            let child = i;
            if(this.right(i) < this.size() && this.comparator(this.heap[this.right(i)], this.heap[child]))
            {
                child = this.right(i);
            }
            if (this.comparator(this.heap[this.left(i)], this.heap[child]))
            {
                child = this.left(i);
            }
            if(i == child)//heap structure is good stop bubble down
            {
                break;
            }
            this.swap(i, child);
            i = child;
        }
    }
    delete(i)
    {
        
    }
}
export default PriorityQueue;