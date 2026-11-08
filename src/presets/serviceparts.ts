import { DEFAULT_PRESET_STYLE } from './index.js'
import type { PresetsBuilderContext } from './context.js'

export function createServicePartPresets(context: PresetsBuilderContext): void {
	context.definitions['start_pre_service'] = {
		type: 'simple',
		name: 'Start Pre Service',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Pre Service',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_pre_service',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['start_warm_up'] = {
		type: 'simple',
		name: 'Start Warm Up',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Warm Up',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_warm_up',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['start_service'] = {
		type: 'simple',
		name: 'Start Service',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Service',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_service',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['start_post_service'] = {
		type: 'simple',
		name: 'Start Post Service',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Post Service',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_post_service',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.sections.push({
		id: 'service_parts',
		name: 'Service Parts',
		definitions: [
			{
				id: 'group2',
				name: 'Service Parts',
				description: 'Jump to a specific part of the service',
				type: 'simple',
				presets: ['start_pre_service', 'start_warm_up', 'start_service', 'start_post_service'],
			},
		],
	})
}
