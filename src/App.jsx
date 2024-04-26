import React, { useState, useRef, useEffect } from 'react';
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import './App.css';

const App = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio());

  const tracks = [
    {
      name: 'Junoon',
      src: '/audio1.mp3',
      image: 'https://i1.sndcdn.com/artworks-hgjGIndzXzTw-0-t500x500.jpg'
    },
    {
      name: 'O Mahhi',
      src: '/audio2.mp3',
      image: 'https://c.saavncdn.com/058/O-Maahi-From-Dunki-Hindi-2023-20231211171007-500x500.jpg'
    },
    // Add more tracks here...
  ];

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);



  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const prevTrackHandler = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
    setIsPlaying(true);
  };

  const nextTrackHandler = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === tracks.length - 1 ? 0 : prevIndex + 1));
    setIsPlaying(true);
  };

  const timeChangeHandler = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
    audioRef.current.addEventListener('timeupdate', updateCurrentTime);
    return () => {
      audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  const volumeChangeHandler = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    const updateVolume = () => {
      setVolume(audioRef.current.volume);
    };

    audioRef.current.addEventListener('volumechange', updateVolume);

    return () => {
      audioRef.current.removeEventListener('volumechange', updateVolume);
    };
  }, []);

  useEffect(() => {
    const handleEnded = () => {
      // Move to the next track when the current track ends
      nextTrackHandler();
    };
  
    // Add event listener for 'ended' event
    audioRef.current.addEventListener('ended', handleEnded);
  
    // Clean up event listener on component unmount
    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  // Update total time when the audio is loaded
useEffect(() => {
  const handleLoadedMetadata = () => {
    setTotalTime(audioRef.current.duration);
  };

  audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

  return () => {
    audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
  };
}, []);

  // Update current time continuously
useEffect(() => {
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

  return () => {
    audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
  };
}, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className='player-wrapper'>
      <div className="music-player">
        <div className="track-info">
          <div className='track-image-container'>
            <div class="playing">
              <div class="greenline line-1"></div>
              <div class="greenline line-2"></div>
              <div class="greenline line-3"></div>
              <div class="greenline line-4"></div>
              <div class="greenline line-5"></div>
              <div class="greenline line-1"></div>
              <div class="greenline line-2"></div>
              <div class="greenline line-3"></div>
              <div class="greenline line-4"></div>
              <div class="greenline line-5"></div>
              <div class="greenline line-1"></div>
              <div class="greenline line-2"></div>
              <div class="greenline line-3"></div>
              <div class="greenline line-4"></div>
              <div class="greenline line-5"></div>
              <div class="greenline line-1"></div>
              <div class="greenline line-2"></div>
              <div class="greenline line-3"></div>
              <div class="greenline line-4"></div>
              <div class="greenline line-5"></div>
            </div>
            <img src={currentTrack.image} alt="Track" />
          </div>
          <div className='track-info-name'>
            <h1>{currentTrack.name}</h1>
            <p>Author name</p>
          </div>
        </div>
        <div className="player-controls">
          <div className='player-timer'>
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={audioRef.current.duration}
              step="0.01"
              value={currentTime}
              onChange={timeChangeHandler}
            />
            <span>{formatTime(totalTime)}</span>
          </div>
          <div className='control-buttons'>
            <MdSkipPrevious size={30} onClick={prevTrackHandler} />
            {isPlaying ? <FaCirclePause size={30} onClick={playPauseHandler} /> : <FaCirclePlay size={30} onClick={playPauseHandler} />}
            <MdSkipNext size={30} onClick={nextTrackHandler} />
          </div>
          <div className='player-volume'>
            {
              volume == 0 ? <BiSolidVolumeMute /> :  <BiSolidVolumeFull />
            }
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={volumeChangeHandler}
            />
          </div>
        </div>
        <audio ref={audioRef} src={currentTrack.src} />
      </div>
      {/* <div className="track-list">
        {tracks.map((track, index) => (
          <div key={index} className="track">
            <img src={track.image} alt="Track" />
            <p>{track.name}</p>
            <button onClick={() => playTrack(index)}>Play</button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default App;
