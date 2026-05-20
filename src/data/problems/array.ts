import { Problem } from '../types'

export const arrayProblems: Problem[] = [
  {
    id: 1,
    title: '两数之和',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/two-sum/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [2, 7, 11, 15], target = 9',
    output: '[0, 1] (因为 nums[0] + nums[1] = 2 + 7 = 9)',
    code: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 创建一个"备忘录"（哈希表），记录每个数字出现的位置
        // key = 数字, value = 下标
        unordered_map<int, int> mp;

        // 挨个检查数组里的每个数字
        for (int i = 0; i < nums.size(); i++) {
            // 算一下：我还差多少钱才能凑够 target？
            int complement = target - nums[i];

            // 翻翻备忘录：之前有没有见过这个差额？
            if (mp.count(complement)) {
                // 找到了！返回这两个数的下标
                return {mp[complement], i};
            }
            // 没见过？把当前数字记入备忘录，继续往后看
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
      rust: `use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // 建一个"通讯录"，记下每个数字的位置
        // key = 数字, value = 下标
        let mut map = HashMap::new();

        // 挨个翻通讯录
        for (i, &num) in nums.iter().enumerate() {
            // 缺多少才能凑够 target？
            let complement = target - num;

            // 通讯录里有没有这个人？
            if let Some(&j) = map.get(&complement) {
                // 有！就是他，返回下标
                return vec![j as i32, i as i32];
            }
            // 没有？把当前数字存进去，继续找
            map.insert(num, i);
        }
        vec![]
    }
}`,
    },
    animationSteps: [
      { description: '初始化空哈希表，准备遍历数组', highlights: [], data: { nums: [2, 7, 11, 15], map: {} } },
      { description: 'i=0: nums[0]=2，complement=7，7不在哈希表中，将2→0存入哈希表', highlights: [0], data: { nums: [2, 7, 11, 15], map: { '2': 0 } }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'i=1: nums[1]=7，complement=2，2在哈希表中！找到答案', highlights: [1], data: { nums: [2, 7, 11, 15], map: { '2': 0 } }, pointers: [{ label: 'i', pos: 1 }] },
      { description: '结果为 [0, 1]，nums[0] + nums[1] = 9 = target ✓', highlights: [0, 1], data: { nums: [2, 7, 11, 15], map: { '2': 0 } }, pointers: [{ label: 'i', pos: 1 }] },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', num: '2', complement: '7' }, explanation: '7 不在哈希表中，将 2→0 存入' },
      { step: 2, variables: { i: '1', num: '7', complement: '2' }, explanation: '2 在哈希表中！找到答案' },
      { step: 3, variables: { result: '[0, 1]' }, explanation: '2 + 7 = 9 == target', isResult: true },
    ],
  },
  {
    id: 53,
    title: '最大子数组和',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/maximum-subarray/',
    category: 'array',
    visualizerType: 'pointer',
    input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    output: '6 (子数组 [4, -1, 2, 1] 的和最大，为 6)',
    code: {
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // cur: 当前子数组的"积蓄"
        // best: 历史最大"积蓄"（先设成最小整数）
        int cur = 0, best = INT_MIN;

        for (int x : nums) {
            // 灵魂拷问：是"继承家业"还是"另起炉灶"？
            // 如果 x 比 cur + x 更大，说明前面都是拖累，不如从头开始
            cur = max(x, cur + x);
            // 更新历史最佳战绩
            best = max(best, cur);
        }
        return best;
    }
};`,
      rust: `impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        // cur: 当前子数组的"积蓄"
        // best: 历史最高"积蓄"（先设为最小整数）
        let mut cur = 0;
        let mut best = i32::MIN;

        for &x in &nums {
            // 灵魂拷问：加入当前小分队，还是自己单干？
            // 如果 x 更大，说明之前的积累是负资产，果断止损
            cur = std::cmp::max(x, cur + x);
            // 记下历史最高纪录
            best = std::cmp::max(best, cur);
        }
        best
    }
}`,
    },
    animationSteps: [
      { description: '初始化 cur = 0, best = -∞', highlights: [], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 0, best: 'MIN' } },
      { description: 'x=-2: cur = max(-2, 0-2) = -2, best = max(MIN, -2) = -2', highlights: [0], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: -2, best: -2 }, pointers: [{ label: 'i', pos: 0 }] },
      { description: 'x=1: cur = max(1, -2+1) = 1, best = max(-2, 1) = 1', highlights: [1], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 1, best: 1 }, pointers: [{ label: 'i', pos: 1 }] },
      { description: 'x=-3: cur = max(-3, 1-3) = -2, best = max(1, -2) = 1', highlights: [2], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: -2, best: 1 }, pointers: [{ label: 'i', pos: 2 }] },
      { description: 'x=4: cur = max(4, -2+4) = 4, best = max(1, 4) = 4', highlights: [3], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 4, best: 4 }, pointers: [{ label: 'i', pos: 3 }] },
      { description: 'x=-1: cur = max(-1, 4-1) = 3, best = max(4, 3) = 4', highlights: [4], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 3, best: 4 }, pointers: [{ label: 'i', pos: 4 }] },
      { description: 'x=2: cur = max(2, 3+2) = 5, best = max(4, 5) = 5', highlights: [5], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 5, best: 5 }, pointers: [{ label: 'i', pos: 5 }] },
      { description: 'x=1: cur = max(1, 5+1) = 6, best = max(5, 6) = 6', highlights: [6], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 6, best: 6 }, pointers: [{ label: 'i', pos: 6 }] },
      { description: 'x=-5: cur = max(-5, 6-5) = 1, best = max(6, 1) = 6', highlights: [7], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 1, best: 6 }, pointers: [{ label: 'i', pos: 7 }] },
      { description: 'x=4: cur = max(4, 1+4) = 5, best = max(6, 5) = 6 ✓', highlights: [8], data: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], cur: 5, best: 6 }, pointers: [{ label: 'i', pos: 8 }] },
    ],
    walkthrough: [
      { step: 1, variables: { x: '-2', cur: '-2', best: '-2' }, explanation: '开始新子数组 [-2]' },
      { step: 2, variables: { x: '1', cur: '1', best: '1' }, explanation: '舍弃 -2，从 1 开始新子数组' },
      { step: 3, variables: { x: '-3', cur: '-2', best: '1' }, explanation: '子数组 [1, -3] 和 = -2，不如单独 1' },
      { step: 4, variables: { x: '4', cur: '4', best: '4' }, explanation: '从 4 开始新子数组，best 更新为 4' },
      { step: 5, variables: { x: '-1', cur: '3', best: '4' }, explanation: '子数组 [4, -1] 和 = 3，best 不变' },
      { step: 6, variables: { x: '2', cur: '5', best: '5' }, explanation: '子数组 [4, -1, 2] 和 = 5，best 更新' },
      { step: 7, variables: { x: '1', cur: '6', best: '6' }, explanation: '子数组 [4, -1, 2, 1] 和 = 6，最大！' },
      { step: 8, variables: { x: '-5', cur: '1', best: '6' }, explanation: '遇到 -5 但最佳仍为 6' },
      { step: 9, variables: { x: '4', cur: '5', best: '6' }, explanation: '最终结果为 6', isResult: true },
    ],
  },

  // ============================================================
  // 15. 三数之和
  // ============================================================
  {
    id: 15,
    title: '三数之和',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/3sum/',
    category: 'array',
    visualizerType: 'pointer',
    input: 'nums = [-1, 0, 1, 2, -1, -4]',
    output: '[[-1, -1, 2], [-1, 0, 1]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // 排序 + 双指针：固定一个数 i，剩下用 left/right 夹击
        // 就像先定一个主角，再左右护法夹击找另外两个配角
        vector<vector<int>> ans;
        sort(nums.begin(), nums.end());
        int n = nums.size();

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // 跳过重复主角
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    ans.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return ans;
    }
};`,
      rust: `impl Solution {
    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {
        // 排序 + 双指针：固定 i，left/right 从两边夹击
        // 就像在靶场上——一个站桩，两个移动找目标
        let mut nums = nums;
        nums.sort();
        let n = nums.len();
        let mut ans = Vec::new();

        for i in 0..n {
            if i > 0 && nums[i] == nums[i - 1] { continue; }
            let (mut left, mut right) = (i + 1, n - 1);
            while left < right {
                let sum = nums[i] + nums[left] + nums[right];
                if sum == 0 {
                    ans.push(vec![nums[i], nums[left], nums[right]]);
                    while left < right && nums[left] == nums[left + 1] { left += 1; }
                    while left < right && nums[right] == nums[right - 1] { right -= 1; }
                    left += 1;
                    right -= 1;
                } else if sum < 0 {
                    left += 1;
                } else {
                    right -= 1;
                }
            }
        }
        ans
    }
}`,
    },
    animationSteps: [
      {
        description: '先排序：[-4, -1, -1, 0, 1, 2]。固定 i=0（-4），left=1（-1），right=5（2）',
        highlights: [0],
        data: { nums: [-4, -1, -1, 0, 1, 2], sum: '-' },
        pointers: [{ label: 'i', pos: 0 }, { label: 'L', pos: 1 }, { label: 'R', pos: 5 }],
      },
      {
        description: 'i=0(-4): -4+(-1)+2=-3 < 0 → left++。所有组合都 < 0，无解。i 移到 1',
        highlights: [0],
        data: { nums: [-4, -1, -1, 0, 1, 2], sum: -3 },
        pointers: [{ label: 'i', pos: 0 }, { label: 'L', pos: 2 }, { label: 'R', pos: 5 }],
      },
      {
        description: 'i=1(-1): -1+(-1)+2=0！找到第一组 [-1, -1, 2]！left→3, right→4',
        highlights: [1, 2, 5],
        data: { nums: [-4, -1, -1, 0, 1, 2], sum: 0 },
        pointers: [{ label: 'i', pos: 1 }, { label: 'L', pos: 2 }, { label: 'R', pos: 5 }],
      },
      {
        description: 'i=1: -1+0+1=0！找到第二组 [-1, 0, 1]！left>right，i 继续',
        highlights: [1, 3, 4],
        data: { nums: [-4, -1, -1, 0, 1, 2], sum: 0 },
        pointers: [{ label: 'i', pos: 1 }, { label: 'L', pos: 3 }, { label: 'R', pos: 4 }],
      },
      {
        description: '所有可能组合已检查，结果：[[-1,-1,2],[-1,0,1]] ✓',
        highlights: [],
        data: { nums: [-4, -1, -1, 0, 1, 2], result: [[-1, -1, 2], [-1, 0, 1]] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0(-4)', L: '1(-1)', R: '5(2)' }, explanation: 'i 固定为 -4，左右夹击' },
      { step: 2, variables: { sum: '< 0', action: '无解，i++' }, explanation: '-4 无法凑出 0，i 移到下一位' },
      { step: 3, variables: { sum: '0', found: '[-1,-1,2]' }, explanation: '-1 + (-1) + 2 = 0，找到一组！' },
      { step: 4, variables: { sum: '0', found: '[-1,0,1]' }, explanation: '-1 + 0 + 1 = 0，再找到一组！' },
      { step: 5, variables: { result: '[[-1,-1,2],[-1,0,1]]' }, explanation: '共两组三数之和为 0', isResult: true },
    ],
  },

  // ============================================================
  // 238. 除自身以外数组的乘积
  // ============================================================
  {
    id: 238,
    title: '除自身以外数组的乘积',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/product-of-array-except-self/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [1, 2, 3, 4]',
    output: '[24, 12, 8, 6]',
    code: {
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // 左一遍右一遍：前缀积 × 后缀积 = 答案
        // 就像一个人先从左到右记下"左边所有人的成绩"
        // 再从右到左乘上"右边所有人的成绩"
        int n = nums.size();
        vector<int> ans(n, 1);

        // 第一遍：从左往右，ans[i] = 左边所有数的乘积
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            ans[i] = prefix;       // 先记下左边的乘积
            prefix *= nums[i];     // 更新前缀积，给下一个用
        }

        // 第二遍：从右往左，乘上右边所有数的乘积
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] *= suffix;      // 左边的积 × 右边的积 = 最终答案
            suffix *= nums[i];     // 更新后缀积
        }
        return ans;
    }
};`,
      rust: `impl Solution {
    pub fn product_except_self(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut ans = vec![1; n];

        // 第一趟：从左向右累乘前缀
        let mut prefix = 1;
        for i in 0..n {
            ans[i] = prefix;
            prefix *= nums[i];
        }

        // 第二趟：从右向左乘上后缀
        let mut suffix = 1;
        for i in (0..n).rev() {
            ans[i] *= suffix;
            suffix *= nums[i];
        }
        ans
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化 ans = [1,1,1,1]，准备用前缀积和后缀积分别计算',
        highlights: [],
        data: { nums: [1, 2, 3, 4], ans: [1, 1, 1, 1], prefix: 1, suffix: 1 },
      },
      {
        description: '第一遍（前缀）：i=0: ans[0]=1, prefix=1×1=1; i=1: ans[1]=1, prefix=1×2=2; i=2: ans[2]=2, prefix=2×3=6; i=3: ans[3]=6, prefix=6×4=24',
        highlights: [0, 1, 2, 3],
        data: { nums: [1, 2, 3, 4], ans: [1, 1, 2, 6], prefix: 24, suffix: 1, phase: '前缀完成' },
      },
      {
        description: '第二遍（后缀）：i=3: ans[3]=6×suffix(1)=6, suffix=1×4=4; i=2: ans[2]=2×4=8, suffix=4×3=12; i=1: ans[1]=1×12=12, suffix=12×2=24; i=0: ans[0]=1×24=24',
        highlights: [3, 2, 1, 0],
        data: { nums: [1, 2, 3, 4], ans: [24, 12, 8, 6], prefix: 24, suffix: 24, phase: '后缀完成' },
      },
      {
        description: '最终结果：除自身以外的乘积 [24, 12, 8, 6] ✓',
        highlights: [],
        data: { nums: [1, 2, 3, 4], ans: [24, 12, 8, 6], result: [24, 12, 8, 6] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { phase: '前缀', ans: '[1,1,2,6]' }, explanation: '第一遍：ans[i] = nums[0]×...×nums[i-1]' },
      { step: 2, variables: { phase: '后缀', ans: '[24,12,8,6]' }, explanation: '第二遍：ans[i] ×= nums[i+1]×...×nums[n-1]' },
      { step: 3, variables: { result: '[24,12,8,6]' }, explanation: '每个位置 = 左边乘积 × 右边乘积', isResult: true },
    ],
  },

  // ============================================================
  // 41. 缺失的第一个正数
  // ============================================================
  {
    id: 41,
    title: '缺失的第一个正数',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/first-missing-positive/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [3, 4, -1, 1]',
    output: '2',
    code: {
      cpp: `class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        // 原地哈希：把数字 x 放到下标 x-1 的位置上
        // 就像让每个人坐到自己的编号座位上，坐错就换
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]); // 送它到该去的位置
            }
        }

        // 找第一个位子不对的人：下标 i 应该坐 i+1
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};`,
      rust: `impl Solution {
    pub fn first_missing_positive(nums: &mut Vec<i32>) -> i32 {
        let n = nums.len() as i32;
        // 原地交换大法：把每个正数送回它该在的位置（x 送到下标 x-1）
        // 就像整理书架，每本书摆回它的编号位置
        for i in 0..n as usize {
            while nums[i] > 0 && nums[i] <= n && nums[(nums[i] - 1) as usize] != nums[i] {
                let j = (nums[i] - 1) as usize;
                nums.swap(i, j);
            }
        }

        // 扫描：谁不在自己的编号座位上？
        for i in 0..n as usize {
            if nums[i] != i as i32 + 1 {
                return i as i32 + 1;
            }
        }
        n + 1
    }
}`,
    },
    animationSteps: [
      {
        description: 'nums = [3, 4, -1, 1]，n=4。开始让每个正数归位到自己的下标位置',
        highlights: [0],
        data: { nums: [3, 4, -1, 1], n: 4 },
      },
      {
        description: 'i=0: nums[0]=3 → 应放下标 2。swap(0,2): [ -1, 4, 3, 1 ]。nums[0]=-1 不是正数，跳过',
        highlights: [0, 2],
        data: { nums: [-1, 4, 3, 1], n: 4 },
      },
      {
        description: 'i=1: nums[1]=4 → 应放下标 3。swap(1,3): [ -1, 1, 3, 4 ]。nums[1]=1 → 应放下标 0。swap(1,0): [ 1, -1, 3, 4 ]',
        highlights: [1, 3, 0],
        data: { nums: [1, -1, 3, 4], n: 4 },
      },
      {
        description: 'i=2: nums[2]=3 已在正确位置。i=3: nums[3]=4 已在正确位置。归位完成！',
        highlights: [2, 3],
        data: { nums: [1, -1, 3, 4], n: 4 },
      },
      {
        description: '扫描检查：nums[0]=1✓, nums[1]=-1≠2 → 缺失的最小正数是 2！',
        highlights: [1],
        data: { nums: [1, -1, 3, 4], result: 2 },
      },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', x: '3', action: 'swap(0,2)' }, explanation: '3 应去下标 2，交换' },
      { step: 2, variables: { i: '1', x: '4', action: 'swap(1,3)' }, explanation: '4 应去下标 3，交换' },
      { step: 3, variables: { i: '1', x: '1', action: 'swap(1,0)' }, explanation: '1 应去下标 0，交换。现在 1 在正确位置了' },
      { step: 4, variables: { check: 'idx 1 → -1 ≠ 2' }, explanation: '下标 1 的值不是 2，2 就是缺失的第一个正数' },
      { step: 5, variables: { result: '2' }, explanation: '缺失的最小正数为 2', isResult: true },
    ],
  },

  // ============================================================
  // 31. 下一个排列
  // ============================================================
  {
    id: 31,
    title: '下一个排列',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/next-permutation/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [1, 2, 3]',
    output: '[1, 3, 2]',
    code: {
      cpp: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        // 第一步：从右往左找第一个下降元素（"峰顶"的左边）
        // 就像从后往前看，找到第一个"上坡"的起点
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        if (i >= 0) {
            // 第二步：从右往左找第一个比 nums[i] 大的数，交换
            int j = n - 1;
            while (j >= 0 && nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }

        // 第三步：把 i 后面的部分反转（降序变升序 = 最小的排列）
        reverse(nums.begin() + i + 1, nums.end());
    }
};`,
      rust: `impl Solution {
    pub fn next_permutation(nums: &mut Vec<i32>) {
        let n = nums.len();
        // 1. 从右向左找第一个下降点
        let mut i = n as i32 - 2;
        while i >= 0 && nums[i as usize] >= nums[i as usize + 1] {
            i -= 1;
        }

        if i >= 0 {
            // 2. 从右向左找第一个比 nums[i] 大的数
            let mut j = n as i32 - 1;
            while j >= 0 && nums[j as usize] <= nums[i as usize] {
                j -= 1;
            }
            nums.swap(i as usize, j as usize);
        }

        // 3. 把 i 之后的部分反转（降序变升序）
        nums[(i + 1) as usize..].reverse();
    }
}`,
    },
    animationSteps: [
      {
        description: 'nums = [1, 2, 3]，从右向左找第一个下降点',
        highlights: [1, 2],
        data: { nums: [1, 2, 3], phase: '找下降点' },
      },
      {
        description: '从右向左：nums[2]=3 > nums[1]=2 → 找到下降点 i=1（nums[1]=2）',
        highlights: [1],
        data: { nums: [1, 2, 3], i: 1, phase: '找到下降点' },
      },
      {
        description: '从右向左找第一个比 nums[1]=2 大的数：nums[2]=3 > 2 → j=2。交换 nums[1] 和 nums[2] → [1, 3, 2]',
        highlights: [1, 2],
        data: { nums: [1, 3, 2], i: 1, j: 2, phase: '交换' },
      },
      {
        description: '反转 i+1=2 到末尾（只有一个元素，无需操作）。下一个排列为 [1, 3, 2] ✓',
        highlights: [],
        data: { nums: [1, 3, 2], result: [1, 3, 2] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { 下降点: 'i=1(2)' }, explanation: '从右找到第一个下降点 i=1' },
      { step: 2, variables: { 交换: '2 ↔ 3' }, explanation: '从右找第一个比 2 大的数 3，交换' },
      { step: 3, variables: { 反转: 'i+1 到末尾' }, explanation: '反转 i 之后的降序部分为升序' },
      { step: 4, variables: { result: '[1,3,2]' }, explanation: '下一个排列为 [1,3,2]', isResult: true },
    ],
  },

  // ============================================================
  // 56. 合并区间
  // ============================================================
  {
    id: 56,
    title: '合并区间',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/merge-intervals/',
    category: 'array',
    visualizerType: 'array',
    input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
    output: '[[1,6],[8,10],[15,18]]',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // 先按左端点排序，像把线段按起点排好队
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> ans;

        for (auto& interval : intervals) {
            // 不重叠：直接加入结果集
            if (ans.empty() || interval[0] > ans.back()[1]) {
                ans.push_back(interval);
            } else {
                // 重叠了！合并右端点——取两个区间右端点的较大值
                ans.back()[1] = max(ans.back()[1], interval[1]);
            }
        }
        return ans;
    }
};`,
      rust: `impl Solution {
    pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut intervals = intervals;
        intervals.sort();  // 按左端点排序
        let mut ans: Vec<Vec<i32>> = Vec::new();

        for interval in intervals {
            if ans.is_empty() || interval[0] > ans.last().unwrap()[1] {
                // 不重叠，直接追加
                ans.push(interval);
            } else {
                // 重叠了！合并：右端点取较大值
                ans.last_mut().unwrap()[1] = ans.last().unwrap()[1].max(interval[1]);
            }
        }
        ans
    }
}`,
    },
    animationSteps: [
      {
        description: '按区间左端点排序：[ [1,3], [2,6], [8,10], [15,18] ]',
        highlights: [],
        data: { nums: [1, 3, 2, 6, 8, 10, 15, 18], phase: '已排序' },
      },
      {
        description: '处理 [1,3]：结果集为空 → 直接加入。ans = [[1,3]]',
        highlights: [0, 1],
        data: { nums: [1, 3, 2, 6, 8, 10, 15, 18], ans: [[1, 3]], interval: [1, 3] },
      },
      {
        description: '处理 [2,6]：[2,6].start=2 ≤ [1,3].end=3 → 重叠！合并：end = max(3,6) = 6。ans = [[1,6]]',
        highlights: [2, 3],
        data: { nums: [1, 3, 2, 6, 8, 10, 15, 18], ans: [[1, 6]], interval: [2, 6] },
      },
      {
        description: '处理 [8,10]：8 > 6 → 不重叠，直接加入。ans = [[1,6],[8,10]]',
        highlights: [4, 5],
        data: { nums: [1, 3, 2, 6, 8, 10, 15, 18], ans: [[1, 6], [8, 10]], interval: [8, 10] },
      },
      {
        description: '处理 [15,18]：15 > 10 → 不重叠，直接加入。最终：[[1,6],[8,10],[15,18]] ✓',
        highlights: [6, 7],
        data: { nums: [1, 3, 2, 6, 8, 10, 15, 18], result: [[1, 6], [8, 10], [15, 18]] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { interval: '[1,3]', action: '加入' }, explanation: '结果为空，直接加入 [1,3]' },
      { step: 2, variables: { interval: '[2,6]', action: '合并为 [1,6]' }, explanation: '[2,6] 与 [1,3] 重叠，合并右端' },
      { step: 3, variables: { interval: '[8,10]', action: '加入' }, explanation: '8 > 6，不重叠，直接加入' },
      { step: 4, variables: { interval: '[15,18]', action: '加入' }, explanation: '15 > 10，不重叠，直接加入' },
      { step: 5, variables: { result: '[[1,6],[8,10],[15,18]]' }, explanation: '合并后的不重叠区间', isResult: true },
    ],
  },

  // ============================================================
  // 283. 移动零
  // ============================================================
  {
    id: 283,
    title: '移动零',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/move-zeroes/',
    category: 'array',
    visualizerType: 'pointer',
    input: 'nums = [0, 1, 0, 3, 12]',
    output: '[1, 3, 12, 0, 0]',
    code: {
      cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // 快慢指针：慢指针指向"待填入"的位置
        // 快指针在前面探路，找到非零元素就丢给慢指针
        int slow = 0;
        for (int fast = 0; fast < nums.size(); fast++) {
            if (nums[fast] != 0) {
                swap(nums[slow], nums[fast]); // 把非零数换到前面
                slow++;  // 慢指针前移，等待下一个非零数
            }
            // 遇到 0 就跳过，fast 继续走
        }
        // 所有非零元素都在前面了，后面自然全是 0
    }
};`,
      rust: `impl Solution {
    pub fn move_zeroes(nums: &mut Vec<i32>) {
        // 双指针：一个在前面探路找非零，一个在后面接应
        // 就像搬砖——把非零的砖块一块块挪到前面
        let mut slow = 0;
        for fast in 0..nums.len() {
            if nums[fast] != 0 {
                nums.swap(slow, fast);  // 非零的换到前面来
                slow += 1;
            }
        }
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化 slow=0，fast 从头开始遍历',
        highlights: [0],
        data: { nums: [0, 1, 0, 3, 12] },
        pointers: [{ label: 'S', pos: 0 }, { label: 'F', pos: 0 }],
      },
      {
        description: 'fast=0: nums[0]=0 → 跳过。fast=1: nums[1]=1 ≠ 0 → swap(0,1) → [1,0,0,3,12]，slow→1',
        highlights: [1],
        data: { nums: [1, 0, 0, 3, 12] },
        pointers: [{ label: 'S', pos: 1 }, { label: 'F', pos: 1 }],
      },
      {
        description: 'fast=2: nums[2]=0 → 跳过。fast=3: nums[3]=3 ≠ 0 → swap(1,3) → [1,3,0,0,12]，slow→2',
        highlights: [3],
        data: { nums: [1, 3, 0, 0, 12] },
        pointers: [{ label: 'S', pos: 2 }, { label: 'F', pos: 3 }],
      },
      {
        description: 'fast=4: nums[4]=12 ≠ 0 → swap(2,4) → [1,3,12,0,0]，slow→3。遍历结束 ✓',
        highlights: [4],
        data: { nums: [1, 3, 12, 0, 0] },
        pointers: [{ label: 'S', pos: 3 }, { label: 'F', pos: 4 }],
      },
      {
        description: '最终结果：所有非零元素在前面 [1,3,12]，零在后面 [0,0] ✓',
        highlights: [],
        data: { nums: [1, 3, 12, 0, 0], result: [1, 3, 12, 0, 0] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { F: '1(1)', S: '0(0)', action: 'swap(0,1)' }, explanation: '发现非零数 1，和 slow 位置的 0 交换' },
      { step: 2, variables: { F: '3(3)', S: '1(0)', action: 'swap(1,3)' }, explanation: '发现非零数 3，和 slow 位置的 0 交换' },
      { step: 3, variables: { F: '4(12)', S: '2(0)', action: 'swap(2,4)' }, explanation: '发现非零数 12，和 slow 位置的 0 交换' },
      { step: 4, variables: { result: '[1,3,12,0,0]' }, explanation: '所有零移到了末尾', isResult: true },
    ],
  },

  // ============================================================
  // 169. 多数元素
  // ============================================================
  {
    id: 169,
    title: '多数元素',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/majority-element/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [2, 2, 1, 1, 1, 2, 2]',
    output: '2',
    code: {
      cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        // Boyer-Moore 投票算法：正负抵消
        // 想象一场选举，多数派最终会剩下来
        int candidate = 0, votes = 0;

        for (int x : nums) {
            if (votes == 0) {
                candidate = x;  // 当前无人领跑，换候选人
            }
            if (x == candidate) {
                votes++;   // 支持票 +1
            } else {
                votes--;   // 反对票 -1，被对手抵消了
            }
        }
        return candidate;  // 笑到最后的候选人一定是多数元素
    }
};`,
      rust: `impl Solution {
    pub fn majority_element(nums: Vec<i32>) -> i32 {
        // Boyer-Moore 投票：多数派最终会留下来
        // 就像两军对垒，人多的那方总会剩下人
        let mut candidate = 0;
        let mut votes = 0;

        for x in nums {
            if votes == 0 {
                candidate = x;
            }
            if x == candidate {
                votes += 1;
            } else {
                votes -= 1;
            }
        }
        candidate
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化 candidate=0，votes=0。开始遍历数组',
        highlights: [],
        data: { nums: [2, 2, 1, 1, 1, 2, 2], candidate: 0, votes: 0 },
      },
      {
        description: 'x=2: votes=0 → candidate=2。x==candidate → votes=1。x=2: votes=2',
        highlights: [0, 1],
        data: { nums: [2, 2, 1, 1, 1, 2, 2], candidate: 2, votes: 2 },
      },
      {
        description: 'x=1: x≠candidate → votes=1。x=1: votes=0。x=1: votes=0 → candidate=1, votes=1',
        highlights: [2, 3, 4],
        data: { nums: [2, 2, 1, 1, 1, 2, 2], candidate: 1, votes: 1 },
      },
      {
        description: 'x=2: x≠candidate → votes=0。x=2: votes=0 → candidate=2, votes=1',
        highlights: [5, 6],
        data: { nums: [2, 2, 1, 1, 1, 2, 2], candidate: 2, votes: 1 },
      },
      {
        description: '遍历结束，留下的 candidate = 2 就是多数元素 ✓',
        highlights: [],
        data: { nums: [2, 2, 1, 1, 1, 2, 2], result: 2 },
      },
    ],
    walkthrough: [
      { step: 1, variables: { candidate: '2', votes: '2' }, explanation: '两个 2 互相支持，votes=2' },
      { step: 2, variables: { candidate: '2→1', votes: '2→1→0' }, explanation: '连续三个 1 把票数抵消到 0，换候选人为 1' },
      { step: 3, variables: { candidate: '1→2', votes: '0→1' }, explanation: '两个 2 又让候选人变回 2，票数 1' },
      { step: 4, variables: { result: '2' }, explanation: '2 出现 4 次 > n/2，是多数元素', isResult: true },
    ],
  },

  // ============================================================
  // 189. 轮转数组
  // ============================================================
  {
    id: 189,
    title: '轮转数组',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/rotate-array/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [1, 2, 3, 4, 5, 6, 7], k = 3',
    output: '[5, 6, 7, 1, 2, 3, 4]',
    code: {
      cpp: `class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;  // 轮转 n 次等于没动，去掉无效轮转

        // 三步反转大法——就像翻书一样简单
        // 1. 全部反转：[1,2,3,4,5,6,7] → [7,6,5,4,3,2,1]
        reverse(nums.begin(), nums.end());
        // 2. 反转前 k 个：[7,6,5,4,3,2,1] → [5,6,7,4,3,2,1]
        reverse(nums.begin(), nums.begin() + k);
        // 3. 反转后面 n-k 个：[5,6,7,4,3,2,1] → [5,6,7,1,2,3,4]
        reverse(nums.begin() + k, nums.end());
    }
};`,
      rust: `impl Solution {
    pub fn rotate(nums: &mut Vec<i32>, k: i32) {
        let n = nums.len();
        let k = k as usize % n;  // 去掉无效轮转

        // 三步反转大法！像翻跟头一样干脆
        nums.reverse();              // 全部翻个面
        nums[..k].reverse();         // 前 k 个再翻回来
        nums[k..].reverse();         // 剩下的也翻回来
    }
}`,
    },
    animationSteps: [
      {
        description: '初始数组 [1,2,3,4,5,6,7]，k=3，n=7',
        highlights: [],
        data: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 },
      },
      {
        description: '第一步：整体反转 → [7,6,5,4,3,2,1]',
        highlights: [0, 1, 2, 3, 4, 5, 6],
        data: { nums: [7, 6, 5, 4, 3, 2, 1], phase: '全部反转' },
      },
      {
        description: '第二步：反转前 k=3 个元素 [7,6,5] → [5,6,7,4,3,2,1]',
        highlights: [0, 1, 2],
        data: { nums: [5, 6, 7, 4, 3, 2, 1], phase: '反转前 k 个' },
      },
      {
        description: '第三步：反转后 n-k=4 个元素 [4,3,2,1] → [5,6,7,1,2,3,4]',
        highlights: [3, 4, 5, 6],
        data: { nums: [5, 6, 7, 1, 2, 3, 4], phase: '反转后 n-k 个' },
      },
      {
        description: '最终结果：向右轮转 3 步 → [5,6,7,1,2,3,4] ✓',
        highlights: [],
        data: { nums: [5, 6, 7, 1, 2, 3, 4], result: [5, 6, 7, 1, 2, 3, 4] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { phase: '全部反转' }, explanation: '反转整个数组' },
      { step: 2, variables: { phase: '反转前 k 个' }, explanation: '反转前 3 个元素' },
      { step: 3, variables: { phase: '反转后 n-k 个' }, explanation: '反转后 4 个元素' },
      { step: 4, variables: { result: '[5,6,7,1,2,3,4]' }, explanation: '三步反转完成', isResult: true },
    ],
  },

  // ============================================================
  // 448. 找到所有数组中消失的数字
  // ============================================================
  {
    id: 448,
    title: '找到所有数组中消失的数字',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/',
    category: 'array',
    visualizerType: 'array',
    input: 'nums = [4, 3, 2, 7, 8, 2, 3, 1]',
    output: '[5, 6]',
    code: {
      cpp: `class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        // 原地标记法：出现过的数字就把对应下标位置标记为负数
        // 就像打卡签到——来过的人在自己的号码牌上画个叉
        for (int x : nums) {
            int idx = abs(x) - 1;  // 数字 x 应该在下标 x-1 的位置
            if (nums[idx] > 0) {
                nums[idx] = -nums[idx];  // 画叉标记：来过！
            }
        }

        // 找没被标记过的：值还是正数的下标就是没出现过的数字
        vector<int> ans;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > 0) {
                ans.push_back(i + 1);  // 下标 i 对应的数字是 i+1
            }
        }
        return ans;
    }
};`,
      rust: `impl Solution {
    pub fn find_disappeared_numbers(nums: &mut Vec<i32>) -> Vec<i32> {
        // 用负数做标记：出现过的数在其对应下标处留个负号
        // 就像电影院座位的"已占"标记
        for i in 0..nums.len() {
            let idx = nums[i].unsigned_abs() as usize - 1;
            if nums[idx] > 0 {
                nums[idx] = -nums[idx];  // 打卡标记！
            }
        }

        // 找仍为正数的位置——空座位就是消失的数字
        let mut ans = Vec::new();
        for i in 0..nums.len() {
            if nums[i] > 0 {
                ans.push((i + 1) as i32);
            }
        }
        ans
    }
}`,
    },
    animationSteps: [
      {
        description: 'nums = [4, 3, 2, 7, 8, 2, 3, 1]，开始标记出现过的数字',
        highlights: [],
        data: { nums: [4, 3, 2, 7, 8, 2, 3, 1], phase: '开始标记' },
      },
      {
        description: '4→idx=3, nums[3]=7→-7。3→idx=2, nums[2]=2→-2。2→idx=1, nums[1]=3→-3',
        highlights: [3, 2, 1],
        data: { nums: [4, -3, -2, -7, 8, 2, 3, 1], phase: '标记 4,3,2' },
      },
      {
        description: '7→idx=6, nums[6]=3→-3。8→idx=7, nums[7]=1→-1。剩下 2 和 3 已被标记，跳过',
        highlights: [6, 7],
        data: { nums: [4, -3, -2, -7, 8, 2, -3, -1], phase: '标记 7,8' },
      },
      {
        description: '最后处理 1→idx=0, nums[0]=4→-4。全部标记完成',
        highlights: [0],
        data: { nums: [-4, -3, -2, -7, 8, 2, -3, -1], phase: '标记 1' },
      },
      {
        description: '扫描找正数：nums[4]=8>0 → 5 消失！nums[5]=2>0 → 6 消失！结果为 [5,6] ✓',
        highlights: [4, 5],
        data: { nums: [-4, -3, -2, -7, 8, 2, -3, -1], result: [5, 6] },
      },
    ],
    walkthrough: [
      { step: 1, variables: { mark: '4,3,2,7,8,1' }, explanation: '6 个数字在对应下标做了标记' },
      { step: 2, variables: { mark: '2,3 重复' }, explanation: '2 和 3 重复出现，但已标记过，跳过' },
      { step: 3, variables: { check: 'idx 4 = 8 > 0' }, explanation: '下标 4 为正数，数字 5 未出现' },
      { step: 4, variables: { check: 'idx 5 = 2 > 0' }, explanation: '下标 5 为正数，数字 6 未出现' },
      { step: 5, variables: { result: '[5, 6]' }, explanation: '消失的数字为 5 和 6', isResult: true },
    ],
  },

  // ============================================================
  // 55. 跳跃游戏
  // ============================================================
  {
    id: 55,
    title: '跳跃游戏',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/jump-game/',
    category: 'array',
    visualizerType: 'pointer',
    input: 'nums = [2, 3, 1, 1, 4]',
    output: 'true (可以跳到最后一个下标)',
    code: {
      cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        // 贪心：记录当前能跳到的最远位置
        // 就像玩跳棋，每到一个新位置就看看最远能跳到哪
        int maxReach = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (i > maxReach) return false;    // 当前位置都到不了，凉了
            maxReach = max(maxReach, i + nums[i]); // 更新最远距离
            if (maxReach >= nums.size() - 1) return true; // 已经到终点了！
        }
        return true;
    }
};`,
      rust: `impl Solution {
    pub fn can_jump(nums: Vec<i32>) -> bool {
        // 贪心策略：每步都尽力跳最远，看终点是否可达
        // 就像青蛙过河，每次都看看最远能到哪片荷叶
        let mut max_reach = 0;
        let n = nums.len();

        for i in 0..n {
            if i > max_reach { return false; }
            max_reach = max_reach.max(i + nums[i] as usize);
            if max_reach >= n - 1 { return true; }
        }
        true
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化 maxReach=0，开始遍历',
        highlights: [0],
        data: { nums: [2, 3, 1, 1, 4], maxReach: 0 },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=0: 可达。maxReach = max(0, 0+2) = 2。现在能跳到下标 2',
        highlights: [0],
        data: { nums: [2, 3, 1, 1, 4], maxReach: 2 },
        pointers: [{ label: 'i', pos: 0 }],
      },
      {
        description: 'i=1: 1 ≤ 2，可达。maxReach = max(2, 1+3) = 4。直接能跳到终点了！',
        highlights: [1],
        data: { nums: [2, 3, 1, 1, 4], maxReach: 4 },
        pointers: [{ label: 'i', pos: 1 }],
      },
      {
        description: 'maxReach(4) ≥ n-1(4)，可以到达终点！返回 true ✓',
        highlights: [],
        data: { nums: [2, 3, 1, 1, 4], result: true },
      },
    ],
    walkthrough: [
      { step: 1, variables: { i: '0', nums_i: '2', maxReach: '2' }, explanation: '从下标 0 可跳到最远下标 2' },
      { step: 2, variables: { i: '1', nums_i: '3', maxReach: '4' }, explanation: '从下标 1 可跳到最远下标 4（终点！）' },
      { step: 3, variables: { result: 'true' }, explanation: '可以跳跃到最后一个下标', isResult: true },
    ],
  },
]
