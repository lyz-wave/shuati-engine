import { Problem } from '../types'

export const twoPointersProblems: Problem[] = [
  // ============================================================
  // 11. 盛最多水的容器
  // ============================================================
  {
    id: 11,
    title: '盛最多水的容器',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/container-with-most-water/',
    category: 'two-pointers',
    visualizerType: 'pointer',
    input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
    output: '49 (下标 1 和 8 组成 7×7=49 的容器)',
    code: {
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // 双指针从两边往中间走，像一个贪心的测量员
        // 每次移动较矮的那一边——矮板决定水量，换掉矮的才有可能变大
        int left = 0, right = height.size() - 1;
        int best = 0;

        while (left < right) {
            int h = min(height[left], height[right]); // 木桶原理：最短的板决定水位
            int w = right - left;                      // 底宽
            best = max(best, h * w);

            // 谁矮就移动谁，因为矮的已经是瓶颈了
            if (height[left] < height[right]) {
                left++;   // 左边太矮，往右挪挪试试
            } else {
                right--;  // 右边太矮，往左挪挪试试
            }
        }
        return best;
    }
};`,
      rust: `impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        // 双指针从两端向中间逼近，像两个相向而行的探险家
        // 每次移动较矮的一侧——短板决定容量上限
        let mut left = 0;
        let mut right = height.len() - 1;
        let mut best = 0;

        while left < right {
            let h = height[left].min(height[right]); // 木桶效应：取矮的
            let w = (right - left) as i32;             // 宽度
            best = best.max(h * w);

            // 谁矮就移动谁——去掉短板才有希望变大
            if height[left] < height[right] {
                left += 1;
            } else {
                right -= 1;
            }
        }
        best
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化双指针：left = 0（高度 1），right = 8（高度 7）',
        highlights: [0, 8],
        data: { nums: [1, 8, 6, 2, 5, 4, 8, 3, 7], area: '-' },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 8 }],
      },
      {
        description: '面积 = min(1,7) × 8 = 1×8 = 8。左边太矮（1 < 7），left++',
        highlights: [0, 8],
        data: { nums: [1, 8, 6, 2, 5, 4, 8, 3, 7], area: 8 },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 8 }],
      },
      {
        description: 'left=1（高8），right=8（高7）。面积 = min(8,7)×7 = 7×7 = 49！目前最大',
        highlights: [1, 8],
        data: { nums: [1, 8, 6, 2, 5, 4, 8, 3, 7], area: 49 },
        pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 8 }],
      },
      {
        description: '7 < 8，右边是短板，right--。继续移动，但面积都小于 49',
        highlights: [1, 7],
        data: { nums: [1, 8, 6, 2, 5, 4, 8, 3, 7], area: 49 },
        pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 7 }],
      },
      {
        description: '双指针相遇，结束。最大面积 = 49 ✓',
        highlights: [1, 8],
        data: { nums: [1, 8, 6, 2, 5, 4, 8, 3, 7], best: 49 },
        pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 8 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { left: '0(1)', right: '8(7)', area: '1×8=8' }, explanation: '左高 1，右高 7，宽 8，面积 8' },
      { step: 2, variables: { left: '1(8)', right: '8(7)', area: '7×7=49' }, explanation: '左高 8，右高 7，宽 7，面积 49！' },
      { step: 3, variables: { left: '1(8)', right: '7(3)', area: '3×6=18' }, explanation: '右移到 3，面积变小，best 仍是 49' },
      { step: 4, variables: { left: '1(8)', right: '6(8)', area: '8×5=40' }, explanation: '两边都是 8，面积 40 < 49' },
      { step: 5, variables: { result: '49' }, explanation: '最大面积为 49', isResult: true },
    ],
  },

  // ============================================================
  // 42. 接雨水
  // ============================================================
  {
    id: 42,
    title: '接雨水',
    difficulty: 'hard',
    leetcodeUrl: 'https://leetcode.cn/problems/trapping-rain-water/',
    category: 'two-pointers',
    visualizerType: 'pointer',
    input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
    output: '6',
    code: {
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        // 双指针从两端向中间走，同时记录左右两边的"最高海拔"
        // 就像两边各修一堵墙，矮的那边决定能存多少水
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int ans = 0;

        while (left < right) {
            // 哪边的墙矮，哪边就先计算——短板决定水位
            if (height[left] < height[right]) {
                // 如果当前高度 >= 左边最高，更新 leftMax
                // 否则说明这里有坑，能存 (leftMax - height[left]) 的水
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    ans += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    ans += rightMax - height[right];
                }
                right--;
            }
        }
        return ans;
    }
};`,
      rust: `impl Solution {
    pub fn trap(height: Vec<i32>) -> i32 {
        // 双指针记录左右最高墙，哪边矮就处理哪边
        // 就像在两道城墙之间算能存多少雨水
        let mut left = 0;
        let mut right = height.len() - 1;
        let mut left_max = 0;
        let mut right_max = 0;
        let mut ans = 0;

        while left < right {
            if height[left] < height[right] {
                // 左边是短板，看左边
                if height[left] >= left_max {
                    left_max = height[left];
                } else {
                    ans += left_max - height[left];
                }
                left += 1;
            } else {
                // 右边是短板，看右边
                if height[right] >= right_max {
                    right_max = height[right];
                } else {
                    ans += right_max - height[right];
                }
                right -= 1;
            }
        }
        ans
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化双指针 left=0(0)，right=11(1)。leftMax=0，rightMax=0，ans=0',
        highlights: [0, 11],
        data: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], leftMax: 0, rightMax: 0, water: 0 },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 11 }],
      },
      {
        description: '左高 0 < 右高 1，处理左边。0 >= leftMax(0) → leftMax=0，无积水。left→1',
        highlights: [0],
        data: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], leftMax: 0, rightMax: 0, water: 0 },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 11 }],
      },
      {
        description: 'left=1(1) < right=11(1)，处理左边。1 >= leftMax(0) → leftMax=1。left→2',
        highlights: [1],
        data: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], leftMax: 1, rightMax: 0, water: 0 },
        pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 11 }],
      },
      {
        description: 'left=2(0) < right=11(1)，处理左边。0 < leftMax(1) → 积水 = 1-0 = 1！ans=1。left→3',
        highlights: [2],
        data: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], leftMax: 1, rightMax: 0, water: 1 },
        pointers: [{ label: 'L', pos: 2 }, { label: 'R', pos: 11 }],
      },
      {
        description: '继续移动指针，累计积水...最终 ans = 6 ✓',
        highlights: [3, 4, 5, 6, 7],
        data: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], leftMax: 3, rightMax: 2, water: 6 },
        pointers: [{ label: 'L', pos: 7 }, { label: 'R', pos: 10 }],
      },
      {
        description: '双指针相遇，总接水量 = 6 ✓',
        highlights: [3, 7],
        data: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], result: 6 },
        pointers: [],
      },
    ],
    walkthrough: [
      { step: 1, variables: { L: '0(0)', R: '11(1)', leftMax: '0', rightMax: '0' }, explanation: '初始化，左右指针就位' },
      { step: 2, variables: { L: '2(0)', leftMax: '1' }, explanation: '左墙高 1，当前位置 0，积 1 格水' },
      { step: 3, variables: { L: '3(2)', leftMax: '2' }, explanation: '左墙更新为 2，无洼地' },
      { step: 4, variables: { L: '5(0)', leftMax: '2', water: '3' }, explanation: '左墙 2，当前 0，积 2 格水。累计 3' },
      { step: 5, variables: { L: '6(1)', leftMax: '2', water: '4' }, explanation: '又积 1 格，累计 4' },
      { step: 6, variables: { ans: '6' }, explanation: '总共接住 6 格雨水', isResult: true },
    ],
  },

  // ============================================================
  // 167. 两数之和 II - 输入有序数组
  // ============================================================
  {
    id: 167,
    title: '两数之和 II - 输入有序数组',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/',
    category: 'two-pointers',
    visualizerType: 'pointer',
    input: 'numbers = [2, 7, 11, 15], target = 9',
    output: '[1, 2] (下标从 1 开始)',
    code: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        // 数组已经排好序了！用双指针从两边往中间找
        // 就像猜数字：和太小了→左指针右移；太大了→右指针左移
        int left = 0, right = numbers.size() - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return {left + 1, right + 1};  // 题目要求下标从 1 开始
            } else if (sum < target) {
                left++;    // 和太小了，往大的方向走走
            } else {
                right--;   // 和太大了，往小的方向缩缩
            }
        }
        return {};
    }
};`,
      rust: `impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        // 有序数组→双指针，一左一右向中间靠拢
        // 像玩猜数字：和不够就左移，和超了就右移
        let mut left = 0;
        let mut right = numbers.len() - 1;

        while left < right {
            match (numbers[left] + numbers[right]).cmp(&target) {
                std::cmp::Ordering::Equal => return vec![left as i32 + 1, right as i32 + 1],
                std::cmp::Ordering::Less => left += 1,   // 和太小，左边的该往右挪了
                std::cmp::Ordering::Greater => right -= 1, // 和太大，右边的该往左挪了
            }
        }
        vec![]
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化双指针 left=0(2)，right=3(15)',
        highlights: [0, 3],
        data: { nums: [2, 7, 11, 15], target: 9, sum: '-' },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 3 }],
      },
      {
        description: '2 + 15 = 17 > 9，和太大了！右指针左移 → right=2',
        highlights: [0, 3],
        data: { nums: [2, 7, 11, 15], target: 9, sum: 17 },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 3 }],
      },
      {
        description: '2 + 11 = 13 > 9，还是太大。右指针继续左移 → right=1',
        highlights: [0, 2],
        data: { nums: [2, 7, 11, 15], target: 9, sum: 13 },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 2 }],
      },
      {
        description: '2 + 7 = 9 == target！找到了！返回 [1, 2]（下标从 1 开始）',
        highlights: [0, 1],
        data: { nums: [2, 7, 11, 15], target: 9, sum: 9 },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 1 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { L: '0(2)', R: '3(15)', sum: '17' }, explanation: '2+15=17 > 9，右移' },
      { step: 2, variables: { L: '0(2)', R: '2(11)', sum: '13' }, explanation: '2+11=13 > 9，再右移' },
      { step: 3, variables: { L: '0(2)', R: '1(7)', sum: '9' }, explanation: '2+7=9 == target！找到！' },
      { step: 4, variables: { result: '[1, 2]' }, explanation: '返回下标 [1, 2]（从 1 开始）', isResult: true },
    ],
  },

  // ============================================================
  // 344. 反转字符串
  // ============================================================
  {
    id: 344,
    title: '反转字符串',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/reverse-string/',
    category: 'two-pointers',
    visualizerType: 'pointer',
    input: 's = ["h","e","l","l","o"]',
    output: '["o","l","l","e","h"]',
    code: {
      cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // 双指针从两端向中间走，边走边交换
        // 就像左右两个人交换手里的东西，然后往中间走一步
        int left = 0, right = s.size() - 1;

        while (left < right) {
            swap(s[left], s[right]);  // 你手里给我，我手里给你
            left++;                    // 左边往中间走一步
            right--;                   // 右边往中间走一步
        }
    }
};`,
      rust: `impl Solution {
    pub fn reverse_string(s: &mut Vec<char>) {
        // 双指针左右夹击，互相交换，直到碰头
        // 就像左右手各拿一个字符，交换！然后向中间靠近
        let mut left = 0;
        let mut right = s.len() - 1;

        while left < right {
            s.swap(left, right);  // 命运交换！
            left += 1;
            right -= 1;
        }
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化双指针 left=0(h)，right=4(o)。准备交换',
        highlights: [0, 4],
        data: { nums: ['h', 'e', 'l', 'l', 'o'] },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 4 }],
      },
      {
        description: '交换 s[0] 和 s[4]：h ↔ o。数组变为 [o, e, l, l, h]',
        highlights: [0, 4],
        data: { nums: ['o', 'e', 'l', 'l', 'h'] },
        pointers: [{ label: 'L', pos: 0 }, { label: 'R', pos: 4 }],
      },
      {
        description: 'left→1(e)，right→3(l)。交换 s[1] 和 s[3]：e ↔ l',
        highlights: [1, 3],
        data: { nums: ['o', 'l', 'l', 'e', 'h'] },
        pointers: [{ label: 'L', pos: 1 }, { label: 'R', pos: 3 }],
      },
      {
        description: 'left→2，right→2。left >= right，停止。反转完成！',
        highlights: [2],
        data: { nums: ['o', 'l', 'l', 'e', 'h'] },
        pointers: [{ label: 'L', pos: 2 }, { label: 'R', pos: 2 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { L: '0(h)', R: '4(o)', action: '交换' }, explanation: 'h 和 o 交换位置' },
      { step: 2, variables: { L: '1(e)', R: '3(l)', action: '交换' }, explanation: 'e 和 l 交换位置' },
      { step: 3, variables: { L: '2', R: '2', action: '停止' }, explanation: '指针相遇，反转完成' },
      { step: 4, variables: { result: '[o,l,l,e,h]' }, explanation: '字符串已反转', isResult: true },
    ],
  },

  // ============================================================
  // 26. 删除有序数组中的重复项
  // ============================================================
  {
    id: 26,
    title: '删除有序数组中的重复项',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/remove-duplicates-from-sorted-array/',
    category: 'two-pointers',
    visualizerType: 'pointer',
    input: 'nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]',
    output: '5 (前 5 位为 [0, 1, 2, 3, 4])',
    code: {
      cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // 快慢双指针：快指针负责探路，慢指针负责记录"不重复"的位置
        // 就像一人在前面走马观花，一人在后面精挑细选
        if (nums.empty()) return 0;

        int slow = 0;  // slow 指向最后一个不重复元素的位置
        for (int fast = 1; fast < nums.size(); fast++) {
            // 发现新数字了！快指针把它带到慢指针面前
            if (nums[fast] != nums[slow]) {
                slow++;              // 慢指针前进一步
                nums[slow] = nums[fast];  // 把新数字搬过来
            }
            // 相同就继续往前走，啥也不做
        }
        return slow + 1;  // 长度 = 最后一个不重复的下标 + 1
    }
};`,
      rust: `impl Solution {
    pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {
        // 快慢指针：快指针探索新世界，慢指针建设根据地
        if nums.is_empty() { return 0; }

        let mut slow = 0;
        for fast in 1..nums.len() {
            if nums[fast] != nums[slow] {
                slow += 1;                      // 慢指针前进一步
                nums[slow] = nums[fast];         // 迎接新成员！
            }
        }
        (slow + 1) as i32
    }
}`,
    },
    animationSteps: [
      {
        description: '初始化 slow=0(0)，fast=1(0)。数组已有序，准备去重',
        highlights: [0, 1],
        data: { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] },
        pointers: [{ label: 'S', pos: 0 }, { label: 'F', pos: 1 }],
      },
      {
        description: 'fast=1: nums[1]=0 == nums[0]=0，相同→跳过。fast=2: nums[2]=1 ≠ nums[0]=0，新数字！',
        highlights: [2],
        data: { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] },
        pointers: [{ label: 'S', pos: 0 }, { label: 'F', pos: 2 }],
      },
      {
        description: 'slow→1，nums[1]=1。fast=3,4: 都是 1，跳过。fast=5: nums[5]=2 ≠ nums[1]=1！',
        highlights: [5],
        data: { nums: [0, 1, 1, 1, 1, 2, 2, 3, 3, 4] },
        pointers: [{ label: 'S', pos: 1 }, { label: 'F', pos: 5 }],
      },
      {
        description: 'slow→2，nums[2]=2。fast=6: nums[6]=2，跳过。fast=7: nums[7]=3 ≠ 2，新！',
        highlights: [7],
        data: { nums: [0, 1, 2, 1, 1, 2, 2, 3, 3, 4] },
        pointers: [{ label: 'S', pos: 2 }, { label: 'F', pos: 7 }],
      },
      {
        description: 'slow→3，nums[3]=3。fast=8: 跳过。fast=9: nums[9]=4 ≠ 3，新！slow→4，nums[4]=4',
        highlights: [9],
        data: { nums: [0, 1, 2, 3, 1, 2, 2, 3, 3, 4] },
        pointers: [{ label: 'S', pos: 3 }, { label: 'F', pos: 9 }],
      },
      {
        description: '遍历结束。前 5 个元素为 [0, 1, 2, 3, 4]，无重复！返回长度 5 ✓',
        highlights: [0, 1, 2, 3, 4],
        data: { nums: [0, 1, 2, 3, 4, 2, 2, 3, 3, 4], result: 5 },
        pointers: [{ label: 'S', pos: 4 }],
      },
    ],
    walkthrough: [
      { step: 1, variables: { S: '0(0)', F: '1(0)', action: '相同，跳过' }, explanation: '0 == 0，快指针继续走' },
      { step: 2, variables: { S: '0(0)', F: '2(1)', action: '不同，复制' }, explanation: '发现新数字 1，慢指针前移并复制' },
      { step: 3, variables: { S: '1(1)', F: '5(2)', action: '不同，复制' }, explanation: '发现新数字 2，慢指针前移并复制' },
      { step: 4, variables: { S: '2(2)', F: '7(3)', action: '不同，复制' }, explanation: '发现新数字 3，复制到 slow+1 位置' },
      { step: 5, variables: { S: '3(3)', F: '9(4)', action: '不同，复制' }, explanation: '发现新数字 4，复制到 slow+1 位置' },
      { step: 6, variables: { result: '5' }, explanation: '去重后数组长度为 5，前 5 位 [0,1,2,3,4]', isResult: true },
    ],
  },
]
