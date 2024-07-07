db = db.getSiblingDB('myDatabase');

// Create users
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];

const insertedUsers = db.users.insertMany(users);

// Create posts
const posts = [
    {
        title: 'First Post',
        summary: 'This is the first post',
        content: 'Content of the first post',
        cover: 'https://cdn-icons-png.flaticon.com/256/3001/3001764.png',
        author: insertedUsers.insertedIds[0],
    },
    {
        title: 'Second Post',
        summary: 'This is the second post',
        content: 'Content of the second post',
        cover: 'https://www.ciberc.com/wp-content/uploads/2020/10/man.png',
        author: insertedUsers.insertedIds[1],
    },
];

db.posts.insertMany(posts);