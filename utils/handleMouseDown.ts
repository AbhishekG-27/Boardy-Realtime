import { CircleTypes, RectangleTypes } from "@/lib/types";
import { KonvaEventObject } from "konva/lib/Node";

interface MouseDownProps {
  event: KonvaEventObject<MouseEvent>;
  isDrawing: React.MutableRefObject<boolean>;
  isDraggable: boolean;
  tool: string;
  lastLine: React.MutableRefObject<number[]>;
  lastCircle: React.MutableRefObject<CircleTypes>;
  lastRectangle: React.MutableRefObject<RectangleTypes>;
  lastArrow: React.MutableRefObject<{ points: number[] }>;
}

export const handleMouseDown = ({
  isDraggable,
  isDrawing,
  event,
  tool,
  lastArrow,
  lastLine,
  lastCircle,
  lastRectangle,
}: MouseDownProps) => {
  isDraggable === true
    ? (isDrawing.current = false)
    : (isDrawing.current = true);
  const pos = event.target.getStage()?.getPointerPosition();
  if (!pos) return;
  if (tool === "pen") {
    lastLine.current = [pos.x, pos.y];
  } else if (tool === "circle") {
    lastCircle.current = {
      x: pos.x,
      y: pos.y,
      radius: 0,
      stroke: "#000",
      strokeWidth: 2,
      isDragging: false,
    };
  } else if (tool === "rectangle") {
    lastRectangle.current = {
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      stroke: "#000",
      strokeWidth: 2,
    };
  } else if (tool === "arrow") {
    lastArrow.current = {
      points: [pos.x, pos.y],
    };
  }
};
