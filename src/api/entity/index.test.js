import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Entity } from '.'

const app = () => express(apiRoot, routes)

let entity

beforeEach(async () => {
  entity = await Entity.create({})
})

test('POST /entities 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', text: 'test', date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.text).toEqual('test')
  expect(body.date).toEqual('test')
})

test('POST /entities 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /entities 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /entities 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /entities/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${entity.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(entity.id)
})

test('GET /entities/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${entity.id}`)
  expect(status).toBe(401)
})

test('GET /entities/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /entities/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${entity.id}`)
    .send({ access_token: masterKey, name: 'test', text: 'test', date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(entity.id)
  expect(body.name).toEqual('test')
  expect(body.text).toEqual('test')
  expect(body.date).toEqual('test')
})

test('PUT /entities/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${entity.id}`)
  expect(status).toBe(401)
})

test('PUT /entities/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', text: 'test', date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /entities/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${entity.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /entities/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${entity.id}`)
  expect(status).toBe(401)
})

test('DELETE /entities/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
