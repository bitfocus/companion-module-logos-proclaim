import { DEFAULT_PRESET_STYLE } from './index.js'
import type { PresetsBuilderContext } from './context.js'

export function createOnAirPresets(context: PresetsBuilderContext): void {
	context.definitions['on_air'] = {
		type: 'simple',
		name: 'On Air',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'On Air',
		},
		steps: [
			{
				down: [
					{
						actionId: 'on_air_toggle',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'on_air',
				options: {},
				style: {
					bgcolor: 0xff0000,
					color: 0x000000,
				},
			},
		],
	}

	context.sections.push({
		id: 'on_air',
		name: 'On Air',
		definitions: ['on_air'],
	})
}
