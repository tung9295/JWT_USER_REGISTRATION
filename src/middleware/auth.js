const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
	const token = req.header('Authorization').replace('Bearer ', '')
	jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
		if (err) {
			res.status(401).send(err)
		}
		const data = decoded;
		User.findOne({ _id: data._id, 'tokens.token': token })
			.then(user => {
				if (!user) {
					res.status.send('No user found')
				}
				req.user = user
				req.token = token
				next()
			})
			.catch(err => {
				res.status(401).send('Invalid token')
			})
	})
}

module.exports = auth