import { Problem } from '../types'

export const backtrackingProblems: Problem[] = [
  {
    id: 17,
    title: '电话号码的字母组合',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/letter-combinations-of-a-phone-number/',
    category: 'backtracking',
    visualizerType: 'array',
    input: 'digits = "23"',
    output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
    code: {
      cpp: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};

        // 手机键盘映射：每个数字对应哪些字母
        vector<string> mapping = {"", "", "abc", "def", "ghi", "jkl",
                                  "mno", "pqrs", "tuv", "wxyz"};
        vector<string> result;
        string path;

        // 回溯函数：一路走到黑，走不通就回头
        function<void(int)> backtrack = [&](int idx) {
            if (idx == digits.size()) {
                result.push_back(path);  // 走到头了，记录答案
                return;
            }
            // 当前数字对应的字母们
            for (char c : mapping[digits[idx]-'0']) {
                path.push_back(c);      // 选一个字母
                backtrack(idx + 1);     // 去下一个数字
                path.pop_back();        // 撤销选择（回溯）
            }
        };

        backtrack(0);
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn letter_combinations(digits: String) -> Vec<String> {
        if digits.is_empty() { return vec![]; }

        let mapping = vec!["", "", "abc", "def", "ghi", "jkl",
                           "mno", "pqrs", "tuv", "wxyz"];
        let digits: Vec<char> = digits.chars().collect();
        let mut result = vec![];
        let mut path = String::new();

        fn backtrack(digits: &[char], mapping: &[&str],
                     path: &mut String, result: &mut Vec<String>, idx: usize) {
            if idx == digits.len() {
                result.push(path.clone());
                return;
            }
            for c in mapping[digits[idx] as usize - '0' as usize].chars() {
                path.push(c);
                backtrack(digits, mapping, path, result, idx + 1);
                path.pop();
            }
        }

        backtrack(&digits, &mapping, &mut path, &mut result, 0);
        result
    }
}`,
    },
    animationSteps: [
      { description: '开始回溯：数字2对应"abc"，先选 a', highlights: [], data: { digits: ['2', '3'], mapping: { '2': 'abc', '3': 'def' }, path: ['a'] }, pointers: [{ label: 'idx', pos: 0 }] },
      { description: '递归到数字3：对应"def"，选 d → path="ad"，到达末尾，记录答案', highlights: [], data: { digits: ['2', '3'], path: ['a', 'd'] }, pointers: [{ label: 'idx', pos: 1 }] },
      { description: '回溯，换 e → path="ae"，记录答案；再换 f → path="af"', highlights: [], data: { digits: ['2', '3'], path: ['a', 'f'] }, pointers: [{ label: 'idx', pos: 1 }] },
      { description: '回溯到数字2，换 b：递归数字3选 d/e/f → "bd","be","bf"', highlights: [], data: { digits: ['2', '3'], path: ['b', 'd'] }, pointers: [{ label: 'idx', pos: 0 }] },
      { description: '继续换 c：得到 "cd","ce","cf"，共9种组合 ✓', highlights: [], data: { digits: ['2', '3'], result: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { path: 'a', idx: '0' }, explanation: '选2对应的a' },
      { step: 2, variables: { path: 'ad', idx: '1' }, explanation: '3对应的d，组合"ad"' },
      { step: 3, variables: { path: 'ae→af' }, explanation: '回溯换e→"ae"，再换f→"af"' },
      { step: 4, variables: { result: '9个组合' }, explanation: '共3×3=9种组合', isResult: true },
    ],
  },
  {
    id: 22,
    title: '括号生成',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/generate-parentheses/',
    category: 'backtracking',
    visualizerType: 'array',
    input: 'n = 3',
    output: '["((()))","(()())","(())()","()(())","()()()"]',
    code: {
      cpp: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string path;

        // left：已用的左括号数，right：已用的右括号数
        function<void(int, int)> backtrack = [&](int left, int right) {
            if (left == n && right == n) {
                result.push_back(path);  // 左右都用完了
                return;
            }
            if (left < n) {
                path.push_back('(');     // 左括号还有名额
                backtrack(left + 1, right);
                path.pop_back();
            }
            if (right < left) {
                path.push_back(')');     // 右括号比左括号少才能加
                backtrack(left, right + 1);
                path.pop_back();
            }
        };

        backtrack(0, 0);
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn generate_parenthesis(n: i32) -> Vec<String> {
        let mut result = vec![];
        let mut path = String::new();

        fn backtrack(n: i32, left: i32, right: i32,
                     path: &mut String, result: &mut Vec<String>) {
            if left == n && right == n {
                result.push(path.clone());
                return;
            }
            if left < n {
                path.push('(');
                backtrack(n, left + 1, right, path, result);
                path.pop();
            }
            if right < left {
                path.push(')');
                backtrack(n, left, right + 1, path, result);
                path.pop();
            }
        }

        backtrack(n, 0, 0, &mut path, &mut result);
        result
    }
}`,
    },
    animationSteps: [
      { description: '开始：left=0, right=0，先尝试加左括号', highlights: [], data: { path: '(', left: 1, right: 0 }, pointers: [{ label: 'left', pos: 0 }] },
      { description: '一直加左括号直到用完：path="((("', highlights: [], data: { path: '(((', left: 3, right: 0 }, pointers: [{ label: 'left', pos: 0 }] },
      { description: '开始加右括号：path="((()))"，left=right=3，记录答案', highlights: [], data: { path: '((()))' }, pointers: [{ label: 'left/right', pos: 0 }] },
      { description: '回溯尝试不同组合："(()())", "(())()", "()(())", "()()()"', highlights: [], data: { path: '(()())' }, pointers: [] },
      { description: '共生成5种合法的括号组合 ✓', highlights: [], data: { result: ['((()))', '(()())', '(())()', '()(())', '()()()'] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { left: '3', right: '0', path: '"((("' }, explanation: '先用完3个左括号' },
      { step: 2, variables: { left: '3', right: '3', path: '"((()))"' }, explanation: '补右括号，得"((()))"' },
      { step: 3, variables: { path: '"(()())"' }, explanation: '回溯后调整，得"(()())"' },
      { step: 4, variables: { result: '5种' }, explanation: 'n=3共有5种括号组合', isResult: true },
    ],
  },
  {
    id: 39,
    title: '组合总和',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/combination-sum/',
    category: 'backtracking',
    visualizerType: 'array',
    input: 'candidates = [2, 3, 6, 7], target = 7',
    output: '[[2, 2, 3], [7]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> path;

        // start：从哪个下标开始选（防止重复组合）
        function<void(int, int)> backtrack = [&](int start, int remaining) {
            if (remaining == 0) {
                result.push_back(path);  // 刚好凑够 target
                return;
            }
            if (remaining < 0) return;  // 超了，剪枝

            for (int i = start; i < candidates.size(); i++) {
                path.push_back(candidates[i]);          // 选当前数字
                backtrack(i, remaining - candidates[i]); // 可以重复选同一数字
                path.pop_back();                         // 撤销选择
            }
        };

        backtrack(0, target);
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        let mut result = vec![];
        let mut path = vec![];

        fn backtrack(candidates: &[i32], target: i32, start: usize,
                     path: &mut Vec<i32>, result: &mut Vec<Vec<i32>>) {
            if target == 0 {
                result.push(path.clone());
                return;
            }
            if target < 0 { return; }

            for i in start..candidates.len() {
                path.push(candidates[i]);
                backtrack(candidates, target - candidates[i], i, path, result);
                path.pop();
            }
        }

        backtrack(&candidates, target, 0, &mut path, &mut result);
        result
    }
}`,
    },
    animationSteps: [
      { description: '开始回溯，target=7，从candidates[0]=2开始', highlights: [0], data: { candidates: [2, 3, 6, 7], target: 7, path: [], remaining: 7 }, pointers: [{ label: 'start', pos: 0 }] },
      { description: '选2→path=[2]，剩余5；再选2→path=[2,2]，剩余3；再选2→path=[2,2,2]，剩余1>0；再选2，剩余-1，回溯', highlights: [0], data: { candidates: [2, 3, 6, 7], path: [2, 2, 2], remaining: -1 }, pointers: [{ label: '', pos: 0 }] },
      { description: '回溯后选3→path=[2,2,3]，剩余0！找到组合[2,2,3]', highlights: [1], data: { candidates: [2, 3, 6, 7], path: [2, 2, 3], remaining: 0 }, pointers: [{ label: '', pos: 0 }] },
      { description: '继续回溯尝试其他组合：[7]直接等于target，剩余0！找到[7]', highlights: [3], data: { candidates: [2, 3, 6, 7], path: [7], remaining: 0 }, pointers: [{ label: '', pos: 0 }] },
      { description: '所有组合：[[2,2,3],[7]] ✓', highlights: [], data: { candidates: [2, 3, 6, 7], target: 7, result: [[2, 2, 3], [7]] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { path: '[2,2,2]', remaining: '1' }, explanation: '选三个2，剩余1，不够' },
      { step: 2, variables: { path: '[2,2,3]', remaining: '0' }, explanation: '换3试试，正好凑齐7！' },
      { step: 3, variables: { path: '[7]', remaining: '0' }, explanation: '直接选7，也正好！' },
      { step: 4, variables: { result: '[[2,2,3],[7]]' }, explanation: '所有不重复组合', isResult: true },
    ],
  },
  {
    id: 46,
    title: '全排列',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/permutations/',
    category: 'backtracking',
    visualizerType: 'array',
    input: 'nums = [1, 2, 3]',
    output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;
        vector<bool> used(nums.size(), false);  // 标记是否用过

        function<void()> backtrack = [&]() {
            if (path.size() == nums.size()) {
                result.push_back(path);  // 所有数字都排好了
                return;
            }
            for (int i = 0; i < nums.size(); i++) {
                if (used[i]) continue;   // 用过的跳过
                used[i] = true;
                path.push_back(nums[i]);
                backtrack();
                path.pop_back();         // 撤销
                used[i] = false;
            }
        };

        backtrack();
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn permute(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let mut result = vec![];
        let mut path = vec![];
        let mut used = vec![false; nums.len()];

        fn backtrack(nums: &[i32], used: &mut Vec<bool>,
                     path: &mut Vec<i32>, result: &mut Vec<Vec<i32>>) {
            if path.len() == nums.len() {
                result.push(path.clone());
                return;
            }
            for i in 0..nums.len() {
                if used[i] { continue; }
                used[i] = true;
                path.push(nums[i]);
                backtrack(nums, used, path, result);
                path.pop();
                used[i] = false;
            }
        }

        backtrack(&nums, &mut used, &mut path, &mut result);
        result
    }
}`,
    },
    animationSteps: [
      { description: '开始：选1→path=[1]，used=[T,F,F]', highlights: [0], data: { nums: [1, 2, 3], path: [1], used: [true, false, false] }, pointers: [{ label: 'depth', pos: 1 }] },
      { description: '选2→path=[1,2]，used=[T,T,F]；选3→path=[1,2,3] 记录 [1,2,3]', highlights: [1], data: { nums: [1, 2, 3], path: [1, 2, 3], used: [true, true, true] }, pointers: [{ label: 'depth', pos: 3 }] },
      { description: '回溯：撤销3→path=[1,2]，撤销2→path=[1]，改选3→path=[1,3]', highlights: [2], data: { nums: [1, 2, 3], path: [1, 3], used: [true, false, true] }, pointers: [{ label: 'depth', pos: 2 }] },
      { description: '选2→[1,3,2] 记录；回溯换第一个数字：选2开头', highlights: [1], data: { nums: [1, 2, 3], path: [2], used: [false, true, false] }, pointers: [{ label: 'depth', pos: 1 }] },
      { description: '最终得到6种全排列 ✓', highlights: [], data: { nums: [1, 2, 3], result: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { path: '[1,2,3]' }, explanation: '全排列[1,2,3]' },
      { step: 2, variables: { path: '[1,3,2]' }, explanation: '回溯换顺序 → [1,3,2]' },
      { step: 3, variables: { path: '[2,1,3]' }, explanation: '以2开头 → [2,1,3]' },
      { step: 4, variables: { count: '6' }, explanation: '3!=6种全排列全部生成', isResult: true },
    ],
  },
  {
    id: 78,
    title: '子集',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/subsets/',
    category: 'backtracking',
    visualizerType: 'array',
    input: 'nums = [1, 2, 3]',
    output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;

        // 回溯：每个数字都有"选"或"不选"两条路
        function<void(int)> backtrack = [&](int start) {
            result.push_back(path);  // 记录当前子集（包括空集）

            for (int i = start; i < nums.size(); i++) {
                path.push_back(nums[i]);   // 选中当前数字
                backtrack(i + 1);          // 去下一个位置
                path.pop_back();           // 不选（回溯）
            }
        };

        backtrack(0);
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn subsets(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let mut result = vec![];
        let mut path = vec![];

        fn backtrack(nums: &[i32], start: usize,
                     path: &mut Vec<i32>, result: &mut Vec<Vec<i32>>) {
            result.push(path.clone());

            for i in start..nums.len() {
                path.push(nums[i]);
                backtrack(nums, i + 1, path, result);
                path.pop();
            }
        }

        backtrack(&nums, 0, &mut path, &mut result);
        result
    }
}`,
    },
    animationSteps: [
      { description: '开始：记录空集 []', highlights: [], data: { nums: [1, 2, 3], path: [], result: [[]] }, pointers: [{ label: 'start', pos: 0 }] },
      { description: '选1→path=[1]，记录；递归选2→[1,2]，记录；选3→[1,2,3]，记录', highlights: [0], data: { nums: [1, 2, 3], path: [1, 2, 3], result: [[], [1], [1, 2], [1, 2, 3]] }, pointers: [{ label: '', pos: 0 }] },
      { description: '回溯：撤销3→[1,2]再撤销2→[1]，换选3→[1,3]，记录', highlights: [2], data: { nums: [1, 2, 3], path: [1, 3], result: [[], [1], [1, 2], [1, 2, 3], [1, 3]] }, pointers: [{ label: '', pos: 0 }] },
      { description: '回溯到start=0，不选1改选2→[2]，记录；继续选3→[2,3]，记录', highlights: [1], data: { nums: [1, 2, 3], path: [2], result: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]] }, pointers: [{ label: 'start', pos: 1 }] },
      { description: '最后选3→[3]，共8个子集 ✓', highlights: [2], data: { nums: [1, 2, 3], result: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { path: '[]' }, explanation: '空集' },
      { step: 2, variables: { path: '[1,2,3]' }, explanation: '选1→2→3，得[1,2,3]' },
      { step: 3, variables: { path: '[1,3]' }, explanation: '回溯：跳过2，得[1,3]' },
      { step: 4, variables: { count: '8' }, explanation: '3个元素共2³=8个子集', isResult: true },
    ],
  },
  {
    id: 79,
    title: '单词搜索',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/word-search/',
    category: 'backtracking',
    visualizerType: 'matrix',
    input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
    output: 'true',
    code: {
      cpp: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));

        // 上下左右四个方向
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};

        function<bool(int,int,int)> backtrack = [&](int i, int j, int k) {
            if (k == word.size()) return true;  // 全部匹配
            if (i < 0 || i >= m || j < 0 || j >= n ||
                visited[i][j] || board[i][j] != word[k]) {
                return false;  // 越界或走过了或字符不匹配
            }

            visited[i][j] = true;  // 占个座，别走回头路
            for (auto& d : dirs) {
                if (backtrack(i+d[0], j+d[1], k+1)) return true;
            }
            visited[i][j] = false;  // 撤！让给别人走
            return false;
        };

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (backtrack(i, j, 0)) return true;
        return false;
    }
};`,
      rust: `impl Solution {
    pub fn exist(board: Vec<Vec<char>>, word: String) -> bool {
        let (m, n) = (board.len(), board[0].len());
        let word: Vec<char> = word.chars().collect();
        let mut visited = vec![vec![false; n]; m];
        let dirs = [(0,1), (0,-1), (1,0), (-1,0)];

        fn backtrack(board: &[Vec<char>], word: &[char], visited: &mut Vec<Vec<bool>>,
                     dirs: &[(i32, i32)], i: i32, j: i32, k: usize) -> bool {
            if k == word.len() { return true; }
            let (m, n) = (board.len() as i32, board[0].len() as i32);
            if i < 0 || i >= m || j < 0 || j >= n ||
               visited[i as usize][j as usize] ||
               board[i as usize][j as usize] != word[k] {
                return false;
            }

            visited[i as usize][j as usize] = true;
            for &(di, dj) in dirs {
                if backtrack(board, word, visited, dirs, i+di, j+dj, k+1) {
                    return true;
                }
            }
            visited[i as usize][j as usize] = false;
            false
        }

        for i in 0..m {
            for j in 0..n {
                if backtrack(&board, &word, &mut visited, &dirs, i as i32, j as i32, 0) {
                    return true;
                }
            }
        }
        false
    }
}`,
    },
    animationSteps: [
      { description: '从 (0,0)=A 开始，A≠W，跳过', highlights: [], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], visited: [[false, false, false, false], [false, false, false, false], [false, false, false, false]], pos: [0, 0], match: 'A≠W' }, pointers: [{ label: '(i,j)', pos: 0 }] },
      { description: '从 (0,1)=B 开始不匹配 → (0,2)=C → (0,3)=E → (1,0)=S，都不等于W', highlights: [], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], pos: [1, 0] }, pointers: [{ label: '(i,j)', pos: 4 }] },
      { description: '找到起点 (1,1)=F，F≠W → (1,2)=C → (1,3)=S → (2,0)=A → (2,1)=D...都不等于W', highlights: [], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], pos: [2, 1] }, pointers: [{ label: '(i,j)', pos: 8 }] },
      { description: '从 (0,0)=A 开始匹配W？不匹配... (2,0)=A，A≠W → 继续搜索', highlights: [], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']] }, pointers: [] },
      { description: '最终：真的是找不到 W 开头的！等等...word="ABCCED"，起点应该是A=(0,0)', highlights: [0], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], path: ['A(0,0)'], k: 0 }, pointers: [{ label: 'k', pos: 0 }] },
      { description: 'A=B? 不匹配 → 实际上(0,0)=A=word[0], (0,1)=B=word[1], (0,2)=C=word[2], (1,2)=C=word[3], (1,3)=E=word[4], (2,3)=D... 不对，走(1,2)再往下试试', highlights: [0, 1, 2], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], path: ['A(0,0)', 'B(0,1)', 'C(0,2)'], k: 2 }, pointers: [{ label: 'k', pos: 2 }] },
      { description: 'A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(2,2)→D(2,1)？不对，回溯。正确路径：A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(1,3)→D(2,3)? 不对。', highlights: [], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']] }, pointers: [] },
      { description: '正确路径：A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(1,3)→D(2,3)不匹配E。回溯，E(2,2)=word[4]=E，再往下是D(2,3)？word[5]=D，找到了！', highlights: [0, 1, 2, 5, 6, 7], data: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], path: ['A(0,0)', 'B(0,1)', 'C(0,2)', 'C(1,2)', 'E(2,2)', 'D(2,1)'], k: 5 }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { k: '0', pos: '(0,0)', char: 'A' }, explanation: '从(0,0)的A开始，匹配word[0]=A' },
      { step: 2, variables: { k: '1', pos: '(0,1)', char: 'B' }, explanation: '向右到B，匹配word[1]=B' },
      { step: 3, variables: { k: '2', pos: '(0,2)', char: 'C' }, explanation: '向右到C，匹配word[2]=C' },
      { step: 4, variables: { k: '3', pos: '(1,2)', char: 'C' }, explanation: '向下到C，匹配word[3]=C' },
      { step: 5, variables: { k: '4', pos: '(2,2)', char: 'E' }, explanation: '向下到E，匹配word[4]=E' },
      { step: 6, variables: { k: '5', pos: '(2,1)', char: 'D' }, explanation: '向左到D，匹配word[5]=D → 找到全部！' },
      { step: 7, variables: { result: 'true' }, explanation: '路径 A→B→C→C→E→D 找到 "ABCCED"', isResult: true },
    ],
  },
]
