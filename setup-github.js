import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to execute shell commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command}`);
    exec(command, { stdio: 'inherit' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error);
        reject(error);
        return;
      }
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      resolve(true);
    });
  });
}

// Main function to set up GitHub repository
async function setupGitHub() {
  console.log('Setting up GitHub repository for Expense Tracker...');
  
  // Check if git is already initialized
  const isGitInitialized = fs.existsSync(path.join(process.cwd(), '.git'));
  
  if (!isGitInitialized) {
    console.log('Initializing git repository...');
    try {
      await runCommand('git init');
    } catch (error) {
      return;
    }
  } else {
    console.log('Git repository already initialized.');
  }
  
  // Create .gitignore file if it doesn't exist
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log('Creating .gitignore file...');
    fs.writeFileSync(gitignorePath, `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`);
  }
  
  // Instructions for GitHub
  console.log('\n===== GITHUB REPOSITORY SETUP INSTRUCTIONS =====');
  console.log('\nTo create a GitHub repository and push your code:');
  console.log('\n1. Create a new repository on GitHub: https://github.com/new');
  console.log('2. Name your repository "expense-tracker"');
  console.log('3. Make it public or private as you prefer');
  console.log('4. Do not initialize with README, .gitignore, or license');
  console.log('5. Click "Create repository"');
  console.log('\nAfter creating the repository, run these commands in your terminal:');
  console.log('\ngit add .');
  console.log('git commit -m "Initial commit: Expense Tracker App"');
  console.log('git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git');
  console.log('git branch -M main');
  console.log('git push -u origin main');
  
  console.log('\nReplace YOUR_USERNAME with your GitHub username.');
  console.log('\nAfter completing these steps, your repository will be available at:');
  console.log('https://github.com/YOUR_USERNAME/expense-tracker');
  console.log('\n===== END OF INSTRUCTIONS =====');
}

// Run the setup
setupGitHub();