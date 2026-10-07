# Field Nexus - Full Project Guidelines

This document is written for everyone - including people with no technical background. It explains what this project is, how to set it up, how to use it, and how to work with it safely.

## Table of Contents

1. [What is Field Nexus?](#what-is-field-nexus)
2. [Who Uses This Project?](#who-uses-this-project)
3. [What You Need Before Starting](#what-you-need-before-starting)
4. [Getting Started (For Non-Technical Users)](#getting-started-for-non-technical-users)
5. [How to Use Field Nexus](#how-to-use-field-nexus)
6. [Folder Structure Explained](#folder-structure-explained)
7. [How the Project Works (Simple Explanation)](#how-the-project-works-simple-explanation)
8. [Daily Workflow](#daily-workflow)
9. [Coding Standards (For Developers)](#coding-standards-for-developers)
10. [Testing Guidelines](#testing-guidelines)
11. [Deployment Guide](#deployment-guide)
12. [Security Guidelines](#security-guidelines)
13. [Troubleshooting](#troubleshooting)
14. [Frequently Asked Questions (FAQs)](#frequently-asked-questions-faqs)
15. [Glossary of Terms](#glossary-of-terms)
16. [Need Help?](#need-help)

## What is Field Nexus?

Field Nexus is a web application designed to help manage field operations, tasks, and team coordination. Think of it as a digital dashboard where teams can track work, manage assignments, and stay organized - similar to a to-do list but built for teams working in the field.

**Key Purpose:**
- Keep track of field tasks and assignments in one place
- Help teams communicate and stay coordinated
- Provide a simple, user-friendly interface that works on computers and mobile devices
- Make it easy to see what's done, what's in progress, and what's pending

## Who Uses This Project?

- **End Users (Non-Technical):** Field workers, team leads, managers who use the app through their web browser
- **Developers (Technical):** People who build, fix, or improve the app
- **Testers:** People who check if everything works correctly
- **Project Managers:** People who oversee the project

## What You Need Before Starting

### For Using the App (End Users)
- A computer, tablet, or smartphone
- An internet connection
- A modern web browser (Chrome, Firefox, Edge, Safari - updated to the latest version)

### For Setting Up/Developing (Developers)
- A computer (Windows, Mac, or Linux)
- [Node.js](https://nodejs.org/) (version 18 or higher) - This runs the app
- [npm](https://www.npmjs.com/) (comes with Node.js) - This installs extra tools
- [Git](https://git-scm.com/) (optional but recommended) - This tracks code changes
- A code editor like [VS Code](https://code.visualstudio.com/) (free and beginner-friendly)

**Technical Terms Explained:**
- **Node.js:** A program that lets your computer run JavaScript outside of a web browser
- **npm:** A tool that downloads and manages other code libraries your project needs
- **Git:** A version control system that keeps a history of all changes made to the code

## Getting Started (For Non-Technical Users)

### Option 1: Use the Live App (Easiest)
1. Open your web browser
2. Go to the app's website link (provided by your team)
3. Log in with your username and password
4. Start using it right away!

### Option 2: Run It Locally on Your Computer
If you're helping test or just want to run it on your own machine:

1. **Install Node.js**
   - Go to [nodejs.org](https://nodejs.org)
   - Download the "LTS" (Long Term Support) version for your computer
   - Open the installer and follow the simple steps (just click "Next" most of the time)

2. **Download the Project**
   - Get the project folder from your team (as a ZIP file)
   - Unzip/extract it to a folder on your computer (e.g., `Documents/field_nexus`)

3. **Open Terminal/Command Prompt**
   - **Windows:** Press `Windows + R`, type `cmd`, press Enter
   - **Mac:** Press `Cmd + Space`, type `terminal`, press Enter
   - **Linux:** Open your terminal app

4. **Go to the Frontend Folder**
   ```bash
   cd path/to/field_nexus/frontend-l2b7-assignment-07
   ```
   *Replace `path/to/` with your actual folder location. For example: `cd C:\Users\YourName\Documents\field_nexus\frontend-l2b7-assignment-07`*

5. **Install Required Files**
   ```bash
   npm install
   ```
   *This downloads everything the app needs. It may take 2-5 minutes - that's normal.*

6. **Start the App**
   ```bash
   npm run dev
   ```
   *You'll see a message like "Local: http://localhost:5173". Copy and paste that link into your browser.*

7. **Use the App**
   - Your app is now running locally
   - Open [http://localhost:5173](http://localhost:5173) in your browser
   - To stop the app: Go to the terminal and press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)

**Tip:** You only need to do steps 1, 4, 5 once. After that, just do steps 4 and 6 to start it again.

## How to Use Field Nexus

### Basic Navigation
1. **Home/Dashboard:** See an overview of all tasks and activities
2. **Tasks:** View, create, or update field tasks
3. **Teams:** Manage team members and assignments
4. **Profile:** View and update your personal information

### Common Actions
- **Creating a Task:** Click "New Task" button, fill in the details, and save
- **Updating Status:** Mark tasks as "To Do", "In Progress", or "Completed"
- **Viewing Details:** Click on any task to see more information
- **Filtering:** Use filters to see specific tasks (by date, status, assignee, etc.)

### Tips for Best Experience
- Use the latest version of your browser
- If something looks stuck, try refreshing the page (`F5` or `Ctrl+R`)
- Keep your browser window at a reasonable size - it works on mobile too
- Save your work before leaving forms

## Folder Structure Explained

Understanding the folders helps you know where things belong:

```
field_nexus/
│
├── frontend-l2b7-assignment-07/  # The part you see in your browser (UI)
│   ├── src/                     # Main app code
│   │   ├── components/          # Reusable parts (buttons, forms, cards)
│   │   ├── pages/               # Full pages of the app
│   │   ├── routes/              # Page navigation rules
│   │   ├── assets/              # Images, icons, logos
│   │   ├── utils/               # Helper functions
│   │   ├── hooks/               # Reusable logic
│   │   ├── context/             # Shared app data
│   │   ├── config/              # App settings
│   │   └── services/            # Connection to backend
│   ├── public/                  # Files that don't change
│   ├── README.md                # Quick start guide for frontend
│   ├── PROJECT_GUIDELINES.md    # This file (detailed guide)
│   └── package.json             # List of tools the app uses
│
└── backend-l2b7-assignment-06/  # The behind-the-scenes part (data, login)
    ├── src/                     # Backend code
    ├── README.md                # Backend setup guide
    └── package.json             # Backend tools
```

**Simple Explanation:**
- **Frontend:** What you see and click on (buttons, colors, forms)
- **Backend:** Where data is stored and processed (like a filing cabinet)
- **Components:** Building blocks (like LEGO pieces) used to build pages
- **Pages:** Complete screens you see in the app

## How the Project Works (Simple Explanation)

1. **You open the app** in your web browser
2. **Frontend (what you see)** shows you buttons, forms, and information
3. **When you click something**, the frontend talks to the backend
4. **Backend** checks your request, gets data from the database, and sends it back
5. **Frontend** displays that data in a nice, readable format

Think of it like ordering food: The menu (frontend) shows options, you order (click), the kitchen (backend) prepares it, and they bring it to your table (display).

## Daily Workflow

### For End Users
1. Open the app and log in
2. Check your dashboard for updates
3. Work on your assigned tasks
4. Update task status as you progress
5. Log out when done

### For Developers
1. **Start your day:** Pull latest changes (`git pull`)
2. **Understand the task:** Read requirements carefully
3. **Plan:** Break 
