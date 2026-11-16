import { DEFAULT_PRESET_STYLE, SONG_COUNT } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createSongPresets(context: PresetsBuilderContext): void {
	context.definitions['go_to_song'] = {
		type: 'alternatives',
		variants: [
			{
				type: 'layered',
				name: 'Go To Song',
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
						height: 45,
						text: 'Song $(local:number)',
						color: 0xffffff,
					},
					{
						type: 'text',
						id: 'name',
						x: 0,
						y: 45,
						width: 100,
						height: 55,
						text: '$(local:name)',
						color: 0xffffff,
					},
				],
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
						isInverted: true,
						styleOverrides: [
							{
								elementId: 'text',
								elementProperty: 'color',
								override: { isExpression: false, value: 0x333333 },
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
								elementId: 'background',
								elementProperty: 'color',
								override: { isExpression: false, value: 0xffff00 },
							},
							{
								elementId: 'text',
								elementProperty: 'color',
								override: { isExpression: false, value: 0x000000 },
							},
							{
								elementId: 'name',
								elementProperty: 'color',
								override: { isExpression: false, value: 0x000000 },
							},
						],
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
							maxLength: 30,
						},
					},
				],
			},
			{
				type: 'simple',
				name: 'Go To Song',
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
							maxLength: 30,
						},
					},
				],
			},
		],
	}

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
