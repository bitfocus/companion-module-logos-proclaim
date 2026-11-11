import type { ServiceItemKind } from '@hussra/logos-proclaim'
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
	song_count: number
	item_id: string
	item_title: string
	item_index: number
	item_kind: ServiceItemKind | null
	slide_count: number
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
		song_count: { name: 'Number of Songs in Current Presentation' },
		item_id: { name: 'Service Item ID' },
		item_title: { name: 'Service Item Title' },
		item_index: { name: 'Service Item Index' },
		item_kind: { name: 'Service Item Type' },
		slide_count: { name: 'Number of SLides in Current Service Item' },
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
		song_count: 0,
		item_id: '',
		item_title: '',
		item_index: 0,
		item_kind: null,
		slide_count: 0,
	})
}
