import ModuleInstance from './main.js'

export type VariablesSchema = {
	on_air: boolean
	session_id: string
}

export const UpdateVariableDefinitions = function (self: ModuleInstance): void {
	self.setVariableDefinitions({
		on_air: { name: 'On Air' },
		session_id: { name: 'Session ID' },
	})
}
