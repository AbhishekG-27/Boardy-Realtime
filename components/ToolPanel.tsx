import {
  MoveRight,
  PenLine,
  RectangleHorizontal,
  RemoveFormatting,
  SquareMousePointer,
  Circle as IconCircle,
} from "lucide-react";

interface ToolPanelProps {
  isDrawing: React.MutableRefObject<boolean>;
  setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}

const ToolPanel = ({ isDrawing, setIsDraggable, setTool }: ToolPanelProps) => {
  return (
    <div>
      <div className="bg-[#232329] text-white py-1 px-2 rounded-md absolute top-[50%] -translate-y-[50%] right-4">
        <div className="flex flex-col justify-between">
          <div className="flex gap-2 hover:cursor-pointer p-2 rounded-md hover:bg-[#31303b]">
            <div
              onClick={() => {
                isDrawing.current = false;
                setIsDraggable(true);
              }}
            >
              <SquareMousePointer size={16} />
            </div>
          </div>
          <div className="flex gap-2 hover:cursor-pointer p-2 rounded-md hover:bg-[#31303b]">
            <div
              onClick={() => {
                setTool("text");
                setIsDraggable(false);
              }}
            >
              <RemoveFormatting size={16} />
            </div>
          </div>
          <div className="flex gap-2 hover:cursor-pointer p-2 rounded-md hover:bg-[#31303b]">
            <div
              onClick={() => {
                setTool("pen");
                setIsDraggable(false);
              }}
            >
              <PenLine size={16} />
            </div>
          </div>
          <div className="flex gap-2 hover:cursor-pointer p-2 rounded-md hover:bg-[#31303b]">
            <div
              onClick={() => {
                setTool("circle");
                setIsDraggable(false);
              }}
            >
              <IconCircle size={16} />
            </div>
          </div>
          <div className="flex gap-2 hover:cursor-pointer p-2 rounded-md hover:bg-[#31303b]">
            <div
              onClick={() => {
                setTool("rectangle");
                setIsDraggable(false);
              }}
            >
              <RectangleHorizontal size={16} />
            </div>
          </div>
          <div className="flex gap-2 hover:cursor-pointer p-2 rounded-md hover:bg-[#31303b]">
            <div
              onClick={() => {
                setTool("arrow");
                setIsDraggable(false);
              }}
            >
              <MoveRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
