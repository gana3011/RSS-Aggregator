create database yt_rss_agg;

create table users(id serial primary key, name varchar(255) not null, email varchar(255) not null, password varchar(255) not null);

create table channels(channel_id varchar(255) primary key, channel_url varchar(255) not null, channel_name varchar(255) not null, subscribers int not null);

create table user_channels(user_id int references users(id), channel_id varchar(255) references channels(channel_id), primary key(user_id, channel_id));

create table videos(video_id varchar(255) primary key, channel_id varchar(255) references channels(channel_id), title varchar(255) not null, link varchar(255) not null, thumbnailurl varchar(255) not null, views int not null);