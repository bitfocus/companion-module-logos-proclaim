import {
	DisplayableServiceItemKind,
	MediaState,
	QuickScreenKind,
	ServiceItemKind,
	ServicePart,
} from '@hussra/logos-proclaim'
import type ModuleInstance from './main.js'
import { truncate } from './util.js'

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

	item: {
		type: 'boolean'
		options: {
			id: string
		}
	}

	song: {
		type: 'boolean'
		options: {
			num: number
		}
	}

	has_song: {
		type: 'boolean'
		options: {
			num: number
		}
	}

	song_title: {
		type: 'value'
		options: {
			num: number
			maxLength: number
		}
	}

	grouping_title: {
		type: 'value'
		options: {
			id: string
			maxLength: number
		}
	}

	item_title: {
		type: 'value'
		options: {
			id: string
			maxLength: number
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
			name: 'Quick Screen Active',
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
			callback: (feedback) => {
				const feedbackQuickScreenKind: QuickScreenKind = QuickScreenKind[feedback.options.quickScreen]
				return feedbackQuickScreenKind == self.proclaimAPI.status.quickScreenKind
			},
		},

		service_part: {
			name: 'Service Part Active',
			type: 'boolean',
			description:
				'Change style when an item within a particular service part (pre-service, warm-up, service, post-service) is active',
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
			callback: (feedback) => {
				const servicePart = ServicePart[feedback.options.servicePart]
				const currentServicePart = self.proclaimAPI.status.servicePart

				return currentServicePart === servicePart
			},
		},

		has_service_part: {
			name: 'Service Part Exists',
			type: 'boolean',
			description:
				'Change style when the presentation contains a particular service part (pre-service, warm-up, service, post-service)',
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
			callback: (feedback) => {
				if (!self.proclaimAPI.status.onAir) {
					return true
				}
				const warmupStartIndex = self.proclaimAPI.status.presentation?.warmupStartIndex ?? -1
				const serviceStartIndex = self.proclaimAPI.status.presentation?.serviceStartIndex ?? -1
				const postServiceStartIndex = self.proclaimAPI.status.presentation?.postServiceStartIndex ?? -1
				const itemCount = self.proclaimAPI.status.itemCount

				const servicePart = ServicePart[feedback.options.servicePart]

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
			name: 'Type Active',
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
			callback: (feedback) => {
				const kind = ServiceItemKind[feedback.options.kind]
				return self.proclaimAPI.status.itemKind === kind
			},
		},

		grouping: {
			name: 'Group Active',
			type: 'boolean',
			description: 'Change style when an item within a particular item group is active',
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
						'Pick an exact section from the drop-down, or enter a title to match (either exactly or within the section title). You will only be able to pick from the drop-down when Proclaim is on air',
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
			callback: (feedback) => {
				if (feedback.options.id !== '') {
					return feedback.options.id === self.proclaimAPI.status.groupingId
				} else {
					if (feedback.options.exact) {
						return feedback.options.title !== '' && feedback.options.title === self.proclaimAPI.status.groupingTitle
					} else {
						return (
							feedback.options.title !== '' &&
							self.proclaimAPI.status.groupingTitle.indexOf(feedback.options.title) !== -1
						)
					}
				}
			},
		},

		media_state: {
			type: 'boolean',
			name: 'Media State',
			description: 'Change style based on the Proclaim media state (running, paused, stopped)',
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
			callback: (feedback) => {
				const state = MediaState[feedback.options.state]
				return self.proclaimAPI.status.mediaState === state
			},
		},

		item: {
			type: 'boolean',
			name: 'Item Active',
			description: 'Change style when a specific service item is active',
			defaultStyle: {
				bgcolor: 0x00ff00,
				color: 0x000000,
			},
			options: [
				{
					id: 'lbl',
					type: 'static-text',
					label: 'Note',
					description: 'You will only be able to configure this feedback when Proclaim is on air',
					value: '',
				},
				{
					id: 'id',
					type: 'dropdown',
					label: 'Item ID',
					default: '',
					choices: (self.proclaimAPI.status.presentation?.serviceItems ?? [])
						.filter((item) => Object.keys(DisplayableServiceItemKind).includes(item.kind))
						.map((item) => {
							return { id: item.id, label: item.title }
						}),
				},
			],
			callback: (feedback) => {
				return feedback.options.id === self.proclaimAPI.status.itemId
			},
		},

		song: {
			type: 'boolean',
			name: 'Song Active',
			description: 'Change style when a specific song number is active',
			defaultStyle: {
				bgcolor: 0xffff00,
				color: 0x000000,
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Song Number',
					default: 1,
					min: 1,
					max: 254,
				},
			],
			callback: (feedback) => {
				return feedback.options.num === self.proclaimAPI.status.songIndex + 1
			},
		},

		has_song: {
			type: 'boolean',
			name: 'Song Exists',
			description: 'Change style when the presentation contains at least the specified number of songs',
			defaultStyle: {
				bgcolor: 0x000000,
				color: 0x333333,
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Song Number',
					default: 1,
					min: 1,
					max: 254,
				},
			],
			callback: (feedback) => {
				return feedback.options.num <= self.proclaimAPI.status.songCount
			},
		},

		song_title: {
			type: 'value',
			name: 'Song Name',
			description: 'Returns the name of the specified song number',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Song Number',
					default: 1,
					min: 1,
					max: 254,
				},
				{
					id: 'maxLength',
					type: 'number',
					label: 'Max length (or 0 to not truncate)',
					default: 0,
					min: 0,
					max: 250,
				},
			],
			callback: (feedback) => {
				if (!self.proclaimAPI.status.presentation) return 'Proclaim off air'
				const num = feedback.options.num
				if (!self.proclaimAPI.status.presentation || num < 1 || self.proclaimAPI.status.songCount < num) {
					return ''
				}
				const songs = self.proclaimAPI.status.presentation.serviceItems.filter(
					(item) => (item.kind as DisplayableServiceItemKind) === DisplayableServiceItemKind.SongLyrics,
				)
				return truncate(songs[num - 1].title, feedback.options.maxLength)
			},
		},

		grouping_title: {
			type: 'value',
			name: 'Group Name',
			description: 'Returns the name of a specific item group',
			options: [
				{
					id: 'lbl',
					type: 'static-text',
					label: 'Note',
					description: 'You will only be able to configure this feedback when Proclaim is on air',
					value: '',
				},
				{
					id: 'id',
					type: 'textinput',
					label: 'Group ID',
					default: '',
				},
				{
					id: 'maxLength',
					type: 'number',
					label: 'Max length (or 0 to not truncate)',
					default: 0,
					min: 0,
					max: 250,
				},
			],
			callback: (feedback) => {
				if (!self.proclaimAPI.status.presentation) return 'Proclaim off air'
				return truncate(
					self.proclaimAPI.status.groupings?.find((grouping) => grouping.id === feedback.options.id)?.title ??
						'Unable to find group',
					feedback.options.maxLength,
				)
			},
		},

		item_title: {
			type: 'value',
			name: 'Item Name',
			description: 'Returns the name of a specific service item',
			options: [
				{
					id: 'lbl',
					type: 'static-text',
					label: 'Note',
					description: 'You will only be able to configure this feedback when Proclaim is on air',
					value: '',
				},
				{
					id: 'id',
					type: 'textinput',
					label: 'Item ID',
					default: '',
				},
				{
					id: 'maxLength',
					type: 'number',
					label: 'Max length (or 0 to not truncate)',
					default: 0,
					min: 0,
					max: 250,
				},
			],
			callback: (feedback) => {
				if (!self.proclaimAPI.status.presentation) return 'Proclaim off air'
				return truncate(
					self.proclaimAPI.status.presentation?.serviceItems.find((item) => item.id === feedback.options.id)?.title ??
						'Unable to find item',
					feedback.options.maxLength,
				)
			},
		},
	})
}
