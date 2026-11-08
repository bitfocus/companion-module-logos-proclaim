import ModuleInstance from './main.js'

export type FeedbacksSchema = {
	on_air: {
		type: 'boolean'
		options: Record<never, never>
	}
}

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
	})
}
