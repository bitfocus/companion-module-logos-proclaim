import type { ModuleInstance } from './main.js'

export const UpdateVariableDefinitions = function (self: ModuleInstance): void {
	self.setVariableDefinitions([
		{ variableId: 'on_air', name: 'On Air' },
		{ variableId: 'session_id', name: 'Session ID' },
	])
}
