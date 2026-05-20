import { Problem } from '../types'

export const binarySearchProblems: Problem[] = [
  {
    id: 35,
    title: '搜索插入位置',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/search-insert-position/',
    category: 'binary-search',
    visualizerType: 'pointer',
    input: 'nums = [1, 3, 5, 6], target = 5',
    output: '2 (nums[2] = 5)',
    code: {
      cpp: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // left 和 right 就像两根手指，从数组两端向中间夹逼
        int left = 0, right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;      // 正中靶心
            if (nums[mid] < target) left = mid + 1;    // 猜小了，往右找
            else right = mid - 1;                       // 猜大了，往左找
        }
        // 没找到？left 就是该插入的位置（保持有序）
        return left;
    }
};`,
      rust: `impl Solution {
    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {
        // left 和 right 像两个探针，从两端往中间收
        let (mut left, mut right) = (0, nums.len() as i32 - 1);

        while left <= right {
            let mid = left + (right - left) / 2;
            if nums[mid as usize] == target { return mid; }
            if nums[mid as usize] < target { left = mid + 1; }
            else { right = mid - 1; }
        }
        left // 没找到时 left 就是插入点
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=0, right=3（数组长度-1）', highlights: [], data: { nums: [1, 3, 5, 6], target: 5, left: 0, right: 3 } },
      { description: 'mid=1: nums[1]=3 < target=5，说明目标在右边，left→2', highlights: [1], data: { nums: [1, 3, 5, 6], target: 5, left: 2, right: 3 }, pointers: [{ label: 'L', pos: 0 }, { label: 'M', pos: 1 }, { label: 'R', pos: 3 }] },
      { description: 'mid=2: nums[2]=5 == target=5，找到了！', highlights: [2], data: { nums: [1, 3, 5, 6], target: 5, left: 2, right: 3 }, pointers: [{ label: 'L', pos: 2 }, { label: 'M', pos: 2 }, { label: 'R', pos: 3 }] },
      { description: '返回下标 2，nums[2] = 5 = target ✓', highlights: [2], data: { nums: [1, 3, 5, 6], target: 5 } },
    ],
    walkthrough: [
      { step: 1, variables: { left: '0', right: '3', mid: '1', nums_mid: '3' }, explanation: '3 < 5，往右半区找' },
      { step: 2, variables: { left: '2', right: '3', mid: '2', nums_mid: '5' }, explanation: '5 == 5，找到了！' },
      { step: 3, variables: { result: '2' }, explanation: '目标 5 在下标 2', isResult: true },
    ],
  },
  {
    id: 69,
    title: 'x 的平方根',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/sqrtx/',
    category: 'binary-search',
    visualizerType: 'pointer',
    input: 'x = 8',
    output: '2 (sqrt(8) ≈ 2.828，取整数部分 2)',
    code: {
      cpp: `class Solution {
public:
    int mySqrt(int x) {
        // 在 0~x 之间猜 sqrt(x)，就像二分猜数字游戏
        // 猜大了(right 缩)，猜小了(left 扩)
        if (x == 0 || x == 1) return x;
        int left = 1, right = x;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            // 用 mid == x / mid 避免 mid*mid 溢出
            if (mid == x / mid) return mid;
            if (mid < x / mid) left = mid + 1;   // 猜小了
            else right = mid - 1;                 // 猜大了
        }
        return right; // right 就是整数平方根
    }
};`,
      rust: `impl Solution {
    pub fn my_sqrt(x: i32) -> i32 {
        // 在 1 到 x 之间二分猜 sqrt(x)
        if x == 0 || x == 1 { return x; }
        let (mut left, mut right) = (1, x);

        while left <= right {
            let mid = left + (right - left) / 2;
            if mid == x / mid { return mid; }
            if mid < x / mid { left = mid + 1; }
            else { right = mid - 1; }
        }
        right // 返回整数平方根
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=1, right=8，在 1~8 之间猜 sqrt(8)', highlights: [], data: { x: 8, left: 1, right: 8 } },
      { description: 'mid=4: 4*4=16 > 8，猜大了！right→3', highlights: [], data: { x: 8, left: 1, right: 3 }, pointers: [{ label: 'L', pos: 1 }, { label: 'M', pos: 4 }, { label: 'R', pos: 8 }] },
      { description: 'mid=2: 2*2=4 < 8，猜小了！left→3', highlights: [], data: { x: 8, left: 3, right: 3 }, pointers: [{ label: 'L', pos: 1 }, { label: 'M', pos: 2 }, { label: 'R', pos: 3 }] },
      { description: 'mid=3: 3*3=9 > 8，猜大了！right→2。left > right，循环结束。返回 right=2', highlights: [], data: { x: 8, left: 3, right: 2 }, pointers: [{ label: 'L', pos: 3 }, { label: 'M', pos: 3 }, { label: 'R', pos: 2 }] },
      { description: '结果：2（floor(sqrt(8)) = 2）', highlights: [], data: { x: 8, result: 2 } },
    ],
    walkthrough: [
      { step: 1, variables: { left: '1', right: '8', mid: '4', calc: '4*4=16' }, explanation: '16 > 8，猜大了，缩右边界' },
      { step: 2, variables: { left: '1', right: '3', mid: '2', calc: '2*2=4' }, explanation: '4 < 8，猜小了，扩左边界' },
      { step: 3, variables: { left: '3', right: '3', mid: '3', calc: '3*3=9' }, explanation: '9 > 8，猜大了，缩右边界' },
      { step: 4, variables: { result: '2' }, explanation: '退出循环，right=2 即整数平方根', isResult: true },
    ],
  },
  {
    id: 153,
    title: '寻找旋转排序数组中的最小值',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/',
    category: 'binary-search',
    visualizerType: 'pointer',
    input: 'nums = [3, 4, 5, 1, 2]',
    output: '1',
    code: {
      cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        // 旋转数组像一根断成两截的绳子，最小值就在"断点"处
        // 用二分法找断点
        int left = 0, right = nums.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;
            // 如果中间 > 右边 → 断点在右半段（最小值在 mid 右边）
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                // 否则断点在左半段（最小值在 mid 或 mid 左边）
                right = mid;
            }
        }
        return nums[left];
    }
};`,
      rust: `impl Solution {
    pub fn find_min(nums: Vec<i32>) -> i32 {
        // 旋转数组 = 两段有序序列拼在一起，最小值就在拼接处
        let (mut left, mut right) = (0, nums.len() - 1);

        while left < right {
            let mid = left + (right - left) / 2;
            // nums[mid] > nums[right] → 断点在右边
            if nums[mid] > nums[right] {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        nums[left]
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=0, right=4，数组 [3,4,5,1,2] 在索引 3 处旋转', highlights: [], data: { nums: [3, 4, 5, 1, 2], left: 0, right: 4 } },
      { description: 'mid=2: nums[2]=5 > nums[4]=2，说明断点在右半段，left→3', highlights: [2, 4], data: { nums: [3, 4, 5, 1, 2], left: 3, right: 4 }, pointers: [{ label: 'L', pos: 0 }, { label: 'M', pos: 2 }, { label: 'R', pos: 4 }] },
      { description: 'mid=3: nums[3]=1 < nums[4]=2，断点在左半段，right→3', highlights: [3, 4], data: { nums: [3, 4, 5, 1, 2], left: 3, right: 3 }, pointers: [{ label: 'L', pos: 3 }, { label: 'M', pos: 3 }, { label: 'R', pos: 4 }] },
      { description: 'left=right=3，循环结束，最小值 = nums[3] = 1', highlights: [3], data: { nums: [3, 4, 5, 1, 2], left: 3, right: 3 } },
    ],
    walkthrough: [
      { step: 1, variables: { left: '0', right: '4', mid: '2', nums_mid: '5', nums_right: '2' }, explanation: '5 > 2，断点在右半区，left→3' },
      { step: 2, variables: { left: '3', right: '4', mid: '3', nums_mid: '1', nums_right: '2' }, explanation: '1 < 2，断点在左半区，right→3' },
      { step: 3, variables: { left: '3', right: '3' }, explanation: 'left == right == 3，nums[3] = 1 为最小值', isResult: true },
    ],
  },
  {
    id: 162,
    title: '寻找峰值',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/find-peak-element/',
    category: 'binary-search',
    visualizerType: 'pointer',
    input: 'nums = [1, 2, 3, 1]',
    output: '2 (索引 2, nums[2] = 3 是峰值)',
    code: {
      cpp: `class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        // 爬山算法：哪边高就往哪边走，一定能到山顶
        int left = 0, right = nums.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;
            // 如果 mid 比右边矮 → 右边是上坡，峰值一定在右边
            if (nums[mid] < nums[mid + 1]) {
                left = mid + 1;
            } else {
                // 否则左边（含 mid）有峰值
                right = mid;
            }
        }
        return left;
    }
};`,
      rust: `impl Solution {
    pub fn find_peak_element(nums: Vec<i32>) -> i32 {
        // 爬山：看 mid 和 mid+1 谁高，往高的方向走
        let (mut left, mut right) = (0, nums.len() - 1);

        while left < right {
            let mid = left + (right - left) / 2;
            if nums[mid] < nums[mid + 1] {
                left = mid + 1; // 右边高，往右爬
            } else {
                right = mid;    // 左边高，往左爬
            }
        }
        left as i32
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=0, right=3，数组 [1,2,3,1]', highlights: [], data: { nums: [1, 2, 3, 1], left: 0, right: 3 } },
      { description: 'mid=1: nums[1]=2 < nums[2]=3 → 右边高！往右半区找峰值', highlights: [1, 2], data: { nums: [1, 2, 3, 1], left: 2, right: 3 }, pointers: [{ label: 'L', pos: 0 }, { label: 'M', pos: 1 }, { label: 'R', pos: 3 }] },
      { description: 'mid=2: nums[2]=3 > nums[3]=1 → 左边（含 mid）有峰值', highlights: [2, 3], data: { nums: [1, 2, 3, 1], left: 2, right: 2 }, pointers: [{ label: 'L', pos: 2 }, { label: 'M', pos: 2 }, { label: 'R', pos: 3 }] },
      { description: 'left=right=2，循环结束，索引 2 即峰值位置，nums[2]=3', highlights: [2], data: { nums: [1, 2, 3, 1], left: 2, right: 2 } },
    ],
    walkthrough: [
      { step: 1, variables: { left: '0', right: '3', mid: '1', nums_mid: '2', nums_next: '3' }, explanation: '2 < 3，右边高，往右找' },
      { step: 2, variables: { left: '2', right: '3', mid: '2', nums_mid: '3', nums_next: '1' }, explanation: '3 > 1，左边有峰值' },
      { step: 3, variables: { result: '2' }, explanation: '峰值在索引 2，值为 3', isResult: true },
    ],
  },
  {
    id: 278,
    title: '第一个错误的版本',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/first-bad-version/',
    category: 'binary-search',
    visualizerType: 'pointer',
    input: 'n = 5, bad = 4',
    output: '4 (版本 4 是第一个错误版本)',
    code: {
      cpp: `class Solution {
public:
    int firstBadVersion(int n) {
        // 二分查找第一个坏版本
        // 好版本 → 坏版本 的分界线就是答案
        int left = 1, right = n;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid)) {
                right = mid;    // mid 是坏的，说明第一个坏版本在左边或就是 mid
            } else {
                left = mid + 1; // mid 是好的，第一个坏版本在右边
            }
        }
        return left;
    }
};`,
      rust: `impl Solution {
    pub fn first_bad_version(&self, n: i32) -> i32 {
        // 二分找第一个坏版本 = 找到好→坏的分界线
        let (mut left, mut right) = (1, n);

        while left < right {
            let mid = left + (right - left) / 2;
            if self.isBadVersion(mid) {
                right = mid;    // mid 是坏的，往前找
            } else {
                left = mid + 1; // mid 是好的，往后找
            }
        }
        left
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=1, right=5。版本状态: [好,好,好,坏,坏]', highlights: [], data: { n: 5, bad: 4, left: 1, right: 5, versions: ['好', '好', '好', '坏', '坏'] } },
      { description: 'mid=3: isBadVersion(3)=false（好的），第一个坏版本在右边，left→4', highlights: [2], data: { n: 5, bad: 4, left: 4, right: 5, versions: ['好', '好', '好', '坏', '坏'] }, pointers: [{ label: 'L', pos: 1 }, { label: 'M', pos: 3 }, { label: 'R', pos: 5 }] },
      { description: 'mid=4: isBadVersion(4)=true（坏的），可能第一个坏版本在左边，right→4', highlights: [3], data: { n: 5, bad: 4, left: 4, right: 4, versions: ['好', '好', '好', '坏', '坏'] }, pointers: [{ label: 'L', pos: 4 }, { label: 'M', pos: 4 }, { label: 'R', pos: 5 }] },
      { description: 'left=right=4，版本 4 是第一个坏版本', highlights: [3], data: { n: 5, bad: 4, left: 4, right: 4, versions: ['好', '好', '好', '坏', '坏'] } },
    ],
    walkthrough: [
      { step: 1, variables: { left: '1', right: '5', mid: '3', isBad: 'false' }, explanation: '版本 3 是好版本，坏版本在后面' },
      { step: 2, variables: { left: '4', right: '5', mid: '4', isBad: 'true' }, explanation: '版本 4 是坏版本，但前面可能还有更早的' },
      { step: 3, variables: { left: '4', right: '4' }, explanation: 'left=right=4，确定版本 4 是第一个坏版本', isResult: true },
    ],
  },
  {
    id: 704,
    title: '二分查找',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/binary-search/',
    category: 'binary-search',
    visualizerType: 'pointer',
    input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
    output: '4 (nums[4] = 9)',
    code: {
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 最纯正的二分查找：每次砍掉一半不可能的范围
        int left = 0, right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;  // 小了，往大找
            else right = mid - 1;                      // 大了，往小找
        }
        return -1;
    }
};`,
      rust: `impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        // 经典二分，每次排除一半
        let (mut left, mut right) = (0, nums.len() as i32 - 1);

        while left <= right {
            let mid = left + (right - left) / 2;
            if nums[mid as usize] == target { return mid; }
            if nums[mid as usize] < target { left = mid + 1; }
            else { right = mid - 1; }
        }
        -1
    }
}`,
    },
    animationSteps: [
      { description: '初始化 left=0, right=5，目标 target=9', highlights: [], data: { nums: [-1, 0, 3, 5, 9, 12], target: 9, left: 0, right: 5 } },
      { description: 'mid=2: nums[2]=3 < 9，目标在右边，left→3', highlights: [2], data: { nums: [-1, 0, 3, 5, 9, 12], target: 9, left: 3, right: 5 }, pointers: [{ label: 'L', pos: 0 }, { label: 'M', pos: 2 }, { label: 'R', pos: 5 }] },
      { description: 'mid=4: nums[4]=9 == target！找到了', highlights: [4], data: { nums: [-1, 0, 3, 5, 9, 12], target: 9, left: 3, right: 5 }, pointers: [{ label: 'L', pos: 3 }, { label: 'M', pos: 4 }, { label: 'R', pos: 5 }] },
      { description: '返回下标 4，nums[4] = 9 = target ✓', highlights: [4], data: { nums: [-1, 0, 3, 5, 9, 12], target: 9 } },
    ],
    walkthrough: [
      { step: 1, variables: { left: '0', right: '5', mid: '2', nums_mid: '3' }, explanation: '3 < 9，往右半区找' },
      { step: 2, variables: { left: '3', right: '5', mid: '4', nums_mid: '9' }, explanation: '9 == 9，找到了！' },
      { step: 3, variables: { result: '4' }, explanation: '目标 9 在下标 4', isResult: true },
    ],
  },
]
