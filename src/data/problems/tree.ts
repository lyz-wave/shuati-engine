import { Problem } from '../types'

export const treeProblems: Problem[] = [
  {
    id: 94,
    title: '二叉树的中序遍历',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/binary-tree-inorder-traversal/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'root = [1,null,2,3]',
    output: '[1, 3, 2]',
    code: {
      cpp: `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // 结果收集器——把中序走法的节点值按顺序装进来
        vector<int> res;
        // 用栈模拟递归，避免系统调用栈溢出
        stack<TreeNode*> stk;
        TreeNode* cur = root;

        // 只要还有节点要处理，就继续循环
        while (cur || !stk.empty()) {
            // 一路向左钻到底，把沿途节点都压栈
            while (cur) {
                stk.push(cur);
                cur = cur->left;
            }
            // 弹出栈顶——这就是当前要访问的节点
            cur = stk.top(); stk.pop();
            res.push_back(cur->val);
            // 转向右子树，下一轮重复"左→根→右"的节奏
            cur = cur->right;
        }
        return res;
    }
};`,
      rust: `impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        // 结果容器
        let mut res = vec![];
        // 用栈模拟递归调用
        let mut stack = vec![];
        let mut cur = root;

        while cur.is_some() || !stack.is_empty() {
            // 一路向左压栈，把左子树全部入栈
            while let Some(node) = cur {
                stack.push(node.clone());
                cur = node.borrow().left.clone();
            }
            // 出栈——左子树的根
            if let Some(node) = stack.pop() {
                res.push(node.borrow().val);
                // 转向右子树继续
                cur = node.borrow().right.clone();
            }
        }
        res
    }
}`,
    },
    animationSteps: [
      { description: '从根节点 1 出发，cur = 1，栈为空', highlights: [], data: { root: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } } } },
      { description: 'cur 有左子树吗？没有。访问根节点 1，记录结果 [1]', highlights: [0], data: { root: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } } }, pointers: [{ label: 'cur', pos: 0 }] },
      { description: '转向右子树，cur = 2。2 有左子树 3，一路压栈', highlights: [2], data: { root: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } } }, pointers: [{ label: 'cur', pos: 2 }] },
      { description: '弹出 3，访问它，结果 [1, 3]。3 没有右子树', highlights: [2, 1], data: { root: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } } }, pointers: [{ label: 'cur', pos: 2 }] },
      { description: '弹出 2，访问它，结果 [1, 3, 2]。2 没有右子树，结束', highlights: [2], data: { root: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } } }, pointers: [{ label: 'cur', pos: 2 }] },
    ],
    walkthrough: [
      { step: 1, variables: { cur: '1', stack: '[]', res: '[]' }, explanation: '从根节点 1 出发' },
      { step: 2, variables: { cur: '1', stack: '[]', res: '[1]' }, explanation: '访问根节点 1，中序第一个元素' },
      { step: 3, variables: { cur: '2', stack: '[3]', res: '[1]' }, explanation: '向右走到 2，把左子树 3 压栈' },
      { step: 4, variables: { cur: '3', stack: '[]', res: '[1, 3]' }, explanation: '弹出 3，访问左子树节点' },
      { step: 5, variables: { cur: '2', stack: '[]', res: '[1, 3, 2]' }, explanation: '弹出 2，访问根节点，结果 [1,3,2]', isResult: true },
    ],
  },
  {
    id: 100,
    title: '相同的树',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/same-tree/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'p = [1,2,3], q = [1,2,3]',
    output: 'true',
    code: {
      cpp: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        // 两个都是空节点 -> 一模一样，返回 true
        if (!p && !q) return true;
        // 一个空一个不空 -> 结构不同，返回 false
        if (!p || !q) return false;
        // 值不一样 -> 肯定不同
        if (p->val != q->val) return false;
        // 递归检查左右子树——必须左左相同 && 右右相同
        return isSameTree(p->left, q->left)
            && isSameTree(p->right, q->right);
    }
};`,
      rust: `impl Solution {
    pub fn is_same_tree(
        p: Option<Rc<RefCell<TreeNode>>>,
        q: Option<Rc<RefCell<TreeNode>>>,
    ) -> bool {
        // 双空：一样
        if p.is_none() && q.is_none() { return true; }
        // 单空：不一样
        if p.is_none() || q.is_none() { return false; }

        let p = p.unwrap();
        let q = q.unwrap();
        // 值不同：不一样
        if p.borrow().val != q.borrow().val { return false; }
        // 递归检查左右子树
        Self::is_same_tree(p.borrow().left.clone(), q.borrow().left.clone())
            && Self::is_same_tree(p.borrow().right.clone(), q.borrow().right.clone())
    }
}`,
    },
    animationSteps: [
      { description: '同时从两棵树的根节点出发：p=1, q=1，值相等', highlights: [0], data: { root: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } } } },
      { description: '递归检查左子树：p=2, q=2，值相等，继续', highlights: [1], data: { root: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } } } },
      { description: '左子树检查完毕，两个叶子节点都是空，返回 true', highlights: [1], data: { root: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } } } },
      { description: '递归检查右子树：p=3, q=3，值相等，继续', highlights: [2], data: { root: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } } } },
      { description: '全部节点检查完毕，两棵树完全相同 ✓', highlights: [0, 1, 2], data: { root: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } } } },
    ],
    walkthrough: [
      { step: 1, variables: { p: '1', q: '1' }, explanation: '根节点值相等' },
      { step: 2, variables: { p: '2', q: '2' }, explanation: '左子节点值相等' },
      { step: 3, variables: { p: 'null', q: 'null' }, explanation: '左子树叶子都为空' },
      { step: 4, variables: { p: '3', q: '3' }, explanation: '右子节点值相等' },
      { step: 5, variables: { p: 'null', q: 'null' }, explanation: '全部校验通过，结果为 true', isResult: true },
    ],
  },
  {
    id: 101,
    title: '对称二叉树',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/symmetric-tree/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'root = [1,2,2,3,4,4,3]',
    output: 'true',
    code: {
      cpp: `class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        // 空树算对称，非空则检查左右子树是否互为镜像
        return !root || helper(root->left, root->right);
    }

    bool helper(TreeNode* L, TreeNode* R) {
        // 两个都空 -> 对称
        if (!L && !R) return true;
        // 一个空一个不空 -> 不对称
        if (!L || !R) return false;
        // 值不一样 -> 不对称
        if (L->val != R->val) return false;
        // 关键：L 的左要和 R 的右比，L 的右要和 R 的左比
        // 就像照镜子，左手对应右手
        return helper(L->left, R->right)
            && helper(L->right, R->left);
    }
};`,
      rust: `impl Solution {
    pub fn is_symmetric(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        // 空树算对称，否则检查左右子树
        match root {
            None => true,
            Some(r) => Self::helper(r.borrow().left.clone(), r.borrow().right.clone()),
        }
    }

    fn helper(
        L: Option<Rc<RefCell<TreeNode>>>,
        R: Option<Rc<RefCell<TreeNode>>>,
    ) -> bool {
        if L.is_none() && R.is_none() { return true; }
        if L.is_none() || R.is_none() { return false; }
        let l = L.unwrap();
        let r = R.unwrap();
        if l.borrow().val != r.borrow().val { return false; }
        // 镜像比较：左的左 vs 右的右，左的右 vs 右的左
        Self::helper(l.borrow().left.clone(), r.borrow().right.clone())
            && Self::helper(l.borrow().right.clone(), r.borrow().left.clone())
    }
}`,
    },
    animationSteps: [
      { description: '检查根节点 1，左右子树都存在', highlights: [0], data: { root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 3, left: null, right: null } } } } },
      { description: '比较 L=2 和 R=2，值相等，继续检查子树', highlights: [1, 2], data: { root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 3, left: null, right: null } } } } },
      { description: 'L.left=3 与 R.right=3 比较，值相等且均为叶子，通过', highlights: [3, 6], data: { root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 3, left: null, right: null } } } } },
      { description: 'L.right=4 与 R.left=4 比较，值相等且均为叶子，通过', highlights: [4, 5], data: { root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 3, left: null, right: null } } } } },
      { description: '全部镜像节点对匹配成功，二叉树是对称的 ✓', highlights: [0, 1, 2, 3, 4, 5, 6], data: { root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 3, left: null, right: null } } } } },
    ],
    walkthrough: [
      { step: 1, variables: { L: '2', R: '2' }, explanation: '根节点的左右子树值相等' },
      { step: 2, variables: { 'L.left': '3', 'R.right': '3' }, explanation: '镜像位置节点值相等' },
      { step: 3, variables: { 'L.right': '4', 'R.left': '4' }, explanation: '另一对镜像节点值相等' },
      { step: 4, variables: { result: 'true' }, explanation: '所有镜像对匹配，树对称', isResult: true },
    ],
  },
  {
    id: 102,
    title: '二叉树的层序遍历',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/binary-tree-level-order-traversal/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'root = [3,9,20,null,null,15,7]',
    output: '[[3], [9, 20], [15, 7]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // 装最终结果的大篮子
        vector<vector<int>> res;
        if (!root) return res;

        // BFS 标配：一个队列，先把根节点塞进去
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            // 当前这一层有多少个节点？
            int levelSize = q.size();
            // 装这一层节点值的篮子
            vector<int> level;

            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                // 左右子节点入队，下一层就靠它们了
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            // 这一层搞定，装进大篮子
            res.push_back(level);
        }
        return res;
    }
};`,
      rust: `use std::collections::VecDeque;

impl Solution {
    pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut res = vec![];
        if root.is_none() { return res; }

        // BFS 队列，从根节点开始
        let mut q = VecDeque::new();
        q.push_back(root.unwrap());

        while !q.is_empty() {
            let level_size = q.len();
            let mut level = vec![];

            for _ in 0..level_size {
                let node = q.pop_front().unwrap();
                level.push(node.borrow().val);
                // 左右孩子入队
                if let Some(left) = node.borrow().left.clone() {
                    q.push_back(left);
                }
                if let Some(right) = node.borrow().right.clone() {
                    q.push_back(right);
                }
            }
            res.push(level);
        }
        res
    }
}`,
    },
    animationSteps: [
      { description: '初始化队列，根节点 3 入队', highlights: [0], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '第一层：弹出 3，记录 [3]。左右孩子 9 和 20 入队', highlights: [0], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '第二层：弹出 9，记录 [9, 20]。9 无孩子', highlights: [1], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '第二层：弹出 20，记录。20 的左右孩子 15 和 7 入队', highlights: [2], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '第三层：弹出 15 和 7，记录 [15, 7]。队列为空，结束', highlights: [3, 4], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
    ],
    walkthrough: [
      { step: 1, variables: { 'Level 1': '3' }, explanation: '根节点出队，子节点入队' },
      { step: 2, variables: { 'Level 2': '9, 20' }, explanation: '第二层两个节点' },
      { step: 3, variables: { 'Level 3': '15, 7' }, explanation: '第三层两个节点' },
      { step: 4, variables: { result: '[[3], [9, 20], [15, 7]]' }, explanation: '层序遍历完成', isResult: true },
    ],
  },
  {
    id: 104,
    title: '二叉树的最大深度',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/maximum-depth-of-binary-tree/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'root = [3,9,20,null,null,15,7]',
    output: '3',
    code: {
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        // 空树深度为 0
        if (!root) return 0;
        // 递归问左子树：你有多深？
        int leftDepth = maxDepth(root->left);
        // 递归问右子树：你有多深？
        int rightDepth = maxDepth(root->right);
        // 左右子树中挑个深的，加上自己这一层
        return max(leftDepth, rightDepth) + 1;
    }
};`,
      rust: `impl Solution {
    pub fn max_depth(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        // 空节点深度为 0
        if root.is_none() { return 0; }
        let node = root.unwrap();
        // 递归计算左右子树深度，取最大值 + 1
        let left = Self::max_depth(node.borrow().left.clone());
        let right = Self::max_depth(node.borrow().right.clone());
        std::cmp::max(left, right) + 1
    }
}`,
    },
    animationSteps: [
      { description: '从根节点 3 出发，递归计算左子树深度', highlights: [0], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '节点 9：左右子树都为空，深度 = max(0,0)+1 = 1', highlights: [1], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '节点 15：叶子节点，深度 = 1', highlights: [3], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '节点 7：叶子节点，深度 = 1', highlights: [4], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '节点 20：max(1,1)+1 = 2。节点 3：max(1,2)+1 = 3', highlights: [2], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
    ],
    walkthrough: [
      { step: 1, variables: { node: '9', depth: '1' }, explanation: '节点 9 是叶子，深度为 1' },
      { step: 2, variables: { node: '15', depth: '1' }, explanation: '节点 15 是叶子' },
      { step: 3, variables: { node: '7', depth: '1' }, explanation: '节点 7 是叶子' },
      { step: 4, variables: { node: '20', depth: '2' }, explanation: '20 的左右子树深度 1，取大+1=2' },
      { step: 5, variables: { node: '3', depth: '3' }, explanation: '3 的左子树深度 1，右子树深度 2，结果为 3', isResult: true },
    ],
  },
  {
    id: 105,
    title: '从前序与中序遍历序列构造二叉树',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
    output: '[3,9,20,null,null,15,7]',
    code: {
      cpp: `class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        // 用哈希表记录中序遍历中每个值的位置，方便快速查找
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++)
            inMap[inorder[i]] = i;

        // 递归构建，初始范围是整个数组
        return build(preorder, 0, preorder.size()-1,
                     inorder, 0, inorder.size()-1, inMap);
    }

    TreeNode* build(vector<int>& pre, int preL, int preR,
                    vector<int>& in, int inL, int inR,
                    unordered_map<int, int>& inMap) {
        if (preL > preR || inL > inR) return nullptr;

        // 前序遍历的第一个节点就是当前子树的根
        TreeNode* root = new TreeNode(pre[preL]);
        // 在中序遍历中找到根的位置，左边是左子树，右边是右子树
        int rootIdx = inMap[root->val];
        int leftSize = rootIdx - inL;

        // 递归构建左右子树
        root->left = build(pre, preL+1, preL+leftSize,
                           in, inL, rootIdx-1, inMap);
        root->right = build(pre, preL+leftSize+1, preR,
                            in, rootIdx+1, inR, inMap);
        return root;
    }
};`,
      rust: `use std::collections::HashMap;

impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        // 建一个中序值→下标的映射，方便 O(1) 查找
        let in_map: HashMap<i32, usize> = inorder.iter()
            .enumerate().map(|(i, &v)| (v, i)).collect();
        Self::build(&preorder, 0, preorder.len(), &inorder, 0, inorder.len(), &in_map)
    }

    fn build(
        pre: &[i32], pre_l: usize, pre_r: usize,
        ino: &[i32], in_l: usize, in_r: usize,
        in_map: &HashMap<i32, usize>,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        if pre_l >= pre_r || in_l >= in_r { return None; }

        // 前序第一个 = 根节点
        let root_val = pre[pre_l];
        let root = Rc::new(RefCell::new(TreeNode::new(root_val)));

        // 在中序里找根的位置，算出左子树大小
        let root_idx = in_map[&root_val];
        let left_size = root_idx - in_l;

        // 递归构建左右子树
        root.borrow_mut().left = Self::build(
            pre, pre_l + 1, pre_l + 1 + left_size,
            ino, in_l, root_idx, in_map);
        root.borrow_mut().right = Self::build(
            pre, pre_l + 1 + left_size, pre_r,
            ino, root_idx + 1, in_r, in_map);
        Some(root)
    }
}`,
    },
    animationSteps: [
      { description: '前序第一个元素 3 是根节点，在中序中找到 3 的位置为 index 1', highlights: [0], data: { root: { val: 3, left: null, right: null } } },
      { description: '中序中 3 的左边是 [9]，左子树大小为 1。构建左子节点 9', highlights: [1], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: null } } },
      { description: '中序中 3 的右边是 [15,20,7]，右子树大小为 3。前序对应 [20,15,7]', highlights: [2], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: null, right: null } } } },
      { description: '右子树中前序第一个 20 是根，中序中 20 左边 [15] 右边 [7]', highlights: [2], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
      { description: '树构建完成：前序 [3,9,20,15,7] 与中序 [9,3,15,20,7] 完全匹配', highlights: [0, 1, 2, 3, 4], data: { root: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } } },
    ],
    walkthrough: [
      { step: 1, variables: { root: '3', leftSize: '1' }, explanation: '前序首位 3 为根，中序左侧有 1 个元素' },
      { step: 2, variables: { 'root.left': '9' }, explanation: '左子树只有节点 9' },
      { step: 3, variables: { 'root.right': '20' }, explanation: '右子树的根为 20' },
      { step: 4, variables: { '20.left': '15', '20.right': '7' }, explanation: '20 的左右子树为 15 和 7' },
      { step: 5, variables: { result: '[3,9,20,null,null,15,7]' }, explanation: '二叉树构建完成', isResult: true },
    ],
  },
  {
    id: 108,
    title: '将有序数组转换为二叉搜索树',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'nums = [-10, -3, 0, 5, 9]',
    output: '[0, -3, 9, -10, null, 5]',
    code: {
      cpp: `class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        // 每次取数组中间的元素作为根节点，保证左右子树节点数接近
        return build(nums, 0, nums.size() - 1);
    }

    TreeNode* build(vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;

        // 取中间位置，让树尽量平衡
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(nums[mid]);

        // 递归构建左右子树
        root->left = build(nums, left, mid - 1);
        root->right = build(nums, mid + 1, right);
        return root;
    }
};`,
      rust: `impl Solution {
    pub fn sorted_array_to_bst(nums: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        Self::build(&nums, 0, nums.len())
    }

    fn build(nums: &[i32], left: usize, right: usize) -> Option<Rc<RefCell<TreeNode>>> {
        if left >= right { return None; }

        // 中间元素当根，分治构建左右子树
        let mid = left + (right - left) / 2;
        let root = Rc::new(RefCell::new(TreeNode::new(nums[mid])));

        root.borrow_mut().left = Self::build(nums, left, mid);
        root.borrow_mut().right = Self::build(nums, mid + 1, right);
        Some(root)
    }
}`,
    },
    animationSteps: [
      { description: '数组 [-10,-3,0,5,9]，取中间元素 0 为根节点', highlights: [2], data: { root: { val: 0, left: null, right: null } } },
      { description: '左半部分 [-10,-3]，取中间 -3 为左子节点，-10 为 -3 的左子', highlights: [0, 1], data: { root: { val: 0, left: { val: -3, left: { val: -10, left: null, right: null }, right: null }, right: null } } },
      { description: '右半部分 [5,9]，取中间 9 为右子节点，5 为 9 的左子', highlights: [3, 4], data: { root: { val: 0, left: { val: -3, left: { val: -10, left: null, right: null }, right: null }, right: { val: 9, left: { val: 5, left: null, right: null }, right: null } } } },
      { description: 'BST 构建完成：中序遍历应为 [-10,-3,0,5,9] ✓', highlights: [0, 1, 2, 3, 4], data: { root: { val: 0, left: { val: -3, left: { val: -10, left: null, right: null }, right: null }, right: { val: 9, left: { val: 5, left: null, right: null }, right: null } } } },
    ],
    walkthrough: [
      { step: 1, variables: { root: '0', left: '[-10,-3]', right: '[5,9]' }, explanation: '取中间 0 作为根节点' },
      { step: 2, variables: { 'root.left': '-3', 'left.left': '-10' }, explanation: '左子树根为 -3，-10 为其左子' },
      { step: 3, variables: { 'root.right': '9', 'right.left': '5' }, explanation: '右子树根为 9，5 为其左子' },
      { step: 4, variables: { result: '[0,-3,9,-10,null,5]' }, explanation: '平衡 BST 构建完成', isResult: true },
    ],
  },
  {
    id: 114,
    title: '二叉树展开为链表',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'root = [1,2,5,3,4,null,6]',
    output: '[1,null,2,null,3,null,4,null,5,null,6]',
    code: {
      cpp: `class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* cur = root;
        while (cur) {
            // 如果当前节点有左子树
            if (cur->left) {
                // 找到左子树的最右节点（前驱节点）
                TreeNode* predecessor = cur->left;
                while (predecessor->right)
                    predecessor = predecessor->right;

                // 把右子树接到前驱节点的右边
                predecessor->right = cur->right;
                // 把左子树搬到右边，左边置空
                cur->right = cur->left;
                cur->left = nullptr;
            }
            // 继续处理下一个节点
            cur = cur->right;
        }
    }
};`,
      rust: `impl Solution {
    pub fn flatten(root: &mut Option<Rc<RefCell<TreeNode>>>) {
        let mut cur = root.clone();
        while let Some(node) = cur {
            let left = node.borrow().left.clone();
            if left.is_some() {
                // 找左子树最右节点（前驱）
                let mut pred = left.clone();
                while pred.as_ref().unwrap().borrow().right.is_some() {
                    let tmp = pred.as_ref().unwrap().borrow().right.clone();
                    pred = tmp;
                }
                // 右子树接到前驱右边
                let right = node.borrow().right.clone();
                pred.as_ref().unwrap().borrow_mut().right = right;
                // 左子树搬到右边，左边置空
                node.borrow_mut().right = left;
                node.borrow_mut().left = None;
            }
            cur = node.borrow().right.clone();
        }
    }
}`,
    },
    animationSteps: [
      { description: '从根节点 1 开始：有左子树，左子树最右节点为 4', highlights: [0], data: { root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 5, left: null, right: { val: 6, left: null, right: null } } } } },
      { description: '将 1 的右子树 [5,null,6] 接到 4 的右子树位置', highlights: [0, 3], data: { root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: { val: 5, left: null, right: { val: 6, left: null, right: null } } } }, right: null } } },
      { description: '将 1 的左子树 [2,3,4,5,6] 搬到右子树位置，左子树置空', highlights: [0], data: { root: { val: 1, right: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: { val: 5, left: null, right: { val: 6, left: null, right: null } } } }, left: null } } },
      { description: 'cur 移到 2：有左子树 3，最右节点为 3 本身（无右子）', highlights: [1], data: { root: { val: 1, right: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 4, left: null, right: { val: 5, left: null, right: { val: 6, left: null, right: null } } } }, left: null } } },
      { description: '将 2 的右子树 [4,5,6] 接到 3 的右边，左子树置空', highlights: [1, 2], data: { root: { val: 1, right: { val: 2, right: { val: 3, right: { val: 4, right: { val: 5, right: { val: 6, left: null, right: null }, left: null }, left: null }, left: null }, left: null }, left: null } } },
      { description: '继续右移：全部节点展开为右斜链表 ✓', highlights: [0, 1, 2, 3, 4, 5], data: { root: { val: 1, right: { val: 2, right: { val: 3, right: { val: 4, right: { val: 5, right: { val: 6, left: null, right: null }, left: null }, left: null }, left: null }, left: null }, left: null } } },
    ],
    walkthrough: [
      { step: 1, variables: { node: '1' }, explanation: '1 有左子树 2，左子树最右节点是 4' },
      { step: 2, variables: { node: '1' }, explanation: '将右子树 [5,6] 接到 4 右侧' },
      { step: 3, variables: { node: '1' }, explanation: '左子树移到右边，左子树置空' },
      { step: 4, variables: { node: '2' }, explanation: 'cur=2，左子树最右节点是 3' },
      { step: 5, variables: { node: '2' }, explanation: '右子树 [4,5,6] 接到 3 右侧' },
      { step: 6, variables: { result: '1→2→3→4→5→6' }, explanation: '全部展开为右斜链表', isResult: true },
    ],
  },
  {
    id: 226,
    title: '翻转二叉树',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/invert-binary-tree/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'root = [4,2,7,1,3,6,9]',
    output: '[4,7,2,9,6,3,1]',
    code: {
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        // 空树直接返回
        if (!root) return nullptr;

        // 先翻转左右子树（递归），再交换左右孩子
        // 就像照镜子：把左边的东西放到右边去
        TreeNode* left = invertTree(root->left);
        TreeNode* right = invertTree(root->right);
        root->left = right;
        root->right = left;
        return root;
    }
};`,
      rust: `impl Solution {
    pub fn invert_tree(root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        // 空树直接返回
        if root.is_none() { return None; }

        let node = root.as_ref().unwrap();
        // 递归翻转左右子树
        let left = Self::invert_tree(node.borrow().left.clone());
        let right = Self::invert_tree(node.borrow().right.clone());
        // 交换左右子树
        node.borrow_mut().left = right;
        node.borrow_mut().right = left;

        root
    }
}`,
    },
    animationSteps: [
      { description: '原树：根节点 4，左右子树分别为 [2,1,3] 和 [7,6,9]', highlights: [0], data: { root: { val: 4, left: { val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } }, right: { val: 7, left: { val: 6, left: null, right: null }, right: { val: 9, left: null, right: null } } } } },
      { description: '递归翻转左子树：节点 2，交换它的左右孩子 [1,3] → [3,1]', highlights: [1], data: { root: { val: 4, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 1, left: null, right: null } }, right: { val: 7, left: { val: 6, left: null, right: null }, right: { val: 9, left: null, right: null } } } } },
      { description: '递归翻转右子树：节点 7，交换它的左右孩子 [6,9] → [9,6]', highlights: [2], data: { root: { val: 4, left: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 1, left: null, right: null } }, right: { val: 7, left: { val: 9, left: null, right: null }, right: { val: 6, left: null, right: null } } } } },
      { description: '交换根节点 4 的左右子树 [2,3,1] ↔ [7,9,6]', highlights: [0], data: { root: { val: 4, left: { val: 7, left: { val: 9, left: null, right: null }, right: { val: 6, left: null, right: null } }, right: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 1, left: null, right: null } } } } },
      { description: '翻转完成：原 [4,2,7,1,3,6,9] → [4,7,2,9,6,3,1] ✓', highlights: [0, 1, 2, 3, 4, 5, 6], data: { root: { val: 4, left: { val: 7, left: { val: 9, left: null, right: null }, right: { val: 6, left: null, right: null } }, right: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 1, left: null, right: null } } } } },
    ],
    walkthrough: [
      { step: 1, variables: { node: '2' }, explanation: '翻转节点 2 的左右孩子 [1,3] → [3,1]' },
      { step: 2, variables: { node: '7' }, explanation: '翻转节点 7 的左右孩子 [6,9] → [9,6]' },
      { step: 3, variables: { node: '4' }, explanation: '交换根节点的左右子树' },
      { step: 4, variables: { result: '[4,7,2,9,6,3,1]' }, explanation: '整棵树翻转完成', isResult: true },
    ],
  },
  {
    id: 543,
    title: '二叉树的直径',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/diameter-of-binary-tree/',
    category: 'tree',
    visualizerType: 'tree',
    input: 'root = [1,2,3,4,5]',
    output: '3 (路径 [4,2,1,3] 的长度为 3)',
    code: {
      cpp: `class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        // 全局变量，记录看到的最大直径
        int ans = 0;
        dfs(root, ans);
        return ans;
    }

    // 返回以 node 为根的子树的最大深度
    // 顺便更新全局直径（左子树深度 + 右子树深度）
    int dfs(TreeNode* node, int& ans) {
        if (!node) return 0;

        int L = dfs(node->left, ans);   // 左子树深度
        int R = dfs(node->right, ans);  // 右子树深度

        // 经过当前节点的最长路径 = L + R
        ans = max(ans, L + R);

        // 返回当前节点的最大深度给父节点用
        return max(L, R) + 1;
    }
};`,
      rust: `impl Solution {
    pub fn diameter_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut ans = 0;
        Self::dfs(root, &mut ans);
        ans
    }

    fn dfs(node: Option<Rc<RefCell<TreeNode>>>, ans: &mut i32) -> i32 {
        if node.is_none() { return 0; }
        let n = node.unwrap();

        // 递归计算左右子树的深度
        let L = Self::dfs(n.borrow().left.clone(), ans);
        let R = Self::dfs(n.borrow().right.clone(), ans);

        // 更新最大直径 = 左深 + 右深
        *ans = (*ans).max(L + R);

        // 返回本节点深度给父节点
        L.max(R) + 1
    }
}`,
    },
    animationSteps: [
      { description: '树结构：1→左子2(左4右5)，1→右子3。从叶子节点开始DFS', highlights: [0], data: { root: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } } } },
      { description: '节点 4：叶子，深度 = 1，L+R = 0。节点 5：同理深度 = 1', highlights: [3, 4], data: { root: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } } } },
      { description: '节点 2：L=1(4), R=1(5)，经过2的直径 = 1+1 = 2，深度 = max(1,1)+1 = 2', highlights: [1], data: { root: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } } } },
      { description: '节点 3：叶子，深度 = 1，L+R = 0', highlights: [2], data: { root: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } } } },
      { description: '节点 1：L=2(左子树深度2), R=1(右子树深度1)，直径 = 2+1 = 3 ✓', highlights: [0], data: { root: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } } } },
    ],
    walkthrough: [
      { step: 1, variables: { node: '4', depth: '1', diameter: '0' }, explanation: '叶子节点 4，深度为 1' },
      { step: 2, variables: { node: '5', depth: '1', diameter: '0' }, explanation: '叶子节点 5，深度为 1' },
      { step: 3, variables: { node: '2', depth: '2', diameter: '2' }, explanation: '节点 2：左深1+右深1=2，更新直径=2' },
      { step: 4, variables: { node: '3', depth: '1', diameter: '0' }, explanation: '节点 3：叶子深度 1' },
      { step: 5, variables: { node: '1', depth: '3', diameter: '3' }, explanation: '节点 1：左深2+右深1=3，最终直径', isResult: true },
    ],
  },
]
