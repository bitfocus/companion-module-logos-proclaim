import { songParts, simpleActions } from './refdata.js'
import { combineRgb } from '@companion-module/base'

export const UpdatePresets = async function (self) {
	const style = {
		size: 18,
		bgcolor: combineRgb(0, 0, 0),
		color: combineRgb(255, 255, 255),
	}

	// On/Off Air Toggle with feedback
	let presets = {
		on_air: {
			type: 'button',
			category: 'On Air',
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
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'on_air',
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
		},
	}

	for (var preset in simpleActions) {
		let id = simpleActions[preset].id
		let name = simpleActions[preset].name
		let category = simpleActions[preset].category
		let text = simpleActions[preset].text
		let size = simpleActions[preset].size
		presets[id] = {
			type: 'button',
			category: category,
			name: name,
			style: {
				...style,
				size: size ? size : 18,
				text: text,
			},
			steps: [
				{
					down: [
						{
							actionId: id,
						},
					],
					up: [],
				},
			],
		}
	}

	// Song Parts
	for (var part in songParts) {
		if (songParts[part].label == 'Verse') {
			for (var v = 1; v < 10; v++) {
				const id = `song_part_${songParts[part].path}_${v}`
				presets[id] = {
					type: 'button',
					category: 'Song Parts',
					name: `${songParts[part].label} ${v}`,
					style: {
						...style,
						text: songParts[part].displayLabel
							? `${songParts[part].displayLabel}\\n${v}`
							: `${songParts[part].label}\\n${v}`,
					},
					steps: [
						{
							down: [
								{
									actionId: 'go_to_song_part',
									options: {
										song_part: songParts[part].id,
										item_index: v,
									},
								},
							],
							up: [],
						},
					],
				}
			}
		} else {
			const id = `song_part_${songParts[part].path}`
			presets[id] = {
				type: 'button',
				category: 'Song Parts',
				name: songParts[part].label,
				style: {
					...style,
					text: songParts[part].displayLabel ? songParts[part].displayLabel : songParts[part].label,
				},
				steps: [
					{
						down: [
							{
								actionId: 'go_to_song_part',
								options: {
									song_part: songParts[part].id,
									item_index: 1,
								},
							},
						],
						up: [],
					},
				],
			}
		}
	}

	self.setPresetDefinitions(presets)
}
