import { DEFAULT_PRESET_STYLE } from './index.js'
import type { PresetsBuilderContext } from './context.js'

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
		definitions: [
			{
				id: 'group3',
				name: 'Connection presets',
				description:
					'Occasionally it may be useful to force the module to reconnect to the Proclaim API. This preset will do that.',
				type: 'simple',
				presets: ['reconnect'],
			},
		],
	})
}
