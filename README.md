# HTQLDTKH - backend
# Technologies:
### Nodejs + Expressjs + Typescript
### Packages: 
#### typescript: this is the typescript package
#### dotenv: this is to use env file
#### concurrently: this is to execute commands concurrently (like in package.json file)
#### nodemon: this is to reflect changes immediately without to re-run the server
#### swagger-jsdoc: to create a description swagger json file
#### swagger-ui-express: to document api
#### migrate-mongo: create mongodb migration
#### mongoose: to connect to mongo database
#### zod: Schema Validation

## 1 Setup

### 1. Setup packages
Run command
```bash
cp .env_setup .env
```

```bash
npm install
npm install -g migrate-mongo (this is optional to use CLI)
```

### 2. Migrate MongoDB
Run command
```bash
cd src/database
```

```bash
migrate-mongo up
```

### 3. Run server
Run command
```bash
npm run build
npm run dev
```

