import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const array = [1, 2, 3];
    const list = generateLinkedList(array);
    expect(list).toMatchSnapshot();
  });

  test('should generate linked list from values 2', () => {
    const array = [2, 3, 4];
    const list = generateLinkedList(array);
    expect(list).toMatchSnapshot();
  });
});
