import { CircleTypes, RectangleTypes } from "@/lib/types";
import { KonvaEventObject } from "konva/lib/Node";

interface MouseMoveProps {
  event: KonvaEventObject<MouseEvent>;
  isDrawing: React.MutableRefObject<boolean>;
  tool: string;
  lastLine: React.MutableRefObject<number[]>;
  lastCircle: React.MutableRefObject<CircleTypes>;
  lastRectangle: React.MutableRefObject<RectangleTypes>;
  lastArrow: React.MutableRefObject<{ points: number[] }>;
  lines: number[][];
  setLines: React.Dispatch<React.SetStateAction<number[][]>>;
  circles: CircleTypes[];
  setCircles: React.Dispatch<React.SetStateAction<CircleTypes[]>>;
  rectangles: RectangleTypes[];
  setRectangles: React.Dispatch<React.SetStateAction<RectangleTypes[]>>;
  arrows: { points: number[] }[];
  setArrows: React.Dispatch<React.SetStateAction<{ points: number[] }[]>>;
  ws: WebSocket | null | undefined;
}

export const handleMouseMove = ({
  event,
  isDrawing,
  tool,
  lastLine,
  setLines,
  lines,
  lastCircle,
  circles,
  setCircles,
  lastRectangle,
  rectangles,
  setRectangles,
  ws,
  lastArrow,
  arrows,
  setArrows,
}: MouseMoveProps) => {
  if (!isDrawing.current) return;
  const pos = event.target.getStage()?.getPointerPosition();
  if (!pos) return;
  if (tool === "pen") {
    let newLine =
      pos?.x !== undefined && pos?.y !== undefined
        ? lastLine.current.concat([pos.x, pos.y])
        : [...lastLine.current];
    setLines([...lines, newLine]);
    lastLine.current = [pos.x, pos.y];
    ws?.send(JSON.stringify({ lines }));
  } else if (tool === "circle") {
    if (!lastCircle.current.x || !lastCircle.current.y) return;
    let newRadius =
      Math.abs(pos.x - lastCircle.current.x) +
      Math.abs(pos.y - lastCircle.current.y);
    lastCircle.current.radius = newRadius;
    setCircles([...circles, lastCircle.current]);
    ws?.send(JSON.stringify({ circles }));
  } else if (tool === "rectangle") {
    if (!lastRectangle.current.x || !lastRectangle.current.y) return;
    let newWidth = Math.abs(pos.x - lastRectangle.current.x);
    let newHeight = Math.abs(pos.y - lastRectangle.current.y);
    lastRectangle.current.width = newWidth;
    lastRectangle.current.height = newHeight;
    setRectangles([...rectangles, lastRectangle.current]);
    ws?.send(JSON.stringify({ rectangles }));
  } else if (tool === "arrow") {
    const startPoint = [
      lastArrow.current.points[0],
      lastArrow.current.points[1],
    ];
    const endPoint = [pos.x, pos.y];
    const dx = endPoint[0] - startPoint[0];
    const dy = endPoint[1] - startPoint[1];
    const angle = Math.atan2(dy, dx);
    const arrowLength = 20;
    const arrowheadAngle = Math.PI / 6; // 30 degrees

    // Calculate arrowhead points
    const arrowheadPoint1 = [
      endPoint[0] - arrowLength * Math.cos(angle - arrowheadAngle),
      endPoint[1] - arrowLength * Math.sin(angle - arrowheadAngle),
    ];
    const arrowheadPoint2 = [
      endPoint[0] - arrowLength * Math.cos(angle + arrowheadAngle),
      endPoint[1] - arrowLength * Math.sin(angle + arrowheadAngle),
    ];

    lastArrow.current.points = [
      ...startPoint,
      ...endPoint,
      ...arrowheadPoint1,
      ...endPoint,
      ...arrowheadPoint2,
    ];
    setArrows([...arrows, lastArrow.current]);
    ws?.send(JSON.stringify({ arrows }));
  }
};
