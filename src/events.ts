import { InstanceStatus, type LogLevel, type StringKeys } from '@companion-module/base'
import { LogLevel as ProclaimLogLevel, type ProclaimStatusEvents } from '@hussra/logos-proclaim'
import ModuleInstance from './main.js'
import { ticksToUnixTime } from './util.js'
import type { VariablesSchema } from './variables.js'
import type { FeedbacksSchema } from './feedbacks.js'

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

	self.proclaimAPI.status.on(['configValid', 'connected', 'appCommandAPIAuthenticated'], () => {
		updateInstanceStatus(self)
	})

	mapEventToVariable(self, 'onAir', 'on_air', undefined, 'on_air')
	mapEventToVariable(self, 'sessionId', 'session_id')

	self.proclaimAPI.status.on('presentation', ({ data }) => {
		self.setVariableValues({
			presentation_title: data ? data.title : '',
			presentation_id: data ? data.id : '',
			presentation_group_name: data ? data.groupName : '',
			presentation_group_id: data ? data.groupId : '',
			presentation_date: data ? ticksToUnixTime(data.dateGiven) : 0,
			presentation_start_time: data ? ticksToUnixTime(data.startTime) : 0,
		})
		self.checkFeedbacks('has_service_part')
	})

	mapEventToVariable(self, 'itemCount', 'item_count')
	mapEventToVariable(self, 'itemIndex', 'item_index', (index) => index + 1)
	mapEventToVariable(self, 'itemTitle', 'item_title')
	mapEventToVariable(self, 'itemId', 'item_id')
	mapEventToVariable(self, 'itemKind', 'item_kind', undefined, 'item_kind')
	mapEventToVariable(self, 'songCount', 'song_count')
	mapEventToVariable(self, 'songIndex', 'song_index', (index) => index + 1)
	mapEventToVariable(self, 'itemSlideCount', 'slide_count')
	mapEventToVariable(self, 'slideIndex', 'slide_index', (index) => index + 1)
	mapEventToVariable(self, 'quickScreenKind', 'quick_screen_kind', undefined, 'quick_screen')
	mapEventToVariable(self, 'servicePart', 'service_part', undefined, 'service_part')
	mapEventToVariable(self, 'quickScreenKind', 'quick_screen_kind')
	mapEventToVariable(self, 'stageDirection', 'stage_direction')
}

/**
 * Map Proclaim status events directly to a Companion module variable.
 * Handy in cases where there is a direct mapping and we don't need any other
 * behaviour when the event fires.
 * @param self - The module instance
 * @param eventName - The Proclaim status event name
 * @param variableName - The module variable name
 * @param transform - Optional function to transform the event data before setting the variable
 * @param feedback - Feedback to check
 * @param feedbacks - Additional feedbacks to check
 */
function mapEventToVariable<EventName extends keyof ProclaimStatusEvents, VariableName extends keyof VariablesSchema>(
	self: ModuleInstance,
	eventName: EventName,
	variableName: VariableName,
	transform?: (data: ProclaimStatusEvents[EventName]) => VariablesSchema[VariableName],
	feedback?: StringKeys<FeedbacksSchema>,
	...feedbacks: StringKeys<FeedbacksSchema>[]
) {
	self.proclaimAPI.status.on(eventName, ({ data }) => {
		const val = {
			[variableName]: transform ? transform(data as ProclaimStatusEvents[EventName]) : data,
		} as Partial<VariablesSchema>
		self.setVariableValues(val)
		if (feedback) {
			self.checkFeedbacks(feedback, ...feedbacks)
		}
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
