import { QuickScreenKind, ServicePart } from '@hussra/logos-proclaim'
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
  
	in_service_part: {
		type: 'boolean'
		options: {
			servicePart: keyof typeof ServicePart
		}
	}

	has_service_part: {
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
      }
    }

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

		has_service_part: {
			name: 'Has Service Part',
			type: 'boolean',
			description: 'Whether or not the current presentation contains a particular service part',
			defaultStyle: {
				bgcolor: 0x000000,
				color: 0x333333,
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
				if (!self.proclaimAPI.status.onAir) {
					return true
				}
				const warmupStartIndex = self.proclaimAPI.status.presentation?.warmupStartIndex ?? -1
				const serviceStartIndex = self.proclaimAPI.status.presentation?.serviceStartIndex ?? -1
				const postServiceStartIndex = self.proclaimAPI.status.presentation?.postServiceStartIndex ?? -1
				const itemCount = self.proclaimAPI.status.itemCount

				const servicePart = ServicePart[event.options.servicePart]

				switch (servicePart) {
					case ServicePart.PreService:
						return warmupStartIndex > 0
					case ServicePart.Warmup:
						return serviceStartIndex > warmupStartIndex
					case ServicePart.Service:
						return postServiceStartIndex > serviceStartIndex
					case ServicePart.PostService:
						return itemCount > postServiceStartIndex
				}
			},
		},
	})
}
