import path, { join } from 'path';
import {
  doStuffByTimeout,
  doStuffByInterval,
  readFileAsynchronously,
} from './index';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    const int = 1000;
    doStuffByInterval(callback, int);
    jest.advanceTimersByTime(2 * int);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const int = 1000;
    doStuffByInterval(callback, int);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(int);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(int);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const file = 'text.txt';
  const fileText = 'This text has this content.';
  beforeAll(() => {
    fs.writeFileSync(file, fileText);
  });

  afterAll(() => {
    fs.unlinkSync(file);
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = join(__dirname, file);
    const joinSpy = jest.spyOn(path, 'join').mockReturnValue(pathToFile);
    await readFileAsynchronously(file);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    const file2 = 'test2.txt';
    const result = await readFileAsynchronously(file2);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously(file);
    expect(result).toEqual(fileText);
  });
});
