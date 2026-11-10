import { InstanceStatus } from '@companion-module/base'
import ModuleInstance from './main.js'

/**
 * Add event listeners for Proclaim events, to update Companion module status,
 * feedbacks and variables
 *
 * @param self - The module instance
 */
export function AddEventListeners(self: ModuleInstance): void {
	self.proclaimAPI.status.on('configValid', ({ data }) => {
		self.log('debug', `Proclaim configIsValid status changed: ${data}`)
		updateInstanceStatus(self)
	})

	self.proclaimAPI.status.on('connected', ({ data }) => {
		self.log('debug', `Proclaim connected status changed: ${data}`)
		updateInstanceStatus(self)
	})

	self.proclaimAPI.status.on('appCommandAPIAuthenticated', ({ data }) => {
		self.log('debug', `Proclaim authenticated status changed: ${data}`)
		updateInstanceStatus(self)
	})

	self.proclaimAPI.status.on('onAir', ({ data }) => {
		self.log('debug', `Proclaim onAir status changed: ${data}`)
		self.setVariableValues({
			on_air: data,
		})
		self.checkFeedbacks('on_air')
	})

	self.proclaimAPI.status.on('sessionId', ({ data }) => {
		self.log('debug', `Proclaim sessionId status changed: ${data}`)
		self.setVariableValues({
			session_id: data,
		})
	})
}

/**
 *  Look at the various status flags and determine the overall module connection status
 *
 *  @param self - The module instance
 */
function updateInstanceStatus(self: ModuleInstance): void {
	if (!self.proclaimAPI.ip) {
		self.updateStatus(InstanceStatus.BadConfig, 'IP not specified')
		return
	}

	if (!self.proclaimAPI.status.connected) {
		self.updateStatus(InstanceStatus.Disconnected, 'Could not connect to Proclaim')
		return
	}

	if (self.proclaimAPI.authRequired && !self.proclaimAPI.status.appCommandAPIAuthenticated) {
		self.updateStatus(InstanceStatus.AuthenticationFailure, 'Proclaim authentication unsuccessful')
		return
	}

	self.updateStatus(InstanceStatus.Ok, 'Connected to Proclaim')
}
