export const dailyProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hash Maps",
    isDaily: true,
    points: 100,
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the **indices** of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] == 6, we return [0, 1].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    hints: [
      "A brute force approach checks all pairs in O(n^2) time.",
      "Can you use a Hash Map to store numbers you've already seen and check if target - current exists in O(1) time?",
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,
    functionName: "twoSum",
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        expected: [0, 1],
      },
      {
        input: [[3, 2, 4], 6],
        expected: [1, 2],
      },
      {
        input: [[3, 3], 6],
        expected: [0, 1],
      },
      {
        input: [[1, 5, 8, 3, 9], 11],
        expected: [1, 3],
      },
    ],
    editorial: `### Optimal Solution: Hash Map (O(n) time, O(n) space)

Instead of checking all pairs with two nested loops, we can iterate through the array once while keeping track of the numbers we have seen in a \`Map\`.

For each number \`nums[i]\`:
1. Calculate \`complement = target - nums[i]\`.
2. If \`complement\` is in our map, return \`[map.get(complement), i]\`.
3. Otherwise, store \`nums[i]\` with its index \`i\` in the map.

**Time Complexity:** O(n)  
**Space Complexity:** O(n)`,
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks & Strings",
    isDaily: false,
    points: 100,
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
      {
        input: 's = "([])"',
        output: "true",
      },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    hints: [
      "Use a stack data structure (LIFO - Last In, First Out).",
      "Push opening brackets onto the stack. When you encounter a closing bracket, pop from the stack and verify that it matches.",
    ],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your solution here
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
    functionName: "isValid",
    testCases: [
      {
        input: ["()"],
        expected: true,
      },
      {
        input: ["()[]{}"],
        expected: true,
      },
      {
        input: ["(]"],
        expected: false,
      },
      {
        input: ["{[]}"],
        expected: true,
      },
      {
        input: ["(["],
        expected: false,
      },
    ],
    editorial: `### Optimal Solution: Stack (O(n) time, O(n) space)

A Stack is the classic data structure for matching nested structures.

Whenever we see an opening bracket, we push it to the stack. When we see a closing bracket:
1. If the stack is empty, it's invalid.
2. If the top of the stack does not match the closing bracket, it's invalid.
At the end, if the stack is completely empty, all brackets were matched correctly.`,
  },
  {
    id: "reverse-words",
    title: "Reverse Words in a String",
    difficulty: "Medium",
    category: "Strings & Pointers",
    isDaily: false,
    points: 150,
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    description: `Given an input string \`s\`, reverse the order of the **words**.

A **word** is defined as a sequence of non-space characters. The words in \`s\` will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space. Note that \`s\` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words.`,
    examples: [
      {
        input: 's = "the sky is blue"',
        output: '"blue is sky the"',
      },
      {
        input: 's = "  hello world  "',
        output: '"world hello"',
      },
      {
        input: 's = "a good   example"',
        output: '"example good a"',
      },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s contains English letters (upper-case and lower-case), digits, and spaces ' '.",
      "There is at least one word in s.",
    ],
    hints: [
      "Split the string by spaces, filter out empty strings, and reverse the array of words.",
      "Join the reversed words back with a single space.",
    ],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
  // Write your solution here
  return s
    .trim()
    .split(/\\s+/)
    .reverse()
    .join(' ');
}`,
    functionName: "reverseWords",
    testCases: [
      {
        input: ["the sky is blue"],
        expected: "blue is sky the",
      },
      {
        input: ["  hello world  "],
        expected: "world hello",
      },
      {
        input: ["a good   example"],
        expected: "example good a",
      },
    ],
    editorial: `### Solution: Split & Filter (O(n) time, O(n) space)

Using regex \`\\s+\` automatically handles consecutive spaces.
1. \`trim()\` to discard leading and trailing spaces.
2. \`split(/\\s+/)\` to partition words cleanly.
3. \`reverse()\` and \`join(' ')\` to build the reversed string.`,
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    isDaily: false,
    points: 200,
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A **subarray** is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        output: "23",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    hints: [
      "Think dynamically: at each index, you decide whether to extend the previous subarray or start a brand new one.",
      "If the current running sum becomes negative, it won't help future numbers, so reset it to the current number.",
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your solution here
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
    functionName: "maxSubArray",
    testCases: [
      {
        input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expected: 6,
      },
      {
        input: [[1]],
        expected: 1,
      },
      {
        input: [[5, 4, -1, 7, 8]],
        expected: 23,
      },
      {
        input: [[-1, -2, -3]],
        expected: -1,
      },
    ],
    editorial: `### Kadane's Algorithm (O(n) time, O(1) space)

Kadane's algorithm maintains a running sum \`currentSum\`. At each element:
\`currentSum = Math.max(nums[i], currentSum + nums[i])\`
\`maxSum = Math.max(maxSum, currentSum)\`

This achieves linear time O(n) with constant space O(1).`,
  },
  {
    id: "css-battle-glow",
    title: "CSS Battle: Cyber Glow Card",
    difficulty: "Easy",
    category: "CSS Battle & Frontend",
    isDaily: false,
    mode: "web",
    points: 120,
    description: `Recreate the official CodeClub glowing neon card using modern CSS!
Target requirements:
1. Centered layout with flexbox or grid.
2. Dark background with a glowing gradient border.
3. Hover micro-animation scaling with emerald shadow.`,
    examples: [],
    constraints: [
      "Use pure HTML and CSS.",
      "Make the card responsive and visually balanced.",
    ],
    hints: [
      "Use backdrop-filter: blur() and rgba() colors for glassmorphism.",
      "Add box-shadow: 0 0 25px rgba(16, 185, 129, 0.4) for the signature emerald glow.",
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0D1821;
    font-family: sans-serif;
  }
  .card {
    background: #142433;
    border: 1px solid #10B981;
    border-radius: 16px;
    padding: 32px 40px;
    text-align: center;
    color: #F0FFF1;
    box-shadow: 0 0 25px rgba(16, 185, 129, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 0 35px rgba(16, 185, 129, 0.6);
  }
  h2 { margin: 0 0 8px; color: #10B981; }
  p { margin: 0; color: #8CA3B8; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h2>CodeClub IU</h2>
    <p>Live CSS Battle Sandbox</p>
  </div>
</body>
</html>`,
  },
];
