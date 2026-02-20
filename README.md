# React + Vite

Code to build a Crypto page
Using a GitHub action to deploy build to git pages as follows:

- Create a workflow file in .github/workflows/deploy.yml
- Add the build code in yml
- Once pushed to github, will trigger a deploy on all subsequent `push`
- NOTE: First time, you do need to manually create the git Pages from settings using the 'gh-pages' branch
