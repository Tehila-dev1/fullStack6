-- -- מחיקת בסיס הנתונים אם הוא קיים כדי להתחיל נקי
-- DROP DATABASE IF EXISTS project6;

-- -- יצירת בסיס הנתונים ובחירה בו
-- CREATE DATABASE project6;
-- USE project6;

-- -- יצירת טבלת משתמשים
-- CREATE TABLE users ( 
--     id VARCHAR(36) PRIMARY KEY, 
--     name VARCHAR(100) NOT NULL, 
--     username VARCHAR(50) NOT NULL UNIQUE, 
--     email VARCHAR(100) NOT NULL, 
--     phone VARCHAR(20), 
--     website VARCHAR(100)
-- );

-- -- יצירת טבלת סיסמאות
-- CREATE TABLE passwords ( 
--     id VARCHAR(36) PRIMARY KEY, 
--     user_id VARCHAR(36) NOT NULL UNIQUE, 
--     password VARCHAR(255) NOT NULL, 
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- יצירת טבלת משימות
-- CREATE TABLE todos ( 
--     id VARCHAR(36) PRIMARY KEY, 
--     user_id VARCHAR(36) NOT NULL, 
--     title VARCHAR(255) NOT NULL, 
--     completed BOOLEAN DEFAULT FALSE, 
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- יצירת טבלת פוסטים
-- CREATE TABLE posts ( 
--     id VARCHAR(36) PRIMARY KEY, 
--     user_id VARCHAR(36) NOT NULL, 
--     title VARCHAR(255) NOT NULL, 
--     body TEXT, 
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- יצירת טבלת תגובות
-- CREATE TABLE comments ( 
--     id VARCHAR(36) PRIMARY KEY, 
--     post_id VARCHAR(36) NOT NULL, 
--     user_id VARCHAR(36) NOT NULL, 
--     name VARCHAR(255) NOT NULL, 
--     email VARCHAR(100) NOT NULL, 
--     body TEXT, 
--     FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, 
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- יצירת טבלת אלבומים (שימוש ב-AUTO_INCREMENT)
-- CREATE TABLE albums (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id VARCHAR(36) NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- יצירת טבלת תמונות (שימוש ב-AUTO_INCREMENT)
-- CREATE TABLE photos (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     album_id INT NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     url VARCHAR(255) NOT NULL,
--     thumbnailUrl VARCHAR(255) NOT NULL,
--     FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
-- );

-- -- הכנסת נתונים לטבלת משתמשים
-- INSERT INTO users (id, name, username, email, phone, website) VALUES
-- ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Leanne Graham', 'Bret', 'sincere@april.biz', '1-770-736-0988', 'hildegard.org'),
-- ('550e8400-e29b-41d4-a716-446655440001', 'Ervin Howell', 'Antonette', 'shanna@melissa.tv', '010-692-6593', 'anastasia.net'),
-- ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Clementine Bauch', 'Samantha', 'nathan@yesenia.net', '1-463-123-4447', 'ramiro.info'),
-- ('6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'Patricia Lebsack', 'Karianne', 'julianne@kory.org', '493-170-9623', 'kale.biz'),
-- ('6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'Chelsey Dietrich', 'Kamren', 'lucio@annie.ca', '254-954-1289', 'demarco.info');

-- -- הכנסת נתונים לטבלת סיסמאות (תוקן!)
-- INSERT INTO passwords (id, user_id, password) VALUES
-- ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'hildegard.org'),
-- ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'anastasia.net'),
-- ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'ramiro.info'),
-- ('6ba7b811-9dad-11d1-80b4-00c04fd430c9', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'kale.biz'),
-- ('6ba7b812-9dad-11d1-80b4-00c04fd430ca', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'demarco.info');

-- -- הכנסת נתונים לטבלת משימות
-- INSERT INTO todos (id, user_id, title, completed) VALUES
-- ('t-f47ac10b-58cc-0001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'delectus aut autem', FALSE), ('t-f47ac10b-58cc-0002', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'quis ut nam facilis et officia qui', FALSE), ('t-f47ac10b-58cc-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'fugiat veniam minus', FALSE), ('t-f47ac10b-58cc-0004', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'et porro tempora', TRUE), ('t-f47ac10b-58cc-0005', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'laboriosam mollitia et enim quasi', FALSE),
-- ('t-550e8400-e29b-0001', '550e8400-e29b-41d4-a716-446655440001', 'qui ullam ratione quibusdam voluptatem quia omnis', FALSE), ('t-550e8400-e29b-0002', '550e8400-e29b-41d4-a716-446655440001', 'illo expedita consequatur quia in', FALSE), ('t-550e8400-e29b-0003', '550e8400-e29b-41d4-a716-446655440001', 'quo adipisci enim quam ut ab', TRUE), ('t-550e8400-e29b-0004', '550e8400-e29b-41d4-a716-446655440001', 'molestiae perspiciatis ipsa', FALSE), ('t-550e8400-e29b-0005', '550e8400-e29b-41d4-a716-446655440001', 'illo est ratione doloremque quia maiores aut', TRUE),
-- ('t-6ba7b810-9dad-0001', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'vero rerum temporibus dolor', TRUE), ('t-6ba7b810-9dad-0002', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'in laborum et labore', FALSE), ('t-6ba7b810-9dad-0003', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'repudiandae veniam quaerat sunt sed', FALSE), ('t-6ba7b810-9dad-0004', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'totam quia non', TRUE), ('t-6ba7b810-9dad-0005', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'fugit amet facere ut totam', FALSE),
-- ('t-6ba7b811-9dad-0001', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'voluptatem esse rerum natus error', FALSE), ('t-6ba7b811-9dad-0002', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'omnis natus possimus iure eos similique', FALSE), ('t-6ba7b811-9dad-0003', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'explicabo vel omnis delectus iusto', TRUE), ('t-6ba7b811-9dad-0004', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'distinctio vitae autem enim', FALSE), ('t-6ba7b811-9dad-0005', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'laborum eos qui iure aliquid', TRUE),
-- ('t-6ba7b812-9dad-0001', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'aliquid aut sunt doloribus', FALSE), ('t-6ba7b812-9dad-0002', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'veritatis pariatur delectus', FALSE), ('t-6ba7b812-9dad-0003', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'nemo perspiciatis repudiandae', TRUE), ('t-6ba7b812-9dad-0004', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'aliquid sunt doloribus veritatis', FALSE), ('t-6ba7b812-9dad-0005', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'corrupti quos ratione', TRUE);

-- -- הכנסת נתונים לטבלת פוסטים
-- INSERT INTO posts (id, user_id, title, body) VALUES
-- ('p-f47ac10b-58cc-0001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'sunt aut facere repellat provident', 'quia et suscipit suscipit recusandae consequuntur'), ('p-f47ac10b-58cc-0002', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'qui est esse', 'est rerum tempore vitae sequi sint nihil'), ('p-f47ac10b-58cc-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'ea molestias quasi exercitationem', 'et iusto sed quo iure voluptatem occaecati'), ('p-f47ac10b-58cc-0004', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'eum et est occaecati', 'ullam et saepe reiciendis voluptatem adipisci'),
-- ('p-550e8400-e29b-0001', '550e8400-e29b-41d4-a716-446655440001', 'nesciunt quas odio', 'repudiandae veniam quaerat sunt sed alias aut'), ('p-550e8400-e29b-0002', '550e8400-e29b-41d4-a716-446655440001', 'dolorem eum magni eos aperiam', 'ut aspernatur corporis harum nihil quis'), ('p-550e8400-e29b-0003', '550e8400-e29b-41d4-a716-446655440001', 'magnam facilis autem', 'dolore placeat quibusdam ea quo vitae'), ('p-550e8400-e29b-0004', '550e8400-e29b-41d4-a716-446655440001', 'dolorem dolore est ipsam', 'dignissimos aperiam dolorem qui eum facilis'),
-- ('p-6ba7b810-9dad-0001', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'nesciunt iure omnis dolorem', 'minima soluta occaecati quia sit voluptatem'), ('p-6ba7b810-9dad-0002', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'optio molestias id quia eum', 'quo et expedita modi cum officia vel magnam'), ('p-6ba7b810-9dad-0003', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'et ea vero quia laudantium', 'delectus reiciendis molestiae occaecati non minima'), ('p-6ba7b810-9dad-0004', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'in quibusdam tempore odit est dolorem', 'itaque id aut magnam praesentium'),
-- ('p-6ba7b811-9dad-0001', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'dolorum ut in voluptas mollitia', 'nam libero commodi cumque totam rerum iure'), ('p-6ba7b811-9dad-0002', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'voluptatem eligendi optio', 'fuga et accusamus dolorum perferendis illo'), ('p-6ba7b811-9dad-0003', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'eveniet quod temporibus', 'reprehenderit quos placeat velit minima'),
-- ('p-6ba7b812-9dad-0001', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'sint suscipit perspiciatis velit dolorum', 'accusamus eos facilis sint et aut voluptatem'), ('p-6ba7b812-9dad-0002', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'fugit voluptas sed molestias', 'et sed qui non voluptatem itaque'), ('p-6ba7b812-9dad-0003', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'voluptate et itaque vero', 'eveniet ut qui rerum harum sit');

-- -- הכנסת נתונים לטבלת תגובות
-- INSERT INTO comments (id, post_id, user_id, name, email, body) VALUES
-- ('c-00000001', 'p-f47ac10b-58cc-0001', '550e8400-e29b-41d4-a716-446655440001', 'id labore ex et quam laborum', 'Eliseo@gardner.biz', 'laudantium enim quasi est quidem magnam'),('c-00000002', 'p-f47ac10b-58cc-0001', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'quo vero reiciendis velit similique earum', 'Jayne_Kuhic@sydney.com', 'est natus enim nihil est dolore omnis'),('c-00000003', 'p-f47ac10b-58cc-0002', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'odio adipisci rerum aut animi', 'Nikita@garfield.biz', 'quia molestiae reprehenderit quasi aspernatur'),('c-00000004', 'p-f47ac10b-58cc-0002', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'alias odio sit', 'Lew@alysha.tv', 'non et atque occaecati deserunt quas'),('c-00000005', 'p-f47ac10b-58cc-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'vero eget saepe est qui', 'Hayden@althea.biz', 'harum non quasi et ratione tempore'),('c-00000006', 'p-f47ac10b-58cc-0003', '550e8400-e29b-41d4-a716-446655440001', 'repellat consequatur praesentium', 'Presley.Mueller@myrl.com', 'ut qui possimus qui saepe harum'),('c-00000007', 'p-f47ac10b-58cc-0004', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'et fugit eligendi deleniti', 'Dallas@ole.me', 'itaque quisquam takimata dolor'),('c-00000008', 'p-f47ac10b-58cc-0004', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'optio dolor molestias', 'Mallory_Kunze@marie.org', 'natus aliquid voluptatem omnis consequatur'),('c-00000009', 'p-550e8400-e29b-0001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'at namen aut eum', 'Meghan_Shields@joel.tv', 'expedita consequatur sit'),('c-00000010', 'p-550e8400-e29b-0001', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'et ipsa consequatur', 'Oswald.Vandervort@leanne.org', 'modi ut eos dolores'),('c-00000011', 'p-550e8400-e29b-0002', '550e8400-e29b-41d4-a716-446655440001', 'repudiandae voluptatem optio', 'Karelle_Schulist@adele.net', 'voluptatem reiciendis error'),('c-00000012', 'p-550e8400-e29b-0002', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'quasi unde omnis', 'Rahul_Dare@verda.com', 'velit iusto delectus'),('c-00000013', 'p-550e8400-e29b-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'excepturi esse cumque', 'Telly_Lynch@karl.co.uk', 'facilis consequatur animi'),('c-00000014', 'p-550e8400-e29b-0003', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'consequatur id enim sunt', 'Jolie_Ratke@evelyn.com', 'veritatis qui deserunt'),('c-00000015', 'p-550e8400-e29b-0004', '550e8400-e29b-41d4-a716-446655440001', 'natus vero consequatur', 'Mekhi_Bahringer@august.com', 'ipsam aperiam voluptates'),('c-00000016', 'p-550e8400-e29b-0004', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'omnis rerum consequatur', 'Meghan@ottis.com', 'facere qui nesciunt earum');


-- -- הכנסת נתונים לטבלת אלבומים
-- INSERT INTO albums (id, user_id, title) VALUES
-- (1, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Leanne First Album'),
-- (2, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Vacation Photos'),
-- (3, '550e8400-e29b-41d4-a716-446655440001', 'Ervin Personal Album');

-- -- הכנסת נתונים לטבלת תמונות
-- INSERT INTO photos (album_id, title, url, thumbnailUrl) VALUES
-- (1, 'Beautiful Nature', 'https://picsum.photos/id/10/600/600', 'https://picsum.photos/id/10/150/150'),
-- (1, 'City Lights', 'https://picsum.photos/id/11/600/600', 'https://picsum.photos/id/11/150/150'),
-- (2, 'Beach Sunset', 'https://picsum.photos/id/26/600/600', 'https://picsum.photos/id/26/150/150');



-- מחיקת בסיס הנתונים אם הוא קיים כדי להתחיל נקי
DROP DATABASE IF EXISTS project6;

-- יצירת בסיס הנתונים ובחירה בו
CREATE DATABASE project6;
USE project6;

-- יצירת טבלת משתמשים
CREATE TABLE users ( 
    id VARCHAR(36) PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    email VARCHAR(100) NOT NULL, 
    phone VARCHAR(20), 
    website VARCHAR(100)
);

-- יצירת טבלת סיסמאות
CREATE TABLE passwords ( 
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת משימות
CREATE TABLE todos ( 
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    completed BOOLEAN DEFAULT FALSE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת פוסטים
CREATE TABLE posts ( 
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    body TEXT, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת תגובות
CREATE TABLE comments ( 
    id VARCHAR(36) PRIMARY KEY, 
    post_id VARCHAR(36) NOT NULL, 
    user_id VARCHAR(36) NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    body TEXT, 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת אלבומים (שימוש ב-AUTO_INCREMENT)
CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת תמונות (שימוש ב-AUTO_INCREMENT)
CREATE TABLE photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    thumbnailUrl VARCHAR(255) NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

-- הכנסת נתונים לטבלת משתמשים
INSERT INTO users (id, name, username, email, phone, website) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Leanne Graham', 'Bret', 'sincere@april.biz', '1-770-736-0988', 'hildegard.org'),
('550e8400-e29b-41d4-a716-446655440001', 'Ervin Howell', 'Antonette', 'shanna@melissa.tv', '010-692-6593', 'anastasia.net'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Clementine Bauch', 'Samantha', 'nathan@yesenia.net', '1-463-123-4447', 'ramiro.info'),
('6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'Patricia Lebsack', 'Karianne', 'julianne@kory.org', '493-170-9623', 'kale.biz'),
('6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'Chelsey Dietrich', 'Kamren', 'lucio@annie.ca', '254-954-1289', 'demarco.info');

-- הכנסת נתונים לטבלת סיסמאות
INSERT INTO passwords (id, user_id, password) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'hildegard.org'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'anastasia.net'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'ramiro.info'),
('6ba7b811-9dad-11d1-80b4-00c04fd430c9', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'kale.biz'),
('6ba7b812-9dad-11d1-80b4-00c04fd430ca', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'demarco.info');

-- הכנסת נתונים לטבלת משימות
INSERT INTO todos (id, user_id, title, completed) VALUES
('t-f47ac10b-58cc-0001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'delectus aut autem', FALSE), 
('t-f47ac10b-58cc-0002', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'quis ut nam facilis et officia qui', TRUE),
('t-f47ac10b-58cc-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'molestiae ipsa aut voluptatibus', TRUE), 
('t-f47ac10b-58cc-0004', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'ullam nobis libero sapiente', TRUE),
('t-550e8400-e29b-0001', '550e8400-e29b-41d4-a716-446655440001', 'suscipit repellat esse quibusdam', FALSE);

-- הכנסת נתונים לטבלת פוסטים
INSERT INTO posts (id, user_id, title, body) VALUES
('p-f47ac10b-58cc-0001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'sunt aut facere repellat provident', 'quia et suscipit suscipit recusandae'), 
('p-f47ac10b-58cc-0002', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'qui est esse', 'est rerum tempore vitae sequi sint nihil'), 
('p-f47ac10b-58cc-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'ea molestias quasi exercitationem', 'et iusto sed quo iure voluptatem'), 
('p-f47ac10b-58cc-0004', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'eum et est occaecati', 'ullam et saepe reiciendis voluptatem'),
('p-550e8400-e29b-0001', '550e8400-e29b-41d4-a716-446655440001', 'et ea vero quia laudantium autem', 'delectus reiciendis molestiae occaecati non minima'),
('p-550e8400-e29b-0002', '550e8400-e29b-41d4-a716-446655440001', 'in quibusdam tempore odit est dolorm', 'itaque id aut magnam praesentium quia et ea'),
('p-550e8400-e29b-0003', '550e8400-e29b-41d4-a716-446655440001', 'dolorum ut in voluptas mollitia', 'aut dicta possimus sint mollitia voluptas commodi'),
('p-550e8400-e29b-0004', '550e8400-e29b-41d4-a716-446655440001', 'voluptatem eligendi optio', 'fuga et accusamus dolorum perferendis illo');

-- הכנסת נתונים לטבלת תגובות
INSERT INTO comments (id, post_id, user_id, name, email, body) VALUES
('c-00000001', 'p-f47ac10b-58cc-0001', '550e8400-e29b-41d4-a716-446655440001', 'id labore ex et quam laborum', 'Eliseo@gardner.biz', 'laudantium enim quasi est quidem magnam'),
('c-00000002', 'p-f47ac10b-58cc-0001', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'quo vero reiciendis velit similique earum', 'Jayne_Kuhic@sydney.com', 'est natus enim nihil est dolore omnis'),
('c-00000006', 'p-f47ac10b-58cc-0002', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'et fugit eligendi deleniti quidem qui sint nihil autem', 'Presley.Mueller@myrl.com', 'doloribus at sed quis culpa deserunt'),
('c-00000016', 'p-f47ac10b-58cc-0004', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'perferendis temporibus delectus optio ea eum ratione dolorum', 'Christine@ayana.info', 'iste ut laborum aliquid velit facere'),
('c-00000017', 'p-f47ac10b-58cc-0004', '550e8400-e29b-41d4-a716-446655440001', 'eos est animi quis', 'Preston_Hudson@blaise.tv', 'consequatur necessitatibus totam sed sit dolorum');

-- הכנסת נתונים לטבלת אלבומים (IDs ייווצרו אוטומטית כ-1, 2, 3, 4...)
INSERT INTO albums (user_id, title) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'quidem molestiae enim'),                       -- אלבום 1
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'sunt qui excepturi placeat culpa'),              -- אלבום 2
('550e8400-e29b-41d4-a716-446655440001', 'quam nostrum impedit mollitia quod et dolor'),   -- אלבום 3
('550e8400-e29b-41d4-a716-446655440001', 'consequatur autem doloribus natus consectetur'),  -- אלבום 4
('550e8400-e29b-41d4-a716-446655440001', 'ab rerum non rerum consequatur ut ea unde'),     -- אלבום 5
('550e8400-e29b-41d4-a716-446655440001', 'ducimus molestias eos animi atque nihil'),       -- אלבום 6
('550e8400-e29b-41d4-a716-446655440001', 'ut pariatur rerum ipsum natus repellendus'),     -- אלבום 7
('550e8400-e29b-41d4-a716-446655440001', 'Sea');                                           -- אלבום 8

-- הכנסת נתונים לטבלת תמונות המשוייכות במדויק לאלבומים לעיל
INSERT INTO photos (album_id, title, url, thumbnailUrl) VALUES
(1, 'accusamus beatae ad facilis cum similique qui sunt', 'https://picsum.photos/id/10/600/600', 'https://picsum.photos/id/10/150/150'),
(1, 'reprehenderit est deserunt velit ipsam', 'https://picsum.photos/id/11/600/600', 'https://picsum.photos/id/11/150/150'),
(2, 'non sunt voluptatem placeat consequuntur rem incidunt', 'https://picsum.photos/id/51/600/600', 'https://picsum.photos/id/51/150/150'),
(2, 'eveniet pariatur quia nobis reiciendis laboriosam ea', 'https://picsum.photos/id/52/600/600', 'https://picsum.photos/id/52/150/150'),
(2, 'soluta et harum aliquid officiis ab omnis consequatur', 'https://picsum.photos/id/53/600/600', 'https://picsum.photos/id/53/150/150'),
(3, 'culpa ea consequuntur tempora t voluptas ipsum voluptatem', 'https://picsum.photos/id/548/600/600', 'https://picsum.photos/id/548/150/150'),
(3, 'repudiandae dolorum corporis unde', 'https://picsum.photos/id/549/600/600', 'https://picsum.photos/id/549/150/150'),
(4, 'eveniet debitis nihil', 'https://picsum.photos/id/551/600/600', 'https://picsum.photos/id/551/150/150'),
(4, 'odit culpa optio nesciunt', 'https://picsum.photos/id/552/600/600', 'https://picsum.photos/id/552/150/150'),
(5, 'dolor delectus nemo quas nobis beatae omnis', 'https://picsum.photos/id/603/600/600', 'https://picsum.photos/id/601/150/150'),
(6, 'possimus voluptas dolore', 'https://picsum.photos/id/700/600/600', 'https://picsum.photos/id/700/150/150'),
(7, 'incidunt mollitia ullam et magni', 'https://picsum.photos/id/701/600/600', 'https://picsum.photos/id/701/150/150');