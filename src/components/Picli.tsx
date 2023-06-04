import { TokenMeta } from "@/models/tokenMeta";
import clsx from "clsx";
import React, { Fragment, useMemo, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import { Transition } from "@headlessui/react";

export const Picli: React.FC<{
  token: TokenMeta;
  onReady?: (player: Player) => void;
}> = ({ token: { transcoded_id, image }, onReady, ...props }) => {
  const [play, setPlay] = useState(false);
  const options = useMemo(
    () => ({
      controls: false,
      autoplay: false,
      loop: true,
      controlBar: {
        playToggle: false,
        captionsButton: false,
        chaptersButton: false,
        subtitlesButton: false,
        remainingTimeDisplay: false,
        progressControl: {
          seekBar: true,
        },
        fullscreenToggle: false,
        playbackRateMenuButton: false,
      },
      techOrder: ["html5"],
      sources: [
        {
          src: `https://media.thetavideoapi.com/${process.env.NEXT_PUBLIC_THETA_VIDEO_USER}/${process.env.NEXT_PUBLIC_THETA_VIDEO_SRVA}/${transcoded_id}/master.m3u8`,
          type: "application/vnd.apple.mpegurl",
          label: "480p",
        },
      ],
    }),
    [transcoded_id]
  );
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<Player | null>(null);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else if (playerRef.current) {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const handlePlay = async () => {
    await playerRef.current?.currentTime(0);
    await playerRef.current?.playbackRate(2);
    await playerRef.current?.play();
    setPlay(true);
  };
  const handleStop = async () => {
    setPlay(false);
    await playerRef.current?.pause();
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={handlePlay}
      onMouseOut={handleStop}
    >
      {image && (
        <Transition
          as={Fragment}
          show={!play}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <img
            className={clsx(
              "absolute h-full w-full object-cover"
            )}
            src={image}
            width={480}
            height={480}
            alt=""
            sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </Transition>
      )}
      {!image && (
        <span className="absolute flex h-full w-full items-center justify-center">
          In processing...
        </span>
      )}
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    </div>
  );
};
