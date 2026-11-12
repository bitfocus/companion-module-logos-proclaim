import { ServicePart } from '@hussra/logos-proclaim'
import type ModuleInstance from './main.js'

export type FeedbacksSchema = {
	on_air: {
		type: 'boolean'
		options: Record<never, never>
	}

	in_service_part: {
		type: 'boolean'
		options: {
			servicePart: keyof typeof ServicePart
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

		in_service_part: {
			name: 'In Service Part',
			type: 'boolean',
			description: 'Whether or not Proclaim is in a particular service part',
			defaultStyle: {
				bgcolor: 0x00ff00,
				color: 0x000000,
			},
			options: [
				{
					id: 'servicePart',
					type: 'dropdown',
					label: 'Service Part',
					default: ServicePart.Service,
					choices: Object.keys(ServicePart).map((key) => {
						return { id: key, label: ServicePart[key as keyof typeof ServicePart] }
					}),
				},
			],
			callback: (event) => {
				const servicePart = ServicePart[event.options.servicePart]
				const currentServicePart = self.proclaimAPI.status.servicePart

				return currentServicePart === servicePart
			},
		},
	})
}
