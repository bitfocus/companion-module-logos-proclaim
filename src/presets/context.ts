import type { CompanionPresetSection, CompanionPresetDefinitions } from '@companion-module/base'
import type { ModuleSchema } from '../main.js'

export interface PresetsBuilderContext {
	readonly sections: CompanionPresetSection<ModuleSchema>[]
	readonly definitions: CompanionPresetDefinitions<ModuleSchema>
}
