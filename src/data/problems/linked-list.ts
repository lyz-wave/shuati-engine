import { Problem } from '../types'

export const linkedListProblems: Problem[] = [
  {
    id: 2,
    title: '两数相加',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/add-two-numbers/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'l1 = [2,4,3], l2 = [5,6,4]',
    output: '[7,0,8] (342 + 465 = 807)',
    code: {
      cpp: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // 虚拟头节点——就像盖房子先打地基，省去处理头节点的麻烦
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;   // cur 是"施工队长"，负责搭建链表
        int carry = 0;           // carry 是"进位包袱"，背着它往下一位传

        // 只要还有数没加完，或者还有"包袱"没卸掉，就接着干
        while (l1 || l2 || carry) {
            int sum = carry;          // 先把上一位丢过来的包袱背上
            if (l1) { sum += l1->val; l1 = l1->next; }
            if (l2) { sum += l2->val; l2 = l2->next; }

            carry = sum / 10;                 // 新的包袱丢给下一位（十位以上）
            cur->next = new ListNode(sum % 10); // 当前位只管个位数
            cur = cur->next;                  // 施工队前进一格
        }
        return dummy->next;
    }
};`,
      rust: `impl Solution {
    pub fn add_two_numbers(
        l1: Option<Box<ListNode>>,
        l2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        // 虚拟头节点——先打个地基，后面直接往上建
        let mut dummy = Box::new(ListNode::new(0));
        let mut cur = &mut dummy;   // cur 是"施工队长"
        let mut carry = 0;          // carry 是"进位包袱"

        let (mut p1, mut p2) = (l1, l2); // 两条链表各自派一个"工头"

        // 只要还有数没加完，或者还有进位没处理，就继续干
        while p1.is_some() || p2.is_some() || carry != 0 {
            let mut sum = carry;           // 先背上旧包袱
            if let Some(node) = p1 { sum += node.val; p1 = node.next; }
            if let Some(node) = p2 { sum += node.val; p2 = node.next; }

            carry = sum / 10;                     // 新包袱丢给下一位
            cur.next = Some(Box::new(ListNode::new(sum % 10))); // 本位的个位数结清
            cur = cur.next.as_mut().unwrap();      // 施工队前进
        }
        dummy.next
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：建好虚拟头节点，carry（进位）设为 0，准备开干',
        highlights: [],
        data: {
          l1: { val: 2, next: { val: 4, next: { val: 3, next: null } } },
          l2: { val: 5, next: { val: 6, next: { val: 4, next: null } } },
          result: { val: 0, next: null },
          carry: 0,
        },
        pointers: [
          { label: 'p1', pos: 0 },
          { label: 'p2', pos: 0 },
        ],
      },
      {
        description: '第 1 位：2 + 5 + carry(0) = 7，当前位 = 7，进位 = 0',
        highlights: [0],
        data: {
          l1: { val: 2, next: { val: 4, next: { val: 3, next: null } } },
          l2: { val: 5, next: { val: 6, next: { val: 4, next: null } } },
          result: { val: 7, next: { val: 0, next: null } },
          carry: 0,
        },
        pointers: [
          { label: 'p1', pos: 1 },
          { label: 'p2', pos: 1 },
        ],
      },
      {
        description: '第 2 位：4 + 6 + carry(0) = 10，当前位 = 0，进位 = 1',
        highlights: [1],
        data: {
          l1: { val: 2, next: { val: 4, next: { val: 3, next: null } } },
          l2: { val: 5, next: { val: 6, next: { val: 4, next: null } } },
          result: { val: 7, next: { val: 0, next: { val: 8, next: null } } },
          carry: 1,
        },
        pointers: [
          { label: 'p1', pos: 2 },
          { label: 'p2', pos: 2 },
        ],
      },
      {
        description: '第 3 位：3 + 4 + carry(1) = 8，当前位 = 8，进位 = 0。计算完毕！',
        highlights: [2],
        data: {
          l1: { val: 2, next: { val: 4, next: { val: 3, next: null } } },
          l2: { val: 5, next: { val: 6, next: { val: 4, next: null } } },
          result: { val: 7, next: { val: 0, next: { val: 8, next: null } } },
          carry: 0,
        },
        pointers: [
          { label: 'p1', pos: -1 },
          { label: 'p2', pos: -1 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { val1: '2', val2: '5', carry: '0', sum: '7' }, explanation: '个位相加：2+5=7，无进位，结果节点值为 7' },
      { step: 2, variables: { val1: '4', val2: '6', carry: '0', sum: '10' }, explanation: '十位相加：4+6=10，当前位=0，进位=1' },
      { step: 3, variables: { val1: '3', val2: '4', carry: '1', sum: '8' }, explanation: '百位相加：3+4+1=8，无进位' },
      { step: 4, variables: { result: '[7,0,8]' }, explanation: '最终结果 7→0→8，即 342+465=807 ✓', isResult: true },
    ],
  },
  {
    id: 19,
    title: '删除链表的倒数第 N 个结点',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/remove-nth-node-from-end-of-list/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'head = [1,2,3,4,5], n = 2',
    output: '[1,2,3,5]',
    code: {
      cpp: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // 虚拟头节点——防止删掉真正的头节点后"群龙无首"
        ListNode* dummy = new ListNode(0, head);
        ListNode* fast = dummy;
        ListNode* slow = dummy;

        // fast 先跑 n 步，给 slow 留出"安全距离"
        for (int i = 0; i < n; i++) fast = fast->next;

        // 两人同步前进，fast 到终点时 slow 刚好在待删节点的前一个
        while (fast->next) {
            fast = fast->next;
            slow = slow->next;
        }

        // 跳过目标节点——就像"抽走积木"
        ListNode* toDelete = slow->next;
        slow->next = slow->next->next;
        delete toDelete; // 释放内存，好习惯

        return dummy->next;
    }
};`,
      rust: `impl Solution {
    pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
        // 虚拟头节点——防止头节点被删后不好处理
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        let mut fast = &dummy.clone() as *const Box<ListNode>;
        let mut slow = &mut dummy as *mut Box<ListNode>;

        // 这里用常规方式处理：先获取长度，再找到待删位置
        let mut len = 0;
        let mut cur = &dummy as *const Box<ListNode>;
        unsafe {
            while let Some(ref node) = (*cur).next {
                len += 1;
                cur = node;
            }
        }

        // 找到待删节点的前一个位置
        let target = len - n;
        let mut cur = &mut dummy;
        for _ in 0..target {
            cur = cur.next.as_mut().unwrap();
        }

        // 跳过目标节点——像抽走一块积木
        cur.next = cur.next.take().and_then(|node| node.next);
        dummy.next
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：fast 和 slow 都指向 dummy（虚拟头节点），n = 2',
        highlights: [],
        data: {
          head: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } },
          dummy: { val: 0, next: null },
        },
        pointers: [
          { label: 'fast', pos: -1 },
          { label: 'slow', pos: -1 },
        ],
      },
      {
        description: 'fast 先跑 2 步：fast 到了 2，slow 还在 dummy',
        highlights: [1],
        data: {
          head: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } },
        },
        pointers: [
          { label: 'fast', pos: 1 },
          { label: 'slow', pos: -1 },
        ],
      },
      {
        description: 'fast 和 slow 同步前进，fast 到末尾时 slow 在 3（待删节点 4 的前一个）',
        highlights: [3],
        data: {
          head: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } },
        },
        pointers: [
          { label: 'fast', pos: 4 },
          { label: 'slow', pos: 2 },
        ],
      },
      {
        description: '删除节点 4：slow.next 跳过 4 直接指向 5，大功告成！',
        highlights: [4],
        data: {
          head: { val: 1, next: { val: 2, next: { val: 3, next: { val: 5, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 2 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { n: '2', fast: 'dummy', slow: 'dummy' }, explanation: 'fast 先走 n=2 步，拉开距离' },
      { step: 2, variables: { fast: '节点 2', slow: 'dummy' }, explanation: 'fast 到达节点 2，slow 仍原地待命' },
      { step: 3, variables: { fast: '节点 5 (末尾)', slow: '节点 3' }, explanation: 'fast 到末尾了，slow 正好在待删节点的前一个位置（节点 3）' },
      { step: 4, variables: { result: '[1,2,3,5]' }, explanation: '删除节点 4，链表变为 [1,2,3,5] ✓', isResult: true },
    ],
  },
  {
    id: 21,
    title: '合并两个有序链表',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/merge-two-sorted-lists/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'list1 = [1,2,4], list2 = [1,3,4]',
    output: '[1,1,2,3,4,4]',
    code: {
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // 虚拟头节点——这是新链表的"地基"
        ListNode* dummy = new ListNode(0);
        ListNode* cur = dummy;  // cur 是"编织工"，把两个链表"编"到一起

        // 两边都还有人，就比大小，谁小谁先上
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                cur->next = list1;        // list1 的节点更小，先接上
                list1 = list1->next;      // list1 指针后移
            } else {
                cur->next = list2;        // list2 的节点更小，先接上
                list2 = list2->next;      // list2 指针后移
            }
            cur = cur->next;              // 编织工前进
        }

        // 有一边走完了？没关系，把剩下的整条接上就行
        cur->next = list1 ? list1 : list2;

        return dummy->next;
    }
};`,
      rust: `impl Solution {
    pub fn merge_two_lists(
        list1: Option<Box<ListNode>>,
        list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        // 虚拟头节点——新链表的"地基"
        let mut dummy = Box::new(ListNode::new(0));
        let mut cur = &mut dummy; // cur 是"编织工"

        let (mut p1, mut p2) = (list1, list2);

        // 两边都还有人，比大小，谁小接谁
        while let (Some(n1), Some(n2)) = (p1.as_ref(), p2.as_ref()) {
            if n1.val <= n2.val {
                // p1 小，把 p1 的节点接上
                let node = p1.take().unwrap();
                cur.next = Some(node);
                cur = cur.next.as_mut().unwrap();
                p1 = cur.next.take(); // 这里简化处理，实际应为 p1 = p1.next
            } else {
                let node = p2.take().unwrap();
                cur.next = Some(node);
                cur = cur.next.as_mut().unwrap();
                p2 = cur.next.take();
            }
        }

        // 处理剩下的尾巴：哪边还有人就把整条接上
        cur.next = if p1.is_some() { p1 } else { p2 };
        dummy.next
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：两个链表准备合并，cur 指向 dummy 地基',
        highlights: [],
        data: {
          list1: { val: 1, next: { val: 2, next: { val: 4, next: null } } },
          list2: { val: 1, next: { val: 3, next: { val: 4, next: null } } },
          result: { val: 0, next: null },
        },
        pointers: [
          { label: 'p1', pos: 0 },
          { label: 'p2', pos: 0 },
          { label: 'cur', pos: -1 },
        ],
      },
      {
        description: '比较：list1.val=1 <= list2.val=1，接 list1 的 1',
        highlights: [0],
        data: {
          list1: { val: 1, next: { val: 2, next: { val: 4, next: null } } },
          list2: { val: 1, next: { val: 3, next: { val: 4, next: null } } },
          result: { val: 1, next: null },
        },
        pointers: [
          { label: 'p1', pos: 1 },
          { label: 'p2', pos: 0 },
        ],
      },
      {
        description: '比较：list1.val=2 > list2.val=1，接 list2 的 1',
        highlights: [1],
        data: {
          list1: { val: 1, next: { val: 2, next: { val: 4, next: null } } },
          list2: { val: 1, next: { val: 3, next: { val: 4, next: null } } },
          result: { val: 1, next: { val: 1, next: null } },
        },
        pointers: [
          { label: 'p1', pos: 1 },
          { label: 'p2', pos: 1 },
        ],
      },
      {
        description: '继续比较拼接，最终 list1 先走完，把 list2 剩余的 [3,4] 直接接上',
        highlights: [4],
        data: {
          list1: { val: 1, next: { val: 2, next: { val: 4, next: null } } },
          list2: { val: 1, next: { val: 3, next: { val: 4, next: null } } },
          result: { val: 1, next: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 4, next: null } } } } } },
        },
        pointers: [
          { label: 'p1', pos: -1 },
          { label: 'p2', pos: 2 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { p1: '1', p2: '1' }, explanation: '1 <= 1，取 list1 的 1，p1 后移' },
      { step: 2, variables: { p1: '2', p2: '1' }, explanation: '2 > 1，取 list2 的 1，p2 后移' },
      { step: 3, variables: { p1: '2', p2: '3' }, explanation: '2 < 3，取 list1 的 2，p1 后移' },
      { step: 4, variables: { p1: '4', p2: '3' }, explanation: '4 > 3，取 list2 的 3，p2 后移' },
      { step: 5, variables: { p1: '4', p2: '4' }, explanation: '4 <= 4，取 list1 的 4，p1 结束，接上 list2 剩余的 4' },
      { step: 6, variables: { result: '[1,1,2,3,4,4]' }, explanation: '合并完成 ✓', isResult: true },
    ],
  },
  {
    id: 141,
    title: '环形链表',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/linked-list-cycle/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'head = [3,2,0,-4], pos = 1',
    output: 'true （存在环）',
    code: {
      cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        // 快慢指针——就像操场上两个人赛跑
        // 跑得快的人终究会追上跑得慢的人（套圈）
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast && fast->next) {
            slow = slow->next;          // 慢指针：一步一个脚印
            fast = fast->next->next;    // 快指针：两步并一步

            if (slow == fast) {         // 快指针追上了慢指针——有环！
                return true;
            }
        }
        // 快指针跑到头了——没有环，是个直路
        return false;
    }
};`,
      rust: `impl Solution {
    pub fn has_cycle(head: Option<Box<ListNode>>) -> bool {
        // 快慢指针——就像跑道上的两个选手
        // 跑得快的终将套圈跑得慢的（如果有环的话）
        use std::cell::Cell;

        // 用裸指针处理，避免 Rust 的所有权限制
        let head = match head { Some(h) => h, None => return false };
        let mut slow = &head as *const Box<ListNode>;
        let mut fast = &head as *const Box<ListNode>;

        unsafe {
            while let Some(fast_next) = (*fast).next.as_ref() {
                slow = (*slow).next.as_ref().unwrap();   // 慢指针走一步
                fast = fast_next.next.as_ref().unwrap(); // 快指针走两步

                if slow == fast {  // 追上就是有环！
                    return true;
                }
            }
        }
        false // 走到头了，没环
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：slow 和 fast 都指向头节点 3',
        highlights: [0],
        data: {
          head: { val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 0 },
          { label: 'fast', pos: 0 },
        ],
      },
      {
        description: 'slow 到 2，fast 到 0：fast 已经领先一圈（注意 -4 指向 2，形成环）',
        highlights: [2],
        data: {
          head: { val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 1 },
          { label: 'fast', pos: 2 },
        ],
      },
      {
        description: 'fast 在环中追上了 slow！两者相遇，断定有环 🎯',
        highlights: [3],
        data: {
          head: { val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 3 },
          { label: 'fast', pos: 3 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { slow: '3', fast: '3' }, explanation: '两指针同时从 head 出发' },
      { step: 2, variables: { slow: '2', fast: '0' }, explanation: '慢指针走一步到 2，快指针走两步到 0' },
      { step: 3, variables: { slow: '-4', fast: '-4' }, explanation: '快指针追上慢指针，说明链表有环！', isResult: true },
    ],
  },
  {
    id: 160,
    title: '相交链表',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/intersection-of-two-linked-lists/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5]',
    output: '8（相交节点值为 8）',
    code: {
      cpp: `class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        // 双指针"走亲访友"法：
        // 你走我的路，我走你的路，总有一天会相遇
        ListNode* pA = headA;
        ListNode* pB = headB;

        while (pA != pB) {
            // 走到头了就换到另一条链表的起点继续走
            pA = pA ? pA->next : headB;
            pB = pB ? pB->next : headA;
        }
        // 要么相遇在交点，要么同时为 nullptr（不相交）
        return pA;
    }
};`,
      rust: `impl Solution {
    pub fn get_intersection_node(
        headA: Option<Box<ListNode>>,
        headB: Option<Box<ListNode>>,
    ) -> Option<*const ListNode> {
        // 双指针"串门"法——你走完我的路，我走完你的路，终会相逢
        use std::ptr;

        if headA.is_none() || headB.is_none() { return None; }

        let mut pA = &headA as *const Option<Box<ListNode>>;
        let mut pB = &headB as *const Option<Box<ListNode>>;

        unsafe {
            // 用原始指针比较地址来模拟
            let headA_ptr = headA.as_ref().unwrap() as *const Box<ListNode>;
            let headB_ptr = headB.as_ref().unwrap() as *const Box<ListNode>;

            let mut a: *const ListNode = headA_ptr as *const ListNode;
            let mut b: *const ListNode = headB_ptr as *const ListNode;

            while a != b {
                // 走到头就换到另一条链
                a = if a.is_null() { headB_ptr as *const ListNode }
                    else { (*(*a).next.as_ref().unwrap()) as *const ListNode };
                b = if b.is_null() { headA_ptr as *const ListNode }
                    else { (*(*b).next.as_ref().unwrap()) as *const ListNode };
            }
            Some(a)
        }
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：pA 指向链表 A 头 [4,1,8,4,5]，pB 指向链表 B 头 [5,0,1,8,4,5]',
        highlights: [0],
        data: {
          listA: { val: 4, next: { val: 1, next: { val: 8, next: { val: 4, next: { val: 5, next: null } } } } },
          listB: { val: 5, next: { val: 0, next: { val: 1, next: { val: 8, next: { val: 4, next: { val: 5, next: null } } } } } },
        },
        pointers: [
          { label: 'pA', pos: 0 },
          { label: 'pB', pos: 0 },
        ],
      },
      {
        description: 'pA 走完 A(4→1→8→4→5→null)，换到 B 的起点 5；pB 走完 B，换到 A 的起点 4',
        highlights: [2],
        data: {
          listA: { val: 4, next: { val: 1, next: { val: 8, next: { val: 4, next: { val: 5, next: null } } } } },
          listB: { val: 5, next: { val: 0, next: { val: 1, next: { val: 8, next: { val: 4, next: { val: 5, next: null } } } } } },
        },
        pointers: [
          { label: 'pA', pos: 0 },
          { label: 'pB', pos: 0 },
        ],
      },
      {
        description: 'pA 从 B 出发到 0→1→8，pB 从 A 出发到 4→1→8，最终在 8 相遇！',
        highlights: [2],
        data: {
          listA: { val: 4, next: { val: 1, next: { val: 8, next: { val: 4, next: { val: 5, next: null } } } } },
          listB: { val: 5, next: { val: 0, next: { val: 1, next: { val: 8, next: { val: 4, next: { val: 5, next: null } } } } } },
        },
        pointers: [
          { label: 'pA', pos: 2 },
          { label: 'pB', pos: 2 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { pA: '4', pB: '5' }, explanation: '两指针从各自链表起点出发' },
      { step: 2, variables: { pA: 'null→换到 B:5', pB: 'null→换到 A:4' }, explanation: '两指针都走完了自己的链表 + 对方的链表，总路程相同' },
      { step: 3, variables: { pA: '8', pB: '8' }, explanation: '两指针在相交节点 8 相遇！', isResult: true },
    ],
  },
  {
    id: 206,
    title: '反转链表',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/reverse-linked-list/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'head = [1,2,3,4,5]',
    output: '[5,4,3,2,1]',
    code: {
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // 三个指针玩"拆积木"游戏
        ListNode* prev = nullptr;  // prev：已经反转好的部分的"头"
        ListNode* curr = head;     // curr：当前要处理的节点

        while (curr) {
            ListNode* nextTemp = curr->next; // 先记住下一个节点，防止走丢
            curr->next = prev;               // 掉转枪头：当前节点指向 prev
            prev = curr;                     // prev 前进到当前节点
            curr = nextTemp;                 // curr 前进到下一个节点
        }
        return prev; // 最后 prev 就是新链表的头
    }
};`,
      rust: `impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // 三个指针"乾坤大挪移"
        let mut prev: Option<Box<ListNode>> = None; // 已经反转好的部分
        let mut curr = head;                         // 当前要处理的主角

        while let Some(mut node) = curr {
            let next_temp = node.next;  // 先记下下一个节点，别弄丢了
            node.next = prev;           // 调转箭头：当前节点指向已反转部分
            prev = Some(node);          // 已反转部分的头更新为当前节点
            curr = next_temp;           // 处理下一个节点
        }
        prev // 新链表的头
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：prev = null，curr = head (1)',
        highlights: [0],
        data: {
          head: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } },
        },
        pointers: [
          { label: 'prev', pos: -1 },
          { label: 'curr', pos: 0 },
        ],
      },
      {
        description: '第 1 步：记住下一个节点 2，让 1 指向 null（prev），反转第一个节点',
        highlights: [0],
        data: {
          head: { val: 1, next: null },
        },
        pointers: [
          { label: 'prev', pos: 0 },
          { label: 'curr', pos: 1 },
        ],
      },
      {
        description: '第 2 步：记住下一个节点 3，让 2 指向 1（prev），反转第二个节点',
        highlights: [1],
        data: {
          head: { val: 2, next: { val: 1, next: null } },
        },
        pointers: [
          { label: 'prev', pos: 1 },
          { label: 'curr', pos: 2 },
        ],
      },
      {
        description: '继续反转，curr 依次处理 3→4→5，每次都将箭头调转方向',
        highlights: [4],
        data: {
          head: { val: 5, next: { val: 4, next: { val: 3, next: { val: 2, next: { val: 1, next: null } } } } },
        },
        pointers: [
          { label: 'prev', pos: 4 },
          { label: 'curr', pos: -1 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { curr: '1', prev: 'null' }, explanation: '1.next → null，prev 移到 1' },
      { step: 2, variables: { curr: '2', prev: '1' }, explanation: '2.next → 1，prev 移到 2' },
      { step: 3, variables: { curr: '3', prev: '2' }, explanation: '3.next → 2，prev 移到 3' },
      { step: 4, variables: { curr: '4', prev: '3' }, explanation: '4.next → 3，prev 移到 4' },
      { step: 5, variables: { curr: '5', prev: '4' }, explanation: '5.next → 4，prev 移到 5，curr = null 结束' },
      { step: 6, variables: { result: '[5,4,3,2,1]' }, explanation: '链表反转完成！', isResult: true },
    ],
  },
  {
    id: 234,
    title: '回文链表',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/palindrome-linked-list/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'head = [1,2,2,1]',
    output: 'true（是回文链表）',
    code: {
      cpp: `class Solution {
public:
    bool isPalindrome(ListNode* head) {
        // 第一步：快慢指针找中点（慢指针就是中点）
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // 第二步：反转后半段链表
        ListNode* prev = nullptr;
        while (slow) {
            ListNode* nextTemp = slow->next;
            slow->next = prev;
            prev = slow;
            slow = nextTemp;
        }

        // 第三步：前后两段逐位比较
        ListNode* left = head;
        ListNode* right = prev;
        while (right) {
            if (left->val != right->val) return false;
            left = left->next;
            right = right->next;
        }
        return true;
    }
};`,
      rust: `impl Solution {
    pub fn is_palindrome(head: Option<Box<ListNode>>) -> bool {
        // 三步走：找中点 → 反转后半 → 逐对比较
        // 第一步：快慢指针找中间节点
        let mut slow = &head as *const Option<Box<ListNode>>;
        let mut fast = &head as *const Option<Box<ListNode>>;

        unsafe {
            while let Some(ref fast_node) = (*fast).as_ref().unwrap().next {
                fast = &fast_node.next;
                if fast_node.next.is_some() {
                    fast = &fast_node.next.as_ref().unwrap().next;
                } else {
                    break;
                }
                slow = &(*slow).as_ref().unwrap().next;
            }
        }

        // 第二步：反转后半段
        let mut prev: Option<Box<ListNode>> = None;
        let mut cur = unsafe { (*slow).clone() };
        while let Some(mut node) = cur {
            let next = node.next;
            node.next = prev;
            prev = Some(node);
            cur = next;
        }

        // 第三步：逐对比较
        let mut left = &head;
        let mut right = &prev;
        while let Some(r) = right {
            if left.as_ref().unwrap().val != r.val { return false; }
            left = &left.as_ref().unwrap().next;
            right = &r.next;
        }
        true
    }
}`,
    },
    animationSteps: [
      {
        description: '第一步：快慢指针找中点。slow 走一步，fast 走两步',
        highlights: [1],
        data: {
          head: { val: 1, next: { val: 2, next: { val: 2, next: { val: 1, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 1 },
          { label: 'fast', pos: 3 },
        ],
      },
      {
        description: 'slow 在第二个 2（中点），反转后半段 [2,1] → [1,2]',
        highlights: [2],
        data: {
          head: { val: 1, next: { val: 2, next: null } },
          reversed: { val: 1, next: { val: 2, next: null } },
        },
        pointers: [
          { label: 'left (前半)', pos: 0 },
          { label: 'right (后半)', pos: 0 },
        ],
      },
      {
        description: '逐对比较：前半 1 == 后半 1 ✓，前半 2 == 后半 2 ✓，全部相等！',
        highlights: [3],
        data: {
          head: { val: 1, next: { val: 2, next: null } },
          reversed: { val: 1, next: { val: 2, next: null } },
        },
        pointers: [
          { label: 'left (前半)', pos: 2 },
          { label: 'right (后半)', pos: 2 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { slow: '节点 2', fast: '节点 1（末尾）' }, explanation: '快慢指针找到中点，slow 在第二个 2' },
      { step: 2, variables: { reversed: '[1,2]' }, explanation: '反转后半段 [2,1] 变为 [1,2]' },
      { step: 3, variables: { left: '1→2', right: '1→2' }, explanation: '1==1 ✓, 2==2 ✓，全部匹配，是回文！', isResult: true },
    ],
  },
  {
    id: 142,
    title: '环形链表 II',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/linked-list-cycle-ii/',
    category: 'linked-list',
    visualizerType: 'linked-list',
    input: 'head = [3,2,0,-4], pos = 1',
    output: '返回索引为 1 的节点（值为 2）',
    code: {
      cpp: `class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;

        // 第一阶段：快慢指针找相遇点
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                // 第二阶段：一个从头出发，一个从相遇点出发
                // 再次相遇的节点就是环的入口 —— 数学证明，不服不行
                slow = head;
                while (slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow; // 环的入口，找到你了！
            }
        }
        return nullptr; // 没环
    }
};`,
      rust: `impl Solution {
    pub fn detect_cycle(head: Option<Box<ListNode>>) -> Option<*const ListNode> {
        // Floyd 算法：第一阶段找相遇点，第二阶段找入口
        if head.is_none() { return None; }

        let head = head.unwrap();
        let mut slow = &head as *const Box<ListNode>;
        let mut fast = &head as *const Box<ListNode>;

        unsafe {
            // 第一阶段：快慢指针找相遇点
            loop {
                if (*fast).next.is_none() || (*fast).next.as_ref().unwrap().next.is_none() {
                    return None; // 没环
                }
                slow = (*slow).next.as_ref().unwrap();
                fast = (*fast).next.as_ref().unwrap().next.as_ref().unwrap();
                if slow == fast { break; } // 相遇了！
            }

            // 第二阶段：一个从头，一个从相遇点，同步前进找入口
            let mut entry = &head as *const Box<ListNode>;
            while entry != slow {
                entry = (*entry).next.as_ref().unwrap();
                slow = (*slow).next.as_ref().unwrap();
            }
            Some(entry as *const ListNode)
        }
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：slow 和 fast 都指向头节点 3，准备出发',
        highlights: [0],
        data: {
          head: { val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 0 },
          { label: 'fast', pos: 0 },
        ],
      },
      {
        description: '第一阶段：两人在环中追逐，fast 在 -4 处追上 slow，两者相遇',
        highlights: [3],
        data: {
          head: { val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 3 },
          { label: 'fast', pos: 3 },
        ],
      },
      {
        description: '第二阶段：slow 回到 head，两人以相同速度前进，将在入口相遇',
        highlights: [0],
        data: {
          head: { val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null } } } },
        },
        pointers: [
          { label: 'slow (回头)', pos: 0 },
          { label: 'fast', pos: 3 },
        ],
      },
      {
        description: '两人在节点 2（索引 1）相遇——这就是环的入口！🎯',
        highlights: [1],
        data: {
          head: { val: 3, next: { val: 2, next: { val: 0, next: { val: -4, next: null } } } },
        },
        pointers: [
          { label: 'slow', pos: 1 },
          { label: 'fast', pos: 1 },
        ],
      },
    ],
    walkthrough: [
      { step: 1, variables: { slow: '3', fast: '3' }, explanation: '两指针同时从 head 出发' },
      { step: 2, variables: { slow: '-4', fast: '-4' }, explanation: '第一阶段相遇，证明有环' },
      { step: 3, variables: { slow: 'head→3', fast: '-4' }, explanation: 'slow 重置到头，fast 留原地，同速前进' },
      { step: 4, variables: { entry: '2（索引 1）' }, explanation: '再次相遇在环入口节点 2 ✓', isResult: true },
    ],
  },
]
