// Import necessary functions from vitest for testing
import { describe, it, expect } from 'vitest';

/**
 * Mock of a successful API response with user data
 * This represents what we expect to receive from the API when requesting user data
 */
const mockSuccessfulResponse = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  phone: '+1-555-123-4567',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
    country: 'USA',
  },
  company: {
    name: 'Doe Enterprises',
    industry: 'Technology',
    position: 'Software Engineer',
  },
  dob: '1990-05-15',
  profilePictureUrl: 'https://example.com/images/johndoe.jpg',
  isActive: true,
  createdAt: '2023-01-01T12:00:00Z',
  updatedAt: '2023-10-01T12:00:00Z',
  preferences: {
    language: 'en',
    timezone: 'America/New_York',
    notificationsEnabled: true,
  },
};

/**
 * API mock class that simulates different API responses
 * This class provides methods to simulate various API responses without making actual HTTP requests
 */
class UserApiMock {
  /**
   * Simulates getting user data with different responses based on ID
   * Each ID value triggers a different type of response to test various scenarios
   *
   * @param {number} id - User ID to retrieve
   * @returns {Promise<Object>} - Response object with status and data
   * @throws {Error} - Network error for specific IDs
   */
  static async getUser(id) {
    if (id === 1) {
      // Return successful response (200 OK) with user data
      return {
        status: 200,
        data: mockSuccessfulResponse,
      };
    }

    if (id === 2) {
      // Return No Content response (204) - successful but no data to return
      return {
        status: 204,
      };
    }

    if (id === 3) {
      // Return Forbidden response (403) - user doesn't have permission
      return {
        status: 403,
        data: { error: 'Forbidden', details: 'Access denied' },
      };
    }

    if (id === 999) {
      // Return Not Found response (404) - requested resource doesn't exist
      return {
        status: 404,
        data: {
          error: 'Not Found',
          details: 'User with the specified ID does not exist',
          code: 404,
        },
      };
    }

    if (id === 4) {
      // Return Bad Gateway response (502) - server error
      return {
        status: 502,
        data: { error: 'Bad Gateway', details: 'Server error' },
      };
    }

    if (id === 5) {
      // Simulate a network error - connection problems
      throw new Error('Network Error');
    }

    // Default response for any other ID
    return {
      status: 404,
      data: { error: 'Not Found', details: 'User not found' },
    };
  }
}

/**
 * Test suite for API mocking and validation
 * These tests verify that our mock API behaves as expected and returns proper responses
 */
describe('API Mocking and Validation Tests', () => {
  /**
   * Test for successful API response (200 OK)
   * Verifies that the response contains all expected user data with correct values
   */
  it('Mock Successful Response', async() => {
    // Make a request to get user with ID 1
    const response = await UserApiMock.getUser(1);

    // Validate the response status code
    expect(response.status).toBe(200);

    // Validate basic user properties
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data).toHaveProperty('name', 'John Doe');
    expect(response.data).toHaveProperty('email', 'john.doe@example.com');

    // Validate nested address properties
    expect(response.data.address).toHaveProperty('street', '123 Main St');
    expect(response.data.address).toHaveProperty('zipcode', '10001');
  });

  /**
   * Test for No Content response (204)
   * Verifies that the API correctly returns a 204 status with no content
   */
  it('Mock 204 No Content Response', async() => {
    // Make a request to get user with ID 2
    const response = await UserApiMock.getUser(2);

    // Validate the response status is 204 (No Content)
    expect(response.status).toBe(204);
  });

  /**
   * Test for Forbidden response (403)
   * Verifies that the API correctly returns a 403 status with appropriate error details
   */
  it('Mock 403 Forbidden Response', async() => {
    // Make a request to get user with ID 3
    const response = await UserApiMock.getUser(3);

    // Validate the response status and error structure
    expect(response.status).toBe(403);
    expect(response.data).toHaveProperty('error', 'Forbidden');
    expect(response.data).toHaveProperty('details', 'Access denied');
  });

  /**
   * Test for Not Found response (404)
   * Verifies that the API correctly returns a 404 status when requesting non-existent users
   */
  it('Mock 404 Not Found Response', async() => {
    // Make a request to get user with ID 999
    const response = await UserApiMock.getUser(999);

    // Validate the response status and error structure
    expect(response.status).toBe(404);
    expect(response.data).toHaveProperty('error', 'Not Found');
    expect(response.data).toHaveProperty('details');
    expect(response.data).toHaveProperty('code', 404);
  });

  /**
   * Test for Bad Gateway response (502)
   * Verifies that the API correctly returns a 502 status when server errors occur
   */
  it('Mock 502 Bad Gateway Response', async() => {
    // Make a request to get user with ID 4
    const response = await UserApiMock.getUser(4);

    // Validate the response status and error structure
    expect(response.status).toBe(502);
    expect(response.data).toHaveProperty('error', 'Bad Gateway');
    expect(response.data).toHaveProperty('details', 'Server error');
  });

  /**
   * Test for Network Error
   * Verifies that the API correctly throws an error when network problems occur
   */
  it('Mock Network Error', async() => {
    // Make a request to get user with ID 5 and expect a network error
    await expect(UserApiMock.getUser(5)).rejects.toThrow('Network Error');
  });
});
