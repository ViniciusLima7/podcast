import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;

};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleShuffling: () => void;
    toggleLoop: () => void;
    clearPlayingState: () => void;
    playNext: () => void;
    playPrevious: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setisPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setisPlaying(true);
    }


    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setisPlaying(true);
    }

    function togglePlay() {
        setisPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }
    function toggleShuffling() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setisPlaying(state);
    }

    function clearPlayingState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if (isShuffling){
                const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
                setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }

    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }

    }


    return (

        //Todos ps Componentes dentro do Player COntext terão acesso ao Player Context
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                isPlaying,
                togglePlay,
                playList,
                playNext,
                playPrevious,
                setPlayingState,
                hasPrevious,
                hasNext,
                isLooping,
                toggleLoop,
                toggleShuffling,
                isShuffling,
                clearPlayingState

            }}
        >
            {children}
        </PlayerContext.Provider>)
}


export const usePlayer = () => {
    return useContext(PlayerContext);
}