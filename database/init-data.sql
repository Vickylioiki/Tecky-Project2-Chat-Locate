insert into users (
        name,
        username,
        password,
        gender,
        date_of_birth,
        contact_no,
        latitude,
        longitude
    )
VALUES (
        'Peter',
        'peter01',
        'dhakjd',
        'M',
        '1999-01-03',
        '99991234',
        22.352734,
        114.1277
    ),
    (
        'May',
        'may01',
        'dhadskjd',
        'F',
        '1998-02-03',
        '99884567',
        22.2872185,
        114.1481511
    ),
    (
        'John',
        'john01',
        'dhadsdadskjd',
        'M',
        '2000-10-07',
        '99667897',
        22.2875193,
        114.1477337
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