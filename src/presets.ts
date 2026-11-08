//import { SONG_PARTS, SIMPLE_ACTIONS, CUSTOM_QUICK_SCREEN_COUNT } from './refdata.js'
import type { ModuleSchema } from './main.js'
import type ModuleInstance from './main.js'
import { type CompanionPresetDefinitions, type CompanionPresetSection, combineRgb } from '@companion-module/base'

export const UpdatePresets = function (self: ModuleInstance): void {
	const style = {
		size: 18,
		bgcolor: combineRgb(0, 0, 0),
		color: combineRgb(255, 255, 255),
	}

	const presets: CompanionPresetDefinitions<ModuleSchema> = {}

	presets['on_air'] = {
		type: 'simple',
		name: 'On Air',
		style: {
			...style,
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
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(0, 0, 0),
				},
			},
		],
	}

	presets['start_pre_service'] = {
		type: 'simple',
		name: 'Start Pre Service',
		style: {
			...style,
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

	presets['start_warm_up'] = {
		type: 'simple',
		name: 'Start Warm Up',
		style: {
			...style,
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

	presets['start_service'] = {
		type: 'simple',
		name: 'Start Service',
		style: {
			...style,
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

	presets['start_post_service'] = {
		type: 'simple',
		name: 'Start Post Service',
		style: {
			...style,
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

	presets['reconnect'] = {
		type: 'simple',
		name: 'Reconnect',
		style: {
			...style,
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

	const structure: CompanionPresetSection[] = [
		{
			id: 'on_air',
			name: 'On Air',
			definitions: [
				{
					id: 'group1',
					name: 'On Air',
					description: 'Take Proclaim on or off air',
					type: 'simple',
					presets: ['on_air'],
				},
			],
		},

		{
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
		},

		{
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
		},
	]

	// On/Off Air Toggle with feedback
	// const presets: CompanionPresetDefinitions = {
	// 	reconnect: {
	// 		type: 'button',
	// 		category: 'Connection',
	// 		name: 'Reconnect',
	// 		]
	// 	},
	// ]

	// On/Off Air Toggle with feedback
	// const presets: CompanionPresetDefinitions = {
	// 	reconnect: {
	// 		type: 'button',
	// 		category: 'Connection',
	// 		name: 'Reconnect',
	// 		style: {
	// 			...style,
	// 			text: 'Reconnect',
	// 			size: 14,
	// 		},
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: 'reconnect',
	// 						options: {},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 		feedbacks: [],
	// 	},

	// 	on_air: {
	// 		type: 'button',
	// 		category: 'On Air',
	// 		name: 'On Air',
	// 		style: {
	// 			...style,
	// 			text: 'On Air',
	// 		},
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: 'on_air_toggle',
	// 						options: {},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 		feedbacks: [
	// 			{
	// 				feedbackId: 'on_air',
	// 				options: {},
	// 				style: {
	// 					bgcolor: combineRgb(255, 0, 0),
	// 					color: combineRgb(0, 0, 0),
	// 				},
	// 			},
	// 		],
	// 	},
	// }

	// Add simple action presets, using the list from refdata.js
	// for (const preset of SIMPLE_ACTIONS) {
	// 	const id = preset.name.split(' ').join('_').toLowerCase()
	// 	const name = preset.name
	// 	const category = preset.category
	// 	const text: string = preset.text || preset.name
	// 	const size: number = preset.size || 18
	// 	presets[id] = {
	// 		type: 'button',
	// 		category: category,
	// 		name: name,
	// 		style: {
	// 			...style,
	// 			size: size,
	// 			text: text,
	// 		},
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: id,
	// 						options: {},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 		feedbacks: [],
	// 	}
	// }

	// for (let i: number = 1; i <= CUSTOM_QUICK_SCREEN_COUNT; i++) {
	// 	presets[`show_custom_quick_screen_${i}`] = {
	// 		type: 'button',
	// 		category: 'Quick Screens',
	// 		name: `Show Custom Quick Screen ${i}`,
	// 		style: {
	// 			...style,
	// 			text: `Custom ${i}`,
	// 		},
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: 'show_custom_quick_screen',
	// 						options: {
	// 							num: i,
	// 						},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 		feedbacks: [],
	// 	}
	// }

	// // Song Parts
	// for (const part of SONG_PARTS) {
	// 	const partId = part.id
	// 	const label = part.label
	// 	const displayLabel = part.displayLabel || part.label

	// 	if (label == 'Verse') {
	// 		for (let v = 1; v < 10; v++) {
	// 			const presetId = `song_part_${label.toLowerCase()}_${v}`
	// 			presets[presetId] = {
	// 				type: 'button',
	// 				category: 'Song Parts',
	// 				name: `${label} ${v}`,
	// 				style: {
	// 					...style,
	// 					text: `${displayLabel}\\n${v}`,
	// 				},
	// 				steps: [
	// 					{
	// 						down: [
	// 							{
	// 								actionId: 'go_to_song_part',
	// 								options: {
	// 									song_part: partId,
	// 									item_index: v,
	// 								},
	// 							},
	// 						],
	// 						up: [],
	// 					},
	// 				],
	// 				feedbacks: [],
	// 			}
	// 		}
	// 	} else {
	// 		const presetId = `song_part_${label.toLowerCase()}`
	// 		presets[presetId] = {
	// 			type: 'button',
	// 			category: 'Song Parts',
	// 			name: label,
	// 			style: {
	// 				...style,
	// 				text: displayLabel,
	// 			},
	// 			steps: [
	// 				{
	// 					down: [
	// 						{
	// 							actionId: 'go_to_song_part',
	// 							options: {
	// 								song_part: partId,
	// 								item_index: 1,
	// 							},
	// 						},
	// 					],
	// 					up: [],
	// 				},
	// 			],
	// 			feedbacks: [],
	// 		}
	// 	}
	// }

	self.setPresetDefinitions(structure, presets)
}
