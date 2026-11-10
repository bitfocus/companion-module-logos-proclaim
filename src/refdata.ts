// Reference data used in setting up actions and presets

import { AppCommand, IndexedAppCommand, SimpleAppCommand } from '@hussra/logos-proclaim'

// Song parts - used in the go_to_song_part action and in constructing its presets
export const SONG_PARTS: { id: number; label: string; appCommand: IndexedAppCommand; displayLabel?: string }[] = [
	{ id: 0, label: 'Verse', appCommand: AppCommand.ShowSongLyricsVerseByIndex },
	{ id: 1, label: 'Chorus', appCommand: AppCommand.ShowSongLyricsChorusByIndex },
	{ id: 2, label: 'Bridge', appCommand: AppCommand.ShowSongLyricsBridgeByIndex },
	{ id: 3, label: 'Prechorus', appCommand: AppCommand.ShowSongLyricsPreChorusByIndex, displayLabel: 'Pre\nchorus' },
	{ id: 4, label: 'Interlude', appCommand: AppCommand.ShowSongLyricsInterludeByIndex, displayLabel: 'Inter-lude' },
	{ id: 5, label: 'Tag', appCommand: AppCommand.ShowSongLyricsTagByIndex },
	{ id: 6, label: 'Ending', appCommand: AppCommand.ShowSongLyricsEndingByIndex },
]

// How many songs to generate presets for
export const SONG_COUNT = 10

// How many verses to generate presets for
export const VERSE_COUNT = 6

// How many custom quick screens Proclaim supports
export const CUSTOM_QUICK_SCREEN_COUNT: number = 2

// Simple actions each have an action and matching preset, corresponding to a single
// Proclaim app command without index parameter
export type SimpleAction = {
	name: string
	appCommand: SimpleAppCommand
}

// Simple actions to generate actions for. The action IDs will be the name, converted to snake_case.
// The Proclaim API App Command will be the name converted to CamelCase, unless overridden below.
export const SIMPLE_ACTIONS = [
	// On/Off Air
	{
		name: 'Go On Air',
		appCommand: AppCommand.GoOnAir,
	},
	{
		name: 'Go Off Air',
		appCommand: AppCommand.GoOffAir,
	},

	// Slides
	{
		name: 'Previous Slide',
		appCommand: AppCommand.PreviousSlide,
	},
	{
		name: 'Next Slide',
		appCommand: AppCommand.NextSlide,
	},
	{
		name: 'Previous Service Item',
		appCommand: AppCommand.PreviousServiceItem,
	},
	{
		name: 'Next Service Item',
		appCommand: AppCommand.NextServiceItem,
	},

	// Service Parts
	{
		name: 'Start Pre Service',
		appCommand: AppCommand.StartPreService,
	},
	{
		name: 'Start Warm Up',
		appCommand: AppCommand.StartWarmUp,
	},
	{
		name: 'Start Service',
		appCommand: AppCommand.StartService,
	},
	{
		name: 'Start Post Service',
		appCommand: AppCommand.StartPostService,
	},

	// Media
	{
		name: 'Previous Audio Item',
		appCommand: AppCommand.PreviousPreviousAudioItem, // [sic]
	},
	{
		name: 'Next Audio Item',
		appCommand: AppCommand.NextAudioItem,
	},
	{
		name: 'Video Play',
		appCommand: AppCommand.VideoPlay,
	},
	{
		name: 'Video Pause',
		appCommand: AppCommand.VideoPause,
	},
	{
		name: 'Video Restart',
		appCommand: AppCommand.VideoRestart,
	},
	{
		name: 'Video Rewind',
		appCommand: AppCommand.VideoRewind,
	},
	{
		name: 'Video Fast Forward',
		appCommand: AppCommand.VideoFastForward,
	},

	// Quick Screens
	{
		name: 'Show Blank Quick Screen',
		appCommand: AppCommand.ShowBlankQuickScreen,
	},
	{
		name: 'Show Logo Quick Screen',
		appCommand: AppCommand.ShowLogoQuickScreen,
	},
	{
		name: 'Show No Text Quick Screen',
		appCommand: AppCommand.ShowNoTextQuickScreen,
	},
	{
		name: 'Show Text',
		appCommand: AppCommand.ShowText,
	},
	{
		name: 'Show Floating Hearts Quick Screen',
		appCommand: AppCommand.ShowFloatingHeartsQuickScreen,
	},
	{
		name: 'Show Floating Amens Quick Screen',
		appCommand: AppCommand.ShowFloatingAmensQuickScreen,
	},
	{
		name: 'Show Amen Quick Screen',
		appCommand: AppCommand.ShowAmenQuickScreen,
	},
	{
		name: 'Show Hallelujah Quick Screen',
		appCommand: AppCommand.ShowHallelujahQuickScreen,
	},
	{
		name: 'Show Praise The Lord Quick Screen',
		appCommand: AppCommand.ShowPraiseTheLordQuickScreen,
	},
	{
		name: 'Show He Is Risen Quick Screen',
		appCommand: AppCommand.ShowHeIsRisenQuickScreen,
	},
	{
		name: 'Show He Is Risen Indeed Quick Screen',
		appCommand: AppCommand.ShowHeIsRisenWhiteQuickScreen, // [sic]
	},
	{
		name: 'Show Last Slide',
		appCommand: AppCommand.ShowLastSlide,
	},
] as const satisfies readonly SimpleAction[]

// Default style for presets, as a starting point to provide a consistent look and feel
export const DEFAULT_PRESET_STYLE = {
	size: 18,
	bgcolor: 0x000000,
	color: 0xffffff,
}
