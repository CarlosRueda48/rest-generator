import { success, notFound } from '../../services/response/'
import { Entity } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Entity.create(body)
    .then((entity) => entity.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Entity.count(query)
    .then(count => Entity.find(query, select, cursor)
      .then((entities) => ({
        count,
        rows: entities.map((entity) => entity.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Entity.findById(params.id)
    .then(notFound(res))
    .then((entity) => entity ? entity.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Entity.findById(params.id)
    .then(notFound(res))
    .then((entity) => entity ? Object.assign(entity, body).save() : null)
    .then((entity) => entity ? entity.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Entity.findById(params.id)
    .then(notFound(res))
    .then((entity) => entity ? entity.remove() : null)
    .then(success(res, 204))
    .catch(next)
