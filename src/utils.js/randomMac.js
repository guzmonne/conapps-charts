import chunk from 'lodash/chunk'
import Chance from 'chance'

const chance = new Chance()

/**
 * @type {Array}
 * @description List of hexadecimal characters.
 */
const HEXA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'F']
/**
 * @function randomMac
 * @description Returns a new randomMac
 * @returns {String} Random MAC
 */
const randomMac = () => (
	_.chunk(_.range(12).map(i => chance.pickone(HEXA)), 2)
	.join(':')
	.replace(/,/g, '')
	.toLowerCase()
)

/** Exports */
export default randomMac
