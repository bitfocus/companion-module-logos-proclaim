import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createGroupPresets(context: PresetsBuilderContext): void {
	context.definitions['go_to_group'] = {
		type: 'simple',
		name: 'Go To group',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: '$(local:name)',
			size: '14',
		},
		steps: [
			{
				down: [
					{
						actionId: 'go_to_grouping',
						options: {
							id: {
								isExpression: true,
								value: '$(local:id)',
							},
							title: '',
							exact: true,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'grouping',
				style: {
					color: 0x000000,
					bgcolor: 0x00ff00,
				},
				options: {
					id: {
						isExpression: true,
						value: '$(local:id)',
					},
					title: '',
					exact: true,
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
				variableType: 'feedback',
				variableName: 'name',
				feedbackId: 'grouping_title',
				options: {
					id: {
						isExpression: true,
						value: '$(local:id)',
					},
					maxLength: 30,
				},
			},
		],
	}

	// Get all groupings
	const allGroups = context.self.proclaimAPI.status.groupings

	console.log(JSON.stringify(allGroups, null, 2))

	// Finally, add a preset section for all these service items
	context.sections.push({
		id: 'go_to_group',
		name: 'Service Item Groups',
		description:
			'Jump to the first item in a specific group. You will only be able to see group presets here when Proclaim is on air',
		definitions: [
			{
				id: 'groupings',
				name: 'Groupings',
				type: 'template',
				presetId: 'go_to_group',

				templateVariableName: 'id',
				templateValues: allGroups.map((item) => {
					return { value: item.id, name: item.title }
				}),
			},
		],
	})
}
