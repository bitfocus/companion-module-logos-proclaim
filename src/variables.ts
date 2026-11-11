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
	})
}
