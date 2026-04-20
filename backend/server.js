import express from "express";
import { pool } from "../db/connect.js";

const db = pool();

const port = 3002;
const server = express();
server.use(express.static("frontend"));
server.use(onEachRequest);
server.get("/api/artist/:id", onGetArtistById); //hej med dig jeg hedder kaj//
server.get("/api/albumsByReleaseDate", onGetAlbumsByReleaseDate);
server.get("/api/artist/:artist/albums", onGetAlbumsForArtists);
server.get("/api/album/:album/tracks", OnGetTracksForAlbum); //hej med dig jeg hedder kaj 2//
server.listen(port, onServerReady);

async function onGetArtistById(request, response) {
  const id = request.params.id;
  const dbResult = await db.query(
    `
        select stage_name, nationality
        from   artists
        where  artist_id = $1`,
    [id],
  );
  const rows = dbResult.rows;
  if (rows.length === 0) {
    response.sendStatus(404);
  } else {
    response.json(rows[0]);
  }
}

async function onGetAlbumsByReleaseDate(request, response) {
  const limit = request.query.limit;
  const dbResult = await db.query(
    `
        select   stage_name, title, release_date
        from     artists
        join     albums using (artist_id)
        order by release_date desc
        limit    $1`,
    [limit],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function onGetAlbumsForArtists(request, response) {
  const artist = request.params.artist;
  const limit = request.query.limit;
  const dbResult = await db.query(
    `
        select   title, release_date, riaa_certificate
        from     albums
        join     artists using (artist_id)
        where    stage_name = $1
        order by title asc
        limit    $2`,
    [artist, limit],
  );
  const rows = dbResult.rows;
  response.json(rows);
}

async function OnGetTracksForAlbum(request, response) {
  const album = request.params.album;
  const dbResult = await db.query(
    `
        select  t.title, t.milliseconds
        from tracks t
        join albums a using (album_id)
        where a.title = $1
        order by t.milliseconds asc`,
    [album],
  );
  response.json(dbResult.rows);
}

function onServerReady() {
  console.log("Webserver running on port", port);
}

function onEachRequest(request, response, next) {
  console.log(new Date(), request.method, request.url);
  next();
}
