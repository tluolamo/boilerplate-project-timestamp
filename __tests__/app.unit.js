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

  test('It should respond to the GET with message if invalid input is given', async () => {
    const response = await request(app).get('/api/timestamp/a')
    expect(response.statusCode).toBe(200)
    // console.log(response)
    expect(response.body.error).toBe('Invalid Date')
  })
})
