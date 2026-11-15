import { DisplayableServiceItemKind, type ServiceItem } from '@hussra/logos-proclaim'
import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'
import type { ModuleSchema } from '../main.js'
import type { CompanionPresetGroup } from '@companion-module/base'

export function createItemPresets(context: PresetsBuilderContext): void {
	context.definitions['item'] = {
		type: 'alternatives',
		variants: [
			{
				type: 'layered',
				name: 'Go To Item',
				elements: [
					{
						type: 'box',
						id: 'background',
						x: 0,
						y: 0,
						width: 100,
						height: 100,
						color: 0x000000,
					},
					{
						type: 'text',
						id: 'text',
						x: 0,
						y: 0,
						width: 100,
						height: 100,
						text: '$(local:name)',
						color: 0xffffff,
						fontsize: 30,
						fontsizeAllowShrink: true,
					},
				],
				steps: [
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
				],
				feedbacks: [
					{
						feedbackId: 'item',
						styleOverrides: [
							{
								elementId: 'background',
								elementProperty: 'color',
								override: 0x00ff00,
							},
							{
								elementId: 'text',
								elementProperty: 'color',
								override: 0x000000,
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
				localVariables: [
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
				],
			},
			{
				type: 'simple',
				name: 'Go To Item',
				style: {
					...DEFAULT_PRESET_STYLE,
					text: '$(local:name)',
					size: '14',
				},
				steps: [
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
				],
				feedbacks: [
					{
						feedbackId: 'item',
						style: {
							color: 0x000000,
							bgcolor: 0x00ff00,
						},
						options: {
							id: {
								isExpression: true,
								value: '$(local:id)',
							},
						},
					},
				],
				localVariables: [
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
				],
			},
		],
	}

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
		id: 'items',
		name: 'Service Items',
		description:
			'Jump to a specific service item. You will only be able to see service item presets here when Proclaim is on air',
		definitions: groups,
	})
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
		presetId: 'item',

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
