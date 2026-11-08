import { DEFAULT_PRESET_STYLE } from './index.js'
import type { PresetsBuilderContext } from './context.js'

export function createSlidePresets(context: PresetsBuilderContext): void {
	context.definitions['previous_slide'] = {
		type: 'simple',
		name: 'Previous Slide',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Prev Slide',
		},
		steps: [
			{
				down: [
					{
						actionId: 'previous_slide',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['next_slide'] = {
		type: 'simple',
		name: 'Next Slide',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Next Slide',
		},
		steps: [
			{
				down: [
					{
						actionId: 'next_slide',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['previous_service_item'] = {
		type: 'simple',
		name: 'Previous Service Item',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Prev Item',
		},
		steps: [
			{
				down: [
					{
						actionId: 'previous_service_item',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['next_service_item'] = {
		type: 'simple',
		name: 'Next Service Item',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Next Item',
		},
		steps: [
			{
				down: [
					{
						actionId: 'next_service_item',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.sections.push({
		id: 'slides',
		name: 'Slides',
		definitions: [
			{
				id: 'group2',
				name: 'Slides',
				description: 'Move to the next or previous slide, or next or previous service item',
				type: 'simple',
				presets: ['previous_slide', 'next_slide', 'previous_service_item', 'next_service_item'],
			},
		],
	})
}
