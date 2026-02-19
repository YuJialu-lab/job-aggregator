Job Scraper (Germany)

This project is a simple Puppeteer-based job scraper for Germany, covering Indeed, Glassdoor, XING Jobs, and Arbeitsagentur.  
It is intended for educational and personal job search use only.

---

Installation

Step 1: Install Node.js

- Go to https://nodejs.org/ and download the latest LTS version.
- Follow the installer instructions.
- After installation, open a terminal:
  - On Windows: Command Prompt or PowerShell
  - On macOS: Terminal

- Verify installation by running:
  - `node -v`
  - `npm -v`

You should see version numbers for both commands.

Step 2: Install project dependencies

- Open a terminal.
- Navigate to the project folder:
  - `cd path-to-project-folder`
- Run:
  - `npm install`

This installs Puppeteer and all required dependencies listed in `package.json`.

---

Usage

Step 1: Run the scraper

- Make sure you are inside the project folder.
- Run one of the following commands:
  - `npm start`
  - or `node index.js`

Step 2: View results

- The scraper will run for a few seconds.
- Job results will be printed directly in the terminal as JSON.

---

Configuration

Step 1: Change job title and location

- Open the file `index.js` in a text editor (VS Code, Notepad, etc.).
- Find the lines near the top:

  `const query = 'Frontend Developer';`  
  `const location = 'Berlin';`

- Change them to your desired job and city, for example:

  `const query = 'UX Designer';`  
  `const location = 'Munich';`

- Save the file.

Step 2: Run again

- Return to the terminal.
- Run:
  - `npm start`
  - or `node index.js`

The scraper will now fetch jobs using the new configuration.

---

Notes

- Run sparingly. Do not run multiple scrapers at the same time.
- Some websites may block automated access if requests are too frequent.
- LinkedIn is intentionally not included due to strong anti-scraping protections.
- If a website changes its page structure, the scraper may stop working until updated.
- Always verify the output before using the data.

---

License

MIT License.

You are free to use, modify, and share this project.
