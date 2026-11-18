import { ServiceItemKind } from '@hussra/logos-proclaim'
import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createStatusInfoPresets(context: PresetsBuilderContext): void {
	context.definitions['presentation_date'] = {
		type: 'simple',
		name: 'On Air',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: "$(Proclaim:presentation_date) ? dateFormat($(Proclaim:presentation_date),'dddd DD MMM YYYY') : 'Presentation Date'",
			textExpression: true,
			size: 'auto',
		},
		steps: [],
		feedbacks: [],
	}

	context.definitions['presentation_title'] = {
		type: 'simple',
		name: 'On Air',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: "$(Proclaim:presentation_title) ? $(Proclaim:presentation_title) : 'Presentation Title'",
			textExpression: true,
			size: 'auto',
		},
		steps: [],
		feedbacks: [],
	}

	context.definitions['item_info'] = {
		type: 'simple',
		name: 'Item n of m',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Item $(Proclaim:item_index) of $(Proclaim:item_count)',
			size: 'auto',
		},
		steps: [],
		feedbacks: [],
	}

	context.definitions['song_info'] = {
		type: 'simple',
		name: 'Song n of m',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Song $(Proclaim:song_index) of $(Proclaim:song_count)',
			size: 'auto',
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'item_kind',
				options: {
					kind: ServiceItemKind[ServiceItemKind.SongLyrics],
				},
				isInverted: true,
				style: {
					color: 0x333333,
					bgcolor: 0x000000,
				},
			},
		],
	}

	context.definitions['slide_info'] = {
		type: 'simple',
		name: 'Slide n of m',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Slide $(Proclaim:slide_index) of $(Proclaim:slide_count)',
			size: 'auto',
		},
		steps: [],
		feedbacks: [],
	}

	context.sections.push({
		id: 'status_info',
		name: 'Status Information',
		definitions: ['presentation_date', 'presentation_title', 'item_info', 'song_info', 'slide_info'],
	})
}
