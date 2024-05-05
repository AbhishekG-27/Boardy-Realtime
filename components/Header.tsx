import { ArrowTypes, CircleTypes, RectangleTypes } from "@/lib/types";
import { Check, Menu, X } from "lucide-react";
import GenerateId from "./GenerateId";

interface HeaderProps {
  createdRoomId: string;
  ws: WebSocket | null | undefined;
  setRoomJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  roomJoined: boolean;
  roomId: string;
  lines: number[][];
  rectangles: RectangleTypes[];
  circles: CircleTypes[];
  arrows: ArrowTypes[];
  texts: {}[];
  showPropertiesPanel: boolean;
  setShowPropertiesPanel: React.Dispatch<React.SetStateAction<boolean>>;
  clientId: string;
}

const Header = ({
  createdRoomId,
  ws,
  setRoomJoined,
  roomJoined,
  roomId,
  lines,
  rectangles,
  circles,
  arrows,
  texts,
  setRoomId,
  showPropertiesPanel,
  setShowPropertiesPanel,
  clientId,
}: HeaderProps) => {
  return (
    <div className="flex justify-between bg-[#121212] py-5 items-center px-3 w-full">
      <div className="flex gap-3">
        <div
          className="text-white px-3 py-2 border-white border-2 rounded-md hover:bg-white hover:text-black transition hover:cursor-pointer"
          onClick={() => {
            setShowPropertiesPanel(!showPropertiesPanel);
          }}
        >
          {!showPropertiesPanel ? <Menu /> : <X />}
        </div>
        <button
          className="text-white px-3 py-2 border-white border-2 rounded-md hover:bg-white hover:text-black transition"
          disabled={createdRoomId.length > 0}
          onClick={() => {
            ws?.send(JSON.stringify({ type: "create room" }));
          }}
        >
          {!createdRoomId ? "Create Room" : `Room Id : ${createdRoomId}`}
        </button>
        <button
          className="text-white px-3 py-2 border-white border-2 rounded-md hover:bg-white hover:text-black transition"
          onClick={() => {
            setRoomJoined(!roomJoined);
            if (roomJoined) {
              ws?.send(JSON.stringify({ type: "leave-room" }));
              return;
            }
            ws?.send(
              JSON.stringify({
                type: "join-room",
                roomId,
                lines,
                rectangles,
                circles,
                arrows,
                texts,
              })
            );
          }}
        >
          {roomJoined ? (
            <div className="flex gap-2">
              <Check />
              Leave Room
            </div>
          ) : (
            "Join Room"
          )}
        </button>
        {!roomJoined && (
          <input
            type="text"
            className="border-2 border-white bg-transparent rounded-md outline-none text-sm px-3 py-2 text-white"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room Id"
          />
        )}
      </div>
      <div>
        <GenerateId cliendId={clientId} />
      </div>
    </div>
  );
};

export default Header;
