const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
	const token = req.header('Authorization').replace('Bearer ', '')
	jwt.verify(token, process.env.JWT_KEY, (err, decoded) => { 
		if (err) {
			res.send(err)
		}
		User.findOne({ _id: decoded._id })
			.then(user => {
				req.user = user
				req.token = token
				next()
			})
			.catch(err => {
				res.status(401).send({ error: 'Not authorized to access this resource' })
			})
	})
}
module.exports = auth