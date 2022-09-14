create database chat_locate;
CREATE TABLE users (
    id SERIAL primary key,
    name varchar(255) not null,
    username varchar(255) not null,
    password varchar(255) not null,
    aboutMe text,
    hobby text,
    country text,
    occupation text,
    icon text,
    gender char null,
    dateofBirth date,
    contact_no int,
    payme_qr_code text,
    created_at timestamp not null default now(),
    updated_at timestamp default now()
);
CREATE TABLE instagram_profile (
    id SERIAL primary key,
    ig_id int not null,
    name varchar(255) not null,
    profile_pic text not null,
    media_count int not null,
    user_id int
);
CREATE TABLE facebook_profile (
    id SERIAL primary key,
    fb_id int not null,
    name varchar(255) not null,
    profile_pic text not null,
    user_id int
);
CREATE TABLE google_profile (
    id SERIAL primary key,
    google_id varchar(255) not null,
    name varchar(255) not null,
    profile_pic text not null,
    user_id int
);
CREATE TABLE friends_list (
    id SERIAL primary key,
    from_user_id int,
    to_user_id int,
    status text,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);