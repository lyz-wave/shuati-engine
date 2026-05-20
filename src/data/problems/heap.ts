import { Problem } from '../types'

export const heapProblems: Problem[] = [
  {
    id: 23,
    title: '合并 K 个升序链表',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/merge-k-sorted-lists/',
    category: 'heap',
    visualizerType: 'array',
    input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
    output: '[1,1,2,3,4,4,5,6]',
    code: {
      cpp: `class Solution {
public:
    // 自定义比较器——最小堆需要"最小的放前面"
    struct Compare {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val; // > 是最小堆，< 是最大堆
        }
    };

    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // 最小堆就像"多路归并"的选拔赛
        // 每次从 K 个链表中选出最小的节点
        priority_queue<ListNode*, vector<ListNode*>, Compare> pq;

        // 各链表的头节点先上场
        for (ListNode* list : lists) {
            if (list) pq.push(list);
        }

        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;

        while (!pq.empty()) {
            // 从堆里拿出最小的节点，接上结果链表
            ListNode* node = pq.top(); pq.pop();
            cur->next = node;
            cur = cur->next;

            // 如果这个节点所在的链表还有后续节点，把下一个也加入选拔
            if (node->next) pq.push(node->next);
        }
        return dummy->next;
    }
};`,
      rust: `impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        // 用最小堆做多路归并——每次弹出最小的节点
        use std::collections::BinaryHeap;
        use std::cmp::Reverse;

        // BinaryHeap 是最大堆，用 Reverse 包一层变成最小堆
        let mut heap: BinaryHeap<Reverse<(i32, usize)>> = BinaryHeap::new();

        // 把所有链表的头节点值加入堆（带上链表下标防止比较歧义）
        for (i, list) in lists.iter().enumerate() {
            if let Some(node) = list {
                heap.push(Reverse((node.val, i)));
            }
        }

        let mut dummy = Box::new(ListNode::new(0));
        let mut cur = &mut dummy;

        // 由于 Rust 的所有权限制，用索引数组维护后续节点位置
        let mut nodes: Vec<Option<Box<ListNode>>> = lists;

        while let Some(Reverse((_, idx))) = heap.pop() {
            // 取出 idx 对应链表的当前节点
            let node = nodes[idx].take().unwrap();
            if let Some(next) = node.next {
                nodes[idx] = Some(next.clone());
                heap.push(Reverse((next.val, idx)));
            }
            cur.next = Some(Box::new(ListNode::new(node.val)));
            cur = cur.next.as_mut().unwrap();
        }
        dummy.next
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：三条链表头节点 [1,1,2] 进入最小堆',
        highlights: [],
        data: {
          lists: [
            { val: 1, next: { val: 4, next: { val: 5, next: null } } },
            { val: 1, next: { val: 3, next: { val: 4, next: null } } },
            { val: 2, next: { val: 6, next: null } },
          ],
          heap: [1, 1, 2],
          result: [],
        },
      },
      {
        description: '弹出最小节点 1（来自链表1），将其下一个节点 4 加入堆。堆=[1,2,4]',
        highlights: [0],
        data: {
          lists: [
            { val: 1, next: { val: 4, next: { val: 5, next: null } } },
            { val: 1, next: { val: 3, next: { val: 4, next: null } } },
            { val: 2, next: { val: 6, next: null } },
          ],
          heap: [1, 2, 4],
          result: [1],
        },
      },
      {
        description: '弹出最小节点 1（来自链表2），将其下一个节点 3 加入堆。堆=[2,3,4]',
        highlights: [0],
        data: {
          lists: [
            { val: 1, next: { val: 4, next: { val: 5, next: null } } },
            { val: 1, next: { val: 3, next: { val: 4, next: null } } },
            { val: 2, next: { val: 6, next: null } },
          ],
          heap: [2, 3, 4],
          result: [1, 1],
        },
      },
      {
        description: '持续从堆中弹出最小值，接上对应链表下一节点。堆不断补充新节点',
        highlights: [4],
        data: {
          lists: [
            { val: 1, next: { val: 4, next: { val: 5, next: null } } },
            { val: 1, next: { val: 3, next: { val: 4, next: null } } },
            { val: 2, next: { val: 6, next: null } },
          ],
          heap: [5, 6],
          result: [1, 1, 2, 3, 4, 4],
        },
      },
      {
        description: '所有链表遍历完毕，堆空。合并完成！result=[1,1,2,3,4,4,5,6]',
        highlights: [],
        data: {
          lists: [
            { val: 1, next: { val: 4, next: { val: 5, next: null } } },
            { val: 1, next: { val: 3, next: { val: 4, next: null } } },
            { val: 2, next: { val: 6, next: null } },
          ],
          heap: [],
          result: [1, 1, 2, 3, 4, 4, 5, 6],
        },
      },
    ],
    walkthrough: [
      { step: 1, variables: { heap: '[1,1,2]' }, explanation: '三条链表的头节点入堆' },
      { step: 2, variables: { pop: '1', next_in: '4', heap: '[1,2,4]', result: '[1]' }, explanation: '弹出 1（链表1），4 入堆' },
      { step: 3, variables: { pop: '1', next_in: '3', heap: '[2,3,4]', result: '[1,1]' }, explanation: '弹出 1（链表2），3 入堆' },
      { step: 4, variables: { pop: '2', next_in: '6', heap: '[3,4,6]', result: '[1,1,2]' }, explanation: '弹出 2（链表3），6 入堆' },
      { step: 5, variables: { heap: '[]', result: '[1,1,2,3,4,4,5,6]' }, explanation: '堆空，合并完成！', isResult: true },
    ],
  },
  {
    id: 215,
    title: '数组中的第K个最大元素',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/kth-largest-element-in-an-array/',
    category: 'heap',
    visualizerType: 'array',
    input: 'nums = [3,2,1,5,6,4], k = 2',
    output: '5',
    code: {
      cpp: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // 最小堆——堆里只保留 K 个最大的元素
        // 新来的如果比堆顶大，就踢掉堆顶，自己进来
        // 最后堆顶就是第 K 大的
        priority_queue<int, vector<int>, greater<int>> minHeap;

        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop(); // 保持堆的大小为 K，始终保留最大的 K 个
            }
        }
        return minHeap.top();
    }
};`,
      rust: `impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        // 最小堆：只保留 K 个最大的数，堆顶就是第 K 大的
        use std::collections::BinaryHeap;
        use std::cmp::Reverse;

        let mut heap: BinaryHeap<Reverse<i32>> = BinaryHeap::new();
        let k = k as usize;

        for &num in &nums {
            heap.push(Reverse(num));
            if heap.len() > k {
                heap.pop(); // 堆超了？踢掉最小的（堆顶）
            }
        }
        // 堆顶就是第 K 大的
        heap.peek().unwrap().0
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：建一个大小为 k=2 的最小堆，空',
        highlights: [],
        data: { nums: [3, 2, 1, 5, 6, 4], k: 2, heap: [] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'push(3)：堆=[3]（堆大小 1 <= k）',
        highlights: [0],
        data: { nums: [3, 2, 1, 5, 6, 4], k: 2, heap: [3] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'push(2)：堆=[2,3]（堆大小 2 = k）',
        highlights: [1],
        data: { nums: [3, 2, 1, 5, 6, 4], k: 2, heap: [2, 3] },
        pointers: [{ label: 'i', pos: 1 }],
      },
      {
        description: 'push(1)：1 < 堆顶 2，入堆后弹出 1。堆仍=[2,3]',
        highlights: [2],
        data: { nums: [3, 2, 1, 5, 6, 4], k: 2, heap: [2, 3] },
        pointers: [{ label: 'i', pos: 2 }],
      },
      {
        description: 'push(5)：5 > 堆顶 2，5 入堆，弹出 2。堆=[3,5]',
        highlights: [3],
        data: { nums: [3, 2, 1, 5, 6, 4], k: 2, heap: [3, 5] },
        pointers: [{ label: 'i', pos: 3 }],
      },
      {
        description: 'push(6)：6 > 堆顶 3，6 入堆，弹出 3。堆=[5,6]',
        highlights: [4],
        data: { nums: [3, 2, 1, 5, 6, 4], k: 2, heap: [5, 6] },
        pointers: [{ label: 'i', pos: 4 }],
      },
      {
        description: 'push(4)：4 < 堆顶 5，不动。遍历结束，堆顶 5 就是第 K 大！',
        highlights: [5],
        data: { nums: [3, 2, 1, 5, 6, 4], k: 2, heap: [5, 6] },
        pointers: [{ label: 'i', pos: 5 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { num: '3', heap: '[3]' }, explanation: '3 入堆，堆大小=1≤k' },
      { step: 2, variables: { num: '2', heap: '[2,3]' }, explanation: '2 入堆，堆大小=k=2' },
      { step: 3, variables: { num: '1', heap: '[2,3]→[2,3]' }, explanation: '1<2，入堆后弹出 1，堆不变' },
      { step: 4, variables: { num: '5', heap: '[3,5]' }, explanation: '5>2，踢掉 2，保留 [3,5]' },
      { step: 5, variables: { num: '6', heap: '[5,6]' }, explanation: '6>3，踢掉 3，保留 [5,6]' },
      { step: 6, variables: { num: '4', heap: '[5,6]', result: '5' }, explanation: '4<5，不用动。堆顶 5 是第 2 大', isResult: true },
    ],
  },
  {
    id: 295,
    title: '数据流的中位数',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/find-median-from-data-stream/',
    category: 'heap',
    visualizerType: 'array',
    input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()',
    output: '[null, null, 1.5, null, 2]',
    code: {
      cpp: `class MedianFinder {
public:
    // 大顶堆存小的一半，小顶堆存大的一半
    // 就像把数据分成"左半区"和"右半区"，中位数就在中间
    priority_queue<int> left;                             // 大顶堆（存较小的一半）
    priority_queue<int, vector<int>, greater<int>> right; // 小顶堆（存较大的一半）

    MedianFinder() {}

    void addNum(int num) {
        // 先放左半区（大顶堆），然后平衡两边的数量
        if (left.empty() || num <= left.top()) {
            left.push(num);
        } else {
            right.push(num);
        }

        // 保持平衡：left 要么和 right 一样多，要么多一个
        // 这样中位数在 left 堆顶（奇数）或两堆顶平均（偶数）
        if (left.size() > right.size() + 1) {
            right.push(left.top());
            left.pop();
        } else if (right.size() > left.size()) {
            left.push(right.top());
            right.pop();
        }
    }

    double findMedian() {
        if (left.size() == right.size()) {
            return (left.top() + right.top()) / 2.0;
        }
        return left.top(); // left 多一个，堆顶就是中位数
    }
};`,
      rust: `use std::collections::BinaryHeap;
use std::cmp::Reverse;

struct MedianFinder {
    // 大顶堆放左半边（小数字），小顶堆放右半边（大数字）
    left: BinaryHeap<i32>,          // 大顶堆——存较小的一半
    right: BinaryHeap<Reverse<i32>>, // 小顶堆——存较大的一半
}

impl MedianFinder {
    fn new() -> Self {
        MedianFinder {
            left: BinaryHeap::new(),
            right: BinaryHeap::new(),
        }
    }

    fn add_num(&mut self, num: i32) {
        // 先根据大小决定放哪边
        if self.left.is_empty() || num <= *self.left.peek().unwrap() {
            self.left.push(num);
        } else {
            self.right.push(Reverse(num));
        }

        // 平衡两边：left 要么和 right 一样多，要么多一个
        if self.left.len() > self.right.len() + 1 {
            let val = self.left.pop().unwrap();
            self.right.push(Reverse(val));
        } else if self.right.len() > self.left.len() {
            let val = self.right.pop().unwrap().0;
            self.left.push(val);
        }
    }

    fn find_median(&self) -> f64 {
        match self.left.len().cmp(&self.right.len()) {
            std::cmp::Ordering::Equal => {
                (*self.left.peek().unwrap() as f64 + self.right.peek().unwrap().0 as f64) / 2.0
            }
            _ => *self.left.peek().unwrap() as f64,
        }
    }
}`,
    },
    animationSteps: [
      {
        description: 'MedianFinder 初始化：左（大顶堆）和右（小顶堆）都为空',
        highlights: [],
        data: { left: [], right: [] },
      },
      {
        description: 'addNum(1)：空，放 left。left=[1], right=[]',
        highlights: [0],
        data: { left: [1], right: [] },
      },
      {
        description: 'addNum(2)：2>1，放 right。right 比 left 多？left.push(right.pop)。left=[1,2], right=[]',
        highlights: [1],
        data: { left: [2, 1], right: [] },
      },
      {
        description: 'findMedian()：长度相等，取均值 (1+2)/2=1.5',
        highlights: [1],
        data: { left: [2, 1], right: [], median: 1.5 },
      },
      {
        description: 'addNum(3)：3>1，放 right。right=[3]。平衡后 left=[2,1], right=[3]',
        highlights: [2],
        data: { left: [2, 1], right: [3] },
      },
      {
        description: 'findMedian()：left 多一个，left 堆顶 2 就是中位数',
        highlights: [2],
        data: { left: [2, 1], right: [3], median: 2 },
      },
    ],
    walkthrough: [
      { step: 1, variables: { action: 'addNum(1)', left: '[1]', right: '[]' }, explanation: '1 放入大顶堆（左半区）' },
      { step: 2, variables: { action: 'addNum(2)', left: '[2,1]', right: '[]' }, explanation: '2 放入小顶堆后平衡，左堆=[2,1], 右堆=[]' },
      { step: 3, variables: { action: 'findMedian()', result: '1.5' }, explanation: '左右等长，中位数 = (1+2)/2 = 1.5' },
      { step: 4, variables: { action: 'addNum(3)', left: '[2,1]', right: '[3]' }, explanation: '3 放入右堆，平衡后左=[2,1], 右=[3]' },
      { step: 5, variables: { action: 'findMedian()', result: '2' }, explanation: '左堆多一个，中位数 = left.top() = 2', isResult: true },
    ],
  },
  {
    id: 347,
    title: '前 K 个高频元素',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/top-k-frequent-elements/',
    category: 'heap',
    visualizerType: 'array',
    input: 'nums = [1,1,1,2,2,3], k = 2',
    output: '[1,2]',
    code: {
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // 先用哈希表统计每个数出现的频率
        // 再用最小堆找出频率最高的 K 个数
        unordered_map<int, int> freq; // 统计每个数字出现次数

        for (int num : nums) {
            freq[num]++;
        }

        // 最小堆，按频率（pair.first）排序
        // 堆里只保留 K 个频率最高的元素
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> minHeap;

        for (auto& [num, count] : freq) {
            minHeap.push({count, num});
            if (minHeap.size() > k) {
                minHeap.pop(); // 踢掉频率最低的
            }
        }

        // 把堆里的元素倒出来
        vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().second);
            minHeap.pop();
        }
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        // 哈希表数频率，最小堆取 Top K
        use std::collections::{BinaryHeap, HashMap};
        use std::cmp::Reverse;

        let mut freq: HashMap<i32, i32> = HashMap::new();
        for &num in &nums {
            *freq.entry(num).or_insert(0) += 1;
        }

        // 最小堆存 (频率, 数字)，只留 K 个
        let mut heap: BinaryHeap<Reverse<(i32, i32)>> = BinaryHeap::new();
        let k = k as usize;

        for (&num, &count) in &freq {
            heap.push(Reverse((count, num)));
            if heap.len() > k {
                heap.pop(); // 保持堆大小为 K
            }
        }

        // 提取结果
        heap.into_iter().map(|Reverse((_, num))| num).collect()
    }
}`,
    },
    animationSteps: [
      {
        description: '第一步：统计频率。1→3次，2→2次，3→1次',
        highlights: [],
        data: { nums: [1, 1, 1, 2, 2, 3], freq: { '1': 3, '2': 2, '3': 1 }, k: 2, heap: [] },
      },
      {
        description: '处理 1（频率3）：堆为空，入堆。堆=[(3,1)]',
        highlights: [0],
        data: { nums: [1, 1, 1, 2, 2, 3], freq: { '1': 3, '2': 2, '3': 1 }, k: 2, heap: ['(3,1)'] },
      },
      {
        description: '处理 2（频率2）：入堆。堆大小 2 = k。堆=[(2,2), (3,1)]',
        highlights: [3],
        data: { nums: [1, 1, 1, 2, 2, 3], freq: { '1': 3, '2': 2, '3': 1 }, k: 2, heap: ['(2,2)', '(3,1)'] },
      },
      {
        description: '处理 3（频率1）：入堆→大小>k，弹出频率最低的 (1,3)。堆=[(2,2), (3,1)]',
        highlights: [5],
        data: { nums: [1, 1, 1, 2, 2, 3], freq: { '1': 3, '2': 2, '3': 1 }, k: 2, heap: ['(2,2)', '(3,1)'] },
      },
      {
        description: '提取结果：弹出堆中元素，result=[2,1]（或 [1,2] 顺序不限）',
        highlights: [0],
        data: { nums: [1, 1, 1, 2, 2, 3], freq: { '1': 3, '2': 2, '3': 1 }, k: 2, heap: [], result: [1, 2] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { freq: '1:3, 2:2, 3:1' }, explanation: '统计频率：1 出现 3 次，2 出现 2 次，3 出现 1 次' },
      { step: 2, variables: { push: '1(freq:3)', heap: '[(3,1)]' }, explanation: '1（频率3）入堆' },
      { step: 3, variables: { push: '2(freq:2)', heap: '[(2,2), (3,1)]' }, explanation: '2（频率2）入堆，堆大小=k=2' },
      { step: 4, variables: { push: '3(freq:1)', pop: '3(freq:1)' }, explanation: '3（频率1）入堆后弹出，堆仍保留频率最高的两个' },
      { step: 5, variables: { result: '[1,2]' }, explanation: '弹出堆中元素，得前 K 高频 [1,2]', isResult: true },
    ],
  },
]
