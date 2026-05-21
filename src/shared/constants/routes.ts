// Route name constants for the Rhythmic Gait Assistant feature stack.
export enum RhythmicGaitRoutes {
  Home = 'Rythmic_Home',
  Countdown = 'Rythmic_Countdown',
  Running = 'Rythmic_Running',
  Result = 'Rythmic_Result',
}

// Typed param list — all screens receive state via Zustand, not route params.
export type RhythmicGaitParamList = {
  [RhythmicGaitRoutes.Home]: undefined;
  [RhythmicGaitRoutes.Countdown]: undefined;
  [RhythmicGaitRoutes.Running]: undefined;
  [RhythmicGaitRoutes.Result]: undefined;
};
