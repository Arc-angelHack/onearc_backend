const {
    plural
} = require('pluralize')
const model = require('../models/requests_user')
const {
    parseToken
} = require('../lib/auth')

const resourceName = 'request'

async function index(req, res, next) {
    const token = parseToken(req.headers.authorization)
    const response = await model.get(req.params.userId)

    res.json({
        [plural(resourceName)]: response
    })
}

async function getOne(req, res, next) {
    try {
        const response = await model.getOne(req.body)
        res.status(200).json({
            [resourceName]: response
        })
    } catch (e) {
        console.log(e)
        next({
            status: 400,
            error: `Request could not be accessed by helper`
        })
    }
}

async function create(req, res, next) {
    try {
        const response = await model.create(req.body)
        res.status(200).json({
            [resourceName]: response
        })
    } catch (e) {
        console.log(e)
        next({
            status: 400,
            error: `Request could not be created`
        })
    }
}

async function patch(req, res, next) {
    try {
        const response = await model.patch(req.params.reqId, req.body)
        res.json({
            [resourceName]: response
        })
    } catch (e) {
        console.log(e)
        next({
            status: 400,
            error: `Request could not be updated`
        })
    }
}

async function destroy (req, res, next) {
    try {
        const response = await model.destroy(req.params.reqId)
        res.json({
            [resourceName]: response
        })

    } catch (e) {
        console.log(e)
        next({
            status: 400,
            error: `Request could not be destroyed`
        })
    }
}

module.exports = {
    index,
    getOne,
    create,
    patch,
    destroy
}
