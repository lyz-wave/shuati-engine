import { Problem } from '../types'

export const slidingWindowProblems: Problem[] = [
  {
    id: 3,
    title: '无重复字符的最长子串',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/longest-substring-without-repeating-characters/',
    category: 'sliding-window',
    visualizerType: 'pointer',
    input: 's = "abcabcbb"',
    output: '3 ("abc")',
    code: {
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // lastPos：每个字符最近一次出现的位置（下标）
        // 就像每张照片的"最后拍摄时间"戳
        vector<int> lastPos(128, -1);
        int left = 0, maxLen = 0;

        for (int right = 0; right < s.size(); right++) {
            char c = s[right];
            // 如果这个字符在窗口内出现过，就把左边界挪到它后面
            // 相当于"删掉重复的，从下一个位置重新计算"
            if (lastPos[c] >= left) {
                left = lastPos[c] + 1;
            }
            // 更新这个字符的最新位置
            lastPos[c] = right;
            // 当前窗口长度 = right - left + 1，看看是不是最长
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
      rust: `impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        // last_pos：像"打卡记录"，记下每个字符最近一次出现的位置
        let mut last_pos = vec![-1; 128];
        let (mut left, mut max_len) = (0, 0);

        for (right, ch) in s.chars().enumerate() {
            let idx = ch as usize;
            // 如果这个字符在窗口内出现过，左边界跳到它后面
            if last_pos[idx] >= left as i32 {
                left = last_pos[idx] as usize + 1;
            }
            // 打卡：记录这个字符的最新位置
            last_pos[idx] = right as i32;
            // 窗口大小 = right - left + 1，更新最大值
            max_len = max_len.max(right - left + 1);
        }
        max_len as i32
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=0, maxLen=0, 字符位置数组全为 -1', highlights: [], data: { chars: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], left: 0, right: 0, maxLen: 0 } },
      { description: 'right=0: 遇到 a，没出现过，记录位置 0，窗口 [0,0]，maxLen=1', highlights: [0], data: { chars: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], left: 0, right: 0, maxLen: 1 }, pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 0 }] },
      { description: 'right=1~2: 遇到 b 和 c，都不重复，窗口扩大到 [0,2]，maxLen=3', highlights: [0, 1, 2], data: { chars: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], left: 0, right: 2, maxLen: 3 }, pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 2 }] },
      { description: 'right=3: 遇到 a，它在窗口内重复了！left 跳到 1，窗口变成 [1,3]', highlights: [1, 2, 3], data: { chars: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], left: 1, right: 3, maxLen: 3 }, pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 3 }] },
      { description: '继续遍历到末尾，不断调整窗口，但 maxLen 保持 3', highlights: [1, 2, 3, 4, 5, 6, 7], data: { chars: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], left: 5, right: 7, maxLen: 3 }, pointers: [{ label: 'L', pos: 5 }, { label: 'R', pos: 7 }] },
      { description: '结果为 3，最长无重复子串是 "abc"（或 "bca"/"cab"）', highlights: [0, 1, 2], data: { chars: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'], left: 0, right: 2, maxLen: 3 } },
    ],
    walkthrough: [
      { step: 1, variables: { right: '0', char: 'a', left: '0', window: '[0,0]', maxLen: '1' }, explanation: 'a 首次出现，加入窗口' },
      { step: 2, variables: { right: '2', char: 'c', left: '0', window: '[0,2]', maxLen: '3' }, explanation: '窗口扩大到 [0,2]，含 abc，maxLen=3' },
      { step: 3, variables: { right: '3', char: 'a', left: '1', window: '[1,3]', maxLen: '3' }, explanation: 'a 重复，左边界跳到 1，窗口变为 bca' },
      { step: 4, variables: { result: '3' }, explanation: '最长无重复子串长度为 3', isResult: true },
    ],
  },
  {
    id: 76,
    title: '最小覆盖子串',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/minimum-window-substring/',
    category: 'sliding-window',
    visualizerType: 'pointer',
    input: 's = "ADOBECODEBANC", t = "ABC"',
    output: '"BANC"',
    code: {
      cpp: `class Solution {
public:
    string minWindow(string s, string t) {
        // need：还缺什么字符，缺几个（正数=缺，负数=多给了）
        vector<int> need(128, 0);
        for (char c : t) need[c]++;

        int left = 0, start = 0, len = INT_MAX;
        int needCnt = t.size(); // 还差多少个字符没凑齐

        for (int right = 0; right < s.size(); right++) {
            char c = s[right];
            // 如果这个字符是 t 需要的，欠债减一
            if (need[c] > 0) needCnt--;
            need[c]--;

            // 欠债还清了？开始收缩左边界，找最短的
            if (needCnt == 0) {
                // 把左边多余的不需要字符踢出去
                while (need[s[left]] < 0) {
                    need[s[left]]++;
                    left++;
                }
                // 更新最短覆盖子串
                if (right - left + 1 < len) {
                    len = right - left + 1;
                    start = left;
                }
                // left 右移一位，继续找更短的
                need[s[left]]++;
                needCnt++;
                left++;
            }
        }
        return len == INT_MAX ? "" : s.substr(start, len);
    }
};`,
      rust: `use std::collections::HashMap;

impl Solution {
    pub fn min_window(s: String, t: String) -> String {
        // need：还缺什么字符，缺几次
        let mut need = HashMap::new();
        for ch in t.chars() {
            *need.entry(ch).or_insert(0) += 1;
        }

        let s_bytes: Vec<char> = s.chars().collect();
        let (mut left, mut start, mut len) = (0, 0, usize::MAX);
        let mut need_cnt = t.len();

        for (right, &ch) in s_bytes.iter().enumerate() {
            // 这个字符正好是需要的，欠债减一
            if let Some(count) = need.get_mut(&ch) {
                if *count > 0 { need_cnt -= 1; }
                *count -= 1;
            }

            // 凑齐了！开始收缩左边界
            if need_cnt == 0 {
                // 踢掉左边多余的字符
                while let Some(&count) = need.get(&s_bytes[left]) {
                    if count >= 0 { break; }
                    need.get_mut(&s_bytes[left]).map(|c| *c += 1);
                    left += 1;
                }
                // 更新最短覆盖子串
                if right - left + 1 < len {
                    len = right - left + 1;
                    start = left;
                }
                // left 右移，找下一个可能更短的
                if let Some(count) = need.get_mut(&s_bytes[left]) {
                    *count += 1;
                    if *count > 0 { need_cnt += 1; }
                }
                left += 1;
            }
        }

        if len == usize::MAX { "".to_string() } else { s_bytes[start..start + len].iter().collect() }
    }
}`,
    },
    animationSteps: [
      { description: '计算 need：t 中每个字符的需求量，A=1, B=1, C=1, 欠债 needCnt=3', highlights: [], data: { chars: ['A', 'D', 'O', 'B', 'E', 'C', 'O', 'D', 'E', 'B', 'A', 'N', 'C'], need: { A: 1, B: 1, C: 1 }, needCnt: 3, left: 0, right: 0 } },
      { description: 'right 不断右移扩张窗口，直到包含所有需要字符：right=5 时窗口 "ADOBEC" 凑齐了 ABC', highlights: [0, 1, 2, 3, 4, 5], data: { chars: ['A', 'D', 'O', 'B', 'E', 'C', 'O', 'D', 'E', 'B', 'A', 'N', 'C'], need: { A: 0, B: 0, C: 0 }, needCnt: 0, left: 0, right: 5 }, pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 5 }] },
      { description: '收缩 left：踢掉左边多余的 D/O，但 A 不能踢（刚好需要），窗口变为 "ADOBEC" 还是太长', highlights: [0, 1, 2, 3, 4, 5], data: { chars: ['A', 'D', 'O', 'B', 'E', 'C', 'O', 'D', 'E', 'B', 'A', 'N', 'C'], needCnt: 0, left: 0, right: 5 }, pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 5 }] },
      { description: '继续右移 right，遇到 B 和 A，又凑齐了，left 收缩到 9，得到 "BANC" 长度=4', highlights: [9, 10, 11, 12], data: { chars: ['A', 'D', 'O', 'B', 'E', 'C', 'O', 'D', 'E', 'B', 'A', 'N', 'C'], needCnt: 0, left: 9, right: 12 }, pointers: [{ label: 'L', pos: 9 }, { label: 'R', pos: 12 }] },
      { description: '遍历结束，"BANC" 是最短的覆盖子串', highlights: [9, 10, 11, 12], data: { chars: ['A', 'D', 'O', 'B', 'E', 'C', 'O', 'D', 'E', 'B', 'A', 'N', 'C'], left: 9, right: 12, len: 4 } },
    ],
    walkthrough: [
      { step: 1, variables: { left: '0', right: '5', window: '"ADOBEC"', needCnt: '0' }, explanation: '窗口扩张到 "ADOBEC" 凑齐了 A,B,C' },
      { step: 2, variables: { left: '0~3', right: '5', window: '"ADOBEC"', needCnt: '0' }, explanation: '尝试收缩 left，但 A 不能踢' },
      { step: 3, variables: { left: '9', right: '12', window: '"BANC"', needCnt: '0' }, explanation: '窗口变为 "BANC"，更短，长度 4' },
      { step: 4, variables: { result: '"BANC"' }, explanation: '最小覆盖子串为 BANC', isResult: true },
    ],
  },
  {
    id: 438,
    title: '找到字符串中所有字母异位词',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/find-all-anagrams-in-a-string/',
    category: 'sliding-window',
    visualizerType: 'pointer',
    input: 's = "cbaebabacd", p = "abc"',
    output: '[0, 6]',
    code: {
      cpp: `class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        // pCnt：p 中每个字符要出现几次（异位词就是字母种类和个数都一样）
        vector<int> pCnt(26, 0), winCnt(26, 0);
        for (char c : p) pCnt[c - 'a']++;

        vector<int> ans;
        int left = 0, right = 0, n = s.size(), k = p.size();

        while (right < n) {
            // 右边进一个字符
            winCnt[s[right] - 'a']++;
            // 窗口大小超过 k 了，左边缩一个
            if (right - left + 1 > k) {
                winCnt[s[left] - 'a']--;
                left++;
            }
            // 窗口大小正好等于 k，且字符计数一致 → 找到异位词
            if (right - left + 1 == k && winCnt == pCnt) {
                ans.push_back(left);
            }
            right++;
        }
        return ans;
    }
};`,
      rust: `impl Solution {
    pub fn find_anagrams(s: String, p: String) -> Vec<i32> {
        // p_cnt：p 的字母"配方"——每种字母要恰好出现几次
        let mut p_cnt = vec![0; 26];
        let mut win_cnt = vec![0; 26];
        for ch in p.chars() {
            p_cnt[(ch as u8 - b'a') as usize] += 1;
        }

        let s_bytes = s.as_bytes();
        let (k, n) = (p.len(), s.len());
        let mut ans = vec![];
        let (mut left, mut right) = (0, 0);

        while right < n {
            let r_idx = (s_bytes[right] - b'a') as usize;
            win_cnt[r_idx] += 1;

            // 窗口超过 p 的长度，左边吐一个字符
            if right - left + 1 > k {
                let l_idx = (s_bytes[left] - b'a') as usize;
                win_cnt[l_idx] -= 1;
                left += 1;
            }
            // 窗口大小 = k 且计数匹配 → 发现异位词
            if right - left + 1 == k && win_cnt == p_cnt {
                ans.push(left as i32);
            }
            right += 1;
        }
        ans
    }
}`,
    },
    animationSteps: [
      { description: '统计 p="abc" 的字符计数：a=1, b=1, c=1，固定窗口大小=3', highlights: [], data: { chars: ['c', 'b', 'a', 'e', 'b', 'a', 'b', 'a', 'c', 'd'], pCnt: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], winCnt: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], left: 0, right: 0 } },
      { description: 'right=2, 窗口 [0,2]="cba"：计数 [a=1,b=1,c=1] 完全匹配！记录起始下标 0', highlights: [0, 1, 2], data: { chars: ['c', 'b', 'a', 'e', 'b', 'a', 'b', 'a', 'c', 'd'], pCnt: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], winCnt: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], left: 0, right: 2 }, pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 2 }] },
      { description: 'right=3, 窗口 [1,3]="bae"：计数不匹配，继续滑动', highlights: [1, 2, 3], data: { chars: ['c', 'b', 'a', 'e', 'b', 'a', 'b', 'a', 'c', 'd'], pCnt: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], left: 1, right: 3 }, pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 3 }] },
      { description: 'right=8, 窗口 [6,8]="bac"：计数 [a=1,b=1,c=1] 匹配！记录下标 6', highlights: [6, 7, 8], data: { chars: ['c', 'b', 'a', 'e', 'b', 'a', 'b', 'a', 'c', 'd'], pCnt: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], winCnt: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], left: 6, right: 8 }, pointers: [{ label: 'L', pos: 6 }, { label: 'R', pos: 8 }] },
      { description: '遍历结束，找到异位词起始下标 [0, 6]', highlights: [0, 1, 2, 6, 7, 8], data: { chars: ['c', 'b', 'a', 'e', 'b', 'a', 'b', 'a', 'c', 'd'], left: 0, right: 8 } },
    ],
    walkthrough: [
      { step: 1, variables: { window: '[0,2]="cba"', winCnt: 'a=1,b=1,c=1' }, explanation: '字符计数与 p 完全一致，记录起始下标 0' },
      { step: 2, variables: { window: '[1,3]="bae"', winCnt: 'a=1,b=1,e=1' }, explanation: '有 e 没有 c，不匹配，继续滑动' },
      { step: 3, variables: { window: '[6,8]="bac"', winCnt: 'a=1,b=1,c=1' }, explanation: '字符计数匹配！记录起始下标 6' },
      { step: 4, variables: { result: '[0, 6]' }, explanation: '所有异位词起始位置', isResult: true },
    ],
  },
  {
    id: 209,
    title: '长度最小的子数组',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/minimum-size-subarray-sum/',
    category: 'sliding-window',
    visualizerType: 'pointer',
    input: 'target = 7, nums = [2, 3, 1, 2, 4, 3]',
    output: '2 (子数组 [4, 3])',
    code: {
      cpp: `class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        // left: 窗口左边界, sum: 当前窗口和, minLen: 最短长度
        // 窗口就像一条贪吃蛇，和不够 → 右边界吃进来，和超了 → 左边界吐出去
        int left = 0, sum = 0, minLen = INT_MAX;

        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right]; // 右边吃进来一个元素

            // 一旦窗口和 >= target，就尽量收缩左边界找最短的
            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left]; // 左边吐出去一个元素
                left++;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};`,
      rust: `impl Solution {
    pub fn min_sub_array_len(target: i32, nums: Vec<i32>) -> i32 {
        // left: 窗口左沿, sum: 窗口内元素和, min_len: 最短记录
        let (mut left, mut sum, mut min_len) = (0, 0, usize::MAX);

        for right in 0..nums.len() {
            sum += nums[right]; // 右边界伸出去，抓一个数进来

            // 和够大了？试试左边缩一缩，看能不能更短
            while sum >= target {
                min_len = min_len.min(right - left + 1);
                sum -= nums[left]; // 左边界缩回来，吐一个数出去
                left += 1;
            }
        }

        if min_len == usize::MAX { 0 } else { min_len as i32 }
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=0, sum=0, minLen=∞。目标 target=7', highlights: [], data: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 0, sum: 0, minLen: '∞' } },
      { description: 'right=3: sum=2+3+1+2=8 ≥ 7！窗口 [0,3] 长度 4，更新 minLen=4，收缩 left', highlights: [0, 1, 2, 3], data: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 0, sum: 8, minLen: 4 }, pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 3 }] },
      { description: 'left=1: sum=8-2=6 < 7，继续扩张 right=4: sum=6+4=10 ≥ 7，窗口 [1,4] 长度 4，left 继续收缩', highlights: [1, 2, 3, 4], data: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 1, sum: 10, minLen: 4 }, pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 4 }] },
      { description: 'left=2: sum=10-3=7 ≥ 7，窗口 [2,4] 长度 3，minLen=3。left=3: sum=7-1=6 < 7，继续扩张', highlights: [2, 3, 4], data: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 2, sum: 7, minLen: 3 }, pointers: [{ label: 'L', pos: 2 }, { label: 'R', pos: 4 }] },
      { description: 'right=5: sum=6+3=9 ≥ 7，窗口 [3,5] 长度 3，收缩 left=4: sum=9-4=5 < 7。窗口 [4,5] 长度 2，minLen=2！', highlights: [4, 5], data: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 4, sum: 9, minLen: 2 }, pointers: [{ label: 'L', pos: 4 }, { label: 'R', pos: 5 }] },
      { description: '遍历结束，最小长度 = 2（子数组 [4, 3]）', highlights: [4, 5], data: { nums: [2, 3, 1, 2, 4, 3], target: 7, left: 4, sum: 7, minLen: 2 } },
    ],
    walkthrough: [
      { step: 1, variables: { right: '3', window: '[0,3]', sum: '8', minLen: '4' }, explanation: 'sum=8≥7，窗口 [0,3] 长度 4' },
      { step: 2, variables: { left: '2', sum: '7', window: '[2,4]', minLen: '3' }, explanation: '收缩到 [2,4]=1+2+4=7，长度 3，更短了' },
      { step: 3, variables: { left: '4', sum: '9', window: '[4,5]', minLen: '2' }, explanation: '窗口 [4,5]=4+3=9≥7，长度 2，最短！' },
      { step: 4, variables: { result: '2' }, explanation: '最小子数组长度为 2，即 [4, 3]', isResult: true },
    ],
  },
]
