import type ModuleInstance from '../main.js'
import type { PresetsBuilderContext } from './context.js'
import { createOnAirPresets } from './onair.js'
import { createServicePartPresets } from './serviceparts.js'
import { createConnectionPresets } from './connection.js'
import { createSlidePresets } from './slides.js'
import { createMediaPresets } from './media.js'
import { createQuickScreenPresets } from './quickscreens.js'
import { createSongPartPresets } from './songparts.js'
import { createSongPresets } from './songs.js'

export const DEFAULT_PRESET_STYLE = {
	size: 18,
	bgcolor: 0x000000,
	color: 0xffffff,
}

export const UpdatePresets = function (self: ModuleInstance): void {
	const context: PresetsBuilderContext = {
		sections: [],
		definitions: {},
	}

	createOnAirPresets(context)
	createServicePartPresets(context)
	createSlidePresets(context)
	createSongPresets(context)
	createSongPartPresets(context)
	createMediaPresets(context)
	createQuickScreenPresets(context)
	createConnectionPresets(context)

	self.setPresetDefinitions(context.sections, context.definitions)
}
