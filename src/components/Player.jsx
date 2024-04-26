import React, { useState, useRef, useEffect } from 'react'
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6"
import { MdSkipNext, MdSkipPrevious, MdMusicNote } from "react-icons/md"
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi"
import { IoClose } from "react-icons/io5"
import './Player.css'

const Player = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [totalTime, setTotalTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlayerOpen, setIsPlayerOpen] = useState(true)
  const audioRef = useRef(new Audio());

  const tracks = [
    {
      name: 'O Mahhi',
      src: '/songs/audio1.mp3',
      author: 'Pritam, Arijit Singh',
      image: 'https://c.saavncdn.com/058/O-Maahi-From-Dunki-Hindi-2023-20231211171007-500x500.jpg'
    },
    {
      name: 'Tere Hawale',
      src: '/songs/audio2.mp3',
      author: 'Arijit Singh, Shilpa Rao',
      image: 'https://c.saavncdn.com/119/Tere-Hawaale-From-Laal-Singh-Chaddha-Hindi-2022-20220804093945-500x500.jpg'
    },
    {
      name: 'Pehle Bhi Main',
      src: '/songs/audio3.mp3',
      author: 'Vishal Mishra',
      image: 'https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20231124191036-500x500.jpg'
    },
    {
      name: 'Satranga',
      src: '/songs/audio4.mp3',
      author: 'Pritam, Arijit Singh',
      image: 'https://c.saavncdn.com/415/Satranga-From-ANIMAL-Hindi-2023-20231027131032-500x500.jpg'
    },
    {
      name: 'Hawayein',
      src: '/songs/audio5.mp3',
      author: 'Arijit Singh',
      image: 'https://c.saavncdn.com/260/Hawayein-From-Jab-Harry-Met-Sejal--Hindi-201720170726112607-500x500.jpg'
    },
  ];


  const playerCloseHandler = () => {
    console.log('clicked player')
    setIsPlayerOpen(!isPlayerOpen)
  }

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
  }, []);

  useEffect(() => {
    const handleEnded = () => {
      nextTrackHandler();
    };
    audioRef.current.addEventListener('ended', handleEnded);
  }, [audioRef.current]);

  // Update total time when the audio is loaded
  useEffect(() => {
    const handleLoadedMetadata = () => {
      setTotalTime(audioRef.current.duration);
    };
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
  }, []);

  // Update current time continuously
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={`player-wrapper ${isPlayerOpen ? 'player-clicked' : ''}`}>
      {
        !isPlayerOpen ? (
          <div className={`player-open-btn`} onClick={playerCloseHandler}>
        <MdMusicNote size={20} />
      </div>
        ) : (<></>)
      }
      <div className={`music-player ${isPlayerOpen ? 'player-open' : 'player-close'}`}>
        <div className="player-close-btn" onClick={playerCloseHandler}>
          <IoClose size={30} />
        </div>
        <div className='player-first-part'>
          <div className="track-info">
            <div className='track-image-container'>
              {
                isPlaying ? 
                (
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
                )
                : (<></>)
              }
              <img src={currentTrack.image} alt="Track" />
            </div>
            <div className='track-info-name'>
              <h2>{currentTrack.name}</h2>
              <p>{currentTrack.author}</p>
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
              <MdSkipPrevious color='#fac635' size={40} onClick={prevTrackHandler} />
              {isPlaying ? <FaCirclePause color='#fac635' size={50} onClick={playPauseHandler} /> : <FaCirclePlay color='#fac635' size={50} onClick={playPauseHandler} />}
              <MdSkipNext color='#fac635' size={40} onClick={nextTrackHandler} />
            </div>
            <div className='player-volume'>
              {
                volume == 0 ? <BiSolidVolumeMute color='#fac635' size={20} /> : <BiSolidVolumeFull color='#fac635' size={20} />
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
        <div className="track-list">
          {tracks.map((track, index) => (
            <div key={index} className="track">
              <div className='track-img-name'>
                <img src={track.image} alt="Track" loading='lazy'/>
                <p>{track.name}</p>
              </div>
              <FaCirclePlay color='#fac635' size={30} onClick={() => playTrack(index)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;
