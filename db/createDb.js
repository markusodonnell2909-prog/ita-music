import { connect } from "./connect.js";
import upload from "pg-upload";

const db = await connect();
const timestamp = (await db.query("select now() as timestamp")).rows[0][
  "timestamp"
];
console.log(`Recreating database on ${timestamp}...`);

await db.query("drop table if exists instuctors");
await db.query("drop table if exists movies");
await db.query("drop table if exists ratings");
await db.query("drop table if exists users");
await db.query("drop table if exists actors");
await db.query("drop table if exists genres");
console.log("Creating tables...");

await db.query(`
    create table instructors (
        instructor_id   integer unique not null,
        instructor_name  text,
        nationality char(2) not null
    )
`);
await db.query(`
    create table movies (
        movie_id         integer unique not null,
        instructor_id    integer not null,
        actor_id         integer  not null,   
        title            text,
        duration         text,
        where_to_watch   text,
        release date     integer,
        actors           text     
    )
`);
await db.query(`
    create table ratings (
        rating id     integer unique not null,
        movie  id     integer not null,
        user_id       integer not null,
        score         integer check (score >0 and score <11)   

    )
`);
await db.query(`
    create table users (
        user_id       integer unique not null,
        name          text
    )
`);
await db.query(`
    create table actors (
        actor_id      integer unique not null,
        actor_name    text,
        nationality   char (2)  
    )
`);
await db.query(`
    create table genres (
        genre_id    integer unique not null,
        genre_name  text        
    )
`);

await upload(
  db,
  "db/instructors.csv",
  `
    copy instructors (instructor_id, instructor_name, nationality)
    from stdin
    with csv header encoding 'UTF-8'
`,
);

await upload(
  db,
  "db/movies.csv",
  `
    copy movies (movie_id, instructor_id, actor_id, genre_id, title, duration, where_to_watch, releasedate, actors)
    from stdin
    with csv header encoding 'UTF-8'
`,
);

await upload(
  db,
  "db/ratings.csv",
  `
    copy  ratings (rating_id, movie_id, user_id, score)
    from  stdin
    with  csv header encoding 'UTF-8'
`,
);

await upload(
  db,
  "db/users.csv",
  `
    copy users (user_id, name)
    from stdin
    with csv header encoding 'UTF-8'
`,
);

await upload(
  db,
  "db/actors.csv",
  `
    copy actors (actor_id, actor_name, nationality)
    from stdin
    with csv header encoding 'UTF-8'
`,
);
await upload(
  db,
  "db/genres.csv",
  `
    copy genres (genres_id, genre_name)
    from stdin
    with csv header encoding 'UTF-8'
`,
);

await db.end();
console.log("Database successfully recreated.");
