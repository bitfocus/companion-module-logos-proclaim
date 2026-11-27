import type { CompanionSomePresetDefinition, SomePresetActionEntry } from '@companion-module/base'
import type { ModuleSchema } from '../main.js'
import { COLOURS, DEFAULT_PRESET_STYLE } from '../refdata.js'
import { makeActiveElement, makeBackgroundElement, makeTextElement, type PresetsBuilderContext } from './index.js'
import { QuickScreenKind } from '@hussra/logos-proclaim'

export function createQuickScreenPresets(context: PresetsBuilderContext): void {
	context.definitions['show_blank_quick_screen'] = makeQuickScreenPreset(
		context,
		'Show Blank Quick Screen',
		'Blank',
		{
			actionId: 'toggle_blank_quick_screen',
			options: {},
		},
		'Blank',
	)

	context.definitions['show_logo_quick_screen'] = makeQuickScreenPreset(
		context,
		'Show Logo Quick Screen',
		'Logo',
		{
			actionId: 'toggle_logo_quick_screen',
			options: {},
		},
		'Logo',
	)

	context.definitions['show_no_text_quick_screen'] = makeQuickScreenPreset(
		context,
		'Show No Text Quick Screen',
		'No Text',
		{
			actionId: 'toggle_no_text_quick_screen',
			options: {},
		},
		'NoText',
	)

	context.definitions['show_custom_1_quick_screen'] = makeQuickScreenPreset(
		context,
		'Show Custom Quick Screen 1',
		'Custom 1',
		{
			actionId: 'toggle_custom_quick_screen',
			options: {
				num: 1,
			},
		},
		'Custom',
	)

	context.definitions['show_custom_2_quick_screen'] = makeQuickScreenPreset(
		context,
		'Show Custom Quick Screen 2',
		'Custom 2',
		{
			actionId: 'toggle_custom_quick_screen',
			options: {
				num: 2,
			},
		},
		'Custom',
	)

	context.definitions['show_floating_hearts_quick_screen'] = {
		type: 'simple',
		name: 'Show Floating Hearts Quick Screen',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Floating Hearts',
			bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.quickScreen.floating,
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
			bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.quickScreen.floating,
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
			bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.quickScreen.floating,
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
			bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.quickScreen.floating,
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
			bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.quickScreen.floating,
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
			bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.quickScreen.floating,
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
			bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.quickScreen.floating,
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

function makeQuickScreenPreset(
	context: PresetsBuilderContext,
	name: string,
	text: string,
	action: SomePresetActionEntry<ModuleSchema>,
	feedback: keyof typeof QuickScreenKind,
): CompanionSomePresetDefinition<ModuleSchema> {
	if (context.self.config.basicPresets) {
		return {
			type: 'simple',
			name: name,
			style: {
				...DEFAULT_PRESET_STYLE,
				text: text,
			},
			steps: [
				{
					down: [action],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'quick_screen',
					options: {
						quickScreen: feedback,
					},
					style: {
						bgcolor: 0xffff00,
						color: 0x000000,
					},
				},
			],
		}
	} else {
		return {
			type: 'layered',
			name: name,
			elements: [makeBackgroundElement(COLOURS.quickScreen.fullScreen), makeActiveElement(), makeTextElement(text)],
			steps: [
				{
					down: [action],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'quick_screen',
					options: {
						quickScreen: feedback,
					},
					styleOverrides: [
						{
							elementId: 'active',
							elementProperty: 'enabled',
							override: true,
						},
					],
				},
			],
		}
	}
}
