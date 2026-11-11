import { InstanceStatus, type LogLevel } from '@companion-module/base'
import { LogLevel as ProclaimLogLevel, type ProclaimStatusEvents } from '@hussra/logos-proclaim'
import ModuleInstance from './main.js'
import { ticksToUnixTime } from './util.js'
import type { VariablesSchema } from './variables.js'

/**
 * Add event listeners for Proclaim events, to update Companion module status,
 * feedbacks and variables
 *
 * @param self - The module instance
 */
export function AddEventListeners(self: ModuleInstance): void {
	self.proclaimAPI.status.on('log', ({ data }) => {
		const { level, message, error } = data
		const companionLogLevel = companionLogLevelMap[level]
		self.log(companionLogLevel, error ? `${message} - ${error.stack}` : message)
	})

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

	self.proclaimAPI.status.on('presentation', ({ data }) => {
		self.setVariableValues({
			presentation_title: data ? data.title : '',
			presentation_id: data ? data.id : '',
			presentation_group_name: data ? data.groupName : '',
			presentation_group_id: data ? data.groupId : '',
			presentation_date: data ? ticksToUnixTime(data.dateGiven) : 0,
			presentation_start_time: data ? ticksToUnixTime(data.startTime) : 0,
		})
	})

	mapEventToVariable(self, 'itemCount', 'item_count')
	mapEventToVariable(self, 'songCount', 'song_count')
	mapEventToVariable(self, 'itemId', 'item_id')
	mapEventToVariable(self, 'itemTitle', 'item_title')
	mapEventToVariable(self, 'itemSlideCount', 'slide_count')
	mapEventToVariable(self, 'itemIndex', 'item_index', (index) => index + 1)
	mapEventToVariable(self, 'itemKind', 'item_kind')
}

/**
 * Map Proclaim status events directly to a Companion module variable.
 * Handy in cases where there is a direct mapping and we don't need any other
 * behaviour when the event fires.
 * @param self - The module instance
 * @param eventName - The Proclaim status event name
 * @param variableName - The module variable name
 * @param transform - Optional function to transform the event data before setting the variable
 */
function mapEventToVariable<EventName extends keyof ProclaimStatusEvents, VariableName extends keyof VariablesSchema>(
	self: ModuleInstance,
	eventName: EventName,
	variableName: VariableName,
	transform?: (data: ProclaimStatusEvents[EventName]) => VariablesSchema[VariableName],
) {
	self.proclaimAPI.status.on(eventName, ({ data }) => {
		const val = {
			[variableName]: transform ? transform(data as ProclaimStatusEvents[EventName]) : data,
		} as Partial<VariablesSchema>
		self.setVariableValues(val)
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

const companionLogLevelMap: Record<ProclaimLogLevel, LogLevel> = {
	[ProclaimLogLevel.DEBUG]: 'debug',
	[ProclaimLogLevel.ERROR]: 'error',
	[ProclaimLogLevel.INFO]: 'info',
	[ProclaimLogLevel.WARN]: 'warn',
}
