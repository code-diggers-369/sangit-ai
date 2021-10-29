import React, { useEffect, useState } from "react";
import Axios from "axios";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

// import components
import SongList from "./components/SongList/SongList";
import Aboutus from "./components/Aboutus/Aboutus";

// import utils
import { url } from "./utils/url";

// import external css
import "./App.css";

export default function App() {
  const [songIndex, setSongIndex] = useState(null);

  const [allSongDataList, setAllSongDataList] = useState([]);

  const [isSongIsPlaying, setIsSongIsPlaying] = useState(false);

  const [playerInstance, setPlayerInstance] = useState(null);

  useEffect(() => {
    alanBtn({
      key: "9a4f30e871081f2c18269df1f8fd7aff2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, songName, songNumber }) => {
        console.log("command = ", command);
        if (command == "play") {
          if (songName !== "else") {
            fetchDataFromServer(songName);
          } else {
            alanBtn().playText("Sorry Try Other Song");
            alanBtn().activate();
          }
        } else if (command == "startSong") {
          setIsSongIsPlaying(false);
          setCardDataFromAlanBtn(songNumber);
          setIsSongIsPlaying(true);
        } else if (command == "stop") {
          setAllSongDataList([]);
          setIsSongIsPlaying(false);
          setSongIndex(null);
          alanBtn().playText("ok do you want to listen any other song");
        } else if (command == "change") {
          alanBtn().playText("Can You Please Select Song Number");
        }
      },
    });

    return () => {};
  }, []);

  const fetchDataFromServer = async (songName) => {
    try {
      alanBtn().playText("Wait Let's Play");
      const response = await Axios(`${url}youtube-music`, {
        method: "POST",
        data: {
          title: songName,
        },
      });

      if (response.status == 200) {
        //
        await setAllSongDataList(response.data.data);
      } else {
        alanBtn().playText("Sorry Try Other Song");
        alanBtn().activate();
      }
      alanBtn().playText("Can You Please Select Song Number");
    } catch (err) {
      console.log(err);
    }
  };

  const setCardDataFromAlanBtn = async (songNumber) => {
    try {
      const songIndex = wordsToNumbers(songNumber)
        ? wordsToNumbers(songNumber)
        : 0;
      setSongIndex(songIndex);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      {/* title */}
      <h1 className="title mt-3">Sangit Ai</h1>

      {/*  */}

      {/*  */}
      {allSongDataList.length > 0 ? (
        <SongList
          allSongDataList={allSongDataList}
          songIndex={songIndex}
          isSongIsPlaying={isSongIsPlaying}
          setPlayerInstance={setPlayerInstance}
        />
      ) : (
        <div>
          <div className="mb-5 custom-model">
            <h3>Give Command Like</h3>
            <h6> Play Bollywood Songs</h6>
            <h6>Play Song Number 1</h6>
          </div>

          <Aboutus />
        </div>
      )}
    </div>
  );
}
