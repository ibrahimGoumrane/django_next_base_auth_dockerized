# Default environment (dev or prod)
ENV ?= dev

# Compose file selection
ifeq ($(ENV),prod)
COMPOSE_FILES = -f docker-compose.yml -f docker-compose.prod.yml
else
COMPOSE_FILES = -f docker-compose.yml -f docker-compose.dev.yml
endif

# Base Docker Compose command
DC = docker-compose $(COMPOSE_FILES)
D = docker
# Build all services
build:
	$(DC) build

# Start all services in detached mode
up:
	$(DC) up -d

# Start all services with logs
up-logs:
	$(DC) up

# Stop all services
down:
	$(DC) down

# Stop services and remove volumes
down-v:
	$(DC) down -v

# Restart all services
restart:
	$(DC) down && $(DC) up -d

# View logs from all services
logs:
	$(DC) logs -f

# Backend management
migrate:
	$(DC) exec back python manage.py migrate

makemigrations:
	$(DC) exec back python manage.py makemigrations

shell:
	$(DC) exec back python manage.py shell

# Frontend commands
front-build:
	$(D) run --rm -it basemodels_front_prod sh

front-dev:
	$(DC) run --rm -it basemodels_front_dev sh

