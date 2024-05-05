interface PropertiesPanelProps {
  setCircleColor: (color: string) => void;
  showPropertiesPanel: boolean;
}

const PropertiesPanel = ({
  setCircleColor,
  showPropertiesPanel,
}: PropertiesPanelProps) => {
  return (
    <div>
      <div
        className={`${
          showPropertiesPanel ? "flex flex-col" : "hidden"
        } absolute left-0 top-1/2 -translate-y-1/2 text-white z-10 bg-[#232329] rounded-md gap-6 p-3 transition-all delay-700`}
      >
        <div className="flex flex-col gap-3">
          <div>Stroke Color</div>
          <div className="flex gap-2">
            <div
              className="h-8 w-8 rounded-md bg-[#1e1e1e] hover:cursor-pointer"
              onClick={() => {
                setCircleColor("#1e1e1e");
              }}
            ></div>
            <div
              className="h-8 w-8 rounded-md bg-[#e03131] hover:cursor-pointer"
              onClick={() => {
                setCircleColor("#e03131");
              }}
            ></div>
            <div
              className="h-8 w-8 rounded-md bg-[#2f9e44] hover:cursor-pointer"
              onClick={() => {
                setCircleColor("#2f9e44");
              }}
            ></div>
            <div
              className="h-8 w-8 rounded-md bg-[#1971c2] hover:cursor-pointer"
              onClick={() => {
                setCircleColor("#1971c2");
              }}
            ></div>
            <div
              className="h-8 w-8 rounded-md bg-[#f08c00] hover:cursor-pointer"
              onClick={() => {
                setCircleColor("#f08c00");
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>Stroke Width</div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-md bg-[#363541] font-medium text-center">
              -
            </div>
            <div className="h-8 w-8 rounded-md bg-[#363541] font-semibold text-center">
              -
            </div>
            <div className="h-8 w-8 rounded-md bg-[#363541] font-bold text-center">
              -
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>Opacity</div>
          <div>
            <input type="range" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
