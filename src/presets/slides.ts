import { COLOURS, DEFAULT_PRESET_STYLE } from '../refdata.js'
import { doubleLeftArrow, doubleRightArrow, leftArrow, rightArrow } from '../resources.js'
import type { PresetsBuilderContext } from './index.js'

export function createSlidePresets(context: PresetsBuilderContext): void {
	const basicPresets = context.self.config.basicPresets

	context.definitions['previous_slide'] = {
		type: 'simple',
		name: 'Previous Slide',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: basicPresets ? 'Prev Slide' : '',
			bgcolor: basicPresets ? 0x000000 : COLOURS.prevNext.slide,
			png64: basicPresets ? '' : leftArrow,
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
			text: basicPresets ? 'Next Slide' : '',
			bgcolor: basicPresets ? 0x000000 : COLOURS.prevNext.slide,
			png64: basicPresets ? '' : rightArrow,
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
			text: basicPresets ? 'Prev Item' : '',
			bgcolor: basicPresets ? 0x000000 : COLOURS.prevNext.item,
			png64: basicPresets ? '' : doubleLeftArrow,
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
			text: basicPresets ? 'Next Item' : '',
			bgcolor: basicPresets ? 0x000000 : COLOURS.prevNext.item,
			png64: basicPresets ? '' : doubleRightArrow,
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
		description: 'Jump to the previous or next slide',
		definitions: ['previous_slide', 'next_slide'],
	})

	context.sections.push({
		id: 'service_items',
		name: 'Service Items',
		description: 'Jump to the previous or next service item',
		definitions: ['previous_service_item', 'next_service_item'],
	})
}
