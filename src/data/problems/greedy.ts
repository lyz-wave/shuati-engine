import { Problem } from '../types'

export const greedyProblems: Problem[] = [
  {
    id: 45,
    title: '跳跃游戏 II',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/jump-game-ii/',
    category: 'greedy',
    visualizerType: 'pointer',
    input: 'nums = [2, 3, 1, 1, 4]',
    output: '2 (跳到最后一个位置的最小跳跃次数)',
    code: {
      cpp: `class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return 0;

        int jumps = 0;        // 跳了几次
        int curEnd = 0;       // 当前这一步能跳到的最远位置
        int farthest = 0;     // 目前能到的最远位置

        for (int i = 0; i < n - 1; i++) {
            // 每走一步就更新一下最远能到哪
            farthest = max(farthest, i + nums[i]);

            // 走到了当前这一步的极限，必须再跳一次
            if (i == curEnd) {
                jumps++;
                curEnd = farthest;
            }
        }
        return jumps;
    }
};`,
      rust: `impl Solution {
    pub fn jump(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        if n == 1 { return 0; }

        let (mut jumps, mut cur_end, mut farthest) = (0, 0, 0);

        for i in 0..n-1 {
            farthest = std::cmp::max(farthest, i + nums[i] as usize);

            if i == cur_end {
                jumps += 1;
                cur_end = farthest;
            }
        }
        jumps
    }
}`,
    },
    animationSteps: [
      { description: '初始化 jumps=0, curEnd=0, farthest=0', highlights: [], data: { nums: [2, 3, 1, 1, 4], jumps: 0, curEnd: 0, farthest: 0 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=0: farthest=max(0,0+2)=2, i==curEnd(0)→跳一次，jumps=1, curEnd=2', highlights: [0], data: { nums: [2, 3, 1, 1, 4], jumps: 1, curEnd: 2, farthest: 2 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1: farthest=max(2,1+3)=4，还没到curEnd(2)，继续走', highlights: [1], data: { nums: [2, 3, 1, 1, 4], jumps: 1, curEnd: 2, farthest: 4 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'i=2: farthest=max(4,2+1)=4, i==curEnd(2)→必须再跳，jumps=2, curEnd=4', highlights: [2], data: { nums: [2, 3, 1, 1, 4], jumps: 2, curEnd: 4, farthest: 4 }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'curEnd=4 ≥ n-1，已经能到终点了！共跳2次 ✓', highlights: [0, 1], data: { nums: [2, 3, 1, 1, 4], jumps: 2, curEnd: 4, farthest: 4 }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', nums: '2', farthest: '2' }, explanation: '从i=0能跳到位置2，但先跳1次试探' },
      { step: 2, variables: { i: '1', nums: '3', farthest: '4' }, explanation: '在位置1看到最远能到4，但还没到上次的边界' },
      { step: 3, variables: { i: '2', jumps: '2', curEnd: '4' }, explanation: '到边界2了，必须再跳一次，现在最远到4' },
      { step: 4, variables: { result: '2' }, explanation: '最少2次跳到终点：位置0→1→4', isResult: true },
    ],
  },
  {
    id: 122,
    title: '买卖股票的最佳时机 II',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/',
    category: 'greedy',
    visualizerType: 'pointer',
    input: 'prices = [7, 1, 5, 3, 6, 4]',
    output: '7 (第2天买第3天卖 + 第4天买第5天卖)',
    code: {
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;

        // 贪心思路：只要有上涨就赚差价
        // 今天比昨天贵？那昨天买今天卖，落袋为安！
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i-1]) {
                profit += prices[i] - prices[i-1];
            }
        }
        return profit;
    }
};`,
      rust: `impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // 贪心：见好就收，只要有差价就赚
        prices.windows(2)
              .filter(|w| w[1] > w[0])
              .map(|w| w[1] - w[0])
              .sum()
    }
}`,
    },
    animationSteps: [
      { description: '初始化 profit=0，i=1开始，price[1]=1 < price[0]=7，不卖', highlights: [0, 1], data: { prices: [7, 1, 5, 3, 6, 4], profit: 0, buy: 1, sell: 5 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'i=2: 5>1 → 赚差价4，profit=4', highlights: [1, 2], data: { prices: [7, 1, 5, 3, 6, 4], profit: 4 }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'i=3: 3<5，不操作。i=4: 6>3 → 赚差价3，profit=4+3=7', highlights: [3, 4], data: { prices: [7, 1, 5, 3, 6, 4], profit: 7 }, pointers: [{ label: 'i', pos: 4 }] },
      { description: 'i=5: 4<6，不操作。遍历结束，总利润=7 ✓', highlights: [4, 5], data: { prices: [7, 1, 5, 3, 6, 4], profit: 7 }, pointers: [{ label: 'i', pos: 5 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '1~2', range: '1→5' }, explanation: '1买5卖，赚4' },
      { step: 2, variables: { i: '3~4', range: '3→6' }, explanation: '3买6卖，再赚3' },
      { step: 3, variables: { total: '7' }, explanation: '总利润4+3=7', isResult: true },
    ],
  },
  {
    id: 406,
    title: '根据身高重建队列',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/queue-reconstruction-by-height/',
    category: 'greedy',
    visualizerType: 'array',
    input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]',
    output: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        // 排序：身高从高到低，身高相同 k 小的在前
        sort(people.begin(), people.end(),
             [](auto& a, auto& b) {
                 return a[0] > b[0] || (a[0] == b[0] && a[1] < b[1]);
             });

        vector<vector<int>> result;
        // 高个子先排，矮个子插到 k 位置
        // 因为矮个子插队不影响高个子的 k 值
        for (auto& p : people) {
            result.insert(result.begin() + p[1], p);
        }
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn reconstruct_queue(people: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut people = people;
        // 身高降序，k 升序
        people.sort_by(|a, b| {
            if a[0] != b[0] { b[0].cmp(&a[0]) }
            else { a[1].cmp(&b[1]) }
        });

        let mut result = Vec::new();
        // 高个子先入场，矮个子按 k 值插队
        for p in people {
            result.insert(p[1] as usize, p);
        }
        result
    }
}`,
    },
    animationSteps: [
      { description: '排序后：[[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]', highlights: [], data: { sorted: [[7, 0], [7, 1], [6, 1], [5, 0], [5, 2], [4, 4]], result: [] }, pointers: [{ label: '', pos: 0 }] },
      { description: '插入 [7,0] → 位置0：[[7,0]]', highlights: [], data: { result: [[7, 0]] }, pointers: [] },
      { description: '插入 [7,1] → 位置1：[[7,0],[7,1]]', highlights: [], data: { result: [[7, 0], [7, 1]] }, pointers: [] },
      { description: '插入 [6,1] → 位置1：[[7,0],[6,1],[7,1]]', highlights: [], data: { result: [[7, 0], [6, 1], [7, 1]] }, pointers: [] },
      { description: '插入 [5,0] → 位置0：[[5,0],[7,0],[6,1],[7,1]]', highlights: [], data: { result: [[5, 0], [7, 0], [6, 1], [7, 1]] }, pointers: [] },
      { description: '插入 [5,2] → 位置2：[[5,0],[7,0],[5,2],[6,1],[7,1]]，插入 [4,4] → 位置4：完成 ✓', highlights: [], data: { result: [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]] }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { person: '[7,0]', pos: '0' }, explanation: '插入[7,0]' },
      { step: 2, variables: { person: '[7,1]', pos: '1' }, explanation: '插入[7,1]' },
      { step: 3, variables: { person: '[5,0]', pos: '0' }, explanation: '矮个子[5,0]插到位置0，不影响高个子k值' },
      { step: 4, variables: { result: '6人' }, explanation: '队列重建完成', isResult: true },
    ],
  },
  {
    id: 435,
    title: '无重叠区间',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/non-overlapping-intervals/',
    category: 'greedy',
    visualizerType: 'pointer',
    input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
    output: '1 (移除 [1,3])',
    code: {
      cpp: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;

        // 按右端点排序：越早结束的区间留给后面的空间越大
        sort(intervals.begin(), intervals.end(),
             [](auto& a, auto& b) { return a[1] < b[1]; });

        int count = 0;          // 需要移除的数量
        int end = intervals[0][1];  // 当前区间的结尾

        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < end) {
                count++;  // 重叠了，得移掉一个
            } else {
                end = intervals[i][1];  // 不重叠，更新结尾
            }
        }
        return count;
    }
};`,
      rust: `impl Solution {
    pub fn erase_overlap_intervals(mut intervals: Vec<Vec<i32>>) -> i32 {
        if intervals.is_empty() { return 0; }

        // 按右端点排序，贪心地选最早结束的
        intervals.sort_by_key(|x| x[1]);

        let mut count = 0;
        let mut end = intervals[0][1];

        for i in 1..intervals.len() {
            if intervals[i][0] < end {
                count += 1;
            } else {
                end = intervals[i][1];
            }
        }
        count
    }
}`,
    },
    animationSteps: [
      { description: '按右端点排序：[[1,2],[2,3],[1,3],[3,4]]，end=2', highlights: [], data: { intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], end: 2, count: 0 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1: [2,3] start=2 ≥ end=2 → 不重叠，更新 end=3', highlights: [1], data: { intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], end: 3, count: 0 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'i=2: [1,3] start=1 < end=3 → 重叠！count=1', highlights: [2], data: { intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], end: 3, count: 1 }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'i=3: [3,4] start=3 ≥ end=3 → 不重叠，end=4', highlights: [3], data: { intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], end: 4, count: 1 }, pointers: [{ label: 'i', pos: 3 }] },
      { description: '需要移除1个区间（[1,3]）使剩余区间互不重叠 ✓', highlights: [], data: { intervals: [[1, 2], [2, 3], [1, 3], [3, 4]], count: 1 }, pointers: [] },
    ],
    walkthrough: [
      { step: 1, variables: { sorted: '[[1,2],[2,3],[1,3],[3,4]]' }, explanation: '按右端点排序' },
      { step: 2, variables: { i: '1', interval: '[2,3]', overlap: 'false' }, explanation: '[2,3]不重叠于[1,2]' },
      { step: 3, variables: { i: '2', interval: '[1,3]', overlap: 'true' }, explanation: '[1,3]与[2,3]重叠，移除' },
      { step: 4, variables: { result: '1' }, explanation: '最少移除1个区间', isResult: true },
    ],
  },
  {
    id: 763,
    title: '划分字母区间',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/partition-labels/',
    category: 'greedy',
    visualizerType: 'pointer',
    input: 's = "ababcbacadefegdehijhklij"',
    output: '[9, 7, 8]',
    code: {
      cpp: `class Solution {
public:
    vector<int> partitionLabels(string s) {
        // 先扫一遍，记下每个字母最后出现的位置
        vector<int> lastPos(26, 0);
        for (int i = 0; i < s.size(); i++) {
            lastPos[s[i] - 'a'] = i;
        }

        vector<int> result;
        int start = 0, end = 0;

        for (int i = 0; i < s.size(); i++) {
            // 更新当前片段的右边界（当前字母最后出现的位置）
            end = max(end, lastPos[s[i] - 'a']);
            if (i == end) {
                // 走到边界了，说明当前片段可以切开了
                result.push_back(end - start + 1);
                start = i + 1;
            }
        }
        return result;
    }
};`,
      rust: `use std::collections::HashMap;

impl Solution {
    pub fn partition_labels(s: String) -> Vec<i32> {
        // 记录每个字母最后一次出现的位置
        let mut last = HashMap::new();
        for (i, c) in s.char_indices() {
            last.insert(c, i);
        }

        let mut result = vec![];
        let (mut start, mut end) = (0, 0);

        for (i, c) in s.char_indices() {
            end = end.max(*last.get(&c).unwrap());
            if i == end {
                result.push((end - start + 1) as i32);
                start = i + 1;
            }
        }
        result
    }
}`,
    },
    animationSteps: [
      { description: '先记录每个字母最后出现的位置：a→8, b→5, c→7, d→14, e→15, f→11, g→13, h→19, i→22, j→23, k→20, l→21', highlights: [], data: { s: ['a', 'b', 'a', 'b', 'c', 'b', 'a', 'c', 'a', 'd', 'e', 'f', 'e', 'g', 'd', 'e', 'h', 'i', 'j', 'h', 'k', 'l', 'i', 'j'], last: { a: 8, b: 5, c: 7, d: 14, e: 15, f: 11, g: 13, h: 19, i: 22, j: 23, k: 20, l: 21 } }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=0: a的最后位置是8，end=max(0,8)=8', highlights: [0], data: { s: ['a', 'b', 'a', 'b', 'c', 'b', 'a', 'c', 'a', 'd', 'e', 'f', 'e', 'g', 'd', 'e', 'h', 'i', 'j', 'h', 'k', 'l', 'i', 'j'], end: 8, start: 0 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1~8: 更新end。i=8时 i==end，切出第一段[0..8]长度9', highlights: [0, 1, 2, 3, 4, 5, 6, 7, 8], data: { s: ['a', 'b', 'a', 'b', 'c', 'b', 'a', 'c', 'a', 'd', 'e', 'f', 'e', 'g', 'd', 'e', 'h', 'i', 'j', 'h', 'k', 'l', 'i', 'j'], end: 8, partitions: [9] }, pointers: [{ label: 'i', pos: 8 }] },
      { description: 'i=9~15: 第二段，end更新到15，在i=15切出长度7', highlights: [9, 10, 11, 12, 13, 14, 15], data: { s: ['a', 'b', 'a', 'b', 'c', 'b', 'a', 'c', 'a', 'd', 'e', 'f', 'e', 'g', 'd', 'e', 'h', 'i', 'j', 'h', 'k', 'l', 'i', 'j'], partitions: [9, 7] }, pointers: [{ label: 'i', pos: 15 }] },
      { description: 'i=16~23: 第三段，end更新到23，在i=23切出长度8 ✓', highlights: [16, 17, 18, 19, 20, 21, 22, 23], data: { s: ['a', 'b', 'a', 'b', 'c', 'b', 'a', 'c', 'a', 'd', 'e', 'f', 'e', 'g', 'd', 'e', 'h', 'i', 'j', 'h', 'k', 'l', 'i', 'j'], partitions: [9, 7, 8] }, pointers: [{ label: 'i', pos: 23 }] },
    ],
    walkthrough: [
      { step: 1, variables: { range: 'a~i:', segment: 'ababcbaca' }, explanation: '字母a-c都在[0,8]内，切出9个字符' },
      { step: 2, variables: { range: 'd~e:', segment: 'defegde' }, explanation: '字母d-g都在[9,15]内，切出7个字符' },
      { step: 3, variables: { range: 'h~j:', segment: 'hijhklij' }, explanation: '字母h-l都在[16,23]内，切出8个字符' },
      { step: 4, variables: { result: '[9,7,8]' }, explanation: '字符串被分成3个字母不重叠的片段', isResult: true },
    ],
  },
]
