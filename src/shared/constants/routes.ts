// Route name constants for the Rhythmic Gait Assistant feature stack.
export enum RhythmicGaitRoutes {
  Home = 'RGA_Home',
  Countdown = 'RGA_Countdown',
  Running = 'RGA_Running',
  Result = 'RGA_Result',
}

// Typed param list — all screens receive state via Zustand, not route params.
export type RhythmicGaitParamList = {
  [RhythmicGaitRoutes.Home]: undefined;
  [RhythmicGaitRoutes.Countdown]: undefined;
  [RhythmicGaitRoutes.Running]: undefined;
  [RhythmicGaitRoutes.Result]: undefined;
};
