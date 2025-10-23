#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the package directory
const packageDir = path.join(__dirname, '..');

// Create readline interface for user input
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to ask user for input
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

console.log('🚀 MVC Backend App Generator');
console.log('============================');

async function createProject() {
    try {
        // Get project name from command line arguments or ask user
        let projectName = process.argv[2];
        
        if (!projectName) {
            projectName = await askQuestion('Project name: ');
            
            if (!projectName) {
                console.error('❌ Project name is required!');
                rl.close();
                process.exit(1);
            }
        }

        console.log(`📁 Creating project: ${projectName}`);

        // Determine project path
        let projectPath;
        if (projectName === '.') {
            // Use current directory
            projectPath = process.cwd();
            console.log('📂 Using current directory');
        } else {
            // Create new directory
            projectPath = path.join(process.cwd(), projectName);
            
            // Check if directory exists
            if (fs.existsSync(projectPath)) {
                console.error(`❌ Directory ${projectName} already exists!`);
                rl.close();
                process.exit(1);
            }
            
            fs.mkdirSync(projectPath, { recursive: true });
            console.log(`📂 Created directory: ${projectName}`);
        }

        // Copy files from package
        const filesToCopy = [
            'src',
            'server.js',
            'env.example',
            'README.md',
            'LICENSE'
        ];

        // Helper function to copy directories recursively
        function copyDirectory(src, dest) {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest, { recursive: true });
            }
            
            const entries = fs.readdirSync(src, { withFileTypes: true });
            
            for (let entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);
                
                if (entry.isDirectory()) {
                    copyDirectory(srcPath, destPath);
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }
            }
        }

        // Copy files
        filesToCopy.forEach(file => {
            const sourcePath = path.join(packageDir, file);
            const destPath = path.join(projectPath, file);
            
            if (fs.existsSync(sourcePath)) {
                if (fs.statSync(sourcePath).isDirectory()) {
                    copyDirectory(sourcePath, destPath);
                } else {
                    fs.copyFileSync(sourcePath, destPath);
                }
                console.log(`✅ Copied ${file}`);
            }
        });

        // Create package.json for the new project
        const packageJson = {
            "name": projectName === '.' ? path.basename(process.cwd()) : projectName,
            "version": "1.0.0",
            "description": "Backend API with MVC architecture",
            "main": "server.js",
            "type": "module",
            "scripts": {
                "start": "node server.js",
                "dev": "nodemon server.js"
            },
            "keywords": ["nodejs", "express", "mongodb", "mongoose", "mvc", "authentication"],
            "author": "",
            "license": "MIT",
            "dependencies": {
                "express": "^4.18.2",
                "mongoose": "^8.0.3",
                "bcryptjs": "^2.4.3",
                "jsonwebtoken": "^9.0.2",
                "cookie-parser": "^1.4.6",
                "cors": "^2.8.5",
                "dotenv": "^16.3.1"
            },
            "devDependencies": {
                "nodemon": "^3.0.2"
            }
        };

        fs.writeFileSync(
            path.join(projectPath, 'package.json'),
            JSON.stringify(packageJson, null, 2)
        );

        console.log('✅ Created package.json');

        // Show next steps
        console.log(`
🎉 Project created successfully!

Next steps:
${projectName !== '.' ? `1. cd ${projectName}` : ''}
${projectName !== '.' ? '2. npm install' : '1. npm install'}
${projectName !== '.' ? '3. cp env.example .env' : '2. cp env.example .env'}
${projectName !== '.' ? '4. Update .env with your MongoDB URI and JWT secret' : '3. Update .env with your MongoDB URI and JWT secret'}
${projectName !== '.' ? '5. npm run dev' : '4. npm run dev'}

Happy coding! 🚀
        `);

    } catch (error) {
        console.error('❌ Error creating project:', error.message);
    } finally {
        rl.close();
    }
}

// Start the process
createProject();
