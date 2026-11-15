import { DEFAULT_PRESET_STYLE, SONG_COUNT } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createSongPresets(context: PresetsBuilderContext): void {
	context.definitions['song'] = {
		type: 'simple',
		name: 'Go to song',
		style: {
			...DEFAULT_PRESET_STYLE,
			size: 'auto',
			text: 'Song $(local:number)\n$(local:name)',
		},
		steps: [
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
		],
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
					bgcolor: 0x000000,
					color: 0x333333,
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
					bgcolor: 0xffff00,
					color: 0x000000,
				},
			},
		],
		localVariables: [
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
				},
			},
		],
	}

	context.sections.push({
		id: 'songs',
		name: 'Songs',
		definitions: [
			{
				id: `songs`,
				name: `Songs`,
				type: 'template',
				presetId: 'song',
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
