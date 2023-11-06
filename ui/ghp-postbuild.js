const fs = require('fs');
const path = require('path');

// The script modifies the built CSS files and prepends the repo-name to the asset URLs.
// to be compatible with GitHub pages deployment.
const cssDir = path.join(__dirname, '/out/_next/static/css');

// Update your repository name here if it is different from the project name.
const repoURL = "Usdm";

const files = fs.readdirSync(cssDir);

files.forEach((file) => {
  if (path.extname(file) === '.css') {
    const filePath = path.join(cssDir, file);
    let data = fs.readFileSync(filePath, 'utf8');

    const singleQuoteRegex = new RegExp(`url\\(\\s*'\\/(?!${repoURL})`, 'g');
    const doubleQuoteRegex = new RegExp(`url\\(\\s*"\\/(?!${repoURL})`, 'g');

    data = data.replace(singleQuoteRegex, `url('/${repoURL}/`);
    data = data.replace(doubleQuoteRegex, `url("/${repoURL}/`);

    fs.writeFileSync(filePath, data, 'utf8');
  }
});
