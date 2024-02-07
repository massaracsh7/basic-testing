import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 6, b: 3, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 2, b: 3, action: '^' as Action, expected: 8 },
    { a: '"5"', b: '"3"', action: Action.Add, expected: null },
  ];

  test.each(testCases)(
    `should return $expected when $a $action $b `,
    ({ action, a, b, expected }) => {
      const answer = simpleCalculator({ a, b, action });
      expect(answer).toBe(expected);
    },
  );
});
