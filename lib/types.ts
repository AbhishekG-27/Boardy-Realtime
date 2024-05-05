export type ArrowTypes = {
  points: number[];
};

export type CircleTypes = {
  x: number | undefined;
  y: number | undefined;
  radius: number;
  stroke: string;
  strokeWidth: number;
  isDragging: boolean;
};

export type RectangleTypes = {
  x: number | undefined;
  y: number | undefined;
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
};
