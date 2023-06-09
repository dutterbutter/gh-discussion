# zkSync Developer Discussions Analyzer

This repository contains a simple application built with [Next.js](https://nextjs.org/) that fetches and analyzes data from the discussion board of the `zkSync-Community-Hub/zkync-developers` repository. It provides insights into user activity, such as the number of discussion posts and answered posts.

## Setup

### Environment Variables

Before starting the application, you need to set up the required environment variables. Create a `.env` file in the root directory of the project and insert your GitHub personal access token like so:

```bash
GITHUB_TOKEN=your_token_here
```

### Run the Development Server

You can start the application in development mode by running the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

After starting the server, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App Structure

The main functionality resides in `pages/index.js`. Any edits to this file will automatically update the page.
