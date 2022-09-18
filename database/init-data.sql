insert into users (
        name,
        username,
        password,
        gender,
        contact_no,
        aboutMe,
        dateofBirth,
        occupation,
        hobby,
        country,
        icon
    )
VALUES (
        'Peter',
        'peter01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'male',
        '99991234',
        'I go by bus',
        '1999-10-10',
        'Techer',
        'badminton',
        'Japan',
        'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NTU2MzE2NTMzMzI3Mzcx/peter-dinklage-20787107-1-402.jpg'
    ),
    (
        'May',
        'may01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'female',
        '99884567',
        'I like play football',
        '1990-01-10',
        'Programmer',
        'reading, football',
        'Hong Kong',
        'https://s.ws.pho.to/76eeee/img/index/toonme/1-1.jpg'
    ),
    (
        'John',
        'john01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'male',
        '99667897',
        'I am single.',
        '2000-10-05',
        'student',
        'swimming, cooking',
        'Australia',
        'https://globalnews.ca/wp-content/uploads/2018/08/peter-headshot_on-wht.jpg?quality=85&strip=all&w=220'
    ),
    (
        'James Lam',
        'james',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'male',
        '99667897',
        'I like make friends.',
        '1989-10-10',
        'Doctor',
        'movie, travel',
        'Singapore',
        'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/staff_profile/public/thumbnails/image/gen58729Peter_Headshot.jpeg?itok=bZuw6-v_'
    );
insert into facebook_profile (
        fb_id,
        name,
        user_id,
        profile_pic
    )
VALUES (
        100004383902955,
        'Peter',
        1,
        'https://www.facebook.com/profile.php?u=Peter'
    ),
    (
        100004383902955,
        'John',
        3,
        'https://www.facebook.com/profile.php?u=John'
    );
insert into instagram_profile (
        ig_id,
        name,
        user_id,
        profile_pic,
        media_count
    )
VALUES (
        1298719,
        'Peter',
        1,
        'https://www.instagram.com/profile.php?u=Peter',
        0
    ),
    (
        1298718,
        'May',
        2,
        'https://www.instagram.com/profile.php?u=John',
        11
    );
insert into friends_list (from_user_id, to_user_id, status)
values(
        (
            select id
            from users
            where username = 'peter01'
        ),
        (
            select id
            from users
            where username = 'may01'
        ),
        'pending'
    ),
    (
        (
            select id
            from users
            where username = 'john01'
        ),
        (
            select id
            from users
            where username = 'may01'
        ),
        'pending'
    );
INSERT INTO notifications (
        user_id,
        opponent_user_id,
        message,
        icon,
        status,
        created_at,
        updated_at,
        type
    )
VALUES(
        (
            select id
            from users
            where username = 'peter01'
        ),
        (
            select id
            from users
            where username = 'may01'
        ),
        'hello, can I add you?',
        'https://randomuser.me/api/portraits/men/84.jpg',
        'pending',
        now(),
        now(),
        'invitation'
    ),
    (
        (
            select id
            from users
            where username = 'john01'
        ),
        (
            select id
            from users
            where username = 'may01'
        ),
        'good morning!',
        'https://randomuser.me/api/portraits/men/84.jpg',
        NULL,
        now(),
        now(),
        'message'
    ),
    (
        (
            select id
            from users
            where username = 'james'
        ),
        (
            select id
            from users
            where username = 'may01'
        ),
        'good morning!',
        'https://randomuser.me/api/portraits/men/84.jpg',
        NULL,
        now(),
        now(),
        'message'
    );