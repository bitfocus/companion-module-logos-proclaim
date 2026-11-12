import { QuickScreenKind } from '@hussra/logos-proclaim'
import type ModuleInstance from './main.js'

export type FeedbacksSchema = {
	on_air: {
		type: 'boolean'
		options: Record<never, never>
	}

	quick_screen: {
		type: 'boolean'
		options: {
			quickScreen: keyof typeof QuickScreenKind
		}
	}
}

/**
 * Register module feedbacks
 *
 * @param self - the module instance
 */
export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		on_air: {
			name: 'On Air',
			type: 'boolean',
			description: 'Whether or not Proclaim is On Air',
			defaultStyle: {
				bgcolor: 0xff0000,
				color: 0x000000,
			},
			options: [],
			callback: () => {
				return self.proclaimAPI.status.onAir
			},
		},

		quick_screen: {
			name: 'Quick Screen',
			type: 'boolean',
			description: 'Whether a particular Quick Screen is active',
			defaultStyle: {
				bgcolor: 0xffff00,
				color: 0x000000,
			},
			options: [
				{
					id: 'quickScreen',
					type: 'dropdown',
					label: 'Quick Screen',
					default: 'None',
					choices: Object.keys(QuickScreenKind).map((key) => {
						return { id: key, label: QuickScreenKind[key as keyof typeof QuickScreenKind] }
					}),
				},
			],
			callback: (event) => {
				const feedbackQuickScreenKind: QuickScreenKind = QuickScreenKind[event.options.quickScreen]
				return feedbackQuickScreenKind == self.proclaimAPI.status.quickScreenKind
			},
		},
	})
}
