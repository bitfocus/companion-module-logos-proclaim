import { COLOURS, DEFAULT_PRESET_STYLE, type SongPart } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'
import { SONG_PARTS, VERSE_COUNT } from '../refdata.js'
import { ServiceItemKind } from '@hussra/logos-proclaim'
import type { CompanionSomePresetDefinition } from '@companion-module/base'
import type { ModuleSchema } from '../main.js'

export function createSongPartPresets(context: PresetsBuilderContext): void {
	for (const part of SONG_PARTS) {
		if (part.label == 'Verse') {
			for (let v = 1; v <= VERSE_COUNT; v++) {
				const presetId = `song_part_${part.label.toLowerCase()}_${v}`
				context.definitions[presetId] = makeSongPartPreset(context, part, v)
			}
		} else {
			const presetId = `song_part_${part.label.toLowerCase()}`
			context.definitions[presetId] = makeSongPartPreset(context, part, 1)
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

function makeSongPartPreset(
	context: PresetsBuilderContext,
	part: SongPart,
	v: number,
): CompanionSomePresetDefinition<ModuleSchema> {
	const partId = part.id
	const label = part.label
	const colours = part.colours
	const text = part.label == 'Verse' ? `${part.displayLabel || part.label}\n${v}` : `${part.displayLabel || part.label}`
	return {
		type: 'simple',
		name: `${label} ${v}`,
		style: {
			...DEFAULT_PRESET_STYLE,
			text: text,
			bgcolor: context.self.config.basicPresets ? COLOURS.black : colours[(v - 1) % colours.length],
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
		feedbacks: [
			{
				feedbackId: 'item_kind',
				options: {
					kind: ServiceItemKind[ServiceItemKind.SongLyrics],
				},
				isInverted: true,
				style: {
					color: COLOURS.inactive,
					bgcolor: COLOURS.black,
				},
			},
		],
	}
}
