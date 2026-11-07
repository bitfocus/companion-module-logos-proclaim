import { type CompanionActionDefinitions } from '@companion-module/base'
import ModuleInstance from './main.js'
import { SONG_PARTS, SIMPLE_ACTIONS, CUSTOM_QUICK_SCREEN_COUNT } from './refdata.js'

type SimpleActionId<Name extends string> = Name extends `${infer Word} ${infer Rest}`
	? `${Lowercase<Word>}_${SimpleActionId<Rest>}`
	: Lowercase<Name>

type SimpleActionIds = SimpleActionId<(typeof SIMPLE_ACTIONS)[number]['name']>

type BaseActionsSchema = {
	reconnect: {
		options: Record<never, never>
	}
	on_air_toggle: {
		options: Record<never, never>
	}
	go_to_service_item: {
		options: {
			num: number
		}
	}
	go_to_slide: {
		options: {
			num: number
		}
	}
	go_to_song_part: {
		options: {
			song_part: number
			item_index: number
		}
	}
	show_custom_quick_screen: {
		options: {
			num: number
		}
	}
}

export type ActionsSchema = BaseActionsSchema & Record<SimpleActionIds, { options: Record<never, never> }>

export const UpdateActions = function (self: ModuleInstance): void {
	const actions: Partial<CompanionActionDefinitions<ActionsSchema>> = {
		reconnect: {
			name: 'Reconnect',
			options: [],
			callback: async () => {
				await self.proclaimAPI.reconnect()
			},
		},

		on_air_toggle: {
			name: 'Toggle On Air',
			options: [],
			callback: async () => {
				if (self.proclaimAPI.status.onAir) {
					await self.proclaimAPI.sendAppCommand('GoOffAir')
				} else {
					await self.proclaimAPI.sendAppCommand('GoOnAir')
				}
			},
		},

		go_to_service_item: {
			name: 'Go To Service Item',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Service Item Number',
					default: 1,
					min: 1,
					max: 254,
				},
			],
			callback: async (event) => {
				await self.proclaimAPI.sendAppCommand('GoToServiceItem', event.options.num)
			},
		},

		go_to_slide: {
			name: 'Go To Slide',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Slide Number',
					default: 1,
					min: 1,
					max: 254,
				},
			],
			callback: async (event) => {
				await self.proclaimAPI.sendAppCommand('GoToSlide', event.options.num)
			},
		},

		go_to_song_part: {
			name: 'Go To Song Part',
			options: [
				{
					type: 'dropdown',
					id: 'song_part',
					label: 'Song Part',
					default: 0,
					choices: SONG_PARTS,
				},
				{
					id: 'item_index',
					type: 'number',
					label: 'Index',
					default: 1,
					min: 1,
					max: 254,
				},
			],
			callback: async (event) => {
				const part = SONG_PARTS[event.options.song_part].label
				await self.proclaimAPI.sendAppCommand(`ShowSongLyrics${part}ByIndex`, event.options.item_index)
			},
		},

		show_custom_quick_screen: {
			name: 'Show Custom Quick Screen',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Custom Quick Screen Number',
					default: 1,
					min: 1,
					max: CUSTOM_QUICK_SCREEN_COUNT,
				},
			],
			callback: async (event) => {
				await self.proclaimAPI.sendAppCommand('ShowCustomQuickScreen', event.options.num)
			},
		},
	}

	// Add simple actions, using the list from refdata.js
	for (const action of SIMPLE_ACTIONS) {
		const id = action.name.split(' ').join('_').toLowerCase() as SimpleActionIds
		const name = action.name
		const appCommand =
			'appCommand' in action && typeof action.appCommand === 'string' ? action.appCommand : name.split(' ').join('')
		actions[id] = {
			name: name,
			callback: async () => {
				await self.proclaimAPI.sendAppCommand(appCommand)
			},
			options: [],
		}
	}

	self.setActionDefinitions(actions as CompanionActionDefinitions<ActionsSchema>)
}
