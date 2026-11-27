import { ServiceItemKind } from '@hussra/logos-proclaim'
import { COLOURS, DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'
import type { CompanionButtonStyleProps } from '@companion-module/base'

export function createStatusInfoPresets(context: PresetsBuilderContext): void {
	const style: Omit<CompanionButtonStyleProps, 'text'> = {
		...DEFAULT_PRESET_STYLE,
		bgcolor: context.self.config.basicPresets ? COLOURS.black : COLOURS.statusInfo,
		size: 'auto',
	}

	context.definitions['presentation_date'] = {
		type: 'simple',
		name: 'Presentation Date',
		style: {
			...style,
			text: "$(logos-proclaim:presentation_date) ? dateFormat($(logos-proclaim:presentation_date),'dddd DD MMM YYYY') : 'Presentation Date'",
			textExpression: true,
		},
		steps: [],
		feedbacks: [],
	}

	context.definitions['presentation_title'] = {
		type: 'simple',
		name: 'Presentation Title',
		style: {
			...style,
			text: "$(logos-proclaim:presentation_title) ? $(logos-proclaim:presentation_title) : 'Presentation Title'",
			textExpression: true,
		},
		steps: [],
		feedbacks: [],
	}

	context.definitions['item_title'] = {
		type: 'simple',
		name: 'Item Title',
		style: {
			...style,
			text: "$(logos-proclaim:item_title) ? $(logos-proclaim:item_title) : 'Item Title'",
			textExpression: true,
		},
		steps: [],
		feedbacks: [],
	}

	context.definitions['stage_direction'] = {
		type: 'simple',
		name: 'Stage Direction',
		style: {
			...style,
			text: "!$(logos-proclaim:stage_direction) && !$(logos-proclaim:on_air) ? 'Stage Direction' : $(logos-proclaim:stage_direction)",
			textExpression: true,
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'stage_direction',
				options: {},
				style: {
					bgcolor: 0x990000,
					color: 0xffffff,
				},
			},
		],
	}

	context.definitions['item_info'] = {
		type: 'simple',
		name: 'Item n of m',
		style: {
			...style,
			text: 'Item $(logos-proclaim:item_index) of $(logos-proclaim:item_count)',
		},
		steps: [],
		feedbacks: [],
	}

	context.definitions['song_info'] = {
		type: 'simple',
		name: 'Song n of m',
		style: {
			...style,
			text: 'Song $(logos-proclaim:song_index) of $(logos-proclaim:song_count)',
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
					color: COLOURS.inactive,
				},
			},
			{
				feedbackId: 'on_air',
				options: {},
				isInverted: true,
				style: {
					color: COLOURS.white,
				},
			},
		],
	}

	context.definitions['slide_info'] = {
		type: 'simple',
		name: 'Slide n of m',
		style: {
			...style,
			text: 'Slide $(logos-proclaim:slide_index) of $(logos-proclaim:slide_count)',
		},
		steps: [],
		feedbacks: [],
	}

	context.sections.push({
		id: 'status_info',
		name: 'Status Information',
		definitions: [
			'presentation_date',
			'presentation_title',
			'item_title',
			'stage_direction',
			'item_info',
			'song_info',
			'slide_info',
		],
	})
}
