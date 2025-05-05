Collecting workspace information# BaseModels - Next.js + Django Full-Stack Template

## 🚀 Overview

BaseModels is an open-source full-stack application template that combines Next.js for the frontend and Django for the backend, all containerized with Docker. It's designed to accelerate development by providing a pre-configured environment with session-based authentication, CRUD utilities, and deployment workflows.

This project serves as a starting point for developers looking to build modern web applications with a robust tech stack, without having to set up the boilerplate code from scratch.

## ✨ Features

- **Full-Stack Architecture**

  - Next.js 14+ frontend with App Router
  - Django backend with REST API
  - Docker containerization for consistent development environments

- **Authentication System**

  - Session-based (stateful) authentication
  - Login, signup, profile management
  - Protected routes middleware

- **Development Utilities**

  - Pre-built CRUD classes for Django models
  - Model management utilities
  - Server actions for API calls

- **DevOps Integration**

  - Docker Hub publishing workflows
  - GitHub Actions for CI/CD
  - Environment variable management via GitHub secrets

- **Multiple Environment Support**
  - Development mode
  - Production mode
  - Testing mode

## 🛠️ Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)
- For local development without Docker:
  - [Node.js](https://nodejs.org/) 18+
  - [Python](https://www.python.org/downloads/) 3.9+

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ibrahimGoumrane/django_next_base_auth_dockerized.git
cd baseModels
```

### 2. Environment Configuration

#### Backend (.env file setup)

Create a .env file in the back directory:

```bash
touch back/.env
```

Add the following variables:

```
# Django Settings
DEBUG=True
SECRET_KEY=your_django_secret_key
ALLOWED_HOST_1=front
ALLOWED_HOST_2=back
```

#### Frontend (.env file setup)

Create a .env file in the front directory:

```bash
touch front/.env
```

Add the following variables:

```
# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Running the Application

#### Development Mode

Start the application:

```bash
make up
```

View logs:

```bash
make logs
```

Stop the application:

```bash
make down
```

#### Production Mode

Build and run for production:

```bash
make ENV=prod build
make ENV=prod up
```

#### Testing Mode

```bash
make ENV=test build
make ENV=test up
```

## 📁 Project Structure

```
baseModels/
├── back/                  # Django backend
│   ├── apps/              # Django applications
│   ├── autogradAi/        # Main Django project
│   ├── exam_papers/       # Example application
│   ├── DockerFile         # Development Docker configuration
│   └── DockerFile.prod    # Production Docker configuration
├── front/                 # Next.js frontend
│   ├── app/               # Next.js application routes
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks including authentication
│   ├── types/             # TypeScript type definitions
│   ├── DockerFile         # Development Docker configuration
│   └── DockerFile.prod    # Production Docker configuration
├── docker-compose.yml     # Base Docker Compose configuration
├── docker-compose.dev.yml # Development Docker Compose overrides
├── docker-compose.prod.yml # Production Docker Compose overrides
├── docker-compose.test.yml # Testing Docker Compose overrides
└── Makefile              # Utility commands for development
```

## 🔄 Database Migrations

The containers come pre-migrated, but you can run migrations as needed:

```bash
make ENV=dev makemigrations
make ENV=dev migrate
```

## 🛡️ Authentication System

BaseModels implements session-based authentication with Django's authentication system and integrates with Next.js. Protected routes are configured in the frontend middleware to ensure secure access.

## 🔌 CRUD Utilities

The project includes helper classes in Django to simplify CRUD operations, reducing boilerplate code for common operations.

## 🚢 Docker Hub Integration

To publish your images to Docker Hub:

1. Set up the following GitHub secrets in your repository:

   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN`

2. Push to your main branch to trigger the workflow.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## ⚠️ Troubleshooting

### Port Already in Use

If ports are already in use, modify the port mappings in your .env and Docker Compose files.

### Permissions Errors on Windows

For symlink permission errors on Windows, run your terminal as Administrator or enable Developer Mode.

### Container Not Starting

Check logs with `make logs` to identify issues.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 License

This project is open source and available under the MIT License.

## 👏 Acknowledgements

- Built with Next.js, Django, and Docker
- Created to help developers jumpstart their full-stack projects

---

Made with ❤️ by Ibrahim Goumrane and contributors
