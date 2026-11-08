import { DEFAULT_PRESET_STYLE } from './index.js'
import type { PresetsBuilderContext } from './context.js'
import { SONG_PARTS, VERSE_COUNT } from '../refdata.js'

export function createSongPartPresets(context: PresetsBuilderContext): void {
	for (const part of SONG_PARTS) {
		const partId = part.id
		const label = part.label
		const displayLabel = part.displayLabel || part.label

		if (label == 'Verse') {
			for (let v = 1; v <= VERSE_COUNT; v++) {
				const presetId = `song_part_${label.toLowerCase()}_${v}`
				context.definitions[presetId] = {
					type: 'simple',
					name: `${label} ${v}`,
					style: {
						...DEFAULT_PRESET_STYLE,
						text: `${displayLabel}\\n${v}`,
					},
					steps: [
						{
							down: [
								{
									actionId: 'go_to_song_part',
									options: {
										song_part: partId,
										item_index: v,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [],
				}
			}
		} else {
			const presetId = `song_part_${label.toLowerCase()}`
			context.definitions[presetId] = {
				type: 'simple',
				name: label,
				style: {
					...DEFAULT_PRESET_STYLE,
					text: displayLabel,
				},
				steps: [
					{
						down: [
							{
								actionId: 'go_to_song_part',
								options: {
									song_part: partId,
									item_index: 1,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	context.sections.push({
		id: 'songparts',
		name: 'Song Parts',
		definitions: [
			{
				id: 'verses',
				type: 'simple',
				name: 'Verses',
				description: `If you need more than ${VERSE_COUNT} verses, customise the action to go to a different verse.`,
				presets: new Array(VERSE_COUNT).fill(0).map((_v, index) => `song_part_verse_${index + 1}`),
			},
			{
				id: 'others',
				type: 'simple',
				name: 'Other Parts',
				description: `If you have multiple choruses, bridges etc. these presets will always go to the first chorus, bridge etc. - customise the action if needed to go to a different chorus etc.`,
				presets: SONG_PARTS.filter((part) => part.label !== 'Verse').map(
					(part) => `song_part_${part.label.toLowerCase()}`,
				),
			},
		],
	})
}
