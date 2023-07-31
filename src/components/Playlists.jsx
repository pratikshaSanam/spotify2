import axios from 'axios';
import React,{useEffect} from 'react'
import { styled } from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider'


export default function Playlists() {
  

  const [{ token, playlists }, dispatch]=useStateProvider();

    
    useEffect(()=> {
       
        const getPlaylistData = async () => {
          var result =  token.replace(/"/g, '');
          // console.log(result)
            const response = await axios.get(
              "https://api.spotify.com/v1/me/playlists",
             
              {
                headers: {
                  Authorization: `Bearer ${result}`,
                  "Content-Type": "application/json",
                },
                
                }
                );
                //  console.log(response)
                const {items} =response.data
                const playlists = items.map(({name,id})=>{
                  return{name,id};
                });

                dispatch({type:reducerCases.SET_PLAYLISTS,playlists})

        };
        getPlaylistData();
        
      
    },[token,dispatch])
 
  return (
  <Container>

    <ul>
      {playlists.map(({name,id})=>{
          return(
            <li key={id}>{name}</li>
          )
        })}
      {playlists.map(({name,id})=>{
          return(
            <li key={id}>{name}</li>
          )
        })}
    </ul>
  </Container>
  );
  
}
 const Container = styled.div`
 
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
}
 `;