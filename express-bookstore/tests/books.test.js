const request = require('supertest');
const app = require('../app');  // Adjust the path as necessary

describe('POST /books', () => {
  test('It should create a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        isbn: "1234567890",
        amazon_url: "http://a.co/eobPtX2",
        author: "Test Author",
        language: "english",
        pages: 100,
        publisher: "Test Publisher",
        title: "Test Title",
        year: 2021
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.book).toHaveProperty("isbn");
  });

  test('It should return validation errors for invalid input', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        isbn: "1234567890",
        amazon_url: "not-a-url",
        author: "Test Author"
        // Missing other required fields
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeInstanceOf(Array);
  });
}); 