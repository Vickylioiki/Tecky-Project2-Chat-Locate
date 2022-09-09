cretae databse chat_locate;
CREATE TABLE users (
    id SERIAL primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    icon text,
    gender char null,
    date_of_birth date,
    description text,
    contact_no int,
    payme_qr_code text,
    created_at timestamp not null,
    updated_at timestamp
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
CREATE TABLE twitter_profile (
    id SERIAL primary key,
    fb_id int not null,
    name varchar(255) not null,
    profile_pic text not null,
    user_id int
);