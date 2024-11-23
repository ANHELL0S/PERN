import jwt from 'jsonwebtoken'
import { env } from '../config/env.config.js'

function createAccessToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRED }, (err, token) => {
			if (err) reject(err)
			resolve(token)
		})
	})
}

function createRefreshToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_REFRESH }, (err, token) => {
			if (err) reject(err)
			resolve(token)
		})
	})
}

export { createAccessToken, createRefreshToken }
