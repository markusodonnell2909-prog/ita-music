
create table albums (
  artist text,
  title text,
  year integer
);


delete from tracks
where album_id not in (select album_id from albums);


delete from playlists
where user_id not in (select user_id from users);


delete from playlist_track
where track_id not in (select track_id from tracks);

delete from playlist_track
where playlist_id not in (select playlist_id from playlists);


alter table playlist_track
add constraint track_fk
foreign key (track_id)
references tracks  (track_id);

alter table playlist_track
add constraint playlist_fk
foreign key (playlist_id)
references playlists (playlist_id);


insert into albums (artist, title, year) values
('Joey Badass', 'Super Predator', 2017),
('Joey Badass', 'Temptation', 2017),
('Joey Badass', 'Snakes', 2012),
('Joey Badass', 'Righteous Minds', 2012),
('Joey Badass', 'Killuminati', 2012);

('Joey Badass', 'FromDaTombs'),
('Joey Badass', 'Life & Times'),
('Joey Badass', 'Love Is Only A Feeling');


INSERT INTO albums (artist, title, year) VALUES
('Joey Bada$$', 'Waves', 2012),
('Joey Bada$$', 'Survival Tactics', 2012),
('Joey Bada$$', 'Hardknock', 2012),
('Joey Bada$$', 'World Domination', 2012),
('Joey Bada$$', 'Christ Conscious', 2015),
('Joey Bada$$', 'Paper Trail$', 2015),
('Joey Bada$$', 'Big Dusty', 2015),
('Joey Bada$$', 'Devastated', 2017),
('Joey Bada$$', 'Land of the Free', 2017),
('Joey Bada$$', 'Head High', 2022);


INSERT INTO albums (artist, title, year) VALUES
('J. Cole', 'No Role Modelz', 2014),
('J. Cole', 'Power Trip', 2013),
('J. Cole', 'Wet Dreamz', 2014),
('J. Cole', 'Apparently', 2014),
('J. Cole', 'G.O.M.D.', 2014),
('J. Cole', 'Fire Squad', 2014),
('J. Cole', 'A Tale of 2 Citiez', 2014),
('J. Cole', 'Middle Child', 2019),
('J. Cole', 'Love Yourz', 2014),
('J. Cole', 'Neighbors', 2016);

delete from albums 
where year is null;

update albums
set    title = 'FromDaTomb$'
where title = 'Big Dusty';
    
update albums 
set year = year + 10;

select

select   stage_name
from     artists

limit    10;


select   title, release_date, riaa_certificate
from     albums
join     artists using (artist_id)
where    stage_name = 'Metallica'
order by title asc;

select   t.title, t.milliseconds
from     tracks t
join     albums a using (album_id)
where    a.title = 'The White Album'
order by t.milliseconds asc;