import { MediaState } from '@hussra/logos-proclaim'
import { DEFAULT_PRESET_STYLE } from '../refdata.js'
import type { PresetsBuilderContext } from './index.js'

export function createMediaPresets(context: PresetsBuilderContext): void {
	context.definitions['previous_audio_item'] = {
		type: 'simple',
		name: 'Previous Audio Item',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Prev Audio',
		},
		steps: [
			{
				down: [
					{
						actionId: 'previous_audio_item',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['next_audio_item'] = {
		type: 'simple',
		name: 'Next Audio Item',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Next Audio',
		},
		steps: [
			{
				down: [
					{
						actionId: 'next_audio_item',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['toggle_video_playback'] = {
		type: 'simple',
		name: 'Toggle Video Playback',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Video\n$(logos-proclaim:media_state)',
		},
		steps: [
			{
				down: [
					{
						actionId: 'toggle_video_playback',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'media_state',
				options: {
					state: MediaState.Paused,
				},
				style: {
					bgcolor: 0xffa500,
					color: 0x000000,
				},
			},
		],
	}

	context.definitions['video_play'] = {
		type: 'simple',
		name: 'Video Play',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Video Play',
		},
		steps: [
			{
				down: [
					{
						actionId: 'video_play',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['video_pause'] = {
		type: 'simple',
		name: 'Video Pause',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Video Pause',
		},
		steps: [
			{
				down: [
					{
						actionId: 'video_pause',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['video_restart'] = {
		type: 'simple',
		name: 'Video Restart',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Video Restart',
		},
		steps: [
			{
				down: [
					{
						actionId: 'video_restart',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['video_rewind'] = {
		type: 'simple',
		name: 'Video Rewind',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Video Rewind',
		},
		steps: [
			{
				down: [
					{
						actionId: 'video_rewind',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.definitions['video_fast_forward'] = {
		type: 'simple',
		name: 'Video Fast Forward',
		style: {
			...DEFAULT_PRESET_STYLE,
			text: 'Video Fast Forward',
			size: 'auto',
		},
		steps: [
			{
				down: [
					{
						actionId: 'video_fast_forward',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	context.sections.push({
		id: 'media',
		name: 'Media',
		definitions: [
			{
				id: 'audio',
				name: 'Audio',
				type: 'simple',
				presets: ['previous_audio_item', 'next_audio_item'],
			},
			{
				id: 'video',
				name: 'Video',
				type: 'simple',
				presets: [
					'toggle_video_playback',
					'video_play',
					'video_pause',
					'video_restart',
					'video_rewind',
					'video_fast_forward',
				],
			},
		],
	})
}
