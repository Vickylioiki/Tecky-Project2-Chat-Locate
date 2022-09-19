INSERT INTO users (
        name,
        username,
        password,
        aboutme,
        hobby,
        country,
<<<<<<< HEAD
        company
=======
        occupation,
        icon,
        gender,
        date_of_birth,
        contact_no,
        payme_qr_code
>>>>>>> 3a23f8604ba8caa8528fd97d12a4ea58c95cf199
    )
VALUES (
        'Peter',
        'peter01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'I am single.',
        'badminton',
        'Australia',
<<<<<<< HEAD
        'bank'
=======
        'student',
        'https://randomuser.me/api/portraits/men/20.jpg',
        'M',
        '2000-10-05',
        '99991234',
        NULL
>>>>>>> 3a23f8604ba8caa8528fd97d12a4ea58c95cf199
    ),
    (
        'May',
        'may01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'I go by bus',
        'badminton',
<<<<<<< HEAD
        'Australia',
        'start up'
=======
        'Hong Kong',
        'Teacher',
        'https://randomuser.me/api/portraits/women/63.jpg',
        'F',
        '1999-10-10',
        '99991234',
        NULL
>>>>>>> 3a23f8604ba8caa8528fd97d12a4ea58c95cf199
    ),
    (
        'John',
        'john01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'I like play football',
        'badminton',
<<<<<<< HEAD
        'Australia',
        'start up'
=======
        'Japan',
        'Programmer',
        'https://randomuser.me/api/portraits/men/62.jpg',
        'M',
        '1990-01-10',
        '99991234',
        NULL
>>>>>>> 3a23f8604ba8caa8528fd97d12a4ea58c95cf199
    ),
    (
        'James Lam',
        'james',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'I like make friends.',
        'badminton',
<<<<<<< HEAD
        'Australia',
        'medical group'
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
=======
        'Singapore',
        'Doctor',
        'https://randomuser.me/api/portraits/men/88.jpg',
        'M',
        '1989-10-10',
        '99991234',
        NULL
>>>>>>> 3a23f8604ba8caa8528fd97d12a4ea58c95cf199
    );
-- insert into facebook_profile (
--         fb_id,
--         name,
--         user_id,
--         profile_pic
--     )
-- VALUES (
--         100004383902955,
--         'Peter',
--         1,
--         'https://www.facebook.com/profile.php?u=Peter'
--     ),
--     (
--         100004383902955,
--         'John',
--         3,
--         'https://www.facebook.com/profile.php?u=John'
--     );
-- insert into instagram_profile (
--         ig_id,
--         name,
--         user_id,
--         profile_pic,
--         media_count
--     )
-- VALUES (
--         1298719,
--         'Peter',
--         1,
--         'https://www.instagram.com/profile.php?u=Peter',
--         0
--     ),
--     (
--         1298718,
--         'May',
--         2,
--         'https://www.instagram.com/profile.php?u=John',
--         11
--     );
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