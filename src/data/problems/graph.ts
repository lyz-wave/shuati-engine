import { Problem } from '../types'

export const graphProblems: Problem[] = [
  {
    id: 200,
    title: '岛屿数量',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/number-of-islands/',
    category: 'graph',
    visualizerType: 'array',
    input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
    output: '3',
    code: {
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int ans = 0;

        // 遍历每个格子，遇到 '1' 就开启一次 DFS 探索
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    ans++;  // 发现一个新大陆！
                    dfs(grid, i, j);  // 淹掉整个岛
                }
            }
        }
        return ans;
    }

    void dfs(vector<vector<char>>& grid, int i, int j) {
        int m = grid.size(), n = grid[0].size();
        // 出界或者遇到海水，停止
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0')
            return;

        grid[i][j] = '0';  // 标记为已访问（淹掉这块地）
        // 向四个方向扩散
        dfs(grid, i+1, j);  // 下
        dfs(grid, i-1, j);  // 上
        dfs(grid, i, j+1);  // 右
        dfs(grid, i, j-1);  // 左
    }
};`,
      rust: `impl Solution {
    pub fn num_islands(mut grid: Vec<Vec<char>>) -> i32 {
        let m = grid.len();
        if m == 0 { return 0; }
        let n = grid[0].len();
        let mut ans = 0;

        for i in 0..m {
            for j in 0..n {
                if grid[i][j] == '1' {
                    ans += 1;
                    Self::dfs(&mut grid, i, j, m, n);
                }
            }
        }
        ans
    }

    fn dfs(grid: &mut Vec<Vec<char>>, i: usize, j: usize, m: usize, n: usize) {
        if i >= m || j >= n || grid[i][j] == '0' { return; }
        grid[i][j] = '0';  // 淹掉当前格子
        // 向四个方向探索（注意防溢出）
        if i > 0 { Self::dfs(grid, i-1, j, m, n); }
        if j > 0 { Self::dfs(grid, i, j-1, m, n); }
        Self::dfs(grid, i+1, j, m, n);
        Self::dfs(grid, i, j+1, m, n);
    }
}`,
    },
    animationSteps: [
      { description: '原始网格：从左上角开始逐格扫描', highlights: [], data: { nums: [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]] } },
      { description: '遇见 (0,0)=1，岛屿数+1=1。DFS 淹掉相连的所有 1', highlights: [0], data: { nums: [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,1,1]] } },
      { description: '继续扫描到 (2,2)=1，岛屿数+1=2。DFS 淹掉它（孤立岛）', highlights: [10], data: { nums: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,1]] } },
      { description: '扫描到 (3,3)=1，岛屿数+1=3。DFS 淹掉 (3,3) 和 (3,4)', highlights: [15], data: { nums: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]] } },
      { description: '全部扫描完毕，共有 3 个岛屿 ✓', highlights: [], data: { nums: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]] } },
    ],
    walkthrough: [
      { step: 1, variables: { pos: '(0,0)', islands: '1' }, explanation: '发现第一个岛屿，DFS 淹掉所有相连陆地' },
      { step: 2, variables: { pos: '(2,2)', islands: '2' }, explanation: '发现第二个孤立岛屿' },
      { step: 3, variables: { pos: '(3,3)', islands: '3' }, explanation: '发现第三个岛屿' },
      { step: 4, variables: { result: '3' }, explanation: '总共 3 个岛屿', isResult: true },
    ],
  },
  {
    id: 207,
    title: '课程表',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/course-schedule/',
    category: 'graph',
    visualizerType: 'array',
    input: 'numCourses = 2, prerequisites = [[1,0]]',
    output: 'true',
    code: {
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // 建图：每个节点指向它的后继课程
        vector<vector<int>> graph(numCourses);
        vector<int> indegree(numCourses, 0);  // 入度表

        for (auto& pre : prerequisites) {
            int course = pre[0], prereq = pre[1];
            graph[prereq].push_back(course);
            indegree[course]++;  // 这门课多了一个前置要求
        }

        // 把所有没有前置要求的课程入队（入度为 0）
        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (indegree[i] == 0) q.push(i);

        int visited = 0;  // 统计能上多少门课
        while (!q.empty()) {
            int cur = q.front(); q.pop();
            visited++;
            // 解锁后续课程
            for (int next : graph[cur])
                if (--indegree[next] == 0) q.push(next);
        }

        // 能上完所有课就返回 true
        return visited == numCourses;
    }
};`,
      rust: `impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        let n = num_courses as usize;
        // 邻接表 + 入度数组
        let mut graph = vec![vec![]; n];
        let mut indegree = vec![0; n];

        for pre in prerequisites {
            let (course, prereq) = (pre[0] as usize, pre[1] as usize);
            graph[prereq].push(course);
            indegree[course] += 1;
        }

        // 入度为 0 的课程入队——不需要前置，直接上
        let mut q: Vec<usize> = (0..n).filter(|&i| indegree[i] == 0).collect();
        let mut visited = 0;

        while let Some(cur) = q.pop() {
            visited += 1;
            for &next in &graph[cur] {
                indegree[next] -= 1;
                if indegree[next] == 0 {
                    q.push(next);
                }
            }
        }

        visited == n
    }
}`,
    },
    animationSteps: [
      { description: '2 门课程，前置关系：1→0（上 1 之前必须先上 0）', highlights: [], data: { nums: [2, 0] } },
      { description: '入度表：课程 0 入度=0，课程 1 入度=1。课程 0 入队', highlights: [0], data: { nums: [1, 0] } },
      { description: '上课程 0，visited=1。解锁课程 1，入度变 0，入队', highlights: [0], data: { nums: [1, 0] } },
      { description: '上课程 1，visited=2=n。所有课程都上完了', highlights: [1], data: { nums: [1, 0] } },
    ],
    walkthrough: [
      { step: 1, variables: { indegree: '[0, 1]', queue: '[0]' }, explanation: '课程 0 无前置，入队' },
      { step: 2, variables: { visited: '1', indegree: '[0, 0]' }, explanation: '上完课程 0，解锁课程 1' },
      { step: 3, variables: { visited: '2' }, explanation: '上完课程 1，所有课程完成' },
      { step: 4, variables: { result: 'true' }, explanation: '无环，可以修完所有课', isResult: true },
    ],
  },
  {
    id: 994,
    title: '腐烂的橘子',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/rotting-oranges/',
    category: 'graph',
    visualizerType: 'matrix',
    input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
    output: '4',
    code: {
      cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int,int>> q;
        int fresh = 0;  // 新鲜橘子计数器

        // 把所有烂橘子入队，顺便数数有几个好的
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
            }

        // 如果一开始就没有新鲜橘子，直接返回 0
        if (fresh == 0) return 0;

        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        int minutes = -1;  // 从 -1 开始，因为 BFS 第一层不算时间

        while (!q.empty()) {
            int sz = q.size();
            minutes++;
            for (int k = 0; k < sz; k++) {
                auto [i, j] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int ni = i + d[0], nj = j + d[1];
                    if (ni >= 0 && ni < m && nj >= 0 && nj < n
                        && grid[ni][nj] == 1) {
                        grid[ni][nj] = 2;  // 腐烂！
                        fresh--;
                        q.push({ni, nj});
                    }
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
};`,
      rust: `use std::collections::VecDeque;

impl Solution {
    pub fn oranges_rotting(mut grid: Vec<Vec<i32>>) -> i32 {
        let (m, n) = (grid.len(), grid[0].len());
        let mut q = VecDeque::new();
        let mut fresh = 0;

        for i in 0..m {
            for j in 0..n {
                match grid[i][j] {
                    2 => q.push_back((i, j)),
                    1 => fresh += 1,
                    _ => {}
                }
            }
        }

        if fresh == 0 { return 0; }

        let dirs = [(-1,0), (1,0), (0,-1), (0,1)];
        let mut minutes = -1;

        while let Some(sz) = Some(q.len()) {
            minutes += 1;
            for _ in 0..sz {
                let (i, j) = q.pop_front().unwrap();
                for &(di, dj) in &dirs {
                    let (ni, nj) = (i as i32 + di, j as i32 + dj);
                    if ni >= 0 && ni < m as i32 && nj >= 0 && nj < n as i32
                        && grid[ni as usize][nj as usize] == 1 {
                        grid[ni as usize][nj as usize] = 2;
                        fresh -= 1;
                        q.push_back((ni as usize, nj as usize));
                    }
                }
            }
        }

        if fresh == 0 { minutes } else { -1 }
    }
}`,
    },
    animationSteps: [
      { description: '初始状态：1 个烂橘子(0,0)，7 个新鲜橘子', highlights: [], data: { matrix: [[2,1,1],[1,1,0],[0,1,1]] } },
      { description: '第 1 分钟：烂橘子感染上下左右四个方向的新鲜橘子，腐烂 2 个', highlights: [0, 1, 3], data: { matrix: [[2,2,2],[2,2,0],[0,1,1]] } },
      { description: '第 2 分钟：新烂橘子继续扩散，又腐烂 1 个', highlights: [1, 4], data: { matrix: [[2,2,2],[2,2,0],[0,2,1]] } },
      { description: '第 3 分钟：继续扩散，腐烂 1 个', highlights: [5, 7], data: { matrix: [[2,2,2],[2,2,0],[0,2,2]] } },
      { description: '第 4 分钟：最后一个新鲜橘子被感染。需要 4 分钟', highlights: [8], data: { matrix: [[2,2,2],[2,2,0],[0,2,2]] } },
    ],
    walkthrough: [
      { step: 1, variables: { fresh: '7', minute: '0' }, explanation: '初始有 7 个新鲜橘子' },
      { step: 2, variables: { fresh: '5', minute: '1' }, explanation: '第一波感染 2 个橘子' },
      { step: 3, variables: { fresh: '4', minute: '2' }, explanation: '继续感染 1 个' },
      { step: 4, variables: { fresh: '2', minute: '3' }, explanation: '再感染 2 个' },
      { step: 5, variables: { fresh: '0', minute: '4' }, explanation: '全部腐烂，耗时 4 分钟', isResult: true },
    ],
  },
  {
    id: 417,
    title: '太平洋大西洋水流问题',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/pacific-atlantic-water-flow/',
    category: 'graph',
    visualizerType: 'matrix',
    input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
    output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        // 两张"可达"地图：true 表示能流到对应海洋
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));

        // 从四条边出发，逆流而上（只往高处走）
        for (int i = 0; i < m; i++) {
            dfs(heights, pac, i, 0);       // 太平洋：左边界
            dfs(heights, atl, i, n-1);     // 大西洋：右边界
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, pac, 0, j);       // 太平洋：上边界
            dfs(heights, atl, m-1, j);     // 大西洋：下边界
        }

        // 两张地图交集 = 既能流到太平洋又能流到大西洋
        vector<vector<int>> res;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (pac[i][j] && atl[i][j])
                    res.push_back({i, j});
        return res;
    }

    void dfs(vector<vector<int>>& h, vector<vector<bool>>& visited,
             int i, int j) {
        int m = h.size(), n = h[0].size();
        visited[i][j] = true;
        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n
                && !visited[ni][nj]
                && h[ni][nj] >= h[i][j])  // 逆流而上：只能往高处或平处走
                dfs(h, visited, ni, nj);
        }
    }
};`,
      rust: `impl Solution {
    pub fn pacific_atlantic(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let (m, n) = (heights.len(), heights[0].len());
        let mut pac = vec![vec![false; n]; m];
        let mut atl = vec![vec![false; n]; m];

        // 从四条海岸线开始 DFS
        for i in 0..m {
            Self::dfs(&heights, &mut pac, i, 0);
            Self::dfs(&heights, &mut atl, i, n-1);
        }
        for j in 0..n {
            Self::dfs(&heights, &mut pac, 0, j);
            Self::dfs(&heights, &mut atl, m-1, j);
        }

        let mut res = vec![];
        for i in 0..m {
            for j in 0..n {
                if pac[i][j] && atl[i][j] {
                    res.push(vec![i as i32, j as i32]);
                }
            }
        }
        res
    }

    fn dfs(h: &Vec<Vec<i32>>, visited: &mut Vec<Vec<bool>>, i: usize, j: usize) {
        let (m, n) = (h.len(), h[0].len());
        visited[i][j] = true;
        let dirs = [(-1,0), (1,0), (0,-1), (0,1)];
        for (di, dj) in dirs {
            let (ni, nj) = (i as i32 + di, j as i32 + dj);
            if ni >= 0 && ni < m as i32 && nj >= 0 && nj < n as i32 {
                let (ni, nj) = (ni as usize, nj as usize);
                if !visited[ni][nj] && h[ni][nj] >= h[i][j] {
                    Self::dfs(h, visited, ni, nj);
                }
            }
        }
    }
}`,
    },
    animationSteps: [
      { description: '5x5 高度矩阵。从太平洋（左上边界）和大西洋（右下边界）分别逆流 DFS', highlights: [], data: { matrix: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] } },
      { description: '太平洋 DFS 完成：标记所有能逆流到达太平洋的格子', highlights: [], data: { matrix: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] } },
      { description: '大西洋 DFS 完成：标记所有能逆流到达大西洋的格子', highlights: [], data: { matrix: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] } },
      { description: '取两个可达集合的交集：7 个格子能同时流向两大洋', highlights: [], data: { matrix: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] } },
    ],
    walkthrough: [
      { step: 1, variables: { 'Pacific reachable': '从左上边界开始' }, explanation: '逆流 DFS 标记太平洋可达格子' },
      { step: 2, variables: { 'Atlantic reachable': '从右下边界开始' }, explanation: '逆流 DFS 标记大西洋可达格子' },
      { step: 3, variables: { intersection: '7 个格子' }, explanation: '取交集得到结果' },
      { step: 4, variables: { result: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' }, explanation: '所有能同时流入两大洋的坐标', isResult: true },
    ],
  },
  {
    id: 133,
    title: '克隆图',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/clone-graph/',
    category: 'graph',
    visualizerType: 'array',
    input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
    output: '[[2,4],[1,3],[2,4],[1,3]]',
    code: {
      cpp: `class Solution {
public:
    // 哈希表：原节点 → 克隆节点
    unordered_map<Node*, Node*> visited;

    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;

        // 如果这个节点已经克隆过了，直接返回克隆体
        if (visited.count(node))
            return visited[node];

        // 创建克隆节点（先复制值，邻居稍后处理）
        Node* clone = new Node(node->val);
        visited[node] = clone;

        // 递归克隆所有邻居
        for (Node* neighbor : node->neighbors)
            clone->neighbors.push_back(cloneGraph(neighbor));

        return clone;
    }
};`,
      rust: `use std::collections::HashMap;

impl Solution {
    pub fn clone_graph(node: Option<Rc<RefCell<Node>>>) -> Option<Rc<RefCell<Node>>> {
        let mut visited = HashMap::new();
        Self::dfs(node, &mut visited)
    }

    fn dfs(
        node: Option<Rc<RefCell<Node>>>,
        visited: &mut HashMap<i32, Option<Rc<RefCell<Node>>>>,
    ) -> Option<Rc<RefCell<Node>>> {
        let n = node?;
        let val = n.borrow().val;

        // 检查是否已经克隆过
        if let Some(clone) = visited.get(&val) {
            return clone.clone();
        }

        // 创建新节点
        let clone = Rc::new(RefCell::new(Node::new(val)));
        visited.insert(val, Some(clone.clone()));

        // 递归克隆所有邻居
        for neighbor in &n.borrow().neighbors {
            let cloned = Self::dfs(neighbor.clone(), visited);
            clone.borrow_mut().neighbors.push(cloned);
        }

        Some(clone)
    }
}`,
    },
    animationSteps: [
      { description: '原图是一个无向连通图：1-2-3-4-1 形成环', highlights: [], data: { nums: [1, 2, 3, 4] } },
      { description: '从节点 1 开始 DFS 克隆。创建克隆节点 1\'', highlights: [0], data: { nums: [1, 2, 3, 4] } },
      { description: '递归到邻居 2：创建克隆节点 2\'，建立 1\'-2\' 连接', highlights: [1], data: { nums: [1, 2, 3, 4] } },
      { description: '继续递归：创建 3\'、4\'。visited 表防止重复克隆', highlights: [2, 3], data: { nums: [1, 2, 3, 4] } },
      { description: '克隆完成：新图结构与原图完全一致，邻居关系全部复制 ✓', highlights: [0, 1, 2, 3], data: { nums: [1, 2, 3, 4] } },
    ],
    walkthrough: [
      { step: 1, variables: { current: '1', clone: '1\'' }, explanation: '克隆节点 1，递归处理邻居' },
      { step: 2, variables: { current: '2', clone: '2\'' }, explanation: '克隆节点 2，连接 1\'-2\'' },
      { step: 3, variables: { current: '3', clone: '3\'' }, explanation: '克隆节点 3，连接 2\'-3\'' },
      { step: 4, variables: { current: '4', clone: '4\'' }, explanation: '克隆节点 4，连接 3\'-4\' 和 4\'-1\'' },
      { step: 5, variables: { result: '图克隆完成' }, explanation: '原图与克隆图结构完全一致', isResult: true },
    ],
  },
]
