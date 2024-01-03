import { songParts, simpleActions } from './refdata.js'

export const UpdateActions = function (self) {
	let actions = {
		on_air_toggle: {
			name: 'Toggle On Air',
			callback: async () => {
				if (self.proclaimAPI.on_air) {
					self.proclaimAPI.sendAppCommand('GoOffAir')
				} else {
					self.proclaimAPI.sendAppCommand('GoOnAir')
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
				self.proclaimAPI.sendAppCommand('GoToServiceItem', event.options.num)
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
				self.proclaimAPI.sendAppCommand('GoToSlide', event.options.num)
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
					choices: songParts,
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
				const part = songParts[event.options.song_part].label
				self.proclaimAPI.sendAppCommand(`ShowSongLyrics${part}ByIndex`, event.options.item_index)
			},
		},
	}

	// Add simple actions
	for (var action in simpleActions) {
		let id = simpleActions[action].id
		let name = simpleActions[action].name
		let appCommand = simpleActions[action].appCommand
		actions[id] = {
			name: name,
			callback: async () => {
				self.proclaimAPI.sendAppCommand(appCommand)
			},
		}
	}

	self.setActionDefinitions(actions)
}
