const express = require('express');
const router = new express.Router();
const axios = require('axios');

router.post('', async function (req, res, next) {
	try {
		const results = req.body.developers.map(async d => {
			return await axios.get(`https://api.github.com/users/${d}`);
		});
		let response = [];
		Promise.all(results)
			.then(res => {
				for (let r of res) {
					response.push({ name: r.data.name, bio: r.data.bio });
				}
			})
			.then(() => {
				res.json(response);
			});
	} catch {
		return next(err);
	}
});

module.exports = router;
