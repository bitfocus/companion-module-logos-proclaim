import type { CompanionPresetSection, CompanionPresetDefinitions } from '@companion-module/base'
import type { ModuleSchema } from '../main.js'
import type ModuleInstance from '../main.js'
import { createOnAirPresets } from './onair.js'
import { createServicePartPresets } from './serviceparts.js'
import { createConnectionPresets } from './connection.js'
import { createSlidePresets } from './slides.js'
import { createMediaPresets } from './media.js'
import { createQuickScreenPresets } from './quickscreens.js'
import { createSongPartPresets } from './songparts.js'
import { createSongPresets } from './songs.js'

export interface PresetsBuilderContext {
	readonly sections: CompanionPresetSection<ModuleSchema>[]
	readonly definitions: CompanionPresetDefinitions<ModuleSchema>
}

/**
 * Register module presets
 *
 * @param self - the module instance
 */
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
