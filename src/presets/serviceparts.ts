import type { CompanionSomePresetDefinition } from '@companion-module/base'
import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'
import type { ModuleSchema } from '../main.js'
import type { ServicePart } from '@hussra/logos-proclaim'

export function createServicePartPresets(context: PresetsBuilderContext): void {
	context.definitions['start_pre_service'] = createServicePartPreset(
		'Start Pre Service',
		'Pre Service',
		'start_pre_service',
		'PreService',
	)

	context.definitions['start_warm_up'] = createServicePartPreset('Start Warm Up', 'Warm Up', 'start_warm_up', 'Warmup')

	context.definitions['start_service'] = createServicePartPreset('Start Service', 'Service', 'start_service', 'Service')

	context.definitions['start_post_service'] = createServicePartPreset(
		'Start Post Service',
		'Post Service',
		'start_post_service',
		'PostService',
	)

	context.sections.push({
		id: 'service_parts',
		name: 'Service Parts',
		definitions: ['start_pre_service', 'start_warm_up', 'start_service', 'start_post_service'],
	})

	function createServicePartPreset(
		name: string,
		buttonText: string,
		actionId: 'start_pre_service' | 'start_warm_up' | 'start_service' | 'start_post_service',
		part: keyof typeof ServicePart,
	): CompanionSomePresetDefinition<ModuleSchema> {
		return {
			type: 'simple',
			name: name,
			style: {
				...DEFAULT_PRESET_STYLE,
				text: buttonText,
			},
			steps: [
				{
					down: [
						{
							actionId: actionId,
							options: {},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'has_service_part',
					options: {
						servicePart: part,
					},
					isInverted: true,
					style: {
						bgcolor: 0x000000,
						color: 0x333333,
					},
				},
				{
					feedbackId: 'service_part',
					options: {
						servicePart: part,
					},
					style: {
						bgcolor: 0x00ff00,
						color: 0x000000,
					},
				},
			],
		}
	}
}
