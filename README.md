# Instructions for running the application Locally

1. Clone the repository and navigate to the project directory:

```bash
git clone <URL of your repository>
cd <name of your repository>
```

2. Install dependencies:

```bash
npm install
```

3. Run migrations:

```bash
npx typeorm migration:run
```

4. Load initial data:

```bash
node src/script/loadInitialData.js
```

5. Start the server:

```bash
node src/index.js
```

6. Open GraphQL Playground:

Open your browser and go to: `http://localhost:4000/graphql`
