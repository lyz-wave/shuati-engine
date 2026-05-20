import { Problem } from '../types'

export const matrixProblems: Problem[] = [
  {
    id: 48,
    title: '旋转图像',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/rotate-image/',
    category: 'matrix',
    visualizerType: 'matrix',
    input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
    output: '[[7,4,1],[8,5,2],[9,6,3]]',
    code: {
      cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();

        // 第一步：沿主对角线（左上到右下）翻转 → 转置
        // 相当于把行变成列
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                swap(matrix[i][j], matrix[j][i]);

        // 第二步：每一行水平翻转（左右镜像）
        // 转置 + 左右翻转 = 顺时针旋转 90 度
        for (int i = 0; i < n; i++)
            reverse(matrix[i].begin(), matrix[i].end());
    }
};`,
      rust: `impl Solution {
    pub fn rotate(matrix: &mut Vec<Vec<i32>>) {
        let n = matrix.len();

        // 转置：沿主对角线交换
        for i in 0..n {
            for j in i+1..n {
                let tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
        }

        // 每一行水平翻转
        for row in matrix.iter_mut() {
            row.reverse();
        }
    }
}`,
    },
    animationSteps: [
      { description: '原始矩阵：[[1,2,3],[4,5,6],[7,8,9]]，准备旋转', highlights: [], data: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
      { description: '第一步：沿主对角线转置。交换 (0,1)↔(1,0): 2↔4', highlights: [1, 3], data: { matrix: [[1, 4, 3], [2, 5, 6], [7, 8, 9]] } },
      { description: '交换 (0,2)↔(2,0): 3↔7。交换 (1,2)↔(2,1): 6↔8', highlights: [2, 4], data: { matrix: [[1, 4, 7], [2, 5, 8], [3, 6, 9]] } },
      { description: '第二步：每行水平翻转。第一行 [1,4,7] → [7,4,1]', highlights: [0, 1, 2], data: { matrix: [[7, 4, 1], [2, 5, 8], [3, 6, 9]] } },
      { description: '第二行 [2,5,8] → [8,5,2]，第三行 [3,6,9] → [9,6,3]', highlights: [3, 4, 5], data: { matrix: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] } },
      { description: '旋转完成！顺时针 90 度 ✓', highlights: [], data: { matrix: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] } },
    ],
    walkthrough: [
      { step: 1, variables: { matrix: '[[1,2,3],[4,5,6],[7,8,9]]' }, explanation: '原始矩阵' },
      { step: 2, variables: { matrix: '[[1,4,7],[2,5,8],[3,6,9]]' }, explanation: '转置完成：行变列' },
      { step: 3, variables: { matrix: '[[7,4,1],[8,5,2],[9,6,3]]' }, explanation: '每行水平翻转，完成旋转' },
      { step: 4, variables: { result: '[[7,4,1],[8,5,2],[9,6,3]]' }, explanation: '顺时针旋转 90 度完成', isResult: true },
    ],
  },
  {
    id: 54,
    title: '螺旋矩阵',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/spiral-matrix/',
    category: 'matrix',
    visualizerType: 'matrix',
    input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
    output: '[1,2,3,6,9,8,7,4,5]',
    code: {
      cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;

        // 四个方向"画框"，一层一层往内收
        while (top <= bottom && left <= right) {
            // 从左到右遍历上边界
            for (int j = left; j <= right; j++)
                res.push_back(matrix[top][j]);
            top++;

            // 从上到下遍历右边界
            for (int i = top; i <= bottom; i++)
                res.push_back(matrix[i][right]);
            right--;

            // 从右到左遍历下边界（如果还有行）
            if (top <= bottom) {
                for (int j = right; j >= left; j--)
                    res.push_back(matrix[bottom][j]);
                bottom--;
            }

            // 从下到上遍历左边界（如果还有列）
            if (left <= right) {
                for (int i = bottom; i >= top; i--)
                    res.push_back(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
};`,
      rust: `impl Solution {
    pub fn spiral_order(matrix: Vec<Vec<i32>>) -> Vec<i32> {
        if matrix.is_empty() { return vec![]; }
        let (mut top, mut bottom) = (0, matrix.len() - 1);
        let (mut left, mut right) = (0, matrix[0].len() - 1);
        let mut res = vec![];

        while top <= bottom && left <= right {
            // 上边：左→右
            for j in left..=right { res.push(matrix[top][j]); }
            top += 1;

            // 右边：上→下
            for i in top..=bottom { res.push(matrix[i][right]); }
            if right == 0 { break; }
            right -= 1;

            // 下边：右→左
            if top <= bottom {
                for j in (left..=right).rev() { res.push(matrix[bottom][j]); }
                bottom -= 1;
            }

            // 左边：下→上
            if left <= right {
                for i in (top..=bottom).rev() { res.push(matrix[i][left]); }
                left += 1;
            }
        }
        res
    }
}`,
    },
    animationSteps: [
      { description: '初始边界：top=0, bottom=2, left=0, right=2', highlights: [], data: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
      { description: '第一轮上边：→ 1,2,3。top 变为 1', highlights: [0, 1, 2], data: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
      { description: '第一轮右边：↓ 6,9。right 变为 1', highlights: [5, 8], data: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
      { description: '第一轮下边：← 8,7。bottom 变为 1', highlights: [7, 6], data: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
      { description: '第一轮左边：↑ 4。left 变为 1', highlights: [3], data: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
      { description: '第二轮：上边 → 5（只剩中间），完成！res = [1,2,3,6,9,8,7,4,5]', highlights: [4], data: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } },
    ],
    walkthrough: [
      { step: 1, variables: { res: '[1,2,3]' }, explanation: '上边界：从左到右' },
      { step: 2, variables: { res: '[1,2,3,6,9]' }, explanation: '右边界：从上到下' },
      { step: 3, variables: { res: '[1,2,3,6,9,8,7]' }, explanation: '下边界：从右到左' },
      { step: 4, variables: { res: '[1,2,3,6,9,8,7,4]' }, explanation: '左边界：从下到上' },
      { step: 5, variables: { res: '[1,2,3,6,9,8,7,4,5]' }, explanation: '内层剩 [5]，螺旋遍历完成', isResult: true },
    ],
  },
  {
    id: 73,
    title: '矩阵置零',
    difficulty: 'medium',
    leetcodeUrl: 'https://leetcode.cn/problems/set-matrix-zeroes/',
    category: 'matrix',
    visualizerType: 'matrix',
    input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
    output: '[[1,0,1],[0,0,0],[1,0,1]]',
    code: {
      cpp: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        // 用第一行和第一列做"标记位"
        // 额外用两个 bool 记录第一行和第一列本身是否需要置零
        bool firstRowZero = false, firstColZero = false;

        // 检查第一行是否有 0
        for (int j = 0; j < n; j++)
            if (matrix[0][j] == 0) firstRowZero = true;

        // 检查第一列是否有 0
        for (int i = 0; i < m; i++)
            if (matrix[i][0] == 0) firstColZero = true;

        // 遍历剩余区域，如果有 0 就在第一行和第一列做标记
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][j] == 0)
                    matrix[i][0] = matrix[0][j] = 0;

        // 根据标记把对应行和列置零
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][0] == 0 || matrix[0][j] == 0)
                    matrix[i][j] = 0;

        // 处理第一行和第一列
        if (firstRowZero)
            for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (firstColZero)
            for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
};`,
      rust: `impl Solution {
    pub fn set_zeroes(matrix: &mut Vec<Vec<i32>>) {
        let (m, n) = (matrix.len(), matrix[0].len());
        let mut first_row = false;
        let mut first_col = false;

        // 检查第一行是否有 0
        for j in 0..n { if matrix[0][j] == 0 { first_row = true; } }
        // 检查第一列是否有 0
        for i in 0..m { if matrix[i][0] == 0 { first_col = true; } }

        // 在首行首列做标记
        for i in 1..m {
            for j in 1..n {
                if matrix[i][j] == 0 {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // 根据标记置零（除首行首列外）
        for i in 1..m {
            for j in 1..n {
                if matrix[i][0] == 0 || matrix[0][j] == 0 {
                    matrix[i][j] = 0;
                }
            }
        }

        if first_row { for j in 0..n { matrix[0][j] = 0; } }
        if first_col { for i in 0..m { matrix[i][0] = 0; } }
    }
}`,
    },
    animationSteps: [
      { description: '原始矩阵：[[1,1,1],[1,0,1],[1,1,1]]，发现 (1,1)=0', highlights: [], data: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] } },
      { description: '在第一行和第一列做标记：matrix[1][0]=0, matrix[0][1]=0', highlights: [4], data: { matrix: [[1, 0, 1], [0, 0, 1], [1, 1, 1]] } },
      { description: '根据标记置零：第 1 行全部变 0（因为 matrix[0][1]=0）', highlights: [3, 5], data: { matrix: [[1, 0, 1], [0, 0, 0], [1, 1, 1]] } },
      { description: '根据标记置零：第 1 列全部变 0（因为 matrix[1][0]=0）', highlights: [3, 6], data: { matrix: [[1, 0, 1], [0, 0, 0], [0, 1, 1]] } },
      { description: '处理首行首列标记位：matrix[0][1]=0 → 第一行不变（已有正确值）', highlights: [1], data: { matrix: [[1, 0, 1], [0, 0, 0], [0, 1, 1]] } },
      { description: '根据标记置零完成：第二行全部变 0，第二列全部变 0，得到最终结果 ✓', highlights: [4, 7], data: { matrix: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] } },
    ],
    walkthrough: [
      { step: 1, variables: { matrix: '[[1,1,1],[1,0,1],[1,1,1]]' }, explanation: '发现 (1,1)=0' },
      { step: 2, variables: { matrix: '[[1,0,1],[0,0,0],[1,1,1]]' }, explanation: '第 1 行和第 1 行置零' },
      { step: 3, variables: { matrix: '[[1,0,1],[0,0,0],[1,0,1]]' }, explanation: '第 1 列置零，得到最终结果' },
      { step: 4, variables: { result: '[[1,0,1],[0,0,0],[1,0,1]]' }, explanation: '所有含 0 的行列均已置零', isResult: true },
    ],
  },
]
