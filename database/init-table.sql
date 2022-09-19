-- create database chat_locate;
CREATE TABLE users (
    id SERIAL primary key,
    name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    aboutme text NULL,
    hobby text NULL,
    country text NULL,
    occupation text NULL,
    icon text default 'https://cdn.wallpapersafari.com/22/27/fZqLX0.jpg',
    gender bpchar(1) NULL,
    date_of_birth date NULL,
    contact_no int4 NULL,
    payme_qr_code text NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NULL DEFAULT now()
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
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id int not null,
    opponent_user_id int not null,
    message text,
    icon text,
    status varchar(255) not null default 'pending',
    --pending / approved / rejected
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);
-- 2022-09-17 Catherine update
ALTER TABLE notifications
ADD "type" varchar(255) NOT NULL;
ALTER TABLE notifications
ALTER COLUMN "status" DROP NOT NULL;
ALTER TABLE notifications
ALTER COLUMN status DROP DEFAULT;
ALTER TABLE notifications
ADD enabled boolean NULL DEFAULT true;
ALTER TABLE facebook_profile
ALTER COLUMN fb_id TYPE bigint USING fb_id::bigint;
-- 2022-09-18 Catherine update
ALTER TABLE facebook_profile
ADD CONSTRAINT fk_users_facebook_profile FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE google_profile
ADD CONSTRAINT fk_users_google_profile FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE instagram_profile
ADD CONSTRAINT fk_users_instagram_profile FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE friends_list
ADD CONSTRAINT fk_users_friends_list_from FOREIGN KEY (from_user_id) REFERENCES users (id);
ALTER TABLE friends_list
ADD CONSTRAINT fk_users_friends_list_to FOREIGN KEY (to_user_id) REFERENCES users (id);