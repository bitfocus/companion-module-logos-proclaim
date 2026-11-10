import type ModuleInstance from './main.js'

export type VariablesSchema = {
	on_air: boolean
	session_id: string
}

/**
 * Register module variables
 * @param self - the module instance
 */
export const UpdateVariableDefinitions = function (self: ModuleInstance): void {
	self.setVariableDefinitions({
		on_air: { name: 'On Air' },
		session_id: { name: 'Session ID' },
	})
}
