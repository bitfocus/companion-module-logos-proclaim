import type {
	CompanionButtonStepActions,
	CompanionPresetLocalVariable,
	CompanionSomePresetDefinition,
} from '@companion-module/base'
import type { ModuleSchema } from '../main.js'
import { COLOURS, DEFAULT_PRESET_STYLE, SONG_COUNT } from '../refdata.js'
import { makeActiveElement, makeBackgroundElement, type PresetsBuilderContext } from './index.js'
import type { FeedbacksSchema } from '../feedbacks.js'

export function createSongPresets(context: PresetsBuilderContext): void {
	context.definitions['go_to_song'] = createSongPreset(context)

	context.sections.push({
		id: 'songs',
		name: 'Songs',
		definitions: [
			{
				id: `go_to_song`,
				name: `Go To Song`,
				type: 'template',
				presetId: 'go_to_song',
				templateVariableName: 'number',
				templateValues: [
					...new Array(SONG_COUNT).fill(0).map((_v, index) => {
						return {
							value: `${index + 1}`,
							name: `${index + 1}`,
						}
					}),
				],
			},
		],
	})
}
function createSongPreset(context: PresetsBuilderContext): CompanionSomePresetDefinition<ModuleSchema> {
	const name = 'Go To Song'
	const steps: CompanionButtonStepActions<ModuleSchema>[] = [
		{
			down: [
				{
					actionId: 'go_to_song',
					options: {
						num: {
							isExpression: true,
							value: '$(local:number)',
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
			variableName: 'number',
			startupValue: '1',
		},
		{
			variableType: 'feedback',
			variableName: 'name',
			feedbackId: 'song_title',
			options: {
				num: {
					isExpression: true,
					value: '$(local:number)',
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
				size: 'auto',
				text: 'Song $(local:number)\n$(local:name)',
			},
			steps: steps,
			feedbacks: [
				{
					feedbackId: 'has_song',
					options: {
						num: {
							isExpression: true,
							value: '$(local:number)',
						},
					},
					style: {
						bgcolor: COLOURS.black,
						color: COLOURS.inactive,
					},
					isInverted: true,
				},
				{
					feedbackId: 'song',
					options: {
						num: {
							isExpression: true,
							value: '$(local:number)',
						},
					},
					style: {
						bgcolor: COLOURS.active,
						color: COLOURS.black,
					},
				},
			],
			localVariables: localVariables,
		}
	} else {
		return {
			type: 'layered',
			name: name,
			elements: [
				makeBackgroundElement(COLOURS.goTo.song),
				makeActiveElement(),
				{
					type: 'text',
					id: 'text',
					x: 0,
					y: 0,
					width: 100,
					height: 45,
					text: 'Song $(local:number)',
					color: COLOURS.white,
				},
				{
					type: 'text',
					id: 'name',
					x: 0,
					y: 45,
					width: 100,
					height: 55,
					text: '$(local:name)',
					color: COLOURS.white,
					valign: 'top',
				},
			],
			steps: steps,
			feedbacks: [
				{
					feedbackId: 'has_song',
					options: {
						num: {
							isExpression: true,
							value: '$(local:number)',
						},
					},
					isInverted: true,
					styleOverrides: [
						{
							elementId: 'text',
							elementProperty: 'color',
							override: COLOURS.inactive,
						},
						{
							elementId: 'background',
							elementProperty: 'color',
							override: COLOURS.black,
						},
					],
				},
				{
					feedbackId: 'song',
					options: {
						num: {
							isExpression: true,
							value: '$(local:number)',
						},
					},
					styleOverrides: [
						{
							elementId: 'active',
							elementProperty: 'enabled',
							override: true,
						},
					],
				},
			],
			localVariables: localVariables,
		}
	}
}
