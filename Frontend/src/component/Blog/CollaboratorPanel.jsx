import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import "./CollaboratorPanel.css";
import UseUser from "../UserContext/UserContext";
import toast from "react-hot-toast";

export default function CollaboratorPanel({
  blogId,
  socket,
  user,
  blogCreatorId,
  customRoomId,
  setCustomRoomId,
  currentRoom,
  setCurrentRoom,
  onEditableChange,
  onClose,
}) {
  const isOwner = user?._id === blogCreatorId;
  const defaultRoom = `${blogId}`;
  const { CurrentUser } = UseUser();
  useEffect(() => {
    if (!socket) return;

    const handleJoinedRoom = (room) => {
      setCurrentRoom(room);
      onEditableChange(true); // Enable editing
    };

    const handleUserJoined = (user) => {
      toast.success(`${user} user joined the room!`);
    };

    const handleRoomNotFound = () => {
      toast.error("Room not found. Ask the owner to start the session.");
      onEditableChange(false);
    };

    socket.on("joined-room", handleJoinedRoom);
    socket.on("user-joined", handleUserJoined);
    socket.on("room-not-found", handleRoomNotFound);

    return () => {
      socket.off("joined-room", handleJoinedRoom);
      socket.off("user-joined", handleUserJoined);
      socket.off("room-not-found", handleRoomNotFound);
    };
  }, [socket]);

  const userJoinRoom = (room) => {
    if (!socket || !room) return;
    if (currentRoom && currentRoom !== room) {
      socket.emit("leave-room", currentRoom);
    }
    socket.emit("user-join-room", {roomId: room,user:CurrentUser?.name});
  };
  const ownerJoinRoom = (room) => {
    if (!socket || !room) return;
    if (currentRoom && currentRoom !== room) {
      socket.emit("leave-room", currentRoom);
    }
    socket.emit("owner-join-room", room);
  };

  const handleCreateRoom = () => {
    ownerJoinRoom(defaultRoom);
  };

  const handleJoinCustom = () => {
    if (customRoomId.trim() === defaultRoom) {
      userJoinRoom(customRoomId.trim());
    } else {
      alert("Invalid Room ID");
    }
  };

  const handleLeave = () => {
    if (!socket || !currentRoom) return;

    if (isOwner) {
      // Owner ends the room for everyone
      socket.emit("end-room", currentRoom);
    } else {
      // Non-owner just leaves the room
      socket.emit("leave-room", currentRoom);
      onEditableChange(false); // Disable editing for this user
    }

    setCurrentRoom(null);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    <div className="collab-wrapper">
      <div className="collab-panel">
        <h4 className="collab-heading">Collaboration</h4>

        {currentRoom && (
          <div className="collab-current-room">
            <span>Currently in:</span>
            <code className="collab-code">{currentRoom}</code>
            <button className="collab-leave-btn" onClick={handleLeave}>
              {isOwner ? "End Room" : "Leave Room"}
            </button>
          </div>
        )}

        <hr className="collab-hr" />

        {isOwner ? (
          <div className="collab-section">
            {currentRoom === defaultRoom ? (
              <>
                <label className="collab-label">Room ID</label>
                <div className="collab-inline-row">
                  <input
                    readOnly
                    value={defaultRoom}
                    className="collab-readonly-input"
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    aria-label="Copy room ID"
                    onClick={() => copyToClipboard(defaultRoom)}
                    className="collab-icon-btn"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </>
            ) : (
              <button className="collab-join-btn" onClick={handleCreateRoom}>
                Create Room
              </button>
            )}
          </div>
        ) : (
          <div className="collab-section">
            <label className="collab-label">Enter Room ID</label>
            <input
              type="text"
              placeholder="Paste room ID"
              value={customRoomId}
              onChange={(e) => setCustomRoomId(e.target.value)}
              className="collab-input"
            />
            <button
              className="collab-join-btn"
              disabled={!customRoomId}
              onClick={handleJoinCustom}
            >
              Join Room
            </button>
          </div>
        )}

        <hr className="collab-hr" />
        <button className="collab-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
