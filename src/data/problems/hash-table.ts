import { Problem } from '../types'

export const hashTableProblems: Problem[] = [
  // ============================================================
  // 49. 字母异位词分组
  // ============================================================
  {
    id: 49,
    title: '字母异位词分组',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/group-anagrams/',
    category: 'hash-table',
    visualizerType: 'array',
    input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
    output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // 哈希表：key = 排序后的字符串（指纹），value = 所有异位词
        // 就像给双胞胎按指纹分组——排序后的字符串就是"身份证号"
        unordered_map<string, vector<string>> mp;

        for (string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());  // 排序得到"指纹"
            mp[key].push_back(s);           // 对号入座，进组！
        }

        // 把哈希表里的所有分组一股脑倒出来
        vector<vector<string>> ans;
        for (auto& [k, v] : mp) {
            ans.push_back(v);
        }
        return ans;
    }
};`,
      rust: `use std::collections::HashMap;

impl Solution {
    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
        // 哈希表：排序后的字符串做"指纹"，同指纹 = 一家人
        // 就像用身份证号分组，简单粗暴！
        let mut map: HashMap<String, Vec<String>> = HashMap::new();

        for s in strs {
            let mut key: Vec<char> = s.chars().collect();
            key.sort();  // 排序一下，露出原形
            let key: String = key.into_iter().collect();
            map.entry(key).or_insert(Vec::new()).push(s);
        }

        map.into_values().collect()
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化空的哈希表。准备给每个字符串做"指纹识别"',
        highlights: [],
        data: { nums: [0, 0, 0, 0, 0, 0], strs: ['"eat"', '"tea"', '"tan"', '"ate"', '"nat"', '"bat"'], map: {} },
      },
      {
        description: '"eat" 排序 → "aet"，"tea" 排序 → "aet" → 指纹相同！归入同一组，组号 1',
        highlights: [0, 1],
        data: { nums: [1, 1, 0, 0, 0, 0], strs: ['"eat"', '"tea"', '"tan"', '"ate"', '"nat"', '"bat"'], map: { aet: 2 } },
      },
      {
        description: '"tan" 排序 → "ant" → 新指纹！新建组 2。"ate" 排序 → "aet" → 加入组 1',
        highlights: [2, 3],
        data: { nums: [1, 1, 2, 1, 0, 0], strs: ['"eat"', '"tea"', '"tan"', '"ate"', '"nat"', '"bat"'], map: { aet: 3, ant: 1 } },
      },
      {
        description: '"nat" 排序 → "ant" → 加入组 2。"bat" 排序 → "abt" → 全新指纹，新建组 3！',
        highlights: [4, 5],
        data: { nums: [1, 1, 2, 1, 2, 3], strs: ['"eat"', '"tea"', '"tan"', '"ate"', '"nat"', '"bat"'], map: { aet: 3, ant: 2, abt: 1 } },
      },
      {
        description: '提取哈希表的全部 value，得到三组异位词组 ✓',
        highlights: [],
        data: { nums: [1, 1, 2, 1, 2, 3], strs: ['"eat"', '"tea"', '"tan"', '"ate"', '"nat"', '"bat"'], result: [['"bat"'], ['"nat"', '"tan"'], ['"ate"', '"eat"', '"tea"']] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { word: '"eat"', key: '"aet"', group: '新建' }, explanation: 'eat 排序得 aet，哈希表中新建条目' },
      { step: 2, variables: { word: '"tea"', key: '"aet"', group: '加入 aet' }, explanation: 'tea 和 eat 指纹一样，同一组' },
      { step: 3, variables: { word: '"tan"', key: '"ant"', group: '新建' }, explanation: 'tan 的指纹是 ant，和 aet 不同，新建组' },
      { step: 4, variables: { word: '"bat"', key: '"abt"', group: '新建' }, explanation: 'bat 指纹 abt，全新分组' },
      { step: 5, variables: { result: '3 个分组共 6 个词' }, explanation: '返回所有异位词组', isResult: true },
    ],
  },

  // ============================================================
  // 128. 最长连续序列
  // ============================================================
  {
    id: 128,
    title: '最长连续序列',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/longest-consecutive-sequence/',
    category: 'hash-table',
    visualizerType: 'array',
    input: 'nums = [100, 4, 200, 1, 3, 2]',
    output: '4 (连续序列 [1, 2, 3, 4])',
    code: {
      cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // 先把所有数扔进集合，O(1) 查找超能力 get！
        // 就像把所有门牌号记在小本本上，翻看飞快
        unordered_set<int> s(nums.begin(), nums.end());
        int best = 0;

        for (int x : nums) {
            // 灵魂拷问：x - 1 在不在集合里？
            // 在的话 x 就不是序列的"龙头"，跳过
            if (!s.count(x - 1)) {
                int len = 1;
                // 从"龙头"开始往后数，看看能连续到几
                while (s.count(x + len)) len++;
                best = max(best, len);
            }
        }
        return best;
    }
};`,
      rust: `use std::collections::HashSet;

impl Solution {
    pub fn longest_consecutive(nums: Vec<i32>) -> i32 {
        // 数字全扔进 HashSet，查起来嗖嗖的
        // 就好比把所有门牌号记在脑子里
        let set: HashSet<i32> = nums.into_iter().collect();
        let mut best = 0;

        for &x in &set {
            // 如果 x - 1 不在集合里，说明 x 是连续序列的"龙头"
            // 只从龙头开始数，省时省力
            if !set.contains(&(x - 1)) {
                let mut len = 1;
                while set.contains(&(x + len)) {
                    len += 1;
                }
                best = best.max(len);
            }
        }
        best
    }
}`,
    },
    animationSteps: [
      {
        description: '将所有数字加入集合：{100, 4, 200, 1, 3, 2}。开始找"龙头"（连续序列的起点）',
        highlights: [],
        data: { nums: [100, 4, 200, 1, 3, 2], set: [100, 4, 200, 1, 3, 2], current: '-' },
      },
      {
        description: 'x = 100：99 不在集合中 → 是龙头！往后找 101 → 不在，序列长度 = 1',
        highlights: [0],
        data: { nums: [100, 4, 200, 1, 3, 2], set: [100, 4, 200, 1, 3, 2], current: '100', len: 1 },
      },
      {
        description: 'x = 4：3 就在集合中！4 不是龙头，跳过。x = 200：是龙头，但序列只有自己',
        highlights: [1, 2],
        data: { nums: [100, 4, 200, 1, 3, 2], set: [100, 4, 200, 1, 3, 2], current: '200', len: 1 },
      },
      {
        description: 'x = 1：0 不在集合中，是龙头！从 1 开始数：2→3→4→5（不在），长度 = 4！',
        highlights: [3, 4, 5],
        data: { nums: [100, 4, 200, 1, 3, 2], set: [100, 4, 200, 1, 3, 2], current: '1', len: 4 },
      },
      {
        description: '遍历结束，最长连续序列为 [1, 2, 3, 4]，长度为 4 ✓',
        highlights: [3, 4, 5],
        data: { nums: [100, 4, 200, 1, 3, 2], set: [100, 4, 200, 1, 3, 2], result: 4 },
      },
    ],
    walkthrough: [
      { step: 1, variables: { num: '100', isStart: '是', len: '1' }, explanation: '100 是起点，但 101 不在集合中' },
      { step: 2, variables: { num: '4', isStart: '否' }, explanation: '3 在集合中，4 不是龙头，跳过' },
      { step: 3, variables: { num: '200', isStart: '是', len: '1' }, explanation: '200 是起点，但 201 不在集合中' },
      { step: 4, variables: { num: '1', isStart: '是', len: '4' }, explanation: '从 1 数到 4，连续序列最长！' },
      { step: 5, variables: { result: '4' }, explanation: '最长连续序列 [1,2,3,4] 的长度为 4', isResult: true },
    ],
  },

  // ============================================================
  // 217. 存在重复元素
  // ============================================================
  {
    id: 217,
    title: '存在重复元素',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/contains-duplicate/',
    category: 'hash-table',
    visualizerType: 'array',
    input: 'nums = [1, 2, 3, 1]',
    output: 'true (数字 1 出现了两次)',
    code: {
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // 哈希集合 = 人肉记忆棒，见过的数字全都记下来
        // 如果又看到同一张"脸"，说明有重复！
        unordered_set<int> seen;

        for (int x : nums) {
            if (seen.count(x)) return true;  // 这张脸见过！重复了！
            seen.insert(x);                   // 新面孔，记录在案
        }
        return false;  // 全员新人，没有重复
    }
};`,
      rust: `use std::collections::HashSet;

impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        // HashSet 就像万能记忆卡，见过的数字永不忘记
        let mut seen = HashSet::new();

        for x in nums {
            if !seen.insert(x) {  // insert 返回 false 表示已存在
                return true;       // 抓到了！重复元素！
            }
        }
        false  // 全是新面孔，没有重复
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化空的哈希集合，开始扫描数组',
        highlights: [],
        data: { nums: [1, 2, 3, 1], set: '{}' },
      },
      {
        description: 'x = 1：不在集合中 → 加入。集合 = {1}',
        highlights: [0],
        data: { nums: [1, 2, 3, 1], set: '{1}' },
      },
      {
        description: 'x = 2、x = 3：都不在集合中 → 加入。集合 = {1, 2, 3}',
        highlights: [1, 2],
        data: { nums: [1, 2, 3, 1], set: '{1, 2, 3}' },
      },
      {
        description: 'x = 1：1 已经在集合中了 → 重复！返回 true',
        highlights: [3],
        data: { nums: [1, 2, 3, 1], set: '{1, 2, 3}', result: true },
      },
    ],
    walkthrough: [
      { step: 1, variables: { num: '1', set: '{1}' }, explanation: '1 是新人，记录在案' },
      { step: 2, variables: { num: '2, 3', set: '{1, 2, 3}' }, explanation: '2 和 3 也是新人' },
      { step: 3, variables: { num: '1', found: '重复!' }, explanation: '1 已经见过，有重复！', isResult: true },
    ],
  },

  // ============================================================
  // 242. 有效的字母异位词
  // ============================================================
  {
    id: 242,
    title: '有效的字母异位词',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/valid-anagram/',
    category: 'hash-table',
    visualizerType: 'array',
    input: 's = "anagram", t = "nagaram"',
    output: 'true',
    code: {
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        // 字母异位词 = 两碗面的配料完全一样，只是顺序不同
        // 用 26 格计数法：s 里的字母 +1，t 里的字母 -1
        if (s.size() != t.size()) return false;

        int cnt[26] = {0};
        for (int i = 0; i < s.size(); i++) {
            cnt[s[i] - 'a']++;  // s 贡献字母，加一
            cnt[t[i] - 'a']--;  // t 消耗字母，减一
        }

        // 如果最后全是 0，说明每种字母数量都匹配
        for (int x : cnt) {
            if (x != 0) return false;
        }
        return true;
    }
};`,
      rust: `impl Solution {
    pub fn is_anagram(s: String, t: String) -> bool {
        // 字母异位词：你一碗炸酱面，我一碗炸酱面，料一样只是码放顺序不同
        if s.len() != t.len() { return false; }

        // 26 个格子，每个字母一个计数器
        let mut cnt = vec![0; 26];

        // s 加一，t 减一，正负相抵
        for (a, b) in s.bytes().zip(t.bytes()) {
            cnt[(a - b'a') as usize] += 1;
            cnt[(b - b'a') as usize] -= 1;
        }

        // 全零就是异位词
        cnt.into_iter().all(|x| x == 0)
    }
}`,
    },
    animationSteps: [
      {
        description: '比较长度：s 长 7，t 长 7 → 长度匹配。初始化 26 格计数器全为 0',
        highlights: [],
        data: { nums: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s: '"anagram"', t: '"nagaram"' },
      },
      {
        description: '遍历字符：s 的字符 +1，t 的字符 -1。a(×3) → +3，n(×1) → +1 等，t 侧对称抵消',
        highlights: [0, 13, 6, 17, 12],
        data: { nums: [3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], s: '"anagram"', t: '"nagaram"', phase: 's 计数中' },
      },
      {
        description: '继续处理 t 的字符，从计数器中减掉：a→-3+3=0，n→-1+1=0，全部归零！',
        highlights: [0, 13, 6, 17, 12],
        data: { nums: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s: '"anagram"', t: '"nagaram"', phase: '全部归零' },
      },
      {
        description: '所有计数器都是 0 → 是有效的字母异位词！返回 true ✓',
        highlights: [],
        data: { nums: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], result: true },
      },
    ],
    walkthrough: [
      { step: 1, variables: { s: '"anagram"', t: '"nagaram"', len: '7 == 7' }, explanation: '长度相同，继续检查' },
      { step: 2, variables: { phase: 's 计数', cnt_a: '3', cnt_n: '1', cnt_g: '1' }, explanation: '统计 s 中每种字母出现次数' },
      { step: 3, variables: { phase: 't 抵消', result: '全部归零' }, explanation: 't 的字母恰好抵消 s 的计数' },
      { step: 4, variables: { result: 'true' }, explanation: 's 和 t 是字母异位词', isResult: true },
    ],
  },

  // ============================================================
  // 349. 两个数组的交集
  // ============================================================
  {
    id: 349,
    title: '两个数组的交集',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/intersection-of-two-arrays/',
    category: 'hash-table',
    visualizerType: 'array',
    input: 'nums1 = [1, 2, 2, 1], nums2 = [2, 2]',
    output: '[2]',
    code: {
      cpp: `class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        // 先用哈希集合存 nums1 的所有数字，去重 + 快速查找
        unordered_set<int> s(nums1.begin(), nums1.end());
        unordered_set<int> ans;

        // 遍历 nums2，看看哪个数字也在集合里
        for (int x : nums2) {
            if (s.count(x)) {
                ans.insert(x);  // 交集元素，收下！
            }
        }
        return vector<int>(ans.begin(), ans.end());
    }
};`,
      rust: `use std::collections::HashSet;

impl Solution {
    pub fn intersection(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        // HashSet 存 nums1 的数字，自动去重
        let set1: HashSet<i32> = nums1.into_iter().collect();
        let mut result = HashSet::new();

        // 看 nums2 里的数字谁在 set1 中出现过
        for x in nums2 {
            if set1.contains(&x) {
                result.insert(x);  // 抓到交集！
            }
        }

        result.into_iter().collect()
    }
}`,
    },
    animationSteps: [
      {
        description: '将 nums1 = [1, 2, 2, 1] 存入哈希集合，自动去重 → {1, 2}',
        highlights: [0, 1, 2, 3],
        data: { nums: [1, 2, 2, 1], set1: '{1, 2}', nums2: [2, 2] },
      },
      {
        description: '检查 nums2 中第一个数 2：2 在 set1 中！加入交集结果 {2}',
        highlights: [0],
        data: { nums: [1, 2, 2, 1], set1: '{1, 2}', nums2: [2, 2], result: [2], current: 2 },
      },
      {
        description: '检查 nums2 中第二个数 2：已在结果集中，跳过（不重复添加）',
        highlights: [1],
        data: { nums: [1, 2, 2, 1], set1: '{1, 2}', nums2: [2, 2], result: [2], current: 2 },
      },
      {
        description: '遍历结束，交集为 [2] ✓',
        highlights: [],
        data: { nums: [1, 2, 2, 1], set1: '{1, 2}', nums2: [2, 2], result: [2] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { set1: '{1, 2}' }, explanation: 'nums1 去重后得 {1, 2}' },
      { step: 2, variables: { check: '2', in_set1: '是', action: '加入交集' }, explanation: '2 在两个数组中都出现' },
      { step: 3, variables: { check: '2(again)', in_set1: '是', action: '已存在，跳过' }, explanation: '重复元素不重复添加' },
      { step: 4, variables: { result: '[2]' }, explanation: '交集只有一个元素 2', isResult: true },
    ],
  },

  // ============================================================
  // 387. 字符串中的第一个唯一字符
  // ============================================================
  {
    id: 387,
    title: '字符串中的第一个唯一字符',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/first-unique-character-in-a-string/',
    category: 'hash-table',
    visualizerType: 'array',
    input: 's = "leetcode"',
    output: '0 (下标 0 的字符 l 只出现一次)',
    code: {
      cpp: `class Solution {
public:
    int firstUniqChar(string s) {
        // 第一轮：统计每个字母出现的次数（词频统计）
        // 就像开演唱会前统计谁来了几次
        int cnt[26] = {0};
        for (char c : s) {
            cnt[c - 'a']++;
        }

        // 第二轮：从左到右找第一个只出现一次的字母
        // 谁只来了一次，谁就是天选之子！
        for (int i = 0; i < s.size(); i++) {
            if (cnt[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};`,
      rust: `impl Solution {
    pub fn first_uniq_char(s: String) -> i32 {
        // 第一趟：数人头，统计每个字母出现几次
        let mut cnt = vec![0; 26];
        for c in s.bytes() {
            cnt[(c - b'a') as usize] += 1;
        }

        // 第二趟：找第一个出现次数为 1 的字母
        for (i, c) in s.bytes().enumerate() {
            if cnt[(c - b'a') as usize] == 1 {
                return i as i32;  // 找到了！独一份！
            }
        }
        -1  // 全员重复，没有唯一字符
    }
}`,
    },
    animationSteps: [
      {
        description: '第一趟遍历 s = "leetcode"，统计每个字母出现的频率',
        highlights: [],
        data: { nums: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s: '"leetcode"' },
      },
      {
        description: '词频统计结果：l→1, e→3, t→1, c→1, o→1, d→1（其他字母为 0）',
        highlights: [11, 4, 19, 2, 14, 3],
        data: { nums: [0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], s: '"leetcode"', freq: 'l:1 e:3 t:1 c:1 o:1 d:1' },
      },
      {
        description: '第二趟从左到右检查：s[0] = l，频率为 1 → 就是它了！返回下标 0',
        highlights: [0],
        data: { nums: [0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], s: '"leetcode"', idx: 0, ch: 'l', freq: 1 },
      },
      {
        description: '结果为 0，字符串中第一个不重复的字符是 l ✓',
        highlights: [0],
        data: { nums: [0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], result: 0 },
      },
    ],
    walkthrough: [
      { step: 1, variables: { phase: '词频统计', s: '"leetcode"' }, explanation: '遍历字符串，统计每个字母出现次数' },
      { step: 2, variables: { l: '1', e: '3', t: '1', c: '1', o: '1', d: '1' }, explanation: 'l 只出现 1 次，e 出现了 3 次' },
      { step: 3, variables: { idx: '0', ch: 'l', freq: '1' }, explanation: 's[0]=l 只出现一次，是第一个唯一字符' },
      { step: 4, variables: { result: '0' }, explanation: '返回下标 0', isResult: true },
    ],
  },
]
