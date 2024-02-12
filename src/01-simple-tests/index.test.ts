// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const answer = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(answer).toBe(5);
  });

  test('should subtract two numbers', () => {
    const answer = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(answer).toBe(2);
  });

  test('should multiply two numbers', () => {
    const answer = simpleCalculator({ a: 2, b: 3, action: Action.Multiply });
    expect(answer).toBe(6);
  });

  test('should divide two numbers', () => {
    const answer = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(answer).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const answer = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(answer).toBe(8);
  });

  test('should return null for invalid action', () => {
    const answer = simpleCalculator({ a: 2, b: 3, action: '^' });
    expect(answer).toBe(8);
  });

  test('should return null for invalid arguments', () => {
    const answer = simpleCalculator({ a: '2', b: '3', action: Action.Add });
    expect(answer).toBe(null);
  });
});
