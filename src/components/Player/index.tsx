import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0);

    const { episodeList,
        loop,
        pause,
        hasNext,
        shuffle,
        playNext,
        isPlaying,
        isLopping,
        hasPrevious,
        isShuffling,
        playPrevious,
        setPlayingState,
        clearPlayerState,
        currentEpisodeIndex,
    } = usePlayer()

    const episode = episodeList[currentEpisodeIndex]

    useEffect(() => {
        if (!audioRef.current) {
            return
        }

        if (isPlaying) {
            audioRef.current.play()
        }
        if (!isPlaying) {
            audioRef.current.pause()
        }
    }, [isPlaying])

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodesEnded() {
        if (hasNext) {
            playNext()
        } else {
            clearPlayerState()
        }
    }

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="" />

                <strong>Tocando agora {episode?.title}</strong>
            </header>

            {episode ?
                <div className={styles.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
                :
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>}

            <footer className={!episode && styles.empty}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ?
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                            :
                            <div className={styles.emptySlider} />
                        }
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {episode && <audio
                    src={episode.url}
                    autoPlay
                    onEnded={handleEpisodesEnded}
                    onLoadedMetadata={setupProgressListener}
                    ref={audioRef}
                    loop={isLopping}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                />}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode || episodeList.length === 1} onClick={shuffle} className={isShuffling ? styles.isActive : ''}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" onClick={pause} disabled={!episode} className={styles.playButton}>
                        {isPlaying ?
                            <img src="/pause.svg" alt="Tocar" />
                            :
                            <img src="/play.svg" alt="Tocar" />
                        }
                    </button>
                    <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
                        <img src="/play-next.svg" alt="Tocar proximo" />
                    </button>
                    <button type="button" disabled={!episode} onClick={loop} className={isLopping ? styles.isActive : ''}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div >
    )
}