const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))

exports.get = function getData ( xds, requestParams ) {
	if ( xds === 'lds' ) {
		return data[ xds ] && data[ xds ][ requestParams.node.id ] || undefined
	} else if ( xds === 'eds' ) {
		return data[ xds ] && data[ xds ][ resourceNames[ 0 ] ] || undefined
	} else if ( xds === 'cds' ) {
		return data[ xds ] && data[ xds ][ requestParams.node.id ] || undefined
	}
	
	return undefined
}
