insert into users (
        name,
        username,
        password,
        gender,
        dateofBirth,
        contact_no
    )
VALUES (
        'Peter',
        'peter01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'M',
        '1999-01-03',
        '99991234'
    ),
    (
        'May',
        'may01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'F',
        '1998-02-03',
        '99884567'
    ),
    (
        'John',
        'john01',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'M',
        '2000-10-07',
        '99667897'
    ),
    (
        'JamesLam',
        'james',
        '$2a$10$rezRotmMAxAO02TFAg2g/OA5rRI7JCPLkwuOOy9bzqF0951dS6w22',
        'M',
        '2000-10-07',
        '99667897'
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