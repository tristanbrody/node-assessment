(async () => {
	const fs = require('fs');
	const axios = require('axios');
	const doAsync = require('doasync');
	const striptags = require('striptags');
	const readline = require('readline');

	const argv = process.argv;
	const results = [];

	//regex for getting shortened version of url in text file
	const re = /([\w]+)(:\/\/)?(\w+\.\w{3,4})/;

	async function getFileData(path) {
		return fs.readFile(path, 'utf8', function (err, data) {
			if (err) {
				console.log(err);
				return;
			}
		});
	}

	async function getURLData(url) {
		try {
			const res = await axios.get(url);
			return res.data;
		} catch (err) {
			return false;
		}
	}

	function writeToFile(data, name) {
		fs.writeFile(__dirname + `/${name}.html`, data, 'utf8', function (err) {
			if (err) {
				console.dir(err);
				console.log(`Error creating file for ${name}`);
			} else {
				console.log(`Wrote to ${name}`);
			}
		});
	}

	const fileArg = process.argv[2];

	const lineReader = require('readline').createInterface({
		input: require('fs').createReadStream(`${fileArg}`)
	});

	lineReader.on('line', async function (line) {
		const data = await getURLData(line);
		const match = line.match(re);
		const url = match[3];
		if (data) {
			writeToFile(data, url);
		} else {
			console.log(`Could not get data from ${line}`);
		}
	});
})();
