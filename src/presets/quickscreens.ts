import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createQuickScreenPresets(context: PresetsBuilderContext): void {
	context.definitions['show_blank_quick_screen'] = {
		type: 'simple',
		name: 'Show Blank Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Blank',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_blank_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_logo_quick_screen'] = {
		type: 'simple',
		name: 'Show Logo Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Logo',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_logo_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_no_text_quick_screen'] = {
		type: 'simple',
		name: 'Show No Text Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'No Text',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_no_text_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_custom_1_quick_screen'] = {
		type: 'simple',
		name: 'Show Custom Quick Screen 1',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Custom 1',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_custom_quick_screen',
						options: {
							num: 1,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_custom_2_quick_screen'] = {
		type: 'simple',
		name: 'Show Custom Quick Screen 2',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Custom 2',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_custom_quick_screen',
						options: {
							num: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_text'] = {
		type: 'simple',
		name: 'Show Text',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Show Text',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_text',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_last_slide'] = {
		type: 'simple',
		name: 'Show Last Slide',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Last Shown',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_last_slide',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_floating_hearts_quick_screen'] = {
		type: 'simple',
		name: 'Show Floating Hearts Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Floating Hearts',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_floating_hearts_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_floating_amens_quick_screen'] = {
		type: 'simple',
		name: 'Show Floating Amens Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Floating Amens',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_floating_amens_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_amen_quick_screen'] = {
		type: 'simple',
		name: 'Show Amen Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Amen',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_amen_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_hallelujah_quick_screen'] = {
		type: 'simple',
		name: 'Show Hallelujah Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Hallelujah',
			size: 'auto',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_hallelujah_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_praise_the_lord_quick_screen'] = {
		type: 'simple',
		name: 'Show Praise The Lord Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Praise The Lord',
			size: 'auto',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_praise_the_lord_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_he_is_risen_quick_screen'] = {
		type: 'simple',
		name: 'Show He Is Risen Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'He Is Risen',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_he_is_risen_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['show_he_is_risen_indeed_quick_screen'] = {
		type: 'simple',
		name: 'Show He Is Risen Indeed Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'He Is Risen Indeed',
			size: 'auto',
		},
		steps: [
			{
				down: [
					{
						actionId: 'show_he_is_risen_indeed_quick_screen',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.sections.push({
		id: 'quickscreens',
		name: 'Quick Screens',
		definitions: [
			{
				id: 'fullscreen',
				type: 'simple',
				name: 'Fullscreen Quick Screens',
				presets: [
					'show_blank_quick_screen',
					'show_logo_quick_screen',
					'show_no_text_quick_screen',
					'show_custom_1_quick_screen',
					'show_custom_2_quick_screen',
					'show_text',
					'show_last_slide',
				],
			},
			{
				id: 'floating',
				type: 'simple',
				name: 'Floating Quick Screens',
				presets: [
					'show_floating_hearts_quick_screen',
					'show_floating_amens_quick_screen',
					'show_amen_quick_screen',
					'show_hallelujah_quick_screen',
					'show_praise_the_lord_quick_screen',
					'show_he_is_risen_quick_screen',
					'show_he_is_risen_indeed_quick_screen',
				],
			},
		],
	})
}
