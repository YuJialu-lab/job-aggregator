# job-aggregator

This project is a simple Puppeteer-based job scraper for Germany, covering Indeed, Glassdoor, XING Jobs, and Arbeitsagentur. It is intended for educational and personal job search use only.

Installation:
  Step 1: Install Node.js
    1. Go to https://nodejs.org/ and download the latest LTS version for your system.
    2. Follow the installer instructions to install Node.js.
    3. Open a terminal (Command Prompt on Windows, Terminal on Mac) and check installation by typing:
       - `node -v` (should display Node.js version)
       - `npm -v` (should display npm version)

  Step 2: Install project dependencies
    1. Open the terminal and navigate to the folder where you downloaded this project using `cd path-to-project-folder`.
    2. Run `npm install` to install Puppeteer and other dependencies from `package.json`.

Usage:
  Step 1: Run the scraper
    1. In the terminal inside the project folder, type `npm start` or `node index.js`.
    2. Wait a few seconds while the scraper loads each website.
    3. After completion, the results will appear in JSON format in the terminal.

Configuration:
  Step 1: Change job query and location
    1. Open `index.js` in a text editor (VS Code, Notepad, etc.).
    2. Find the lines near the top:
       ```js
       const query = 'Frontend Developer';
       const location = 'Berlin';
       ```
    3. Replace the values inside quotes with the job title and city you want, for example:
       ```js
       const query = 'UX Designer';
       const location = 'Hamburg';
       ```
    4. Save the file.
  
  Step 2: Run again
    1. In the terminal, rerun `npm start` or `node index.js`.
    2. The scraper will now fetch jobs based on your new query and location.

Notes:
  - Run sparingly; do not run multiple scrapers at the same time to avoid being blocked.
  - Some websites may detect automated access and block it temporarily.
  - LinkedIn is not included because it actively prevents scraping.
  - If a website changes its structure, the scraper may fail until the code is updated.
  - Always verify that the JSON output matches your expectations.

License:
  MIT License. You are free to use, modify, and share this project.
