# Beaglo - Server Repository

## Description
Beaglo is a social network for travelers, providing a platform to share experiences, connect with other travelers, and plan trips collaboratively. This repository contains the backend implementation of Beaglo.

## Backlog Functionalities
- Add real-time chat functionality between users.
- Enable push notifications for new likes, comments, or friend requests.
- Implement advanced search filters for posts and users (e.g., by location, interests).
- Add user roles for content moderation and administration.
- Support for multiple image uploads in a single post.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ODM)
- **bcrypt.js** (for password hashing)
- **jsonwebtoken** (for authentication)
- **dotenv** (for environment variable management)
- **cloudinary** (for image hosting)

---

## Server Structure

### Models

#### User Model
```javascript
{
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "event-planner"], default: "user" },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}
```

#### Post Model
```javascript
{
  image: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}
```

#### Comment Model
```javascript
{
  contenido: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
}
```

---

### API Endpoints (Backend Routes)

#### Auth Routes
- **POST** `/api/auth/signup` - Sign up a new user.
- **POST** `/api/auth/login` - Log in a user.
- **GET** `/api/auth/verify` - Verify user authentication.

#### Post Routes
- **POST** `/api/posts/create-post` - Create a new post by the logged-in user.
- **GET** `/api/posts` - Get all posts.
- **GET** `/api/posts/:postId` - Get a specific post by its ID.
- **PATCH** `/api/posts/:postId` - Edit a post by the logged-in user.
- **DELETE** `/api/posts/:postId` - Delete a post by the logged-in user.

#### User Routes
- **GET** `/api/users/own` - Get the profile of the logged-in user.
- **PATCH** `/api/users/own/user-info` - Edit the profile of the logged-in user.
- **GET** `/api/users/:userId` - Get the profile of a specific user.

#### Comment Routes
- **POST** `/api/comments/posts/:postId` - Add a comment to a specific post.
- **GET** `/api/comments/posts/:postId` - Get all comments for a specific post.
- **DELETE** `/api/comments/:commentId` - Delete a specific comment.

---

## Links
- [Client Repository](https://github.com/HelixGuardi/beaglo-app-client)  
- [Server Repository](https://github.com/HelixGuardi/beaglo-app-server)  
- [Deployed App](https://beaglo.netlify.app/)
