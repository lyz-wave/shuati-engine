import { Problem } from '../types'

export const stackQueueProblems: Problem[] = [
  {
    id: 20,
    title: '有效的括号',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/valid-parentheses/',
    category: 'stack-queue',
    visualizerType: 'array',
    input: 's = "()[]{}"',
    output: 'true',
    code: {
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // 用栈来玩"消消乐"——左括号入栈，右括号消一对
        stack<char> stk;

        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                // 左括号？先"存着"，等右括号来配对
                stk.push(c);
            } else {
                // 右括号？检查栈顶是不是对应的左括号
                if (stk.empty()) return false; // 栈空了，没有匹配的——> 无效

                char top = stk.top();
                // 检查是否匹配：就像拼图，形状要对得上
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) {
                    return false;
                }
                stk.pop(); // 配对成功，弹出栈顶
            }
        }
        // 最后栈应该是空的——所有括号都找到了另一半
        return stk.empty();
    }
};`,
      rust: `impl Solution {
    pub fn is_valid(s: String) -> bool {
        // 栈消消乐——左括号进栈，右括号消消乐
        let mut stack: Vec<char> = Vec::new();

        for c in s.chars() {
            match c {
                '(' | '[' | '{' => {
                    // 左括号？先"存档"等配对
                    stack.push(c);
                }
                ')' => {
                    // 检查栈顶是不是 '('，不是就无效
                    if stack.pop() != Some('(') { return false; }
                }
                ']' => {
                    if stack.pop() != Some('[') { return false; }
                }
                '}' => {
                    if stack.pop() != Some('{') { return false; }
                }
                _ => {}
            }
        }
        stack.is_empty() // 栈空说明全部配对成功
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化空栈，准备遍历括号字符串',
        highlights: [],
        data: { stack: [], s: '()[]{}' },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: '遇到左括号 (，入栈。栈为 [(]',
        highlights: [0],
        data: { stack: ['('], s: '()[]{}' },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: '遇到右括号 )，栈顶是 (，匹配！弹出。栈为空',
        highlights: [1],
        data: { stack: [], s: '()[]{}' },
        pointers: [{ label: 'i', pos: 1 }],
      },
      {
        description: '遇到左括号 [，入栈。之后 ] 匹配弹出。再遇到 { 入栈、} 匹配弹出',
        highlights: [5],
        data: { stack: [], s: '()[]{}' },
        pointers: [{ label: 'i', pos: 5 }],
      },
      {
        description: '遍历结束，栈为空——所有括号都找到了另一半！',
        highlights: [],
        data: { stack: [], s: '()[]{}' },
        pointers: [{ label: 'i', pos: 6 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { c: '(', stack: '[' }, explanation: '左括号入栈' },
      { step: 2, variables: { c: ')', stack: '[]' }, explanation: '右括号，匹配 (，弹出' },
      { step: 3, variables: { c: '[', stack: '[' }, explanation: '左括号入栈' },
      { step: 4, variables: { c: ']', stack: '[]' }, explanation: '匹配 [，弹出' },
      { step: 5, variables: { c: '{', stack: '{' }, explanation: '左括号入栈' },
      { step: 6, variables: { c: '}', stack: '[]' }, explanation: '匹配 {，弹出，栈空 → 有效！', isResult: true },
    ],
  },
  {
    id: 84,
    title: '柱状图中最大的矩形',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/largest-rectangle-in-histogram/',
    category: 'stack-queue',
    visualizerType: 'array',
    input: 'heights = [2,1,5,6,2,3]',
    output: '10（最大矩形面积）',
    code: {
      cpp: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        // 单调栈——每个柱子能找到的"最大宽度"就是左右两边第一个比它矮的柱子
        // 换句话说：以 height[i] 为高的矩形能扩展到多远？
        stack<int> stk;
        int maxArea = 0;
        heights.push_back(0); // 在末尾加个"哨兵"，强制最后把栈清空

        for (int i = 0; i < heights.size(); i++) {
            // 新来的柱子比栈顶矮？说明栈顶柱子的右边界到了
            while (!stk.empty() && heights[i] < heights[stk.top()]) {
                int h = heights[stk.top()]; stk.pop();
                // 左边界就是弹出后的新栈顶（或 -1 如果栈为空）
                int left = stk.empty() ? -1 : stk.top();
                int width = i - left - 1;
                maxArea = max(maxArea, h * width);
            }
            stk.push(i); // 当前索引入栈（左边界待定）
        }
        return maxArea;
    }
};`,
      rust: `impl Solution {
    pub fn largest_rectangle_area(heights: Vec<i32>) -> i32 {
        // 单调栈法：每个柱子往两边找第一个比它矮的，就能算面积
        let mut stack: Vec<usize> = Vec::new();
        let mut max_area = 0;
        let mut h = heights.clone();
        h.push(0); // 末尾加个"哨兵"，逼栈里剩下的全部结算

        for i in 0..h.len() {
            // 新柱子比栈顶矮？栈顶柱子的右边界到了，给它算面积
            while let Some(&top) = stack.last() {
                if h[i] >= h[top] { break; }
                stack.pop();
                let height = h[top];
                let left = stack.last().map(|&x| x as i32).unwrap_or(-1);
                let width = i as i32 - left - 1;
                max_area = max_area.max(height * width);
            }
            stack.push(i);
        }
        max_area
    }
}`,
    },
    animationSteps: [
      {
        description: '准备单调栈，初始 maxArea = 0。在末尾补一个"哨兵"0',
        highlights: [],
        data: { heights: [2, 1, 5, 6, 2, 3, 0], stack: [], maxArea: 0 },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=0 (h=2)：栈空，入栈。栈 = [0]',
        highlights: [0],
        data: { heights: [2, 1, 5, 6, 2, 3, 0], stack: [0], maxArea: 0 },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=1 (h=1)：1 < 栈顶 2，弹出 0，计算面积 2*1=2。maxArea=2。入栈 1。栈=[1]',
        highlights: [1],
        data: { heights: [2, 1, 5, 6, 2, 3, 0], stack: [1], maxArea: 2 },
        pointers: [{ label: 'i', pos: 1 }],
      },
      {
        description: 'i=2,3 (h=5,6)：依次入栈。栈 = [1,2,3]',
        highlights: [2],
        data: { heights: [2, 1, 5, 6, 2, 3, 0], stack: [1, 2, 3], maxArea: 2 },
        pointers: [{ label: 'i', pos: 2 }],
      },
      {
        description: 'i=4 (h=2)：2 < 6，弹出3算面积 6*1=6；2 < 5，弹出2算面积 5*2=10。maxArea=10',
        highlights: [4],
        data: { heights: [2, 1, 5, 6, 2, 3, 0], stack: [1, 4], maxArea: 10 },
        pointers: [{ label: 'i', pos: 4 }],
      },
      {
        description: '哨兵 0 触发最终清算，结算剩余柱子。最大面积 = 10 🎯',
        highlights: [6],
        data: { heights: [2, 1, 5, 6, 2, 3, 0], stack: [], maxArea: 10 },
        pointers: [{ label: 'i', pos: 6 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', h: '2', stack: '[0]', maxArea: '0' }, explanation: 'h=2 入栈' },
      { step: 2, variables: { i: '1', h: '1', pop: '0', area: '2*1=2' }, explanation: '1<2，弹出 0 算面积，maxArea=2' },
      { step: 3, variables: { i: '2-3', stack: '[1,2,3]' }, explanation: '5 和 6 递增，直接入栈' },
      { step: 4, variables: { i: '4', h: '2', pops: '3→6*1=6, 2→5*2=10' }, explanation: '弹出 3 和 2，最大面积 10' },
      { step: 5, variables: { final: '10' }, explanation: '最终最大矩形面积为 10', isResult: true },
    ],
  },
  {
    id: 94,
    title: '二叉树的中序遍历',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/binary-tree-inorder-traversal/',
    category: 'stack-queue',
    visualizerType: 'array',
    input: 'root = [1,null,2,3]',
    output: '[1,3,2]',
    code: {
      cpp: `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // 中序遍历：左→根→右，用栈模拟递归
        // 就像逛迷宫：一直往左走到底，走不动了就回头看看，再去右边
        vector<int> result;
        stack<TreeNode*> stk;
        TreeNode* cur = root;

        while (cur || !stk.empty()) {
            // 拼命往左走，把沿途节点都压入栈
            while (cur) {
                stk.push(cur);
                cur = cur->left;
            }
            // 走到最左边了，弹出一个节点访问
            cur = stk.top(); stk.pop();
            result.push_back(cur->val);
            // 转向右子树，重复以上过程
            cur = cur->right;
        }
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        // 中序遍历：左→根→右，用栈模拟系统调用栈
        let mut result = vec![];
        let mut stack: Vec<Rc<RefCell<TreeNode>>> = vec![];
        let mut cur = root;

        while cur.is_some() || !stack.is_empty() {
            // 一路向左狂奔，把节点全压栈
            while let Some(node) = cur {
                stack.push(node.clone());
                cur = node.borrow().left.clone();
            }
            // 到头了，弹出来访问
            if let Some(node) = stack.pop() {
                result.push(node.borrow().val);
                cur = node.borrow().right.clone();
            }
        }
        result
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：cur = root(1)，栈空，准备中序遍历',
        highlights: [],
        data: { stack: [], result: [] },
        pointers: [{ label: 'cur', pos: 0 }],
      },
      {
        description: '一路向左：节点 1 入栈，cur=null（1 无左子）',
        highlights: [0],
        data: { stack: [1], result: [] },
        pointers: [{ label: 'cur', pos: -1 }],
      },
      {
        description: '弹出 1 访问，result=[1]；转向右子树 cur=2',
        highlights: [0],
        data: { stack: [], result: [1] },
        pointers: [{ label: 'cur', pos: 1 }],
      },
      {
        description: '节点 2 入栈，往左走到 3，3 入栈，cur=null',
        highlights: [1],
        data: { stack: [2, 3], result: [1] },
        pointers: [{ label: 'cur', pos: -1 }],
      },
      {
        description: '弹出 3 访问 result=[1,3]；弹出 2 访问 result=[1,3,2]。结束！',
        highlights: [2],
        data: { stack: [], result: [1, 3, 2] },
        pointers: [{ label: 'cur', pos: 0 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { cur: '1', stack: '[]' }, explanation: '从根节点出发' },
      { step: 2, variables: { cur: 'null', stack: '[1]' }, explanation: '1 入栈，往左走到 null' },
      { step: 3, variables: { cur: 'null', visit: '1', right: '2' }, explanation: '弹出 1，转向右子树 2' },
      { step: 4, variables: { cur: '3', stack: '[2]' }, explanation: '2 入栈，往左走到 3，3 入栈' },
      { step: 5, variables: { result: '[1,3,2]' }, explanation: '弹出 3 再弹出 2，中序遍历完成', isResult: true },
    ],
  },
  {
    id: 150,
    title: '逆波兰表达式求值',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/evaluate-reverse-polish-notation/',
    category: 'stack-queue',
    visualizerType: 'array',
    input: 'tokens = ["2","1","+","3","*"]',
    output: '9 ((2+1)*3)',
    code: {
      cpp: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        // 逆波兰表达式——运算符在后面的写法，用栈一算一个准
        // 就像小时候的算式题：数字先堆着，看到运算符就拿两个出来算
        stack<int> stk;

        for (const string& token : tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                // 注意顺序：先弹出的是右操作数，后弹出的是左操作数
                int b = stk.top(); stk.pop();
                int a = stk.top(); stk.pop();

                if (token == "+") stk.push(a + b);
                else if (token == "-") stk.push(a - b);
                else if (token == "*") stk.push(a * b);
                else stk.push(a / b); // 整数除法，向零取整
            } else {
                // 数字？直接塞进栈里
                stk.push(stoi(token));
            }
        }
        return stk.top();
    }
};`,
      rust: `impl Solution {
    pub fn eval_rpn(tokens: Vec<String>) -> i32 {
        // 逆波兰表达式：数字进栈，遇到运算符就弹出两个算
        let mut stack: Vec<i32> = Vec::new();

        for token in &tokens {
            match token.as_str() {
                "+" | "-" | "*" | "/" => {
                    // 先弹右操作数，再弹左操作数（顺序很重要！）
                    let b = stack.pop().unwrap();
                    let a = stack.pop().unwrap();
                    let result = match token.as_str() {
                        "+" => a + b,
                        "-" => a - b,
                        "*" => a * b,
                        "/" => a / b, // Rust 整数除法向零取整，符合题意
                        _ => unreachable!(),
                    };
                    stack.push(result);
                }
                num => {
                    // 数字就入栈
                    stack.push(num.parse().unwrap());
                }
            }
        }
        stack.pop().unwrap()
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化空栈，开始遍历 tokens',
        highlights: [],
        data: { tokens: ['"2"', '"1"', '"+"', '"3"', '"*"'], stack: [] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: '遇到数字 2：入栈。栈 = [2]',
        highlights: [0],
        data: { tokens: ['"2"', '"1"', '"+"', '"3"', '"*"'], stack: [2] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: '遇到数字 1：入栈。栈 = [2, 1]',
        highlights: [1],
        data: { tokens: ['"2"', '"1"', '"+"', '"3"', '"*"'], stack: [2, 1] },
        pointers: [{ label: 'i', pos: 1 }],
      },
      {
        description: '遇到 +：弹出 1 和 2，计算 2+1=3，结果入栈。栈 = [3]',
        highlights: [2],
        data: { tokens: ['"2"', '"1"', '"+"', '"3"', '"*"'], stack: [3] },
        pointers: [{ label: 'i', pos: 2 }],
      },
      {
        description: '遇到数字 3：入栈。栈 = [3, 3]',
        highlights: [3],
        data: { tokens: ['"2"', '"1"', '"+"', '"3"', '"*"'], stack: [3, 3] },
        pointers: [{ label: 'i', pos: 3 }],
      },
      {
        description: '遇到 *：弹出 3 和 3，计算 3*3=9。运算结束！最终结果 = 9 🎯',
        highlights: [4],
        data: { tokens: ['"2"', '"1"', '"+"', '"3"', '"*"'], stack: [9] },
        pointers: [{ label: 'i', pos: 4 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { token: '2', stack: '[2]' }, explanation: '数字 2 入栈' },
      { step: 2, variables: { token: '1', stack: '[2,1]' }, explanation: '数字 1 入栈' },
      { step: 3, variables: { token: '+', op: '2+1=3', stack: '[3]' }, explanation: '弹出 2 和 1 相加，结果 3 入栈' },
      { step: 4, variables: { token: '3', stack: '[3,3]' }, explanation: '数字 3 入栈' },
      { step: 5, variables: { token: '*', op: '3*3=9', stack: '[9]' }, explanation: '弹出 3 和 3 相乘，结果 9', isResult: true },
    ],
  },
  {
    id: 155,
    title: '最小栈',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/min-stack/',
    category: 'stack-queue',
    visualizerType: 'array',
    input: '["MinStack","push","push","push","getMin","pop","top","getMin"]',
    output: '[null,null,null,null,-3,null,0,-2]',
    code: {
      cpp: `class MinStack {
public:
    // 用两个栈：一个存数据，一个存当前最小值
    // 就像记手账：每花一笔钱，同时记下"到目前为止最少花了多少"
    stack<int> dataStack;   // 数据栈——记每一笔
    stack<int> minStack;    // 最小值栈——记"到目前为止的最小值"

    MinStack() {}

    void push(int val) {
        dataStack.push(val);
        // 新来的数比当前最小值还小？更新最小值！
        // 如果最小值栈为空，那当前数就是最小值
        if (minStack.empty() || val <= minStack.top()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.top()); // 最小值不变，重复压一次
        }
    }

    void pop() {
        dataStack.pop();
        minStack.pop(); // 同步弹出
    }

    int top() {
        return dataStack.top();
    }

    int getMin() {
        return minStack.top();
    }
};`,
      rust: `struct MinStack {
    // 两个栈手拉手——一个存数字，一个记最小值
    data: Vec<i32>,
    min_vals: Vec<i32>,
}

impl MinStack {
    fn new() -> Self {
        MinStack { data: vec![], min_vals: vec![] }
    }

    fn push(&mut self, val: i32) {
        self.data.push(val);
        // 新来的是不是"历史最低"？是就更新最小值栈
        let cur_min = self.min_vals.last().copied().unwrap_or(i32::MAX);
        self.min_vals.push(val.min(cur_min));
    }

    fn pop(&mut self) {
        self.data.pop();
        self.min_vals.pop();
    }

    fn top(&self) -> i32 {
        *self.data.last().unwrap()
    }

    fn get_min(&self) -> i32 {
        *self.min_vals.last().unwrap()
    }
}`,
    },
    animationSteps: [
      {
        description: 'MinStack 初始化：dataStack 和 minStack 都为空',
        highlights: [],
        data: { dataStack: [], minStack: [] },
      },
      {
        description: 'push(-2)：data=[-2]，minStack 空，min=[-2]',
        highlights: [0],
        data: { dataStack: [-2], minStack: [-2] },
      },
      {
        description: 'push(0)：data=[-2,0]，0 > -2，min 不变，min=[-2,-2]',
        highlights: [1],
        data: { dataStack: [-2, 0], minStack: [-2, -2] },
      },
      {
        description: 'push(-3)：data=[-2,0,-3]，-3 < -2，min 更新，min=[-2,-2,-3]',
        highlights: [2],
        data: { dataStack: [-2, 0, -3], minStack: [-2, -2, -3] },
      },
      {
        description: 'getMin() → -3（最小值栈栈顶）。pop()：同步弹出。top() → 0',
        highlights: [1],
        data: { dataStack: [-2, 0], minStack: [-2, -2] },
      },
      {
        description: 'getMin() → -2（弹出 -3 后，最小值恢复到 -2）',
        highlights: [0],
        data: { dataStack: [-2, 0], minStack: [-2, -2] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { action: 'push(-2)', data: '[-2]', min: '[-2]' }, explanation: '-2 入栈，最小值 -2' },
      { step: 2, variables: { action: 'push(0)', data: '[-2,0]', min: '[-2,-2]' }, explanation: '0 入栈，最小值仍为 -2' },
      { step: 3, variables: { action: 'push(-3)', data: '[-2,0,-3]', min: '[-2,-2,-3]' }, explanation: '-3 入栈，最小值更新为 -3' },
      { step: 4, variables: { action: 'getMin()', result: '-3' }, explanation: '当前最小值为 -3' },
      { step: 5, variables: { action: 'pop()', data: '[-2,0]', min: '[-2,-2]' }, explanation: '弹出 -3，最小值恢复为 -2' },
      { step: 6, variables: { action: 'getMin()', result: '-2' }, explanation: '当前最小值为 -2', isResult: true },
    ],
  },
  {
    id: 232,
    title: '用栈实现队列',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/implement-queue-using-stacks/',
    category: 'stack-queue',
    visualizerType: 'array',
    input: 'push(1), push(2), peek(), pop(), empty()',
    output: '[null, null, 1, 1, false]',
    code: {
      cpp: `class MyQueue {
public:
    // 两个栈模拟队列——一个负责"收件"（in），一个负责"出件"（out）
    // 就像把东西先倒进一个桶，再倒进另一个桶，顺序就正过来了
    stack<int> inStack;  // 入队栈
    stack<int> outStack; // 出队栈

    MyQueue() {}

    void push(int x) {
        inStack.push(x); // 新来的先扔进入队栈
    }

    int pop() {
        // 如果出队栈空了，把入队栈的全部倒过来
        // 这样最先入队的就在出队栈顶了
        if (outStack.empty()) {
            while (!inStack.empty()) {
                outStack.push(inStack.top());
                inStack.pop();
            }
        }
        int val = outStack.top();
        outStack.pop();
        return val;
    }

    int peek() {
        if (outStack.empty()) {
            while (!inStack.empty()) {
                outStack.push(inStack.top());
                inStack.pop();
            }
        }
        return outStack.top();
    }

    bool empty() {
        return inStack.empty() && outStack.empty();
    }
};`,
      rust: `struct MyQueue {
    // 两个栈扮演出队功能——in 收件，out 出件
    in_stack: Vec<i32>,
    out_stack: Vec<i32>,
}

impl MyQueue {
    fn new() -> Self {
        MyQueue { in_stack: vec![], out_stack: vec![] }
    }

    fn push(&mut self, x: i32) {
        self.in_stack.push(x); // 新来的先进 in 栈
    }

    // 把 in 栈的元素"倒"到 out 栈，让顺序反转
    fn transfer(&mut self) {
        if self.out_stack.is_empty() {
            while let Some(val) = self.in_stack.pop() {
                self.out_stack.push(val);
            }
        }
    }

    fn pop(&mut self) -> i32 {
        self.transfer();
        self.out_stack.pop().unwrap()
    }

    fn peek(&mut self) -> i32 {
        self.transfer();
        *self.out_stack.last().unwrap()
    }

    fn empty(&self) -> bool {
        self.in_stack.is_empty() && self.out_stack.is_empty()
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：两个栈都为空',
        highlights: [],
        data: { inStack: [], outStack: [] },
      },
      {
        description: 'push(1)：1 进入 inStack。in=[1], out=[]',
        highlights: [0],
        data: { inStack: [1], outStack: [] },
      },
      {
        description: 'push(2)：2 进入 inStack。in=[1,2], out=[]',
        highlights: [1],
        data: { inStack: [1, 2], outStack: [] },
      },
      {
        description: 'peek()：out 为空，把 in[1,2] 倒到 out 变成 [2,1]，返回 out 栈顶 1',
        highlights: [1],
        data: { inStack: [], outStack: [2, 1] },
      },
      {
        description: 'pop()：out 不为空，直接弹出栈顶 1。out=[2]',
        highlights: [0],
        data: { inStack: [], outStack: [2] },
      },
      {
        description: 'empty()：out 尚有元素 [2]，返回 false',
        highlights: [],
        data: { inStack: [], outStack: [2] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { action: 'push(1)', in: '[1]', out: '[]' }, explanation: '1 入 in 栈' },
      { step: 2, variables: { action: 'push(2)', in: '[1,2]', out: '[]' }, explanation: '2 入 in 栈' },
      { step: 3, variables: { action: 'peek()', in: '[]', out: '[2,1]', result: '1' }, explanation: 'in 倒到 out，peek 得到 1' },
      { step: 4, variables: { action: 'pop()', out: '[2]', result: '1' }, explanation: 'pop 返回 1，队列已空一个' },
      { step: 5, variables: { action: 'empty()', result: 'false' }, explanation: 'out 还有 2，队列没空', isResult: true },
    ],
  },
  {
    id: 239,
    title: '滑动窗口最大值',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/sliding-window-maximum/',
    category: 'stack-queue',
    visualizerType: 'pointer',
    input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
    output: '[3,3,5,5,6,7]',
    code: {
      cpp: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        // 单调双端队列——队列里只保留"有可能成为最大值的元素"
        // 就像一个选美比赛：新来的佳丽更漂亮（更大），
        // 那之前的佳丽就再也没机会了，可以直接淘汰
        deque<int> dq; // 存下标，保持下标对应的值单调递减
        vector<int> result;

        for (int i = 0; i < nums.size(); i++) {
            // 移除窗口外的元素（下标 < i-k+1 的过期了）
            if (!dq.empty() && dq.front() < i - k + 1) {
                dq.pop_front();
            }
            // 新来的比队尾大？队尾的人永远没机会了，踢掉
            while (!dq.empty() && nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }
            dq.push_back(i); // 当前索引入队

            // 窗口成型后，每次取队首（当前窗口最大值）
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
        // 单调队列——维护窗口内"最有资格当最大值"的下标
        use std::collections::VecDeque;
        let k = k as usize;
        let mut dq: VecDeque<usize> = VecDeque::new();
        let mut result = vec![];

        for (i, &num) in nums.iter().enumerate() {
            // 窗口滑过了，队首下标已经过期，移除
            if dq.front().map_or(false, |&f| f + k <= i) {
                dq.pop_front();
            }
            // 新来的更大，队尾永远没机会了，踢掉
            while dq.back().map_or(false, |&b| nums[b] < num) {
                dq.pop_back();
            }
            dq.push_back(i);

            // 窗口满了，记录当前窗口的最大值
            if i >= k - 1 {
                result.push(nums[*dq.front().unwrap()]);
            }
        }
        result
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：nums=[1,3,-1,-3,5,3,6,7], k=3, 队列空',
        highlights: [],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [], window: [], result: [] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=0: 队列空，1 入队。队列=[0(1)]',
        highlights: [0],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [0], window: [1], result: [] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=1: 3>1，踢掉 1，3 入队。队列=[1(3)]',
        highlights: [1],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1], window: [1, 3], result: [] },
        pointers: [{ label: 'i', pos: 1 }],
      },
      {
        description: 'i=2: -1<3，入队尾。窗口 [1,3,-1] 成型，最大值=3。result=[3]',
        highlights: [2],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1, 2], window: [1, 3, -1], result: [3] },
        pointers: [{ label: 'i', pos: 2 }, { label: 'win_start', pos: 0 }],
      },
      {
        description: 'i=3: -3< -1<3，入队尾。窗口 [3,-1,-3] 最大值=3。result=[3,3]',
        highlights: [3],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1, 2, 3], window: [3, -1, -3], result: [3, 3] },
        pointers: [{ label: 'i', pos: 3 }, { label: 'win_start', pos: 1 }],
      },
      {
        description: 'i=4: 5 来了！踢掉队列里所有小于 5 的 [3,-1,-3]，队列=[4(5)]。result=[3,3,5]',
        highlights: [4],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [4], window: [-1, -3, 5], result: [3, 3, 5] },
        pointers: [{ label: 'i', pos: 4 }, { label: 'win_start', pos: 2 }],
      },
      {
        description: 'i=5: 3<5，入队尾。窗口 [-3,5,3] 最大值=5。result=[3,3,5,5]',
        highlights: [5],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [4, 5], window: [-3, 5, 3], result: [3, 3, 5, 5] },
        pointers: [{ label: 'i', pos: 5 }, { label: 'win_start', pos: 3 }],
      },
      {
        description: 'i=6: 6 来了！踢掉所有小于 6 的 [5,3]，队列=[6(6)]。result=[3,3,5,5,6]',
        highlights: [6],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [6], window: [5, 3, 6], result: [3, 3, 5, 5, 6] },
        pointers: [{ label: 'i', pos: 6 }, { label: 'win_start', pos: 4 }],
      },
      {
        description: 'i=7: 7>6，踢掉 6，7 入队。窗口 [3,6,7] 最大值=7。result=[3,3,5,5,6,7] ✓',
        highlights: [7],
        data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], deque: [7], window: [3, 6, 7], result: [3, 3, 5, 5, 6, 7] },
        pointers: [{ label: 'i', pos: 7 }, { label: 'win_start', pos: 5 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { window: '[1,3,-1]', max: '3' }, explanation: '窗口 [1,3,-1] 最大值为 3' },
      { step: 2, variables: { window: '[3,-1,-3]', max: '3' }, explanation: '窗口 [3,-1,-3] 最大值为 3' },
      { step: 3, variables: { window: '[-1,-3,5]', max: '5' }, explanation: '5 进入，踢掉 3,-1,-3，最大值为 5' },
      { step: 4, variables: { window: '[-3,5,3]', max: '5' }, explanation: '窗口 [-3,5,3] 最大值为 5' },
      { step: 5, variables: { window: '[5,3,6]', max: '6' }, explanation: '6 进入，踢掉 5,3，最大值为 6' },
      { step: 6, variables: { window: '[3,6,7]', max: '7' }, explanation: '7 进入，踢掉 6，最大值为 7', isResult: true },
    ],
  },
  {
    id: 739,
    title: '每日温度',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/daily-temperatures/',
    category: 'stack-queue',
    visualizerType: 'array',
    input: 'temperatures = [73,74,75,71,69,72,76,73]',
    output: '[1,1,4,2,1,1,0,0]',
    code: {
      cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        // 单调栈——"等一个更热的天气"
        // 栈里存待处理的下标，温度从栈底到栈顶递减
        int n = temperatures.size();
        vector<int> answer(n, 0);
        stack<int> stk; // 存下标，温度单调递减

        for (int i = 0; i < n; i++) {
            // 今天比栈顶那天热？那栈顶那天的"更热的一天"就是今天
            while (!stk.empty() && temperatures[i] > temperatures[stk.top()]) {
                int prev = stk.top(); stk.pop();
                answer[prev] = i - prev; // 等了 i - prev 天终于等到了
            }
            stk.push(i); // 今天入栈，等未来的更热天
        }
        // 栈里剩下的——永远等不到更热的天了，answer 默认就是 0
        return answer;
    }
};`,
      rust: `impl Solution {
    pub fn daily_temperatures(temperatures: Vec<i32>) -> Vec<i32> {
        // 单调栈：等一个更热的明天，栈存还没找到更热天的下标
        let n = temperatures.len();
        let mut answer = vec![0; n];
        let mut stack: Vec<usize> = Vec::new(); // 单调递减栈

        for i in 0..n {
            // 今天比栈顶那天暖和？栈顶那天的答案就是今天
            while let Some(&prev) = stack.last() {
                if temperatures[i] <= temperatures[prev] { break; }
                stack.pop();
                answer[prev] = (i - prev) as i32;
            }
            stack.push(i);
        }
        answer
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化：answer 全 0，栈空。开始遍历温度',
        highlights: [],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [0, 0, 0, 0, 0, 0, 0, 0], stack: [] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=0(73)：栈空，入栈。栈=[0(73)]',
        highlights: [0],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [0, 0, 0, 0, 0, 0, 0, 0], stack: [0] },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=1(74)：74>73，弹出 0，answer[0]=1-0=1。入栈 1。栈=[1(74)]',
        highlights: [1],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [1, 0, 0, 0, 0, 0, 0, 0], stack: [1] },
        pointers: [{ label: 'i', pos: 1 }],
      },
      {
        description: 'i=2(75)：75>74，弹出 1，answer[1]=2-1=1。入栈 2。栈=[2(75)]',
        highlights: [2],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [1, 1, 0, 0, 0, 0, 0, 0], stack: [2] },
        pointers: [{ label: 'i', pos: 2 }],
      },
      {
        description: 'i=3(71), i=4(69)：都比 75 小，入栈。栈=[2(75),3(71),4(69)]',
        highlights: [4],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [1, 1, 0, 0, 0, 0, 0, 0], stack: [2, 3, 4] },
        pointers: [{ label: 'i', pos: 4 }],
      },
      {
        description: 'i=5(72)：72>69，弹出 4，answer[4]=1；72>71，弹出 3，answer[3]=2。入栈 5。栈=[2(75),5(72)]',
        highlights: [5],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [1, 1, 0, 2, 1, 0, 0, 0], stack: [2, 5] },
        pointers: [{ label: 'i', pos: 5 }],
      },
      {
        description: 'i=6(76)：76>72，弹出 5，answer[5]=1；76>75，弹出 2，answer[2]=4。入栈 6。栈=[6(76)]',
        highlights: [6],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [1, 1, 4, 2, 1, 1, 0, 0], stack: [6] },
        pointers: [{ label: 'i', pos: 6 }],
      },
      {
        description: 'i=7(73)：73<76，入栈。遍历结束，栈里的 6,7 永远等不到更热的天，answer 保持 0',
        highlights: [7],
        data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73], answer: [1, 1, 4, 2, 1, 1, 0, 0], stack: [6, 7] },
        pointers: [{ label: 'i', pos: 7 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', temp: '73', stack: '[]' }, explanation: '73 入栈' },
      { step: 2, variables: { i: '1', temp: '74', answer: '[1,...]' }, explanation: '74>73，73 等了 1 天，answer[0]=1' },
      { step: 3, variables: { i: '2', temp: '75', answer: '[1,1,...]' }, explanation: '75>74，74 等了 1 天，answer[1]=1' },
      { step: 4, variables: { i: '5', temp: '72' }, explanation: '72>69，69 等了 1 天；72>71，71 等了 2 天' },
      { step: 5, variables: { i: '6', temp: '76' }, explanation: '76>72，72 等了 1 天；76>75，75 等了 4 天，answer[2]=4' },
      { step: 6, variables: { final: '[1,1,4,2,1,1,0,0]' }, explanation: '76 和 73 永远等不到更热的天，结果为 0', isResult: true },
    ],
  },
]
