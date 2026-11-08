//import { SONG_PARTS, SIMPLE_ACTIONS, CUSTOM_QUICK_SCREEN_COUNT } from './refdata.js'
import type ModuleInstance from '../main.js'
import { combineRgb } from '@companion-module/base'
import type { PresetsBuilderContext } from './context.js'
import { createOnAirPresets } from './onair.js'
import { createServicePartPresets } from './serviceparts.js'
import { createConnectionPresets } from './connection.js'
import { createSlidePresets } from './slides.js'
import { createMediaPresets } from './media.js'
import { createQuickScreenPresets } from './quickscreens.js'
import { createSongPartPresets } from './songparts.js'

export const DEFAULT_PRESET_STYLE = {
	size: 18,
	bgcolor: combineRgb(0, 0, 0),
	color: combineRgb(255, 255, 255),
}

export const UpdatePresets = function (self: ModuleInstance): void {
	const context: PresetsBuilderContext = {
		sections: [],
		definitions: {},
	}

	createOnAirPresets(context)
	createServicePartPresets(context)
	createSlidePresets(context)
	createSongPartPresets(context)
	createMediaPresets(context)
	createQuickScreenPresets(context)
	createConnectionPresets(context)

	self.setPresetDefinitions(context.sections, context.definitions)
}
