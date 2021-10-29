import React, { useState } from "react";

// import card
import Card from "../Card/Card";

// import css
import "./SongList.css";

export default function SongList({
  allSongDataList,
  songIndex,
  isSongIsPlaying,
}) {
  //

  //
  return (
    <>
      {/*  */}
      {songIndex && isSongIsPlaying ? (
        <Card cardData={allSongDataList[songIndex - 1]} />
      ) : null}
      {/*  */}
      <div className="container mt-5">
        <table className="table table-dark ">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Song Name</th>
            </tr>
          </thead>
          <tbody>
            {allSongDataList ? (
              allSongDataList.map((ls, index) => {
                return (
                  <tr key={ls.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{ls.title}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th></th>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
