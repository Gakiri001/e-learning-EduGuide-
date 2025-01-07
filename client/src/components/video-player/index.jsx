import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ width = "100%", height = "100%", url }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showcontrols, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  return (
    <div>
      <ReactPlayer width={"100%"} height={"100%"} url={url} />
    </div>
  );
}

export default VideoPlayer;
