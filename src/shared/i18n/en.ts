// English source catalog for the rhythmic-gait UI strings.
// Scaffolding only — replace at runtime via a real i18n library when needed.
export const en = {
  // Home screen — simplified to two big buttons + Settings link.
  'home.title': 'Rhythmic Gait Assistant',
  'home.tagline': 'Walk with the rhythm',
  'home.startWalk.label': 'Start walk',
  'home.startWalk.sub': 'Begin with your usual settings',
  'home.rescue.label': 'Help me start',
  'home.rescue.sub': 'Strong buzz to get you moving',
  'home.settings': 'Settings',

  // Legacy home strings — still used by Settings screen.
  'home.cue.sectionTitle': 'Choose your cue',
  'home.pace.sectionTitle': 'Pick a pace',
  'home.duration.sectionTitle': 'Duration',
  'home.preferences.sectionTitle': 'Preferences',
  'home.preferences.countIn.title': '3-second count-in',
  'home.preferences.countIn.description': 'A short calm countdown before music begins.',
  'home.preferences.endChime.title': 'End chime',
  'home.preferences.endChime.description': 'A gentle sound when the session finishes.',
  'home.start': 'Start walking',

  // Settings screen.
  'settings.title': 'Settings',
  'settings.bigText.sectionTitle': 'Reading comfort',
  'settings.bigText.title': 'Big text',
  'settings.bigText.description': 'Make all text larger across the app.',
  'settings.volume.sectionTitle': 'Sound and buzz',
  'settings.volume.title': 'Volume',
  'settings.volume.low': 'Low',
  'settings.volume.medium': 'Medium',
  'settings.volume.high': 'High',
  'settings.haptic.title': 'Buzz strength',
  'settings.haptic.soft': 'Soft',
  'settings.haptic.medium': 'Medium',
  'settings.haptic.strong': 'Strong',
  'settings.emergency.sectionTitle': 'Emergency contact',
  'settings.emergency.title': 'Phone number',
  'settings.emergency.description': 'Saved on this device only.',
  'settings.emergency.placeholder': 'Optional',

  // Rescue screen.
  'rescue.title': 'Walk on the buzz',
  'rescue.subtitle': 'Feel the rhythm, then take a small step.',
  'rescue.pause': 'Pause',
  'rescue.resume': 'Resume',
  'rescue.exit': "I'm OK",

  // Running screen.
  'running.pause': 'Pause',
  'running.resume': 'Resume',
  'running.end': 'End walk',
  'running.endHint': 'Hold for 2 seconds',

  // Result screen mood marker.
  'result.title': 'Nice walk.',
  'result.subtitle': 'How did that feel?',
  'result.mood.good': 'Good',
  'result.mood.same': 'Same',
  'result.mood.hard': 'Hard',
  'result.done': 'Done',
  'result.again': 'Walk again',

  // Spoken cue phrases — read while phone is in a pocket.
  'speech.paused': 'Paused',
  'speech.resumed': 'Resumed',
  'speech.twoMinutesLeft': 'Two minutes left',
  'speech.oneMinuteLeft': 'One minute left',
  'speech.complete': 'Walk complete',
} as const;
