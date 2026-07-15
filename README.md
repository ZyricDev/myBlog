# 📝 MyBlog - REST API

A modern Express.js REST API for blog & portfolio management with JWT authentication and role-based access control.

## 🚀 Quick Start

```bash
git clone <repo-url>
cd MyBlog
npm install
```

### Configuration

Create `.env`:
```env
PORT=4000
NODE_ENV=development
SUPER_ADMIN_EMAIL=admin@example.com
ACCESS_TOKEN_SECRET_KEY=your_secret_here
REFRESH_TOKEN_SECRET_KEY=your_secret_here
ACCESS_TOKEN_EXPIRES_IN=15
REFRESH_TOKEN_EXPIRES_IN=14
```

```bash
npm run start
```

Server: `http://localhost:4000`

---

## 📚 API Endpoints

**Base URL:** `/api/v1`

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token
- `DELETE /auth/logout` - Logout

### Profile
- `GET /profile` - Get public profile
- `GET /admin/profile` - Get full profile (admin)
- `PUT /admin/profile` - Update profile (admin)
- `PATCH /admin/profile/avatar` - Upload avatar (admin)
- `POST /admin/profile/skill` - Add skill (admin)
- `DELETE /admin/profile/skill/:id` - Remove skill (admin)

### Projects
- `GET /project` - Get all projects
- `GET /project/:slug` - Get project details
- `POST /admin/project` - Create project (admin)
- `PUT /admin/project/:slug` - Update project (admin)
- `DELETE /admin/project/:slug` - Delete project (admin)
- `PATCH /admin/project/:slug/toggle-active` - Toggle status (admin)
- `POST /admin/project/:slug/image` - Upload image (admin)
- `DELETE /admin/project/:slug/image/:id` - Remove image (admin)

---

## 🏗️ Architecture

**Modular Monolith:**
```
module/
├── routes.js       # Endpoints
├── controller.js   # Handlers
├── service.js      # Logic
└── repository.js   # Data access
```

---

## 🔐 Authentication

**Two-token strategy:**
- Access Token: 15 min (API requests)
- Refresh Token: 14 days (refresh access)

Both stored in HTTP-only cookies.

**Authorization:**
- Admin: Email matches `SUPER_ADMIN_EMAIL`
- User: Standard account
- All `/admin/*` routes require admin role

---

## 🗄️ Database

### No Pre-Built Database

This project has **no database implementation**—it's completely flexible. Each developer chooses their own database solution (MongoDB, PostgreSQL, MySQL, Firebase, etc.) and implements it according to their needs.

### How It Works

Each module has a **repository file** with clearly defined methods. You need to implement these methods with your chosen database. Routes and controllers are already built and work with any implementation.

### Methods to Implement

#### Auth Repository (`src/modules/auth/auth.repository.js`)

User authentication & session management:
- **`generateNewId()`** - Create unique user IDs
- **`findUserByEmail(email)`** - Find user by email address  
- **`createUser(userData)`** - Store new user (email, password, name, role)
- **`findUserById(userId)`** - Retrieve user by ID
- **`addSession(userId, jti)`** - Store active JWT session token
- **`removeSession(userId, jti)`** - Delete specific session (logout)
- **`removeAllSession(userId)`** - Clear all user sessions
- **`replaceJti(userId, oldJti, newJti)`** - Update session token on refresh

#### Profile Repository (`src/modules/profile/profile.repository.js`)

User profile & skills:
- **`generateNewId()`** - Create unique skill IDs
- **`getProfile()`** - Retrieve complete profile data
- **`updateProfile(profileData)`** - Save name, job, bio changes
- **`updateAvatarUrl(avatarPath)`** - Store avatar file path
- **`addSkill(newSkill)`** - Add new skill (name, category, startedAt, iconPath)
- **`deleteSkill(skillId)`** - Remove skill by ID

#### Project Repository (`src/modules/project/project.repository.js`)

Project portfolio:
- **`getProjects(filter)`** - Get all projects (optionally filtered by status)
- **`getProjectBySlug(slug)`** - Find project by URL slug
- **`createProject(dataProject)`** - Create new project entry
- **`updateProjectBySlug(slug, newData)`** - Update project details
- **`softDeleteProjectBySlug(slug)`** - Mark project as deleted
- **`updateProjectStatus(slug, status)`** - Toggle project active/inactive
- **`updateProjectImages(slug, images)`** - Store project gallery images

### Getting Started

1. Choose your database (MongoDB, PostgreSQL, MySQL, etc.)
2. Install the database driver (`npm install mongoose`, `npm install pg`, etc.)
3. Implement the three repository files with the methods above
4. Run the API—everything works with your implementation

**No route or controller changes needed.** Only implement the repository methods for your database.

---

## 🛡️ Security

- **Helmet.js** - Security headers
- **CORS** - Cross-origin protection
- **Rate Limiting** - 15 req/min per IP
- **Bcrypt** - Password hashing (10 rounds)
- **Joi** - Input validation
- **HTTP-Only Cookies** - XSS prevention
- **Token Versioning** - Replay attack prevention

---

## 📦 Stack

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Framework |
| jsonwebtoken | ^9.0.3 | JWT |
| bcrypt | ^6.0.0 | Password hash |
| multer | ^2.2.0 | File uploads |
| joi | ^18.2.1 | Validation |
| helmet | ^8.3.0 | Security |
| cors | ^2.8.6 | CORS |
| express-rate-limit | ^8.5.2 | Rate limit |
| winston | ^3.19.0 | Logging |
| dotenv | ^17.4.2 | Env vars |

---

## 🚀 Development

```bash
npm run dev
```

Auto-reloads on changes (nodemon).

---

## 🆘 Troubleshooting

**Server won't start**
- Ensure `.env` has all required variables
- Check: `SUPER_ADMIN_EMAIL`, `ACCESS_TOKEN_SECRET_KEY`, `REFRESH_TOKEN_SECRET_KEY`

**Port in use**
```bash
PORT=5000 npm run dev
```

**JWT errors**
- Check tokens in cookies
- Verify JWT secrets match `.env`
- Try `POST /api/v1/auth/refresh`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for modern web development**