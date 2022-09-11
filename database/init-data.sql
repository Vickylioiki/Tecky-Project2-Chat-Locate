insert into users (
        username,
        password,
        gender,
        date_of_birth,
        contact_no,
        created_at
    )
VALUES (
        'Peter',
        'dhakjd',
        'M',
        '1999-01-03',
        '99991234',
        NOW()
    ),
    (
        'May',
        'dhadskjd',
        'F',
        '1998-02-03',
        '99884567',
        NOW()
    ),
    (
        'John',
        'dhadsdadskjd',
        'M',
        '2000-10-07',
        '99667897',
        NOW()
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
    )
insert into instagram_profile (
        ig_id,
        name,
        user_id,
        profile_pic
    )
VALUES (
        100004383902955,
        'Peter',
        1,
        'https://www.instagram.com/profile.php?u=Peter'
    ),
    (
        100004383902955,
        'May',
        2,
        'https://www.instagram.com/profile.php?u=John'
    )