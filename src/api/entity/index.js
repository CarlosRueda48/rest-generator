import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Entity, { schema } from './model'

const router = new Router()
const { name, text, date } = schema.tree

/**
 * @api {post} /entities Create entity
 * @apiName CreateEntity
 * @apiGroup Entity
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Entity's name.
 * @apiParam text Entity's text.
 * @apiParam date Entity's date.
 * @apiSuccess {Object} entity Entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Entity not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, text, date }),
  create)

/**
 * @api {get} /entities Retrieve entities
 * @apiName RetrieveEntities
 * @apiGroup Entity
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of entities.
 * @apiSuccess {Object[]} rows List of entities.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /entities/:id Retrieve entity
 * @apiName RetrieveEntity
 * @apiGroup Entity
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} entity Entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Entity not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /entities/:id Update entity
 * @apiName UpdateEntity
 * @apiGroup Entity
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Entity's name.
 * @apiParam text Entity's text.
 * @apiParam date Entity's date.
 * @apiSuccess {Object} entity Entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Entity not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, text, date }),
  update)

/**
 * @api {delete} /entities/:id Delete entity
 * @apiName DeleteEntity
 * @apiGroup Entity
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Entity not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
