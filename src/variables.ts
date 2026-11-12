import type { QuickScreenKind, ServiceItemKind } from '@hussra/logos-proclaim'
import type ModuleInstance from './main.js'

export type VariablesSchema = {
	on_air: boolean
	session_id: string
	presentation_title: string
	presentation_id: string
	presentation_group_name: string
	presentation_group_id: string
	presentation_date: number
	presentation_start_time: number
	item_count: number
	item_index: number
	item_title: string
	item_id: string
	item_kind: ServiceItemKind | null
	song_count: number
	song_index: number
	slide_count: number
	slide_index: number
	quick_screen_kind: QuickScreenKind | null
	stage_direction: string
}

/**
 * Register module variables
 * @param self - the module instance
 */
export const UpdateVariableDefinitions = function (self: ModuleInstance): void {
	self.setVariableDefinitions({
		on_air: { name: 'On Air' },
		session_id: { name: 'Session ID' },
		presentation_title: { name: 'Presentation Title' },
		presentation_id: { name: 'Presentation ID' },
		presentation_group_name: { name: 'Presentation Group Name' },
		presentation_group_id: { name: 'Presentation Group ID' },
		presentation_date: { name: 'Presentation Date - Unix Timestamp' },
		presentation_start_time: { name: 'Presentation Start Time (On Air since) - Unix Timestamp' },
		item_count: { name: 'Number of Service Items in Current Presentation' },
		item_index: { name: 'Service Item Index' },
		item_title: { name: 'Service Item Title' },
		item_id: { name: 'Service Item ID' },
		item_kind: { name: 'Service Item Type' },
		song_count: { name: 'Number of Songs in Current Presentation' },
		song_index: { name: 'Song Index' },
		slide_count: { name: 'Number of Slides in Current Service Item' },
		slide_index: { name: 'Slide Index in Current Service Item' },
		quick_screen_kind: { name: 'Quick Screen Type' },
		stage_direction: { name: 'Stage Direction' },
	})
}

export const InitializeVariables = function (self: ModuleInstance): void {
	self.setVariableValues({
		on_air: false,
		session_id: '',
		presentation_title: '',
		presentation_id: '',
		presentation_group_name: '',
		presentation_group_id: '',
		presentation_date: 0,
		presentation_start_time: 0,
		item_count: 0,
		item_index: 0,
		item_title: '',
		item_id: '',
		item_kind: null,
		song_count: 0,
		song_index: 0,
		slide_count: 0,
		slide_index: 0,
		quick_screen_kind: null,
		stage_direction: '',
	})
}
