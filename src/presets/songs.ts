import { DEFAULT_PRESET_STYLE } from './index.js'
import type { PresetsBuilderContext } from './context.js'
import { SONG_COUNT } from '../refdata.js'

export function createSongPresets(context: PresetsBuilderContext): void {
	for (let v = 1; v <= SONG_COUNT; v++) {
		const presetId = `song_${v}`
		context.definitions[presetId] = {
			type: 'simple',
			name: `$Song ${v}`,
			style: {
				...DEFAULT_PRESET_STYLE,
				text: `Song\\n${v}`,
			},
			steps: [
				{
					down: [
						{
							actionId: 'go_to_song',
							options: {
								num: v,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	context.sections.push({
		id: 'songs',
		name: 'Songs',
		definitions: [...new Array(SONG_COUNT).fill(0).map((_v, index) => `song_${index + 1}`)],
	})
}
