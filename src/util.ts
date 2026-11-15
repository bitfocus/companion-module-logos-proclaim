// Proclaim timestamps are .NET ticks - convert them to a Unix timestamp
export function ticksToUnixTime(tick: number): number {
	return (tick - 621355968000000000) / 10000
}

/**
 * Truncate a string to a maximum number of characters
 * @param str - The string to truncate
 * @param max - The maximum length, or 0 to not truncate at all
 * @param suffix  - A string to be added at the end of the truncated text
 * @returns The truncated string
 */
export function truncate(str: string, max: number, suffix = '...'): string {
	return str.length < max || max == 0
		? str
		: `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`
}
