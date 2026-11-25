import type {
	CompanionSomePresetDefinition,
	CompanionButtonStepActions,
	CompanionPresetLocalVariable,
} from '@companion-module/base'
import type { ModuleSchema } from '../main.js'
import { COLOURS, DEFAULT_PRESET_STYLE } from '../refdata.js'
import { makeActiveElement, makeBackgroundElement, makeTextElement, type PresetsBuilderContext } from './index.js'
import type { FeedbacksSchema } from '../feedbacks.js'

export function createGroupPresets(context: PresetsBuilderContext): void {
	// Create context definition
	context.definitions['go_to_group'] = createGroupingPreset(context)

	// Get all groupings
	const allGroups = context.self.proclaimAPI.status.groupings

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

function createGroupingPreset(context: PresetsBuilderContext): CompanionSomePresetDefinition<ModuleSchema> {
	const name = 'Go To Group'
	const steps: CompanionButtonStepActions<ModuleSchema>[] = [
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
	]
	const localVariables: CompanionPresetLocalVariable<FeedbacksSchema>[] = [
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
			localVariables: localVariables,
		}
	} else {
		return {
			type: 'layered',
			name: 'Go To Item',
			elements: [makeBackgroundElement(COLOURS.goTo.grouping), makeActiveElement(), makeTextElement('$(local:name)')],
			feedbacks: [
				{
					feedbackId: 'grouping',
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
						title: '',
						exact: true,
					},
				},
			],
			steps: steps,
			localVariables: localVariables,
		}
	}
}
