"use client";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Circle, Rect, Arrow, Text } from "react-konva";
import { ArrowTypes, CircleTypes, RectangleTypes } from "@/lib/types";
import Header from "@/components/Header";
import PropertiesPanel from "@/components/PropertiesPanel";
import ToolPanel from "@/components/ToolPanel";
import { handleMouseDown } from "@/utils/handleMouseDown";
import { handleMouseMove } from "@/utils/handleMouseMove";
import { InitWebSocket } from "@/utils/WebSocketUtils";

const Whiteboard = () => {
  const [roomJoined, setRoomJoined] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [cliendId, setClientId] = useState("");
  const [inputText, setInputText] = useState("");
  const [roomId, setRoomId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState("");
  const [tool, setTool] = useState("pen");
  const [showInput, setShowInput] = useState(false);
  const [inputPos, setInputPos] = useState([0, 0]);
  const [showProperties, setShowProperties] = useState(false);

  const [lines, setLines] = useState([[0, 0]]);
  const [texts, setTexts] = useState([{ text: "", pos: [0, 0] }]);
  const [arrows, setArrows] = useState<ArrowTypes[]>([]);
  const [circles, setCircles] = useState<CircleTypes[]>([
    { x: 0, y: 0, radius: 0, stroke: "", strokeWidth: 0, isDragging: false },
  ]);
  const [rectangles, setRectangles] = useState<RectangleTypes[]>([
    {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      stroke: "",
      strokeWidth: 0,
    },
  ]);

  const isDrawing = useRef(false);
  const lastArrow = useRef<ArrowTypes>({
    points: [],
  });
  const lastLine = useRef<number[]>([]);
  const lastCircle = useRef<CircleTypes>({
    x: undefined,
    y: undefined,
    radius: 0,
    stroke: "#000",
    strokeWidth: 2,
    isDragging: false,
  });
  const lastRectangle = useRef<RectangleTypes>({
    x: undefined,
    y: undefined,
    width: 0,
    height: 0,
    stroke: "#000",
    strokeWidth: 0,
  });

  const [ws, setWs] = useState<WebSocket | null>();

  // circle properties
  const [circleColor, setCircleColor] = useState("#fff");
  const [circleStrokeWidth, setCircleStrokeWidth] = useState(3);
  const [circleOpacity, setCircleOpacity] = useState(1);

  // rectangle properties
  const [rectangleColor, setRectangleColor] = useState("#fff");
  const [rectangleStrokeWidth, setRectangleStrokeWidth] = useState(3);
  const [rectangleOpacity, setRectangleOpacity] = useState(1);

  // arrow properties
  const [arrowColor, setArrowColor] = useState("#fff");
  const [arrowStrokeWidth, setArrowStrokeWidth] = useState(3);
  const [arrowOpacity, setArrowOpacity] = useState(1);

  // text properties
  const [textColor, setTextColor] = useState("#fff");
  const [textFontSize, setTextFontSize] = useState(20);
  const [textFontStyle, setTextFontStyle] = useState("bold");
  const [textFontFamily, setTextFontFamily] = useState("Arial");
  const [textOpacity, setTextOpacity] = useState(1);

  // line properties
  const [lineColor, setLineColor] = useState("#fff");
  const [lineStrokeWidth, setLineStrokeWidth] = useState(3);
  const [lineOpacity, setLineOpacity] = useState(1);

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("dblclick", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setTool("text");
      setInputPos([x, y]);
      setShowInput(true);
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === "1") {
        setIsDraggable(true);
      }
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === "2") {
        setTool("text");
      }
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === "3") {
        setTool("pen");
      }
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === "4") {
        setTool("circle");
      }
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === "5") {
        setTool("rectangle");
      }
    });
    window.addEventListener("keypress", (e) => {
      if (e.key === "6") {
        setTool("arrow");
      }
    });

    return () => {};
  }, []);

  useEffect(() => {
    const webSocket = InitWebSocket({
      url: "ws://13.232.78.182/ws",
      setClientId,
      setArrows,
      setCircles,
      setLines,
      setRectangles,
      setTexts,
      setCreatedRoomId,
    });
    setWs(webSocket);

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Header
        createdRoomId={createdRoomId}
        ws={ws}
        setRoomJoined={setRoomJoined}
        roomJoined={roomJoined}
        roomId={roomId}
        lines={lines}
        rectangles={rectangles}
        circles={circles}
        arrows={arrows}
        texts={texts}
        setRoomId={setRoomId}
        showPropertiesPanel={showProperties}
        setShowPropertiesPanel={setShowProperties}
        clientId={cliendId}
      />
      <PropertiesPanel
        setCircleColor={setCircleColor}
        showPropertiesPanel={showProperties}
      />
      {showInput ? (
        <input
          autoFocus
          type="text"
          className="bg-transparent rounded-md outline-none text-xl text-white absolute z-10"
          style={showInput && { left: inputPos[0], top: inputPos[1] }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTexts([
                ...texts,
                { text: inputText, pos: [inputPos[0], inputPos[1]] },
              ]);
              setShowInput(false);
              setTool("pen");
              setInputText("");
              ws?.send(JSON.stringify({ texts }));
            }
          }}
        />
      ) : null}
      <Stage
        width={typeof window !== "undefined" ? window.innerWidth : 0}
        height={typeof window !== "undefined" ? window.innerHeight : 0}
        onMouseDown={(e) => {
          handleMouseDown({
            isDraggable,
            isDrawing,
            event: e,
            tool,
            lastArrow,
            lastLine,
            lastCircle,
            lastRectangle,
          });
        }}
        onMousemove={(event: KonvaEventObject<MouseEvent>) => {
          handleMouseMove({
            event: event,
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
          });
        }}
        onMouseUp={handleMouseUp}
        className="border-2 border-black bg-[#121212]"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line}
              stroke={lineColor}
              strokeWidth={lineStrokeWidth}
              opacity={lineOpacity}
            />
          ))}
          {circles.map((circle, i) => (
            <Circle
              key={i}
              {...circle}
              strokeWidth={circleStrokeWidth}
              stroke={circleColor}
              draggable={isDraggable}
              opacity={circleOpacity}
              onDragEnd={(e) => {
                const x = e.target.x();
                const y = e.target.y();
                setCircles((c) => {
                  const newCircles = c;
                  newCircles[i].x = x;
                  newCircles[i].y = y;
                  return newCircles;
                });
                ws?.send(JSON.stringify({ circles }));
                setIsDraggable(false);
              }}
              onClick={(e) => {
                e.target.attrs.stroke = "#2f9e44";
                console.log(e.target.attrs.stroke);
              }}
            />
          ))}
          {texts.map((text, i) => (
            <Text
              key={i}
              text={text.text}
              x={text.pos[0]}
              y={text.pos[1]}
              fill={textColor}
              opacity={textOpacity}
              fontSize={textFontSize}
              fontStyle={textFontStyle}
              fontFamily={textFontFamily}
              draggable={isDraggable}
              onDragEnd={(e) => {
                const x = e.target.x();
                const y = e.target.y();
                setTexts((t) => {
                  const newTexts = t;
                  newTexts[i].pos = [x, y];
                  return newTexts;
                });
                ws?.send(JSON.stringify({ texts }));
                setIsDraggable(false);
              }}
            />
          ))}
          {rectangles.map((rectangle, i) => (
            <Rect
              key={i}
              {...rectangle}
              stroke={rectangleColor}
              strokeWidth={rectangleStrokeWidth}
              draggable={isDraggable}
              opacity={rectangleOpacity}
              onDragEnd={(e) => {
                const x = e.target.x();
                const y = e.target.y();
                setRectangles((r) => {
                  const newRectangles = r;
                  newRectangles[i].x = x;
                  newRectangles[i].y = y;
                  return newRectangles;
                });
                ws?.send(JSON.stringify({ rectangles }));
                setIsDraggable(false);
              }}
            />
          ))}
          {arrows.map((arrow, i) => (
            <Arrow
              points={arrow.points}
              hitStrokeWidth={3}
              pointerLength={10}
              key={i}
              stroke={arrowColor}
              fill={arrowColor}
              opacity={arrowOpacity}
              strokeWidth={arrowStrokeWidth}
              // draggable={isDraggable}
              onDragEnd={(e) => {
                const x = e.target.x();
                const y = e.target.y();
                setArrows((a) => {
                  const newArrows = a;
                  newArrows[newArrows.length - 1].points = [
                    a[i].points[0],
                    a[i].points[1],
                    x,
                    y,
                  ];
                  return newArrows;
                });
                setIsDraggable(false);
              }}
            />
          ))}
        </Layer>
      </Stage>
      <ToolPanel
        isDrawing={isDrawing}
        setIsDraggable={setIsDraggable}
        setTool={setTool}
      />
    </div>
  );
};

export default Whiteboard;
