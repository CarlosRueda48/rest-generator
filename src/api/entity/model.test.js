import { Entity } from '.'

let entity

beforeEach(async () => {
  entity = await Entity.create({ name: 'test', text: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = entity.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(entity.id)
    expect(view.name).toBe(entity.name)
    expect(view.text).toBe(entity.text)
    expect(view.date).toBe(entity.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = entity.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(entity.id)
    expect(view.name).toBe(entity.name)
    expect(view.text).toBe(entity.text)
    expect(view.date).toBe(entity.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
