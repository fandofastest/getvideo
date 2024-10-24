const express = require("express");
const youtubedl = require("youtube-dl-exec"); // Pastikan Anda menggunakan modul yang benar
const app = express();
const port = 3000; // Atur port sesuai kebutuhan

app.get("/get", (req, res) => {
  const videoId = req.query.id;

  if (!videoId) {
    return res.status(400).send("Video ID is required");
  }

  youtubedl(`https://www.youtube.com/watch?v=${videoId}`, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  })
    .then((output) => {
      console.log(output);

      // Anda dapat mengakses output sesuai dengan data yang diberikan oleh youtube-dl
      // Misalnya, Anda mungkin ingin mendapatkan URL download dari output dan redirect ke sana
      if (output && output.url) {
        res.redirect(output.url); // Arahkan ke URL download video
      } else {
        res.status(500).send("Failed to retrieve video URL");
      }
    })
    .catch((err) => {
      console.error("Error downloading video:", err);
      res.status(500).send("Error downloading video");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
