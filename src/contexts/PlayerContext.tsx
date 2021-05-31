import { createContext, useState } from 'react';

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean;
    pause: () => void,
    setPlayingState: (state: boolean) => void,
    play: (episode: Episode) => void
}


export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }) {

    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsplaying] = useState(false)

    function play(episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsplaying(true)
    }

    function pause() {
        setIsplaying(!isPlaying)
    }

    function setPlayingState(state: boolean) {
        setIsplaying(state);
    }

    return (
        <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, pause, setPlayingState }}>
            {children}
        </PlayerContext.Provider>)
}
