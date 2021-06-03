import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    url: string
    title: string,
    members: string,
    duration: number,
    thumbnail: string,
}

type PlayerContextData = {
    hasPrevious: boolean;
    hasNext: boolean;
    isPlaying: boolean;
    isLopping: boolean;
    isShuffling: boolean;
    currentEpisodeIndex: number,
    episodeList: Episode[],
    loop: () => void,
    pause: () => void,
    shuffle: () => void,
    playNext: () => void,
    playPrevious: () => void,
    clearPlayerState: () => void,
    play: (episode: Episode) => void
    playList: (list: Episode[], index: number) => void,
    setPlayingState: (state: boolean) => void,

}

type PlayerContextProviderProps = {
    children: ReactNode
}


export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {

    const [isPlaying, setIsplaying] = useState(false)
    const [isLopping, setIsLopping] = useState(false)
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isShuffling, setIsShuffling] = useState(false)

    function shuffle() {
        setIsShuffling(!isShuffling)
    }
    function loop() {
        setIsLopping(!isLopping)
    }

    function play(episode: Episode) {
        setIsplaying(true)
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
    }

    function playList(list: Episode[], index: number) {
        setIsplaying(true)
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
    }

    function pause() {
        setIsplaying(!isPlaying)
    }

    function setPlayingState(state: boolean) {
        setIsplaying(state);
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * (episodeList.length - 1))
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function Loop() {
        setIsLopping(!isLopping)
    }

    return (
        <PlayerContext.Provider value={{
            play,
            loop,
            pause,
            hasNext,
            shuffle,
            playNext,
            playList,
            isLopping,
            isPlaying,
            hasPrevious,
            episodeList,
            isShuffling,
            playPrevious,
            setPlayingState,
            clearPlayerState,
            currentEpisodeIndex
        }}>
            {children}
        </PlayerContext.Provider>)
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
