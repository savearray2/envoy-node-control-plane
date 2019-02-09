const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))

exports.getData = function getData ( resourceType, resourceName ) {
	return data[ resourceType ][ resourceName ]
}
