import fs from 'fs';

function createGitHubInstructions() {
  console.log('\n===== GITHUB REPOSITORY SETUP INSTRUCTIONS =====');
  console.log('\nSince Git is not available in this environment, follow these steps to create a GitHub repository:');
  console.log('\n1. Download your project files:');
  console.log('   - Use the "Download" button in the StackBlitz interface');
  
  console.log('\n2. Create a new repository on GitHub:');
  console.log('   - Go to https://github.com/new');
  console.log('   - Name your repository "expense-tracker"');
  console.log('   - Make it public or private as you prefer');
  console.log('   - Click "Create repository"');
  
  console.log('\n3. Upload your files to GitHub:');
  console.log('   - On your new repository page, click "uploading an existing file"');
  console.log('   - Drag and drop your project files or select them from your computer');
  console.log('   - Commit the changes');
  
  console.log('\n4. Alternatively, if you have Git installed locally:');
  console.log('   - Extract the downloaded files to a folder');
  console.log('   - Open a terminal in that folder');
  console.log('   - Run the following commands:');
  console.log('     git init');
  console.log('     git add .');
  console.log('     git commit -m "Initial commit: Expense Tracker App"');
  console.log('     git branch -M main');
  console.log('     git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git');
  console.log('     git push -u origin main');
  
  console.log('\nAfter completing these steps, your repository will be available at:');
  console.log('https://github.com/YOUR_USERNAME/expense-tracker');
  console.log('\n===== END OF INSTRUCTIONS =====');
}

// Create README.md if it doesn't exist
if (!fs.existsSync('./README.md')) {
  fs.writeFileSync('./README.md', `# Expense Tracker

A simple yet powerful web app that helps users track their daily expenses, categorize spending, and display total expenses dynamically.

## Features

- Add expenses with a name, amount, and category
- Delete expenses when needed
- View total expenses dynamically
- Store data in Local Storage so it persists after page refresh
- Filter expenses by category

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide React for icons
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   \`\`\`
   git clone https://github.com/YOUR_USERNAME/expense-tracker.git
   cd expense-tracker
   \`\`\`

2. Install dependencies
   \`\`\`
   npm install
   \`\`\`

3. Start the development server
   \`\`\`
   npm run dev
   \`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

## Usage

1. Enter the expense name, amount, and select a category
2. Click "Add Expense" to add it to your list
3. View your expenses in the list on the right
4. Filter expenses by category using the filter dropdown
5. Delete expenses by clicking the trash icon

## Screenshots

![Expense Tracker App](https://source.unsplash.com/random/800x400/?finance)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
`);
  console.log('Created README.md file for your project');
}

createGitHubInstructions();