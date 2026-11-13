import {
	DisplayableServiceItemKind,
	MediaState,
	QuickScreenKind,
	ServiceItemKind,
	ServicePart,
} from '@hussra/logos-proclaim'
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

	service_part: {
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

	item_kind: {
		type: 'boolean'
		options: {
			kind: keyof typeof ServiceItemKind
		}
	}

	grouping: {
		type: 'boolean'
		options: {
			lbl: undefined
			id: string
			title: string
			exact: boolean
		}
	}

	media_state: {
		type: 'boolean'
		options: {
			state: keyof typeof MediaState
		}
	}

	service_item: {
		type: 'boolean'
		options: {
			id: string
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
			description: 'Change style when Proclaim is On Air',
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
			description: 'Change style when a particular Quick Screen is active',
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

		service_part: {
			name: 'Service Part',
			type: 'boolean',
			description:
				'Change style when Proclaim is in a particular service part (pre-service, warm-up, service, post-service)',
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
			description:
				'Change style when the current presentation contains a particular service part (pre-service, warm-up, service, post-service)',
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

		item_kind: {
			name: 'Item kind',
			type: 'boolean',
			description: 'Change style when a particular kind of service item is active',
			defaultStyle: {
				bgcolor: 0x00ff00,
				color: 0x000000,
			},
			options: [
				{
					id: 'kind',
					type: 'dropdown',
					label: 'Item Kind',
					default: ServiceItemKind.SongLyrics,
					choices: Object.keys(DisplayableServiceItemKind).map((key) => {
						return { id: key, label: DisplayableServiceItemKind[key as keyof typeof DisplayableServiceItemKind] }
					}),
				},
			],
			callback: (event) => {
				const kind = ServiceItemKind[event.options.kind]
				return self.proclaimAPI.status.itemKind === kind
			},
		},

		grouping: {
			name: 'Item Group',
			type: 'boolean',
			description: 'Change style when an item within a particular group is active',
			defaultStyle: {
				bgcolor: 0xff00ff,
				color: 0xffffff,
			},
			options: [
				{
					id: 'lbl',
					type: 'static-text',
					label: 'Group to match',
					value:
						'Pick an exact section from the drop-down, or enter a title to match (either exactly or within the section title)',
				},
				{
					id: 'id',
					type: 'dropdown',
					label: 'Group ID',
					default: '',
					choices: [
						{ id: '', label: '-- None --' },
						...self.proclaimAPI.status.groupings.map((grouping) => {
							return { id: grouping.id, label: grouping.title }
						}),
					],
				},
				{
					id: 'title',
					type: 'textinput',
					label: 'Group Title',
					default: '',
				},
				{
					id: 'exact',
					type: 'checkbox',
					label: 'Exact title match?',
					default: true,
				},
			],
			callback: (event) => {
				if (event.options.id !== '') {
					return event.options.id === self.proclaimAPI.status.groupingId
				} else {
					if (event.options.exact) {
						return event.options.title !== '' && event.options.title === self.proclaimAPI.status.groupingTitle
					} else {
						return (
							event.options.title !== '' && self.proclaimAPI.status.groupingTitle.indexOf(event.options.title) !== -1
						)
					}
				}
			},
		},

		media_state: {
			type: 'boolean',
			name: 'Media State',
			description: 'Change style when the Proclaim media state is the selected value',
			defaultStyle: {
				bgcolor: 0xffa500,
				color: 0x000000,
			},
			options: [
				{
					id: 'state',
					type: 'dropdown',
					label: 'State',
					default: MediaState.Paused,
					choices: Object.keys(MediaState)
						.filter((key) => key !== 'None')
						.map((key) => {
							return { id: key, label: MediaState[key as keyof typeof MediaState] }
						}),
				},
			],
			callback: (event) => {
				const state = MediaState[event.options.state]
				return self.proclaimAPI.status.mediaState === state
			},
		},

		service_item: {
			type: 'boolean',
			name: 'Service Item',
			description: 'Change style when a particular service item is active',
			defaultStyle: {
				bgcolor: 0x00ff00,
				color: 0x000000,
			},
			options: [
				{
					id: 'id',
					type: 'dropdown',
					label: 'Item ID',
					default: '',
					choices: [
						{ id: '', label: '-- None --' },
						...(self.proclaimAPI.status.presentation?.serviceItems ?? [])
							.filter((item) => Object.keys(DisplayableServiceItemKind).includes(item.kind))
							.map((item) => {
								return { id: item.id, label: item.title }
							}),
					],
				},
			],
			callback: (event) => {
				return event.options.id === self.proclaimAPI.status.itemId
			},
		},
	})
}
