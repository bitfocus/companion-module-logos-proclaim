// Reference data used in setting up actions and presets

// Song parts - used in the go_to_song_part action and in constructing its presets
export const SONG_PARTS: { id: number; label: string; displayLabel?: string }[] = [
	{ id: 0, label: 'Verse' },
	{ id: 1, label: 'Chorus' },
	{ id: 2, label: 'Bridge' },
	{ id: 3, label: 'Prechorus', displayLabel: 'Pre\nchorus' },
	{ id: 4, label: 'Interlude', displayLabel: 'Inter-lude' },
	{ id: 5, label: 'Tag' },
	{ id: 6, label: 'Ending' },
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
	appCommand?: string
}

// Simple actions to generate actions for. The action IDs will be the name, converted to snake_case.
// The Proclaim API App Command will be the name converted to CamelCase, unless overridden below.
export const SIMPLE_ACTIONS = [
	// On/Off Air
	{
		name: 'Go On Air',
	},
	{
		name: 'Go Off Air',
	},

	// Slides
	{
		name: 'Previous Slide',
	},
	{
		name: 'Next Slide',
	},
	{
		name: 'Previous Service Item',
	},
	{
		name: 'Next Service Item',
	},

	// Service Parts
	{
		name: 'Start Pre Service',
	},
	{
		name: 'Start Warm Up',
	},
	{
		name: 'Start Service',
	},
	{
		name: 'Start Post Service',
	},

	// Media
	{
		name: 'Previous Audio Item',
		appCommand: 'PreviousPreviousAudioItem', // (sic.)
	},
	{
		name: 'Next Audio Item',
	},
	{
		name: 'Video Play',
	},
	{
		name: 'Video Pause',
	},
	{
		name: 'Video Restart',
	},
	{
		name: 'Video Rewind',
	},
	{
		name: 'Video Fast Forward',
	},

	// Quick Screens
	{
		name: 'Show Blank Quick Screen',
	},
	{
		name: 'Show Logo Quick Screen',
	},
	{
		name: 'Show No Text Quick Screen',
	},
	{
		name: 'Show Text',
	},
	{
		name: 'Show Floating Hearts Quick Screen',
	},
	{
		name: 'Show Floating Amens Quick Screen',
	},
	{
		name: 'Show Amen Quick Screen',
	},
	{
		name: 'Show Hallelujah Quick Screen',
	},
	{
		name: 'Show Praise The Lord Quick Screen',
	},
	{
		name: 'Show He Is Risen Quick Screen',
	},
	{
		name: 'Show He Is Risen Indeed Quick Screen',
		appCommand: 'ShowHeIsRisenWhiteQuickScreen', // (sic.)
	},
	{
		name: 'Show Last Slide',
	},
] as const satisfies readonly SimpleAction[]

// Default style for presets, as a starting point to provide a consistent look and feel
export const DEFAULT_PRESET_STYLE = {
	size: 18,
	bgcolor: 0x000000,
	color: 0xffffff,
}
