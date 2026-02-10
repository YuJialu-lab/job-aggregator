# job-aggregator
# Job Aggregator (Indeed + StepStone)

A lightweight job aggregation tool that periodically collects **public job listings** from multiple job platforms and presents them in a unified format.

This project focuses on **publicly accessible search result pages only**.  
No login, no user accounts, no application tracking, no internal recommendation systems.

---

## Features

- Aggregates job listings from multiple platforms
- Supports different scraping strategies per platform
- Normalizes job data into a unified structure
- Low-frequency crawling to reduce platform load and risk
- Designed for extension (LinkedIn / XING via public search pages)

---

## Supported Platforms (Phase 1)

| Platform    | Strategy     | Status |
|-------------|--------------|--------|
| Indeed      | Puppeteer    | ✅ Active |
| StepStone   | Puppeteer    | ✅ Active |
| LinkedIn    | Public pages | ⏳ Planned |
| XING        | Public pages | ⏳ Planned |

---

## What This Project Does NOT Do

- ❌ No login or authentication
- ❌ No access to user-specific data
- ❌ No application or delivery status tracking
- ❌ No email integration
- ❌ No interaction with platform internal recommendation systems
- ❌ No simulation of user actions (applications, clicks, forms)

---

## Data Model

Each job listing is normalized into the following structure:

```json
{
  "platform": "Indeed | StepStone",
  "title": "Job Title",
  "company": "Company Name",
  "location": "City / Region",
  "link": "Original job posting URL"
}
