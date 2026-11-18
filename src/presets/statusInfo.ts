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

	context.sections.push({
		id: 'status_info',
		name: 'Status Information',
		definitions: ['presentation_date', 'presentation_title'],
	})
}
