const express = require("express");
const Youtube = require("youtube-sr").default;
const ytdl = require("ytdl-core");
const cors = require("cors");
const ytMusic = require("node-youtube-music").default;
const path = require("path");

//
const app = express();
const port = process.env.PORT || 1212;

// use
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => console.log(`running on ${port}`));

// app.post("/fetchinfo", async (req, res, next) => {
//   try {
//     const { title, artistsName } = req.body;

//     const searchData = await Youtube.search(`${title} ${artistsName}`, {
//       type: "video",
//       limit: 7,
//     });

//     var tempObj = {};
//     var isDataIsFound = false;

//     searchData.forEach((data, i) => {
//       const { duration } = data;

//       if (duration <= 450000 && duration >= 180000 && isDataIsFound == false) {
//         tempObj = data;

//         isDataIsFound = true;

//         console.log(i);
//       }
//     });

//     const info = await ytdl.getInfo(tempObj.url);
//     const format = ytdl.chooseFormat(info.formats, { filter: "audioonly" });

//     res.json({
//       url: format.url,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/youtube-music", async (req, res, next) => {
  try {
    const { title } = req.body;

    const musics = await ytMusic.searchMusics(`${title}`);

    const filterData = musics.map(async (ls, i) => {
      const info = await ytdl.getInfo(
        `https://www.youtube.com/watch?v=${ls.youtubeId}`
      );
      const format = ytdl.chooseFormat(info.formats, { filter: "audioonly" });

      const thumbnailUrl = info.videoDetails.thumbnails;
      return {
        id: ls.youtubeId,
        title: ls.title,
        thumbnailUrl: thumbnailUrl[thumbnailUrl.length - 1].url,
        duration: ls.duration,
        musicUrl: format.url,
      };
    });

    var finalData = await Promise.all(filterData);

    finalData = finalData.slice(0, 10);

    res.json({ data: finalData });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
});

// this request is for spotify clone android app
app.post("/sangitapp/youtube-music", async (req, res, next) => {
  try {
    const { title, artistsName } = req.body;

    const musics = await ytMusic.searchMusics(`${title} ${artistsName}`);

    const info = await ytdl.getInfo(
      `https://www.youtube.com/watch?v=${musics[0].youtubeId}`
    );
    const format = ytdl.chooseFormat(info.formats, { filter: "audioonly" });

    res.json({
      url: format.url,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
});

// server side build

// static folder

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
