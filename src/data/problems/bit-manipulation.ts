import { Problem } from '../types'

export const bitManipulationProblems: Problem[] = [
  {
    id: 136,
    title: '只出现一次的数字',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/single-number/',
    category: 'bit-manipulation',
    visualizerType: 'array',
    input: 'nums = [2, 2, 1]',
    output: '1',
    code: {
      cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        // 异或运算：a XOR a = 0, a XOR 0 = a
        // 就像"消消乐"——两个相同的数碰到一起就消掉了
        // 把所有数异或一遍，成对出现的都消掉了，剩下的就是答案
        int result = 0;
        for (int num : nums) {
            result ^= num; // 逐个异或，成对的会抵消
        }
        return result;
    }
};`,
      rust: `impl Solution {
    pub fn single_number(nums: Vec<i32>) -> i32 {
        // 异或消消乐：相同的数异或 = 0，0 异或任何数 = 它本身
        // 把所有数异或一遍，唯一没有成对的就是答案
        nums.iter().fold(0, |acc, &x| acc ^ x)
    }
}`,
    },
    animationSteps: [
      { description: '初始化 result = 0', highlights: [], data: { nums: [2, 2, 1], result: 0, binary: '0000' } },
      { description: '遇到 2: result = 0 ^ 2 = 2（二进制: 0000 ^ 0010 = 0010）', highlights: [0], data: { nums: [2, 2, 1], result: 2, binary: '0010' } },
      { description: '遇到 2: result = 2 ^ 2 = 0（两个 2 相遇，抵消了！二进制: 0010 ^ 0010 = 0000）', highlights: [1], data: { nums: [2, 2, 1], result: 0, binary: '0000' } },
      { description: '遇到 1: result = 0 ^ 1 = 1（二进制: 0000 ^ 0001 = 0001）', highlights: [2], data: { nums: [2, 2, 1], result: 1, binary: '0001' } },
      { description: '结果为 1！成对的 2 被消掉了，剩下单身汉 1', highlights: [0, 1, 2], data: { nums: [2, 2, 1], result: 1, binary: '0001' } },
    ],
    walkthrough: [
      { step: 1, variables: { num: '2', result: '0 → 2' }, explanation: '0 XOR 2 = 2，记下 2' },
      { step: 2, variables: { num: '2', result: '2 → 0' }, explanation: '2 XOR 2 = 0，成对抵消！' },
      { step: 3, variables: { num: '1', result: '0 → 1' }, explanation: '0 XOR 1 = 1，单身汉出现了' },
      { step: 4, variables: { result: '1' }, explanation: '只出现一次的数字是 1', isResult: true },
    ],
  },
  {
    id: 191,
    title: '位1的个数',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/number-of-1-bits/',
    category: 'bit-manipulation',
    visualizerType: 'array',
    input: 'n = 00000000000000000000000000001011',
    output: '3 (二进制 1011 中有 3 个 1)',
    code: {
      cpp: `class Solution {
public:
    int hammingWeight(uint32_t n) {
        // n & (n-1) 这个操作会把 n 最右边的 1 变成 0
        // 就像拔萝卜——每拔掉一个 1 就计数一次，拔完为止
        int count = 0;
        while (n != 0) {
            n &= n - 1; // 消灭最右边的那个 1
            count++;
        }
        return count;
    }
};`,
      rust: `impl Solution {
    pub fn hammingWeight(n: u32) -> i32 {
        // n & (n - 1) 把最低位的 1 翻成 0
        // 就像打地鼠——每敲掉一个 1 就记一分
        let (mut n, mut count) = (n, 0);
        while n != 0 {
            n &= n - 1; // 敲掉最右边的一个 1
            count += 1;
        }
        count
    }
}`,
    },
    animationSteps: [
      { description: '初始化 count=0, n=11（二进制 1011）', highlights: [], data: { n: 11, binary: '1011', count: 0 } },
      { description: 'n=11(1011): 最右边是 1，count=1, n=11&10=10(1010)', highlights: [0], data: { n: 10, binary: '1010', count: 1 } },
      { description: 'n=10(1010): 最右边是 1，count=2, n=10&9=8(1000)', highlights: [1], data: { n: 8, binary: '1000', count: 2 } },
      { description: 'n=8(1000): 最右边是 1，count=3, n=8&7=0(0000)', highlights: [3], data: { n: 0, binary: '0000', count: 3 } },
      { description: 'n=0，循环结束，共有 3 个 1 ✓', highlights: [], data: { n: 0, binary: '0000', count: 3 } },
    ],
    walkthrough: [
      { step: 1, variables: { n: '1011', action: 'n & (n-1) = 1011 & 1010 = 1010' }, explanation: '消灭最右边一个 1，count=1' },
      { step: 2, variables: { n: '1010', action: '1010 & 1001 = 1000' }, explanation: '再消灭一个 1，count=2' },
      { step: 3, variables: { n: '1000', action: '1000 & 0111 = 0000' }, explanation: '消灭最后一个 1，count=3' },
      { step: 4, variables: { result: '3' }, explanation: '二进制 1011 中共有 3 个 1', isResult: true },
    ],
  },
  {
    id: 338,
    title: '比特位计数',
    difficulty: 'easy',
    leetcodeUrl: 'https://leetcode.cn/problems/counting-bits/',
    category: 'bit-manipulation',
    visualizerType: 'array',
    input: 'n = 5',
    output: '[0, 1, 1, 2, 1, 2]',
    code: {
      cpp: `class Solution {
public:
    vector<int> countBits(int n) {
        // DP + 位运算：count[i] = count[i >> 1] + (i & 1)
        // i >> 1 相当于 i 除以 2（去掉最低位）
        // i & 1 是最低位是不是 1
        // 比如 3(11) 的 1 个数 = 1(1) 的 1 个数 + 最低位是 1 = 1 + 1 = 2
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};`,
      rust: `impl Solution {
    pub fn count_bits(n: i32) -> Vec<i32> {
        // dp[i] = dp[i >> 1] + (i & 1)
        // 利用已经算好的结果：i 的二进制 1 个数 = 去掉最低位后的 1 个数 + 最低位本身
        let n = n as usize;
        let mut dp = vec![0; n + 1];
        for i in 1..=n {
            dp[i] = dp[i >> 1] + (i & 1) as i32;
        }
        dp
    }
}`,
    },
    animationSteps: [
      { description: '初始化 dp[0]=0。dp[i] = dp[i>>1] + (i&1)', highlights: [], data: { n: 5, dp: [0, 0, 0, 0, 0, 0] } },
      { description: 'i=1: dp[1] = dp[0] + (1&1) = 0 + 1 = 1（二进制 1 → 1 个 1）', highlights: [1], data: { n: 5, dp: [0, 1, 0, 0, 0, 0] } },
      { description: 'i=2: dp[2] = dp[1] + (2&1) = 1 + 0 = 1（二进制 10 → 1 个 1）', highlights: [2], data: { n: 5, dp: [0, 1, 1, 0, 0, 0] } },
      { description: 'i=3: dp[3] = dp[1] + (3&1) = 1 + 1 = 2（二进制 11 → 2 个 1）', highlights: [3], data: { n: 5, dp: [0, 1, 1, 2, 0, 0] } },
      { description: 'i=4: dp[4] = dp[2] + (4&1) = 1 + 0 = 1（二进制 100 → 1 个 1）', highlights: [4], data: { n: 5, dp: [0, 1, 1, 2, 1, 0] } },
      { description: 'i=5: dp[5] = dp[2] + (5&1) = 1 + 1 = 2（二进制 101 → 2 个 1）。最终 [0,1,1,2,1,2]', highlights: [5], data: { n: 5, dp: [0, 1, 1, 2, 1, 2] } },
    ],
    walkthrough: [
      { step: 1, variables: { i: '1', binary: '1', dp_i: 'dp[0]+1=1' }, explanation: '1 有 1 个 1' },
      { step: 2, variables: { i: '2', binary: '10', dp_i: 'dp[1]+0=1' }, explanation: '2 有 1 个 1' },
      { step: 3, variables: { i: '3', binary: '11', dp_i: 'dp[1]+1=2' }, explanation: '3 有 2 个 1' },
      { step: 4, variables: { i: '4', binary: '100', dp_i: 'dp[2]+0=1' }, explanation: '4 有 1 个 1' },
      { step: 5, variables: { i: '5', binary: '101', dp_i: 'dp[2]+1=2' }, explanation: '5 有 2 个 1' },
      { step: 6, variables: { result: '[0,1,1,2,1,2]' }, explanation: '0~5 每个数的二进制 1 个数', isResult: true },
    ],
  },
]
