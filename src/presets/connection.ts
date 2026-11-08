import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createConnectionPresets(context: PresetsBuilderContext): void {
	context.definitions['reconnect'] = {
		type: 'simple',
		name: 'Reconnect',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Reconnect',
			size: 'auto',
		},
		steps: [
			{
				down: [
					{
						actionId: 'reconnect',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.sections.push({
		id: 'connection',
		name: 'Connection',
		definitions: ['reconnect'],
	})
}
