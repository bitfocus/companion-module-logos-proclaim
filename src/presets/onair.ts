import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

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

	context.definitions['go_on_air'] = {
		type: 'simple',
		name: 'Go On Air',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Go On Air',
		},
		steps: [
			{
				down: [
					{
						actionId: 'go_on_air',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['go_off_air'] = {
		type: 'simple',
		name: 'Go Off Air',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Go Off Air',
		},
		steps: [
			{
				down: [
					{
						actionId: 'go_off_air',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.sections.push({
		id: 'on_air',
		name: 'On Air',
		definitions: ['on_air', 'go_on_air', 'go_off_air'],
	})
}
