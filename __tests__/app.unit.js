/* eslint-env jest */
const request = require('supertest')
const app = require('../app')

describe('Test timestamp API', () => {
  test('It should respond to the GET method', async () => {
    const timestamp = new Date().getTime()
    const response = await request(app).get('/api/timestamp/')

    expect(response.statusCode).toBe(200)
    expect(typeof response.body.unix).toBe('number')
    expect(response.body.unix).toBeGreaterThan(timestamp)
    expect(new Date().getTime()).toBeGreaterThan(response.body.unix)
    expect(new Date(response.body.unix).toUTCString()).toBe(response.body.utc)
  })

  test('It should respond to the GET method with a date', async () => {
    const response = await request(app).get('/api/timestamp/2015-12-25')

    expect(response.statusCode).toBe(200)
    expect(response.body.unix).toBe(1451001600000)
    expect(response.body.utc).toBe('Fri, 25 Dec 2015 00:00:00 GMT')
  })

  test('It should respond to the GET method with a date when only digits are passed in', async () => {
    const response = await request(app).get('/api/timestamp/1451001600000')

    expect(response.statusCode).toBe(200)
    expect(response.body.unix).toBe(1451001600000)
    expect(response.body.utc).toBe('Fri, 25 Dec 2015 00:00:00 GMT')
  })

  test('It should respond to the GET with message if invalid input is given', async () => {
    const response = await request(app).get('/api/timestamp/a')
    expect(response.statusCode).toBe(200)
    // console.log(response)
    expect(response.body.error).toBe('Invalid Date')
  })
})

describe('Test Homepage', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
})
