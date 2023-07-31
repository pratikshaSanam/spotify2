import React from 'react'
import styled from "styled-components";
import { useStateProvider } from '../Utils/StateProvider';
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import axios from 'axios';
import { reducerCases } from '../Utils/Constants';


export default function PlayerControls() {

    const [{ token ,PlayerState}, dispatch]=useStateProvider();
    const changeTrack = async (type) => {
        var result =  token.replace(/"/g, '');
        await axios.post(
          `https://api.spotify.com/v1/me/player/${type}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " +  result,
            },
          }
        );
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        const response1 = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " +  result,
            },
          }
        );
        if (response1.data !== "") {
          const currentlyPlaying = {
            id: response1.data.item.id,
            name: response1.data.item.name,
            artists: response1.data.item.artists.map((artist) => artist.name),
            image: response1.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
        }
      };
    
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous" onClick={() => changeTrack("previous")}>
        <CgPlayTrackPrev  />
      </div>
      <div className="state">
        {PlayerState ? <BsFillPauseCircleFill /> :  <BsFillPlayCircleFill/>
        }
      </div>
      <div className="next" onClick={() => changeTrack("next")} >
        <CgPlayTrackNext />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
      
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
