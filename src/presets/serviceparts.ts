import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createServicePartPresets(context: PresetsBuilderContext): void {
	context.definitions['start_pre_service'] = {
		type: 'simple',
		name: 'Start Pre Service',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Pre Service',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_pre_service',
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
					servicePart: 'PreService',
				},
				isInverted: true,
				style: {
					bgcolor: 0x000000,
					color: 0x333333,
				},
			},
			{
				feedbackId: 'in_service_part',
				options: {
					servicePart: 'PreService',
				},
				style: {
					bgcolor: 0x00ff00,
					color: 0x000000,
				},
			},
		],
	}

	context.definitions['start_warm_up'] = {
		type: 'simple',
		name: 'Start Warm Up',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Warm Up',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_warm_up',
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
					servicePart: 'Warmup',
				},
				isInverted: true,
				style: {
					bgcolor: 0x000000,
					color: 0x333333,
				},
			},
			{
				feedbackId: 'in_service_part',
				options: {
					servicePart: 'Warmup',
				},
				style: {
					bgcolor: 0x00ff00,
					color: 0x000000,
				},
			},
		],
	}

	context.definitions['start_service'] = {
		type: 'simple',
		name: 'Start Service',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Service',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_service',
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
					servicePart: 'Service',
				},
				isInverted: true,
				style: {
					bgcolor: 0x000000,
					color: 0x333333,
				},
			},
			{
				feedbackId: 'in_service_part',
				options: {
					servicePart: 'Service',
				},
				style: {
					bgcolor: 0x00ff00,
					color: 0x000000,
				},
			},
		],
	}

	context.definitions['start_post_service'] = {
		type: 'simple',
		name: 'Start Post Service',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Post Service',
		},
		steps: [
			{
				down: [
					{
						actionId: 'start_post_service',
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
					servicePart: 'PostService',
				},
				isInverted: true,
				style: {
					bgcolor: 0x000000,
					color: 0x333333,
				},
			},
			{
				feedbackId: 'in_service_part',
				options: {
					servicePart: 'PostService',
				},
				style: {
					bgcolor: 0x00ff00,
					color: 0x000000,
				},
			},
		],
	}

	context.sections.push({
		id: 'service_parts',
		name: 'Service Parts',
		definitions: ['start_pre_service', 'start_warm_up', 'start_service', 'start_post_service'],
	})
}
