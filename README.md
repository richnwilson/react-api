# React + Vite

Code to build a Crypto page
Using a GitHub action to deploy build to git pages as follows:

- In the Git repo, need to add `.env` variables to the Secrets by:
  - Settings > Secrets and variables > Actions
  - Click New repository secret
  - Add variables one by one
- Update the `package.json` to include a `homepage` property that will point to your eventual GitPages URL
- Update the `vite.config.js` to include reference to the base folder in Git, which will be the name of the git repo
- Update the BrowserRoute in `main.jsx` to use the `basename` property set to the Git repo
- Create a workflow file in `.github/workflows/deploy.yml`
- Add the build code in yml, this will include references to the `dist` folder Vite uses and the explicit environment variable 'names' - not values
- Once pushed to github, will trigger a deploy on all subsequent `push`
- NOTE: First time, you do need to manually create the git Pages from settings using the 'gh-pages' branch
