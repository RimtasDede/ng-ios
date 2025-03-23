export enum MoveEventType {
  Pan = 'm-pan',
  PanStart = 'm-panstart',
  PanUp = 'm-panup',
  PanLeft = 'm-panleft',
  PanRight = 'm-panright',
  PanDown = 'm-pandown',
  PanEnd = 'm-panend',

  Swipe = 'm-swipe', // by velocity between mousedown and mouseup
  SwipeUp = 'm-swipeup',
  SwipeLeft = 'm-swipeleft',
  SwipeRight = 'm-swiperight',
  SwipeDown = 'm-swipedown',

  Press = 'm-press',
  PressUp = 'm-pressup',
}

export interface TouchOptions {
  /**
   * Minimal distance required before recognizing
   */
  threshold: number;

  /**
   * Minimal velocity required before recognizing (px/ms)
   */
  swipeVelocity: number;
}

export interface TouchPressOptions {
  /**
   * Minimal movement that is allowed while pressing
   */
  threshold: number;

  /**
   * Minimal press time in ms
   */
  time: number;
}

export interface MoveEvent {
  /**
   * Event type
   */
  type: MoveEventType;

  /**
   * The horizontal scroll amount.
   * Positive values indicate scrolling to the right, and negative values indicate scrolling to the left.
   */
  deltaX: number;

  /**
   * The vertical scroll amount.
   * Positive values indicate scrolling down, and negative values indicate scrolling up.
   */
  deltaY: number;

  // distance: number;

  /**
   * Move angle from mouse down point
   *
   * 0 - Moves directly to right
   * 90 - directly to bottom
   * up to 180 - to left
   * upper value are negative
   */
  angle: number;

  /**
   * Move duration in milliseconds from move start.
   */
  duration: number;

  /**
   * How many px moves per milliseconds on X axis (px/ms)
   */
  velocityX: number;

  /**
   * How many px moves per milliseconds on Y axis (px/ms)
   */
  velocityY: number;
}

export interface MoveEventNullableType extends Omit<MoveEvent, 'type'> {
  type: MoveEventType | null;
}
