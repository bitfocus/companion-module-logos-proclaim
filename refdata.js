// Reference data used in setting up actions and presets

// Song parts - used in the go_to_song_part action and in constructing its presets
export const SONG_PARTS = [
	{ id: 0, label: 'Verse' },
	{ id: 1, label: 'Chorus' },
	{ id: 2, label: 'Bridge' },
	{ id: 3, label: 'Prechorus', displayLabel: 'Pre\nchorus' },
	{ id: 4, label: 'Interlude', displayLabel: 'Inter-lude' },
	{ id: 5, label: 'Tag' },
	{ id: 6, label: 'Ending' },
]

// Simple actions each of which has an action and matching preset, corresponding to a single Proclaim app command
export const SIMPLE_ACTIONS = [
	// On/Off Air
	{ id: 'go_on_air', name: 'Go On Air', category: 'On Air', text: 'Go On Air', appCommand: 'GoOnAir' },
	{ id: 'go_off_air', name: 'Go Off Air', category: 'On Air', text: 'Go Off Air', appCommand: 'GoOffAir' },

	// Slides
	{
		id: 'previous_slide',
		name: 'Previous Slide',
		category: 'Slides',
		text: 'Prev\nSlide',
		appCommand: 'PreviousSlide',
	},
	{ id: 'next_slide', name: 'Next Slide', category: 'Slides', text: 'Next\nSlide', appCommand: 'NextSlide' },
	{
		id: 'previous_service_item',
		name: 'Previous Service Item',
		category: 'Slides',
		text: 'Prev\nItem',
		appCommand: 'PreviousServiceItem',
	},
	{
		id: 'next_service_item',
		name: 'Next Service Item',
		category: 'Slides',
		text: 'Next\nItem',
		appCommand: 'NextServiceItem',
	},

	// Service Parts
	{
		id: 'start_pre_service',
		name: 'Start Pre Service',
		category: 'Service Parts',
		text: 'Pre Service',
		appCommand: 'StartPreService',
	},
	{
		id: 'start_warm_up',
		name: 'Start Warm Up',
		category: 'Service Parts',
		text: 'Warm Up',
		appCommand: 'StartWarmUp',
	},
	{
		id: 'start_service',
		name: 'Start Service',
		category: 'Service Parts',
		text: 'Service',
		appCommand: 'StartService',
	},
	{
		id: 'start_post_service',
		name: 'Start Post Service',
		category: 'Service Parts',
		text: 'Post Service',
		appCommand: 'StartPostService',
	},

	// Media
	{
		id: 'previous_audio_item',
		name: 'Previous Audio Item',
		category: 'Media',
		text: 'Prev\nAudio',
		appCommand: 'PreviousPreviousAudioItem', // (sic.)
	},
	{
		id: 'next_audio_item',
		name: 'Next Audio Item',
		category: 'Media',
		text: 'Next\nAudio',
		appCommand: 'NextAudioItem',
	},
	{ id: 'video_play', name: 'Video Play', category: 'Media', text: 'Video\nPlay', appCommand: 'VideoPlay' },
	{ id: 'video_pause', name: 'Video Pause', category: 'Media', text: 'Video\nPause', appCommand: 'VideoPause' },
	{ id: 'video_restart', name: 'Video Restart', category: 'Media', text: 'Video\nRestart', appCommand: 'VideoRestart' },
	// { id: 'video_rewind', name: 'Video Rewind', category: 'Media', text: 'Video\nRewind', appCommand: 'VideoRestart' },
	// { id: 'video_fast_forward', name: 'Video Fast Forward', category: 'Media', text: 'Video\nFast\nForward', appCommand: 'VideoFastForward' },

	// Quick Screens
	{
		id: 'show_blank_quick_screen',
		name: 'Show Blank Quick Screen',
		category: 'Quick Screens',
		text: 'Blank',
		appCommand: 'ShowBlankQuickScreen',
	},
	{
		id: 'show_logo_quick_screen',
		name: 'Show Logo Quick Screen',
		category: 'Quick Screens',
		text: 'Logo',
		appCommand: 'ShowLogoQuickScreen',
	},
	{
		id: 'show_no_text_quick_screen',
		name: 'Show No Text Quick Screen',
		category: 'Quick Screens',
		text: 'No Text',
		appCommand: 'ShowNoTextQuickScreen',
	},
	{
		id: 'show_floating_hearts_quick_screen',
		name: 'Show Floating Hearts Quick Screen',
		category: 'Quick Screens',
		text: 'Floating Hearts',
		appCommand: 'ShowFloatingHeartsQuickScreen',
	},
	{
		id: 'show_floating_amens_quick_screen',
		name: 'Show Floating Amens Quick Screen',
		category: 'Quick Screens',
		text: 'Floating Amens',
		appCommand: 'ShowFloatingAmensQuickScreen',
	},
	{
		id: 'show_amen_quick_screen',
		name: 'Show Amen Quick Screen',
		category: 'Quick Screens',
		text: 'Amen',
		appCommand: 'ShowAmenQuickScreen',
	},
	{
		id: 'show_hallelujah_quick_screen',
		name: 'Show Hallelujah Quick Screen',
		category: 'Quick Screens',
		text: 'Hallelujah',
		size: 14,
		appCommand: 'ShowHallelujahQuickScreen',
	},
	{
		id: 'show_praise_the_lord_quick_screen',
		name: 'Show Praise The Lord Quick Screen',
		category: 'Quick Screens',
		text: 'Praise The Lord',
		size: 14,
		appCommand: 'ShowPraiseTheLordQuickScreen',
	},
	{
		id: 'show_he_is_risen_quick_screen',
		name: 'Show He Is Risen Quick Screen',
		category: 'Quick Screens',
		text: 'He Is Risen',
		appCommand: 'ShowHeIsRisenQuickScreen',
	},
	{
		id: 'show_he_is_risen_indeed_quick_screen',
		name: 'Show He Is Risen Indeed Quick Screen',
		category: 'Quick Screens',
		text: 'He Is Risen Indeed',
		size: 14,
		appCommand: 'ShowHeIsRisenWhiteQuickScreen', // (sic.)
	},
]
