# GitHub Repository Finder

A simple web app for searching GitHub repositories with sorting, filtering, and pagination.

I created this project as an exercise to checkout the GitHub Rest API, particularly the Search API and to practice some React UI concepts like pagination, sorting and filtering, especially in the case where these operations are server-sided.

A preview of the application has been deployed at https://akshatmalviya.com/projects/repo-finder-gh

**Note: Please be aware of the GitHub API rate limits. You may try to refresh the page and try again, or wait for at least 10 minutes before trying again.**

# Features

- Search GitHub repositories
- Sort by stars, forks, help-wanted issues, or last updated
- Pagination with adjustable per page count
- Display some basic info about the repositories like name, description, owner, stargazer count, fork count as well as links to the repository's GitHub page
- Clean UI using shadcn/ui components and Tailwind
- Caching enabled via TanStack Query.

# Tech Stack

- React
- TypeScript
- Vite
- shadcn/ui
- Tailwind CSS
- octokit/rest (GitHub API)

# Getting Started

#### Clone the repository:

```bash
git clone https://github.com/akshat157/repo-finder-gh.git
cd github-repo-finder
```

#### Install dependencies

```bash
npm install
```

#### Run the development server

```bash
npm run dev
```

Open in your browser.

# Notes

- GitHub Search API puts a hard cap of 1000 search results, therefore, only the top 1000 results based on your search parameters will be displayed with the pagination.
- GitHub API is rate limited by default for the public. Though Octokit can be configured to use authentication token via the following setup to extend the rate limits, this feature was omitted for this simple exercise. It may be added later.
- API rate limits may apply depending on usage. More info can be found in the GitHub API docs: https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting

# Planned updates

- More search filters like topics, watchers...
- Display some more information on repository cards in the search results.
- Topic based filtering by letting users select the topic badges from the repository card.
