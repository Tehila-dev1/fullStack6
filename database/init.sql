-- יצירת בסיס הנתונים ובחירה בו
CREATE DATABASE project6;
USE project6;

-- יצירת טבלת משתמשים
CREATE TABLE users ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    email VARCHAR(100) NOT NULL, 
    phone VARCHAR(20), 
    website VARCHAR(100)
);

-- יצירת טבלת סיסמאות
CREATE TABLE passwords ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת משימות
CREATE TABLE todos ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    completed BOOLEAN DEFAULT FALSE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת פוסטים
CREATE TABLE posts ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    body TEXT, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת תגובות
CREATE TABLE comments ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    post_id INT NOT NULL, 
    user_id INT NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    body TEXT, 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- הכנסת נתונים לטבלת משתמשים
INSERT INTO users (name, username, email, phone, website) VALUES
('Leanne Graham', 'Bret', 'sincere@april.biz', '1-770-736-0988', 'hildegard.org'),
('Ervin Howell', 'Antonette', 'shanna@melissa.tv', '010-692-6593', 'anastasia.net'),
('Clementine Bauch', 'Samantha', 'nathan@yesenia.net', '1-463-123-4447', 'ramiro.info'),
('Patricia Lebsack', 'Karianne', 'julianne@kory.org', '493-170-9623', 'kale.biz'),
('Chelsey Dietrich', 'Kamren', 'lucio@annie.ca', '254-954-1289', 'demarco.info');

-- הכנסת נתונים לטבלת סיסמאות
INSERT INTO passwords (user_id, password) VALUES
(1, 'hildegard.org'), (2, 'anastasia.net'), (3, 'ramiro.info'), (4, 'kale.biz'), (5, 'demarco.info');

-- הכנסת נתונים לטבלת משימות
INSERT INTO todos (user_id, title, completed) VALUES
(1, 'delectus aut autem', FALSE), (1, 'quis ut nam facilis et officia qui', FALSE), (1, 'fugiat veniam minus', FALSE), (1, 'et porro tempora', TRUE), (1, 'laboriosam mollitia et enim quasi', FALSE),
(2, 'qui ullam ratione quibusdam voluptatem quia omnis', FALSE), (2, 'illo expedita consequatur quia in', FALSE), (2, 'quo adipisci enim quam ut ab', TRUE), (2, 'molestiae perspiciatis ipsa', FALSE), (2, 'illo est ratione doloremque quia maiores aut', TRUE),
(3, 'vero rerum temporibus dolor', TRUE), (3, 'in laborum et labore', FALSE), (3, 'repudiandae veniam quaerat sunt sed', FALSE), (3, 'totam quia non', TRUE), (3, 'fugit amet facere ut totam', FALSE),
(4, 'voluptatem esse rerum natus error', FALSE), (4, 'omnis natus possimus iure eos similique', FALSE), (4, 'explicabo vel omnis delectus iusto', TRUE), (4, 'distinctio vitae autem enim', FALSE), (4, 'laborum eos qui iure aliquid', TRUE),
(5, 'aliquid aut sunt doloribus', FALSE), (5, 'veritatis pariatur delectus', FALSE), (5, 'nemo perspiciatis repudiandae', TRUE), (5, 'aliquid sunt doloribus veritatis', FALSE), (5, 'corrupti quos ratione', TRUE);

-- הכנסת נתונים לטבלת פוסטים
INSERT INTO posts (user_id, title, body) VALUES
(1, 'sunt aut facere repellat provident', 'quia et suscipit suscipit recusandae consequuntur'), (1, 'qui est esse', 'est rerum tempore vitae sequi sint nihil'), (1, 'ea molestias quasi exercitationem', 'et iusto sed quo iure voluptatem occaecati'), (1, 'eum et est occaecati', 'ullam et saepe reiciendis voluptatem adipisci'),
(2, 'nesciunt quas odio', 'repudiandae veniam quaerat sunt sed alias aut'), (2, 'dolorem eum magni eos aperiam', 'ut aspernatur corporis harum nihil quis'), (2, 'magnam facilis autem', 'dolore placeat quibusdam ea quo vitae'), (2, 'dolorem dolore est ipsam', 'dignissimos aperiam dolorem qui eum facilis'),
(3, 'nesciunt iure omnis dolorem', 'minima soluta occaecati quia sit voluptatem'), (3, 'optio molestias id quia eum', 'quo et expedita modi cum officia vel magnam'), (3, 'et ea vero quia laudantium', 'delectus reiciendis molestiae occaecati non minima'), (3, 'in quibusdam tempore odit est dolorem', 'itaque id aut magnam praesentium'),
(4, 'dolorum ut in voluptas mollitia', 'nam libero commodi cumque totam rerum iure'), (4, 'voluptatem eligendi optio', 'fuga et accusamus dolorum perferendis illo'), (4, 'eveniet quod temporibus', 'reprehenderit quos placeat velit minima'),
(5, 'sint suscipit perspiciatis velit dolorum', 'accusamus eos facilis sint et aut voluptatem'), (5, 'fugit voluptas sed molestias', 'et sed qui non voluptatem itaque'), (5, 'voluptate et itaque vero', 'eveniet ut qui rerum harum sit');

-- הכנסת נתונים לטבלת תגובות
INSERT INTO comments (post_id, user_id, name, email, body) VALUES
(1, 2, 'id labore ex et quam laborum', 'Eliseo@gardner.biz', 'laudantium enim quasi est quidem magnam'),(1, 3, 'quo vero reiciendis velit similique earum', 'Jayne_Kuhic@sydney.com', 'est natus enim nihil est dolore omnis'),(2, 4, 'odio adipisci rerum aut animi', 'Nikita@garfield.biz', 'quia molestiae reprehenderit quasi aspernatur'),(2, 5, 'alias odio sit', 'Lew@alysha.tv', 'non et atque occaecati deserunt quas'),(3, 1, 'vero eget saepe est qui', 'Hayden@althea.biz', 'harum non quasi et ratione tempore'),(3, 2, 'repellat consequatur praesentium', 'Presley.Mueller@myrl.com', 'ut qui possimus qui saepe harum'),(4, 3, 'et fugit eligendi deleniti', 'Dallas@ole.me', 'itaque quisquam takimata dolor'),(4, 4, 'optio dolor molestias', 'Mallory_Kunze@marie.org', 'natus aliquid voluptatem omnis consequatur'),(5, 1, 'at namen aut eum', 'Meghan_Shields@joel.tv', 'expedita consequatur sit'),(5, 5, 'et ipsa consequatur', 'Oswald.Vandervort@leanne.org', 'modi ut eos dolores'),(6, 2, 'repudiandae voluptatem optio', 'Karelle_Schulist@adele.net', 'voluptatem reiciendis error'),(6, 3, 'quasi unde omnis', 'Rahul_Dare@verda.com', 'velit iusto delectus'),(7, 1, 'excepturi esse cumque', 'Telly_Lynch@karl.co.uk', 'facilis consequatur animi'),(7, 4, 'consequatur id enim sunt', 'Jolie_Ratke@evelyn.com', 'veritatis qui deserunt'),(8, 2, 'natus vero consequatur', 'Mekhi_Bahringer@august.com', 'ipsam aperiam voluptates'),(8, 5, 'omnis rerum consequatur', 'Meghan@ottis.com', 'facere qui nesciunt earum');