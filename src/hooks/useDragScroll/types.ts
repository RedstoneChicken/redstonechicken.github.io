
export interface DragState {
  x: number;
  scrollLeft: number;
  startTime: number;
  virtualPosition: number; // True virtual position independent of DOM
}

export interface VelocityRef {
  x: number;
  lastX: number;
  lastTime: number;
  virtualVelocity: number; // Virtual velocity for momentum
}

export interface ScrollBoundaries {
  min: number;
  max: number;
  virtualMin: number; // Extended virtual boundaries for overscroll
  virtualMax: number;
}

export interface MomentumState {
  startPosition: number;
  virtualPosition: number;
  velocity: number;
  startTime: number;
  isVirtual: boolean; // Track if we're in virtual mode
}
