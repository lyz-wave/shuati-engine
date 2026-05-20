import { Problem } from '../types'

export const dpProblems: Problem[] = [
  {
    id: 5,
    title: '最长回文子串',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/longest-palindromic-substring/',
    category: 'dp',
    visualizerType: 'array',
    input: 's = "babad"',
    output: '"bab" 或 "aba"',
    code: {
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        int n = s.size();
        // dp[i][j] = s[i..j] 是不是回文串
        // 就像在填一张"回文关系网"
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        int start = 0, maxLen = 0;

        // 对角线：单个字符自己肯定是回文
        for (int i = 0; i < n; i++) {
            dp[i][i] = true;
            start = i;
            maxLen = 1;
        }

        // 按子串长度从小到大填表
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                if (s[i] == s[j]) {
                    // 长度 <=2 或者中间部分也是回文
                    if (len == 2 || dp[i+1][j-1]) {
                        dp[i][j] = true;
                        if (len > maxLen) {
                            start = i;
                            maxLen = len;
                        }
                    }
                }
            }
        }
        return s.substr(start, maxLen);
    }
};`,
      rust: `impl Solution {
    pub fn longest_palindrome(s: String) -> String {
        let s: Vec<char> = s.chars().collect();
        let n = s.len();
        // dp[i][j]：s[i..=j] 是不是回文串
        // 一张"回文关系网"，从短到长逐步推演
        let mut dp = vec![vec![false; n]; n];
        let (mut start, mut max_len) = (0, 1);

        // 单个字符都是回文
        for i in 0..n {
            dp[i][i] = true;
        }

        // 从短到长，遍历所有子串
        for len in 2..=n {
            for i in 0..=n-len {
                let j = i + len - 1;
                if s[i] == s[j] && (len == 2 || dp[i+1][j-1]) {
                    dp[i][j] = true;
                    if len > max_len {
                        start = i;
                        max_len = len;
                    }
                }
            }
        }
        s[start..start+max_len].iter().collect()
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp 表，对角线设为 true（单个字符都是回文）', highlights: [0], data: { s: ['b', 'a', 'b', 'a', 'd'], dp_rows: [] }, pointers: [{ label: 'len', pos: 1 }] },
      { description: 'len=2: 检查相邻字符对，"ba"不相等，"ab"不相等，"ba"不相等，"ad"不相等', highlights: [0, 1], data: { s: ['b', 'a', 'b', 'a', 'd'], dp_rows: ['b←b', '', '', '', ''] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'len=3: s[0..2]="bab"，首尾相等且中间是回文 → 标记为回文，长度3 > 当前最长', highlights: [0, 2], data: { s: ['b', 'a', 'b', 'a', 'd'], dp_rows: ['b←b ✓', '', 'b←b ✓', '', ''] }, pointers: [{ label: 'len', pos: 3 }] },
      { description: '继续检查 s[2..4]="bad"，首尾不同，不是回文', highlights: [2, 4], data: { s: ['b', 'a', 'b', 'a', 'd'], dp_rows: ['b←b ✓', '', 'b←b ✓', '', ''] }, pointers: [{ label: 'i', pos: 2 }] },
      { description: '结果为 "bab"（或 "aba"），找到最长回文子串 ✓', highlights: [0, 1, 2], data: { s: ['b', 'a', 'b', 'a', 'd'], dp_rows: ['b←b ✓', '', 'b←b ✓', '', ''] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', j: '0', len: '1' }, explanation: 'dp[0][0]=true，单字符"b"是回文' },
      { step: 2, variables: { i: '0', j: '2', len: '3' }, explanation: 's[0]==s[2]="b"，dp[1][1]=true → "bab"是回文' },
      { step: 3, variables: { i: '1', j: '3', len: '3' }, explanation: 's[1]==s[3]="a" → "aba"是回文' },
      { step: 4, variables: { start: '0', maxLen: '3' }, explanation: '最长回文子串长度为3，即"bab"', isResult: true },
    ],
  },
  {
    id: 53,
    title: '最大子数组和',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/maximum-subarray/',
    category: 'dp',
    visualizerType: 'pointer',
    input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    output: '6 (子数组 [4, -1, 2, 1] 的和最大)',
    code: {
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // cur：当前子数组的"积蓄"
        // best：历史最高"积蓄"
        int cur = 0, best = INT_MIN;

        for (int x : nums) {
            // 灵魂拷问：继承家业还是另起炉灶？
            // 如果 x 比 cur + x 还大，说明之前的积累是拖累
            cur = max(x, cur + x);
            // 更新历史最佳
            best = max(best, cur);
        }
        return best;
    }
};`,
      rust: `impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        // cur：当前子数组的"积蓄"
        // best：历史最高战绩
        let mut cur = 0;
        let mut best = i32::MIN;

        for &x in &nums {
            // 是抱团取暖还是单干更香？
            cur = std::cmp::max(x, cur + x);
            best = std::cmp::max(best, cur);
        }
        best
    }
}`,
    },
    animationSteps: [
      { description: '初始化 cur=0, best=MIN，开始遍历', highlights: [], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 0, best: 'MIN' }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'x=-2: cur=max(-2, 0-2)=-2, best=max(MIN, -2)=-2', highlights: [0], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: -2, best: -2 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'x=1: cur=max(1, -2+1)=1, best=max(-2, 1)=1 ← 果断抛弃负数从头来', highlights: [1], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 1, best: 1 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'x=4: cur=max(4, -2+4)=4, best=max(1, 4)=4 ← 又一轮新开始', highlights: [3], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 4, best: 4 }, pointers: [{ label: 'i', pos: 3 }] },
      { description: 'x=2: cur=max(2, 3+2)=5, best=max(4, 5)=5', highlights: [5], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 5, best: 5 }, pointers: [{ label: 'i', pos: 5 }] },
      { description: 'x=1: cur=max(1, 5+1)=6, best=6 ✓ 最终最大和为6', highlights: [6], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 6, best: 6 }, pointers: [{ label: 'i', pos: 6 }] },
    ],
    walkthrough: [
      { step: 1, variables: { x: '-2', cur: '-2', best: '-2' }, explanation: '开局不利，子数组[-2]' },
      { step: 2, variables: { x: '1', cur: '1', best: '1' }, explanation: '看到正数1，果断抛弃-2重开' },
      { step: 3, variables: { x: '4', cur: '4', best: '4' }, explanation: '4比(4-3)大，从4重新开始' },
      { step: 4, variables: { x: '1', cur: '6', best: '6' }, explanation: '子数组[4,-1,2,1]和=6，全场最佳' },
      { step: 5, variables: { result: '6' }, explanation: '遍历结束，最大子数组和为6', isResult: true },
    ],
  },
  {
    id: 62,
    title: '不同路径',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/unique-paths/',
    category: 'dp',
    visualizerType: 'array',
    input: 'm = 3, n = 7',
    output: '28',
    code: {
      cpp: `class Solution {
public:
    int uniquePaths(int m, int n) {
        // dp[j]：到达当前行第 j 列的不同路径数
        // 就像在棋盘上走，每个格子只能从上面或左边来
        vector<int> dp(n, 1);

        // 从第 2 行开始递推
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                // 到达 (i,j) 的路径数 = 从上面来的 + 从左边来的
                dp[j] = dp[j] + dp[j-1];
            }
        }
        return dp[n-1];
    }
};`,
      rust: `impl Solution {
    pub fn unique_paths(m: i32, n: i32) -> i32 {
        let (m, n) = (m as usize, n as usize);
        // dp[j]：到达当前行第 j 列的路径数
        // 滚动数组，只保留一行
        let mut dp = vec![1; n];

        for _ in 1..m {
            for j in 1..n {
                // 上面来 + 左边来
                dp[j] = dp[j] + dp[j-1];
            }
        }
        dp[n-1]
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp = [1,1,1,1,1,1,1]，第一行只有一种走法（一直往右）', highlights: [], data: { dp: [1, 1, 1, 1, 1, 1, 1], row: 0 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: '第2行: dp[1]=dp[1]+dp[0]=1+1=2, dp[2]=dp[2]+dp[1]=1+2=3, ...', highlights: [1], data: { dp: [1, 2, 3, 4, 5, 6, 7], row: 1 }, pointers: [{ label: 'j', pos: 1 }] },
      { description: '继续填充第2行: dp[3]=4, dp[4]=5, dp[5]=6, dp[6]=7', highlights: [3], data: { dp: [1, 2, 3, 4, 5, 6, 7], row: 1 }, pointers: [{ label: 'j', pos: 6 }] },
      { description: '第3行: dp[1]=7+1=8, dp[2]=8+3=11, dp[3]=11+4=15, ...', highlights: [1], data: { dp: [1, 8, 11, 15, 20, 26, 33], row: 2 }, pointers: [{ label: 'j', pos: 1 }] },
      { description: '第3行填完: dp = [1,8,11,15,20,26,28]，dp[6]=28 ✓', highlights: [6], data: { dp: [1, 8, 11, 15, 20, 26, 28], row: 2 }, pointers: [{ label: 'j', pos: 6 }] },
    ],
    walkthrough: [
      { step: 1, variables: { dp: '[1,1,1,1,1,1,1]', row: '0' }, explanation: '初始化第一行，全为1' },
      { step: 2, variables: { i: '1', dp: '[1,2,3,4,5,6,7]' }, explanation: '第二行递推，每个格子=左+上' },
      { step: 3, variables: { i: '2', dp: '[1,8,11,15,20,26,28]' }, explanation: '第三行继续递推' },
      { step: 4, variables: { result: '28' }, explanation: '到达右下角共有28条不同路径', isResult: true },
    ],
  },
  {
    id: 64,
    title: '最小路径和',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/minimum-path-sum/',
    category: 'dp',
    visualizerType: 'matrix',
    input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]',
    output: '7 (路径 1→3→1→1→1 的和最小)',
    code: {
      cpp: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        // dp[j]：到达当前行第 j 列的最小路径和
        vector<int> dp(n, INT_MAX);
        dp[0] = 0;

        for (int i = 0; i < m; i++) {
            dp[0] += grid[i][0];  // 第一列只能从上面来
            for (int j = 1; j < n; j++) {
                // 选左边或上面较小的路径，加上当前格子的值
                dp[j] = min(dp[j], dp[j-1]) + grid[i][j];
            }
        }
        return dp[n-1];
    }
};`,
      rust: `impl Solution {
    pub fn min_path_sum(grid: Vec<Vec<i32>>) -> i32 {
        let (m, n) = (grid.len(), grid[0].len());
        // dp[j]：到达当前行第 j 列的最小代价
        let mut dp = vec![i32::MAX; n];
        dp[0] = 0;

        for i in 0..m {
            dp[0] += grid[i][0];
            for j in 1..n {
                // 选左边或上面，挑个便宜的
                dp[j] = std::cmp::min(dp[j], dp[j-1]) + grid[i][j];
            }
        }
        dp[n-1]
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp = [0, MAX, MAX, MAX]，从左上角出发', highlights: [], data: { grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]], dp: [0, 'MAX', 'MAX'] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: '第1行: dp[0]=1, dp[1]=min(MAX,0)+3=4, dp[2]=min(4,MAX)+1=5', highlights: [0, 1], data: { grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]], dp: [1, 4, 5] }, pointers: [{ label: 'j', pos: 2 }] },
      { description: '第2行: dp[0]=1+1=2, dp[1]=min(4,2)+5=7, dp[2]=min(5,7)+1=6', highlights: [0, 1, 2], data: { grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]], dp: [2, 7, 6] }, pointers: [{ label: 'i', pos: 1 }] },
      { description: '第3行: dp[0]=2+4=6, dp[1]=min(7,6)+2=8, dp[2]=min(6,8)+1=7 ✓', highlights: [0, 1, 2], data: { grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]], dp: [6, 8, 7] }, pointers: [{ label: 'i', pos: 2 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', dp: '[1, 4, 5]' }, explanation: '第一行：从左往右累加' },
      { step: 2, variables: { i: '1', dp: '[2, 7, 6]' }, explanation: '第二行：min(上,左)+当前值' },
      { step: 3, variables: { i: '2', dp: '[6, 8, 7]' }, explanation: '第三行继续递推' },
      { step: 4, variables: { result: '7' }, explanation: '最小路径和为7：1→3→1→1→1', isResult: true },
    ],
  },
  {
    id: 70,
    title: '爬楼梯',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/climbing-stairs/',
    category: 'dp',
    visualizerType: 'array',
    input: 'n = 3',
    output: '3 (1+1+1, 1+2, 2+1)',
    code: {
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        // 这不就是斐波那契数列嘛！
        // 到第 i 阶 = 从 i-1 跨一步 + 从 i-2 跨两步
        int a = 1, b = 2;  // dp[1] = 1, dp[2] = 2
        for (int i = 3; i <= n; i++) {
            int c = a + b;  // dp[i] = dp[i-1] + dp[i-2]
            a = b;
            b = c;
        }
        return b;
    }
};`,
      rust: `impl Solution {
    pub fn climb_stairs(n: i32) -> i32 {
        if n <= 2 { return n; }
        // 经典斐波那契，滚动更新
        let (mut a, mut b) = (1, 2);
        for _ in 3..=n {
            let c = a + b;
            a = b;
            b = c;
        }
        b
    }
}`,
    },
    animationSteps: [
      { description: 'n=1: 只有1种走法（1步）→ dp[1]=1', highlights: [], data: { n: 3, dp: [0, 1, 0, 0] }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'n=2: 2种走法（1+1 或 2）→ dp[2]=2', highlights: [], data: { n: 3, dp: [0, 1, 2, 0] }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'n=3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3', highlights: [], data: { n: 3, dp: [0, 1, 2, 3] }, pointers: [{ label: 'i', pos: 3 }] },
      { description: '爬3阶楼梯有3种方式：1+1+1, 1+2, 2+1 ✓', highlights: [], data: { n: 3, dp: [0, 1, 2, 3] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { n: '1', ways: '1' }, explanation: '1阶：只能跨1步' },
      { step: 2, variables: { n: '2', ways: '2' }, explanation: '2阶：两次1步或一次2步' },
      { step: 3, variables: { n: '3', ways: '3' }, explanation: '3阶 = 从第2阶跨1步 + 从第1阶跨2步' },
      { step: 4, variables: { result: '3' }, explanation: '共有3种不同的爬楼梯方式', isResult: true },
    ],
  },
  {
    id: 72,
    title: '编辑距离',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/edit-distance/',
    category: 'dp',
    visualizerType: 'matrix',
    input: 'word1 = "horse", word2 = "ros"',
    output: '3',
    code: {
      cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        // dp[i][j]：word1[0..i-1] 变成 word2[0..j-1] 的最小编辑距离
        vector<vector<int>> dp(m+1, vector<int>(n+1));

        // 边界：空串变成长度为 j 的串，需要 j 次插入
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 0; i <= m; i++) dp[i][0] = i;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) {
                    // 字符相同，不用操作，直接继承
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    // 三选一：删、插、换，挑代价最小的
                    dp[i][j] = 1 + min({
                        dp[i-1][j],    // 删除
                        dp[i][j-1],    // 插入
                        dp[i-1][j-1]   // 替换
                    });
                }
            }
        }
        return dp[m][n];
    }
};`,
      rust: `impl Solution {
    pub fn min_distance(word1: String, word2: String) -> i32 {
        let (m, n) = (word1.len(), word2.len());
        let (w1, w2) = (word1.as_bytes(), word2.as_bytes());
        let mut dp = vec![vec![0; n+1]; m+1];

        for j in 0..=n { dp[0][j] = j as i32; }
        for i in 0..=m { dp[i][0] = i as i32; }

        for i in 1..=m {
            for j in 1..=n {
                if w1[i-1] == w2[j-1] {
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    // 删除、插入、替换，哪个便宜用哪个
                    dp[i][j] = 1 + dp[i-1][j].min(dp[i][j-1]).min(dp[i-1][j-1]);
                }
            }
        }
        dp[m][n]
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp 表：dp[0][j]=j（空串→word2需要j次插入），dp[i][0]=i（word1→空串需要i次删除）', highlights: [], data: { word1: ['h', 'o', 'r', 's', 'e'], word2: ['r', 'o', 's'], dp_grid: [[0, 1, 2, 3], [1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0]] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1,j=1: h≠r → dp[1][1]=1+min(dp[0][1],dp[1][0],dp[0][0])=1+min(1,1,0)=1（替换h→r）', highlights: [0, 0], data: { word1: ['h', 'o', 'r', 's', 'e'], word2: ['r', 'o', 's'], dp_grid: [[0, 1, 2, 3], [1, 1, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0]] }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'i=2,j=2: o=o → dp[2][2]=dp[1][1]=1，字符相同不用操作', highlights: [1, 1], data: { word1: ['h', 'o', 'r', 's', 'e'], word2: ['r', 'o', 's'], dp_grid: [[0, 1, 2, 3], [1, 1, 2, 3], [2, 2, 1, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0]] }, pointers: [{ label: 'i', pos: 2 }] },
      { description: '填充至 i=5,j=3: dp[5][3]=3，即 horse→ros 需要3步操作 ✓', highlights: [4, 2], data: { word1: ['h', 'o', 'r', 's', 'e'], word2: ['r', 'o', 's'], dp_grid: [[0, 1, 2, 3], [1, 1, 2, 3], [2, 2, 1, 2], [3, 2, 2, 2], [4, 3, 3, 3], [5, 4, 4, 3]] }, pointers: [{ label: '', pos: 0 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '1', j: '1', match: 'h≠r' }, explanation: 'h→r需要1次替换' },
      { step: 2, variables: { i: '3', j: '2', match: 'r=o?', ops: '2' }, explanation: 'hor→ro需要2步操作' },
      { step: 3, variables: { i: '5', j: '3', ops: '3' }, explanation: 'horse→ros需要3步' },
      { step: 4, variables: { result: '3' }, explanation: 'horse→ros 最小编辑距离为3（r替换h, 删除r, 删除e）', isResult: true },
    ],
  },
  {
    id: 118,
    title: '杨辉三角',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/pascals-triangle/',
    category: 'dp',
    visualizerType: 'array',
    input: 'numRows = 5',
    output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        // 杨辉三角：每个数等于它左上方和右上方两数之和
        vector<vector<int>> tri;

        for (int i = 0; i < numRows; i++) {
            // 每行长度 = i+1，全部先填1
            tri.push_back(vector<int>(i+1, 1));
            // 从第二个数到倒数第二个数，用上一行计算
            for (int j = 1; j < i; j++) {
                tri[i][j] = tri[i-1][j-1] + tri[i-1][j];
            }
        }
        return tri;
    }
};`,
      rust: `impl Solution {
    pub fn generate(num_rows: i32) -> Vec<Vec<i32>> {
        let mut tri: Vec<Vec<i32>> = Vec::new();

        for i in 0..num_rows as usize {
            // 每行先全部填1
            let mut row = vec![1; i+1];
            // 从第2个元素开始递推
            for j in 1..i {
                row[j] = tri[i-1][j-1] + tri[i-1][j];
            }
            tri.push(row);
        }
        tri
    }
}`,
    },
    animationSteps: [
      { description: '第1行: [1] ← 初始化第一行', highlights: [], data: { triangle: [[1]] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: '第2行: [1,1] ← 两端固定为1', highlights: [], data: { triangle: [[1], [1, 1]] }, pointers: [{ label: 'i', pos: 1 }] },
      { description: '第3行: [1,2,1] ← 2 = 1+1（上一行的第0和第1位）', highlights: [], data: { triangle: [[1], [1, 1], [1, 2, 1]] }, pointers: [{ label: 'i', pos: 2 }] },
      { description: '第4行: [1,3,3,1] ← 3=1+2, 3=2+1', highlights: [], data: { triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]] }, pointers: [{ label: 'i', pos: 3 }] },
      { description: '第5行: [1,4,6,4,1] ← 4=1+3, 6=3+3, 4=3+1 ✓', highlights: [], data: { triangle: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]] }, pointers: [{ label: 'i', pos: 4 }] },
    ],
    walkthrough: [
      { step: 1, variables: { row: '0', data: '[1]' }, explanation: '第一行只有1' },
      { step: 2, variables: { row: '1', data: '[1,1]' }, explanation: '第二行两个1' },
      { step: 3, variables: { row: '2', data: '[1,2,1]' }, explanation: '第三行：中间2=1+1' },
      { step: 4, variables: { row: '4', data: '[1,4,6,4,1]' }, explanation: '第五行：中间4=1+3, 6=3+3, 4=3+1' },
      { step: 5, variables: { rows: '5' }, explanation: '生成5行杨辉三角完成', isResult: true },
    ],
  },
  {
    id: 121,
    title: '买卖股票的最佳时机',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/',
    category: 'dp',
    visualizerType: 'pointer',
    input: 'prices = [7,1,5,3,6,4]',
    output: '5 (第2天买入，第5天卖出，获利 6-1=5)',
    code: {
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // minPrice：到当前天为止的最低股价
        // maxProfit：到当前天为止能赚到的最多钱
        int minPrice = INT_MAX, maxProfit = 0;

        for (int price : prices) {
            // 更新历史最低价（进货价越低越好）
            minPrice = min(minPrice, price);
            // 算算今天卖能赚多少？比之前最好成绩好吗？
            maxProfit = max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
};`,
      rust: `impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // 一路找最低点买入，最高点卖出
        let mut min_price = i32::MAX;
        let mut max_profit = 0;

        for price in prices {
            min_price = std::cmp::min(min_price, price);
            max_profit = std::cmp::max(max_profit, price - min_price);
        }
        max_profit
    }
}`,
    },
    animationSteps: [
      { description: 'price=7: minPrice=min(MAX,7)=7, profit=max(0,7-7)=0', highlights: [0], data: { prices: [7, 1, 5, 3, 6, 4], minPrice: 7, maxProfit: 0 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'price=1: minPrice=min(7,1)=1, profit=max(0,1-1)=0 ← 发现更低价格1', highlights: [1], data: { prices: [7, 1, 5, 3, 6, 4], minPrice: 1, maxProfit: 0 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'price=5: minPrice=1, profit=max(0,5-1)=4 ← 如果1买5卖赚4块', highlights: [2], data: { prices: [7, 1, 5, 3, 6, 4], minPrice: 1, maxProfit: 4 }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'price=6: minPrice=1, profit=max(4,6-1)=5 ← 最佳！1买6卖赚5块', highlights: [4], data: { prices: [7, 1, 5, 3, 6, 4], minPrice: 1, maxProfit: 5 }, pointers: [{ label: 'i', pos: 4 }] },
      { description: 'price=4: minPrice=1, profit=max(5,4-1)=5 ✓ 最大利润为5', highlights: [5], data: { prices: [7, 1, 5, 3, 6, 4], minPrice: 1, maxProfit: 5 }, pointers: [{ label: 'i', pos: 5 }] },
    ],
    walkthrough: [
      { step: 1, variables: { price: '7', minPrice: '7', profit: '0' }, explanation: '初始价格7，最低价7' },
      { step: 2, variables: { price: '1', minPrice: '1', profit: '0' }, explanation: '发现新低1，但不赚钱' },
      { step: 3, variables: { price: '5', minPrice: '1', profit: '4' }, explanation: '如果1买5卖能赚4' },
      { step: 4, variables: { price: '6', minPrice: '1', profit: '5' }, explanation: '6卖赚5，刷新纪录' },
      { step: 5, variables: { result: '5' }, explanation: '最佳策略：第2天买(1)第5天卖(6)，赚5', isResult: true },
    ],
  },
  {
    id: 139,
    title: '单词拆分',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/word-break/',
    category: 'dp',
    visualizerType: 'array',
    input: 's = "leetcode", wordDict = ["leet","code"]',
    output: 'true',
    code: {
      cpp: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        // 把字典转成哈希集合，方便快速查找
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.size();
        // dp[i]：s的前i个字符能否被拆分成字典中的单词
        vector<bool> dp(n+1, false);
        dp[0] = true;  // 空串当然可以

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                // 如果前j个字符能拆，且 s[j..i-1] 在字典里
                if (dp[j] && dict.count(s.substr(j, i-j))) {
                    dp[i] = true;
                    break;  // 找到一个拆分就够了
                }
            }
        }
        return dp[n];
    }
};`,
      rust: `use std::collections::HashSet;

impl Solution {
    pub fn word_break(s: String, word_dict: Vec<String>) -> bool {
        let dict: HashSet<&str> = word_dict.iter().map(|s| s.as_str()).collect();
        let n = s.len();
        // dp[i]：s[0..i] 能否被拆分
        let mut dp = vec![false; n+1];
        dp[0] = true;

        for i in 1..=n {
            for j in 0..i {
                if dp[j] && dict.contains(&s[j..i]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        dp[n]
    }
}`,
    },
    animationSteps: [
      { description: 'dp[0]=true（空串可拆分），初始化 dp = [T, F, F, F, F, F, F, F, F]', highlights: [], data: { s: ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e'], dp: [true, false, false, false, false, false, false, false, false] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=4: dp[0]=T, s[0..3]="leet"在字典中 → dp[4]=true', highlights: [0, 1, 2, 3], data: { s: ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e'], dp: [true, false, false, false, true, false, false, false, false] }, pointers: [{ label: 'i', pos: 4 }] },
      { description: 'i=8: dp[4]=T, s[4..7]="code"在字典中 → dp[8]=true', highlights: [4, 5, 6, 7], data: { s: ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e'], dp: [true, false, false, false, true, false, false, false, true] }, pointers: [{ label: 'i', pos: 8 }] },
      { description: 'dp[8]=true，整个字符串可拆分为 "leet"+"code" ✓', highlights: [], data: { s: ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e'], dp: [true, false, false, false, true, false, false, false, true] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', dp: 'T' }, explanation: 'dp[0] = true 空串' },
      { step: 2, variables: { i: '4', j: '0', word: '"leet"' }, explanation: '"leet"在字典中，dp[4]=true' },
      { step: 3, variables: { i: '8', j: '4', word: '"code"' }, explanation: '"code"在字典中，dp[8]=true' },
      { step: 4, variables: { result: 'true' }, explanation: '"leetcode"可拆分为 "leet"+"code"', isResult: true },
    ],
  },
  {
    id: 152,
    title: '乘积最大子数组',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/maximum-product-subarray/',
    category: 'dp',
    visualizerType: 'pointer',
    input: 'nums = [2, 3, -2, 4]',
    output: '6 (子数组 [2, 3] 的乘积最大)',
    code: {
      cpp: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        // curMax/curMin：以当前数字结尾的最大/最小乘积
        // 因为有负数，最小的可能翻倍变最大（负负得正）
        int curMax = nums[0], curMin = nums[0], best = nums[0];

        for (int i = 1; i < nums.size(); i++) {
            int x = nums[i];
            // 记录一下旧值，因为更新 curMax 会改变 curMin 要用到的值
            int prevMax = curMax;

            // 三种可能：自己单干、乘以前面最大的、乘以前面最小的
            curMax = max({x, prevMax * x, curMin * x});
            curMin = min({x, prevMax * x, curMin * x});

            best = max(best, curMax);
        }
        return best;
    }
};`,
      rust: `impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        let mut cur_max = nums[0];
        let mut cur_min = nums[0];
        let mut best = nums[0];

        for &x in &nums[1..] {
            let prev_max = cur_max;
            // 负负得正，所以同时追踪最大值和最小值
            cur_max = std::cmp::max(x, std::cmp::max(prev_max * x, cur_min * x));
            cur_min = std::cmp::min(x, std::cmp::min(prev_max * x, cur_min * x));
            best = std::cmp::max(best, cur_max);
        }
        best
    }
}`,
    },
    animationSteps: [
      { description: '初始化 curMax=2, curMin=2, best=2', highlights: [], data: { nums: [2, 3, -2, 4], curMax: 2, curMin: 2, best: 2 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'x=3: curMax=max(3,2*3,2*3)=6, curMin=min(3,6,6)=3, best=max(2,6)=6', highlights: [1], data: { nums: [2, 3, -2, 4], curMax: 6, curMin: 3, best: 6 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'x=-2: curMax=max(-2,6*-2,3*-2)=max(-2,-12,-6)=-2, curMin=min(-2,-12,-6)=-12, best=max(6,-2)=6', highlights: [2], data: { nums: [2, 3, -2, 4], curMax: -2, curMin: -12, best: 6 }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'x=4: curMax=max(4,-2*4,-12*4)=4, curMin=min(4,-8,-48)=-48, best=max(6,4)=6', highlights: [3], data: { nums: [2, 3, -2, 4], curMax: 4, curMin: -48, best: 6 }, pointers: [{ label: 'i', pos: 3 }] },
      { description: '最终 best=6，最大乘积子数组为 [2,3] ✓', highlights: [0, 1], data: { nums: [2, 3, -2, 4], curMax: 4, curMin: -48, best: 6 }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { x: '2', curMax: '2', curMin: '2', best: '2' }, explanation: '从第一个数开始' },
      { step: 2, variables: { x: '3', curMax: '6', best: '6' }, explanation: '2×3=6，刷新最佳' },
      { step: 3, variables: { x: '-2', curMax: '-2', curMin: '-12' }, explanation: '负数让最大变最小，最小变最大' },
      { step: 4, variables: { x: '4', curMax: '4', best: '6' }, explanation: '乘积4不如6大，best不变' },
      { step: 5, variables: { result: '6' }, explanation: '整个数组最大乘积子数组为[2,3]→6', isResult: true },
    ],
  },
  {
    id: 198,
    title: '打家劫舍',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/house-robber/',
    category: 'dp',
    visualizerType: 'array',
    input: 'nums = [1, 2, 3, 1]',
    output: '4 (偷第1家和第3家：1+3=4)',
    code: {
      cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        // dp[i]：到第 i 家时能偷到的最大金额
        // 每家都面临灵魂拷问：偷还是不偷？
        vector<int> dp(n, 0);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);

        for (int i = 2; i < n; i++) {
            // 偷这家 = 上上家 + 这家的钱
            // 不偷这家 = 上家
            dp[i] = max(dp[i-1], dp[i-2] + nums[i]);
        }
        return dp[n-1];
    }
};`,
      rust: `impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        if n == 1 { return nums[0]; }
        // dp[i]：到第 i 家的最大收益
        let mut dp = vec![0; n];
        dp[0] = nums[0];
        dp[1] = std::cmp::max(nums[0], nums[1]);

        for i in 2..n {
            // 偷/不偷 二选一
            dp[i] = std::cmp::max(dp[i-1], dp[i-2] + nums[i]);
        }
        dp[n-1]
    }
}`,
    },
    animationSteps: [
      { description: 'dp[0]=1，只有1家时没得选', highlights: [0], data: { nums: [1, 2, 3, 1], dp: [1, 0, 0, 0] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'dp[1]=max(1,2)=2，到第2家选金额更大的', highlights: [0, 1], data: { nums: [1, 2, 3, 1], dp: [1, 2, 0, 0] }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'dp[2]=max(dp[1]=2, dp[0]+3=4)=4 ← 偷第1家和第3家更赚', highlights: [0, 1, 2], data: { nums: [1, 2, 3, 1], dp: [1, 2, 4, 0] }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'dp[3]=max(dp[2]=4, dp[1]+1=3)=4 ✓ 整体最大4', highlights: [0, 1, 2, 3], data: { nums: [1, 2, 3, 1], dp: [1, 2, 4, 4] }, pointers: [{ label: 'i', pos: 3 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', dp: '1' }, explanation: '只有一家，偷1' },
      { step: 2, variables: { i: '1', dp: '2' }, explanation: '前两家选大的，偷2' },
      { step: 3, variables: { i: '2', dp: '4' }, explanation: '偷1(1)+3=4 比不偷(2)划算' },
      { step: 4, variables: { i: '3', dp: '4' }, explanation: '偷4比不过4，最终最大金额为4' },
      { step: 5, variables: { result: '4' }, explanation: '偷第1家(1)和第3家(3)总金额4', isResult: true },
    ],
  },
  {
    id: 300,
    title: '最长递增子序列',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/longest-increasing-subsequence/',
    category: 'dp',
    visualizerType: 'array',
    input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]',
    output: '4 (递增子序列 [2, 5, 7, 101] 或 [2, 3, 7, 101])',
    code: {
      cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        // dp[i]：以 nums[i] 结尾的最长递增子序列长度
        // 每个数字至少自己算一个长度1
        vector<int> dp(n, 1);
        int best = 1;

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                // 如果 nums[j] 比 nums[i] 小，可以接在后面
                if (nums[j] < nums[i]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            best = max(best, dp[i]);
        }
        return best;
    }
};`,
      rust: `impl Solution {
    pub fn length_of_lis(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // dp[i]：以 nums[i] 结尾的 LIS 长度
        let mut dp = vec![1; n];
        let mut best = 1;

        for i in 1..n {
            for j in 0..i {
                if nums[j] < nums[i] {
                    dp[i] = std::cmp::max(dp[i], dp[j] + 1);
                }
            }
            best = std::cmp::max(best, dp[i]);
        }
        best
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp 全为1，每个元素自己就是长度为1的递增子序列', highlights: [], data: { nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 1, 1, 1, 1, 1] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=3 (nums=5): j=2 (nums=2), 2<5 → dp[3]=max(1,1+1)=2，子序列[2,5]', highlights: [2, 3], data: { nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 1, 1, 1, 1] }, pointers: [{ label: 'i', pos: 3 }] },
      { description: 'i=5 (nums=7): 前面2,5,3都能接，dp[5]=max(dp[2]+1,dp[3]+1,dp[4]+1)=max(2,3,2)=3', highlights: [2, 3, 4, 5], data: { nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 1, 1] }, pointers: [{ label: 'i', pos: 5 }] },
      { description: 'i=6 (nums=101): 前面所有数都小于101，dp[6]=max(dp)+1=4，子序列[2,5,7,101]', highlights: [0, 1, 2, 3, 4, 5, 6], data: { nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 4, 1] }, pointers: [{ label: 'i', pos: 6 }] },
      { description: 'best=4，最长递增子序列长度为4 ✓', highlights: [], data: { nums: [10, 9, 2, 5, 3, 7, 101, 18], dp: [1, 1, 1, 2, 2, 3, 4, 4] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '3', val: '5', dp: '2' }, explanation: '2<5，子序列[2,5]长度2' },
      { step: 2, variables: { i: '5', val: '7', dp: '3' }, explanation: '2,3,5都小于7，[2,5,7]长度3' },
      { step: 3, variables: { i: '6', val: '101', dp: '4' }, explanation: '101比前面都大，[2,5,7,101]长度4' },
      { step: 4, variables: { result: '4' }, explanation: '最长递增子序列长度4，如[2,5,7,101]', isResult: true },
    ],
  },
  {
    id: 322,
    title: '零钱兑换',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/coin-change/',
    category: 'dp',
    visualizerType: 'array',
    input: 'coins = [1, 2, 5], amount = 11',
    output: '3 (5 + 5 + 1)',
    code: {
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // dp[i]：凑出金额 i 所需的最少硬币数
        // 初始化为一个"不可能"的大数
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;  // 凑0元不需要硬币

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    // 用一枚 coin 硬币 + 凑剩下的钱所需的最少硬币
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      rust: `impl Solution {
    pub fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {
        let amount = amount as usize;
        // dp[i]：凑 i 元最少需要几枚硬币
        let mut dp = vec![amount + 1; amount + 1];
        dp[0] = 0;

        for i in 1..=amount {
            for &coin in &coins {
                let c = coin as usize;
                if c <= i {
                    dp[i] = std::cmp::min(dp[i], dp[i - c] + 1);
                }
            }
        }
        if dp[amount] > amount { -1 } else { dp[amount] as i32 }
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp 数组，dp[0]=0，其余为「不可能」', highlights: [], data: { dp: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1: 用1硬币凑→dp[1]=min(12, dp[0]+1)=1', highlights: [1], data: { dp: [0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12] }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'i=2: 用1分→dp[2]=min(12, 1+1)=2; 用2分→dp[2]=min(2, 0+1)=1，所以dp[2]=1', highlights: [2], data: { dp: [0, 1, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12] }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'i=5: 用5分→dp[5]=min(12, 0+1)=1 → 直接用5分硬币', highlights: [5], data: { dp: [0, 1, 1, 2, 2, 1, 12, 12, 12, 12, 12, 12] }, pointers: [{ label: 'i', pos: 5 }] },
      { description: 'i=11: dp[11]=min(dp[10]+1, dp[9]+1, dp[6]+1)=min(2+1,3+1,2+1)=3 ✓', highlights: [11], data: { dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3] }, pointers: [{ label: 'i', pos: 11 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '1', coin: '1', dp: '1' }, explanation: '1元用1枚1分硬币' },
      { step: 2, variables: { i: '5', coin: '5', dp: '1' }, explanation: '5元用1枚5分硬币' },
      { step: 3, variables: { i: '6', coin: '1,2,5', dp: '2' }, explanation: '5+1 凑6元只需2枚' },
      { step: 4, variables: { i: '11', dp: '3' }, explanation: '11=5+5+1，最少3枚硬币' },
      { step: 5, variables: { result: '3' }, explanation: '凑11元最少需要3枚硬币（5+5+1）', isResult: true },
    ],
  },
  {
    id: 416,
    title: '分割等和子集',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/partition-equal-subset-sum/',
    category: 'dp',
    visualizerType: 'array',
    input: 'nums = [1, 5, 11, 5]',
    output: 'true ([1, 5, 5] = 11, [11] = 11)',
    code: {
      cpp: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        // 总和是奇数？不可能平分
        if (sum % 2 != 0) return false;
        int target = sum / 2;

        // dp[j]：能否选出一些数凑出 j
        // 经典的 0-1 背包问题，问背包能不能正好装满
        vector<bool> dp(target + 1, false);
        dp[0] = true;  // 不拿任何数就能凑出0

        for (int num : nums) {
            // 倒序遍历，保证每个数只用一次
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }
};`,
      rust: `impl Solution {
    pub fn can_partition(nums: Vec<i32>) -> bool {
        let sum: i32 = nums.iter().sum();
        if sum % 2 != 0 { return false; }
        let target = sum as usize / 2;

        // dp[j]：能否凑出 j
        let mut dp = vec![false; target + 1];
        dp[0] = true;

        for num in nums {
            let n = num as usize;
            for j in (n..=target).rev() {
                dp[j] = dp[j] || dp[j - n];
            }
        }
        dp[target]
    }
}`,
    },
    animationSteps: [
      { description: '总和=22，target=11。初始化 dp=[T,F,F,F,F,F,F,F,F,F,F,F]', highlights: [], data: { nums: [1, 5, 11, 5], target: 11, dp: [true, false, false, false, false, false, false, false, false, false, false, false] }, pointers: [{ label: 'num', pos: 0 }] },
      { description: 'num=1: 可以凑出1→dp[1]=true，更新 dp', highlights: [0], data: { nums: [1, 5, 11, 5], target: 11, dp: [true, true, false, false, false, false, false, false, false, false, false, false] }, pointers: [{ label: 'num', pos: 0 }] },
      { description: 'num=5: 可以凑出5和6（1+5）→dp[5]=T, dp[6]=T', highlights: [1], data: { nums: [1, 5, 11, 5], target: 11, dp: [true, true, false, false, false, true, true, false, false, false, false, false] }, pointers: [{ label: 'num', pos: 1 }] },
      { description: 'num=11: 直接凑出11→dp[11]=true！找到解！', highlights: [2], data: { nums: [1, 5, 11, 5], target: 11, dp: [true, true, false, false, false, true, true, false, false, false, false, true] }, pointers: [{ label: 'num', pos: 2 }] },
      { description: 'dp[11]=true，可以分割成 [11] 和 [1,5,5] 两个等和子集 ✓', highlights: [], data: { nums: [1, 5, 11, 5], target: 11, dp: [true, true, false, false, false, true, true, false, false, false, false, true] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { sum: '22', target: '11' }, explanation: '总和22是偶数，target=11' },
      { step: 2, variables: { num: '1', can: '1' }, explanation: '用1能凑出1' },
      { step: 3, variables: { num: '5', can: '5,6' }, explanation: '用5能凑出5和6' },
      { step: 4, variables: { num: '11', can: '11' }, explanation: '用11直接凑出11！' },
      { step: 5, variables: { result: 'true' }, explanation: '可分割为[11]和[1,5,5]', isResult: true },
    ],
  },
  {
    id: 1143,
    title: '最长公共子序列',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/longest-common-subsequence/',
    category: 'dp',
    visualizerType: 'matrix',
    input: 'text1 = "abcde", text2 = "ace"',
    output: '3 ("ace")',
    code: {
      cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        // dp[i][j]：text1[0..i-1] 和 text2[0..j-1] 的最长公共子序列长度
        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i-1] == text2[j-1]) {
                    // 字符匹配，公共长度+1
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    // 不匹配，选左边或上面较大的继承
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
};`,
      rust: `impl Solution {
    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {
        let (m, n) = (text1.len(), text2.len());
        let (s1, s2) = (text1.as_bytes(), text2.as_bytes());
        let mut dp = vec![vec![0; n+1]; m+1];

        for i in 1..=m {
            for j in 1..=n {
                if s1[i-1] == s2[j-1] {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = std::cmp::max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        dp[m][n]
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp 表全0，行=text1(abcde)，列=text2(ace)', highlights: [], data: { text1: ['a', 'b', 'c', 'd', 'e'], text2: ['a', 'c', 'e'], dp_grid: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1,j=1: a=a → dp[1][1]=dp[0][0]+1=1', highlights: [0, 0], data: { text1: ['a', 'b', 'c', 'd', 'e'], text2: ['a', 'c', 'e'], dp_grid: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'i=3,j=2: c=c → dp[3][2]=dp[2][1]+1=1+1=2', highlights: [2, 1], data: { text1: ['a', 'b', 'c', 'd', 'e'], text2: ['a', 'c', 'e'], dp_grid: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]] }, pointers: [{ label: 'i', pos: 3 }] },
      { description: 'i=5,j=3: e=e → dp[5][3]=dp[4][2]+1=2+1=3 ✓', highlights: [4, 2], data: { text1: ['a', 'b', 'c', 'd', 'e'], text2: ['a', 'c', 'e'], dp_grid: [[0, 0, 0, 0], [0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 2, 2], [0, 1, 2, 2], [0, 1, 2, 3]] }, pointers: [{ label: 'i', pos: 5 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '1', j: '1', match: 'a=a' }, explanation: 'a匹配，LCS长度1' },
      { step: 2, variables: { i: '3', j: '2', match: 'c=c' }, explanation: 'c匹配，LCS长度2（"ac"）' },
      { step: 3, variables: { i: '5', j: '3', match: 'e=e' }, explanation: 'e匹配，LCS长度3（"ace"）' },
      { step: 4, variables: { result: '3' }, explanation: '"abcde"和"ace"最长公共子序列为"ace"，长度3', isResult: true },
    ],
  },
]
