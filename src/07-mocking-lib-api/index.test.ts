import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.useFakeTimers();

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const responseMock = { data: 'Test Data' };
    const getMock = {
      get: jest.fn().mockResolvedValue(responseMock),
    };
    const createMock = jest.fn().mockReturnValue(getMock);
    axios.create = createMock;
    await throttledGetDataFromApi('/test');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const responseMock = { data: 'Test Data' };
    const getMock = {
      get: jest.fn().mockResolvedValue(responseMock),
    };
    const createMock = jest.fn().mockReturnValue(getMock);
    axios.create = createMock;
    throttledGetDataFromApi('/test');
    jest.runAllTimers();
    expect(getMock.get).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const responseMock = { data: 'Test Data' };
    const getMock = {
      get: jest.fn().mockResolvedValue(responseMock),
    };
    const createMock = jest.fn().mockReturnValue(getMock);
    axios.create = createMock;
    const result = await throttledGetDataFromApi('/test');
    expect(result).toEqual(responseMock.data);
  });
});

afterAll(() => {
  jest.useRealTimers();
});
