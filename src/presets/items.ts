import { DisplayableServiceItemKind, type ServiceItem } from '@hussra/logos-proclaim'
import { COLOURS, DEFAULT_PRESET_STYLE } from '../refdata.js'
import { makeActiveElement, makeBackgroundElement, makeTextElement, type PresetsBuilderContext } from './index.js'
import type { ModuleSchema } from '../main.js'
import type {
	CompanionButtonStepActions,
	CompanionPresetGroup,
	CompanionPresetLocalVariable,
	CompanionSomePresetDefinition,
} from '@companion-module/base'
import type { FeedbacksSchema } from '../feedbacks.js'

export function createItemPresets(context: PresetsBuilderContext): void {
	context.definitions['go_to_item'] = createItemPreset(context)

	// Get all service items
	const allItems = context.self.proclaimAPI.status.presentation?.serviceItems ?? []

	// Chop them up into separate arrays for each service part
	const warmupStartIndex = context.self.proclaimAPI.status.presentation?.warmupStartIndex ?? -1
	const serviceStartIndex = context.self.proclaimAPI.status.presentation?.serviceStartIndex ?? -1
	const postServiceStartIndex = context.self.proclaimAPI.status.presentation?.postServiceStartIndex ?? -1

	const preServiceItems = allItems.slice(0, warmupStartIndex)
	const warmupItems = allItems.slice(warmupStartIndex, serviceStartIndex)
	const serviceItems = allItems.slice(serviceStartIndex, postServiceStartIndex)
	const postServiceItems = allItems.slice(postServiceStartIndex)

	// Build an array of tempate item groups, but only add each group if that service part actually contains items
	const groups: CompanionPresetGroup<ModuleSchema>[] = []
	if (preServiceItems.length > 0) {
		groups.push(makePresetGroup('pre_service', 'Pre-Service', preServiceItems))
	}
	if (warmupItems.length > 0) {
		groups.push(makePresetGroup('warm_up', 'Warm-Up', warmupItems))
	}
	if (serviceItems.length > 0) {
		groups.push(makePresetGroup('service', 'Service', serviceItems))
	}
	if (postServiceItems.length > 0) {
		groups.push(makePresetGroup('post_service', 'Post-Service', postServiceItems))
	}

	// Finally, add a preset section for all these service items
	context.sections.push({
		id: 'go_to_item',
		name: 'Service Items',
		description:
			'Jump to a specific service item. You will only be able to see service item presets here when Proclaim is on air',
		definitions: groups,
	})
}

function createItemPreset(context: PresetsBuilderContext): CompanionSomePresetDefinition<ModuleSchema> {
	const name = 'Go To Item'
	const steps: CompanionButtonStepActions<ModuleSchema>[] = [
		{
			down: [
				{
					actionId: 'go_to_service_item_by_id',
					options: {
						id: {
							isExpression: true,
							value: '$(local:id)',
						},
						slide: {
							isExpression: true,
							value: '$(local:slide)',
						},
					},
				},
			],
			up: [],
		},
	]
	const localVariables: CompanionPresetLocalVariable<FeedbacksSchema>[] = [
		{
			variableType: 'simple',
			variableName: 'id',
			startupValue: '',
		},
		{
			variableType: 'simple',
			variableName: 'slide',
			startupValue: '1',
		},
		{
			variableType: 'feedback',
			variableName: 'name',
			feedbackId: 'item_title',
			options: {
				id: {
					isExpression: true,
					value: '$(local:id)',
				},
				maxLength: 30,
			},
		},
	]

	if (context.self.config.basicPresets) {
		return {
			type: 'simple',
			name: name,
			style: {
				...DEFAULT_PRESET_STYLE,
				text: '$(local:name)',
				size: '14',
			},
			steps: steps,
			feedbacks: [
				{
					feedbackId: 'item',
					style: {
						color: COLOURS.black,
						bgcolor: COLOURS.active,
					},
					options: {
						id: {
							isExpression: true,
							value: '$(local:id)',
						},
					},
				},
			],
			localVariables: localVariables,
		}
	} else {
		return {
			type: 'layered',
			name: 'Go To Item',
			elements: [makeBackgroundElement(COLOURS.goTo.item), makeActiveElement(), makeTextElement('$(local:name)')],
			feedbacks: [
				{
					feedbackId: 'item',
					styleOverrides: [
						{
							elementId: 'active',
							elementProperty: 'enabled',
							override: true,
						},
					],
					options: {
						id: {
							isExpression: true,
							value: '$(local:id)',
						},
					},
				},
			],
			steps: steps,
			localVariables: localVariables,
		}
	}
}

/**
 * Build a group of presets from an array of service items
 * @param id - ID for the group
 * @param name - Name for the group
 * @param items - Array of ServiceItems
 * @returns Preset group
 */
function makePresetGroup(id: string, name: string, items: ServiceItem[]): CompanionPresetGroup<ModuleSchema> {
	return {
		id: id,
		name: name,
		type: 'template',
		presetId: 'go_to_item',

		templateVariableName: 'id',
		templateValues: items
			.filter((item) => Object.keys(DisplayableServiceItemKind).includes(item.kind))
			.map((item) => {
				return { value: item.id, name: item.title }
			}),
		commonVariableValues: {
			slide: 1,
		},
	}
}
