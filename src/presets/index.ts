import type {
	CompanionPresetSection,
	CompanionPresetDefinitions,
	ButtonGraphicsBoxElement,
	ButtonGraphicsTextElement,
} from '@companion-module/base'
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
import { createItemPresets } from './items.js'
import { createGroupPresets } from './groups.js'
import { createStatusInfoPresets } from './statusInfo.js'
import { COLOURS } from '../refdata.js'

export interface PresetsBuilderContext {
	readonly self: ModuleInstance
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
		self: self,
		sections: [],
		definitions: {},
	}

	createOnAirPresets(context)
	createServicePartPresets(context)
	createSlidePresets(context)
	createItemPresets(context)
	createGroupPresets(context)
	createSongPresets(context)
	createSongPartPresets(context)
	createMediaPresets(context)
	createQuickScreenPresets(context)
	createStatusInfoPresets(context)
	createConnectionPresets(context)

	self.setPresetDefinitions(context.sections, context.definitions)
}

export function makeBackgroundElement(color: number): ButtonGraphicsBoxElement {
	return {
		type: 'box',
		id: 'background',
		color: color,
	}
}

export function makeTextElement(buttonText: string): ButtonGraphicsTextElement {
	return {
		type: 'text',
		text: buttonText,
		id: 'text',
		fontsize: 38,
		fontsizeAllowShrink: true,
	}
}

export function makeActiveElement(): ButtonGraphicsBoxElement {
	return {
		type: 'box',
		id: 'active',
		color: COLOURS.transparent,
		borderWidth: 5,
		borderColor: COLOURS.active,
		borderPosition: 'inside',
		enabled: false,
	}
}
