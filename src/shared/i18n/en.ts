// English source catalog for the rhythmic-gait UI strings.
// Scaffolding only — replace at runtime via a real i18n library when needed.
export const en = {
  // Home screen — greeting header + Today's plan + Streak + Start hero + actions.
  'home.title': 'Rhythmic Gait Assistant',
  'home.tagline': 'Walk with the rhythm',
  'home.startWalk.label': 'Start walk',
  'home.startWalk.sub': 'Begin with your usual settings',
  'home.rescue.label': 'Help me start',
  'home.rescue.sub': 'Strong buzz to get you moving',
  'home.settings': 'Settings',

  // Home — greeting block (rendered inside the red header band).
  'home.greeting.morning': 'Good morning',
  'home.greeting.afternoon': 'Good afternoon',
  'home.greeting.evening': 'Good evening',
  'home.greeting.userPlaceholder': 'Mohammad',
  'home.greeting.question': "Ready for today's walk?",

  // Home — Today's plan card.
  'home.plan.title': "Today's plan",
  'home.plan.sameAsYesterday': 'Same as yesterday',
  'home.plan.adjust': 'Adjust',
  'home.plan.cueLabel': 'Cue',
  'home.plan.paceLabel': 'Pace',
  'home.plan.durationLabel': 'Duration',

  // Home — streak card (placeholder copy).
  'home.streak.title': '3-day streak',
  'home.streak.subtitle': 'Last walk: yesterday · 9 min completed',

  // Home — Start walk hero card.
  'home.start.statusReady': 'Ready',
  'home.start.footer.tempo': 'Steady tempo',
  'home.start.footer.safe': 'Safe',

  // Home — info notice + bottom quick actions.
  'home.notice.phoneInPocket': "Phone in pocket, steady surface — you're good to go",
  'home.actions.helpMeStart': 'Help me start',
  'home.actions.myProgress': 'My progress',
  'home.actions.settings': 'Settings',

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
  'settings.title': 'Session settings',
  'settings.bigText.sectionTitle': 'Reading comfort',
  'settings.bigText.title': 'Big text',
  'settings.bigText.description': 'Make all text larger across the app.',
  'settings.cue.sectionTitle': 'Choose your cue',
  'settings.cue.sectionSubtitle': "How you'll feel the beat",
  'settings.cue.audio.label': 'Audio',
  'settings.cue.audio.description': 'Rhythmic tones',
  'settings.cue.vibration.label': 'Vibration',
  'settings.cue.vibration.description': 'Gentle pulses',
  'settings.cue.combined.label': 'Both',
  'settings.cue.combined.description': 'Audio + buzz',
  'settings.pace.selectedLabel': 'SELECTED',
  'settings.duration.endsAt': 'Ends',
  'settings.volume.sectionTitle': 'Sound & buzz',
  'settings.volume.title': 'Volume',
  'settings.volume.low': 'Low',
  'settings.volume.medium': 'Medium',
  'settings.volume.high': 'High',
  'settings.haptic.title': 'Vibration',
  'settings.haptic.soft': 'Soft',
  'settings.haptic.medium': 'Medium',
  'settings.haptic.strong': 'Strong',
  'settings.preferences.hapticTap.title': 'Haptic on tap',
  'settings.preferences.hapticTap.description': 'Light feedback when adjusting settings',
  'settings.emergency.sectionTitle': 'Emergency contact',
  'settings.emergency.title': 'Phone number',
  'settings.emergency.subtitle': 'Alerted if you fall or stop unexpectedly',
  'settings.emergency.optional': 'Optional',
  'settings.emergency.addContact': 'Add a trusted contact',
  'settings.emergency.description': 'Saved on this device only.',
  'settings.emergency.placeholder': 'Optional',
  'settings.summary.volume': 'volume',
  'settings.summary.buzz': 'buzz',
  'settings.summary.cue': 'cue',
  'settings.footer.readyTitle': 'Ready to start',
  'settings.footer.startCta': 'Start walking',

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
  'running.endHint': 'Hold for 1 second',

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
