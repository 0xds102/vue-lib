import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { getAvailableComponents, ensureDirectory, fetchComponentFromGitHub } from '../utils.js';
import { Command } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Remove local path resolution
// const componentsDir = path.resolve(__dirname, '../../../components/src');

// GitHub repository details
const REPO_OWNER = '0xds102';
const REPO_NAME = 'vue-lib';
const COMPONENTS_PATH = 'packages/components/src';

export default function(program: Command): void {
  program
    .command('add')
    .description('Add components to your project')
    .action(async () => {
      try {
        // Get spinner for components fetching
        const listSpinner = ora('Fetching available components...').start();
        
        // Get available components from GitHub
        const components = await getAvailableComponents(REPO_OWNER, REPO_NAME, COMPONENTS_PATH);
        
        listSpinner.succeed('Found components');
        
        if (components.length === 0) {
          console.log(chalk.red('No components found!'));
          return;
        }
        
        // Ask user which components to add
        const { selectedComponents } = await inquirer.prompt<{ selectedComponents: string[] }>([
          {
            type: 'checkbox',
            name: 'selectedComponents',
            message: 'Select components to add',
            choices: components.map((c: string) => ({ name: c, value: c }))
          }
        ]);
        
        if (selectedComponents.length === 0) {
          console.log(chalk.yellow('No components selected.'));
          return;
        }
        
        // Ask for the target directory
        const { targetDir } = await inquirer.prompt<{ targetDir: string }>([
          {
            type: 'input',
            name: 'targetDir',
            message: 'Where do you want to install the components?',
            default: 'src/components/ui'
          }
        ]);
        
        // Install each component
        for (const component of selectedComponents) {
          const spinner = ora(`Installing ${component}...`).start();
          
          try {
            const destDir = path.join(process.cwd(), targetDir, component);
            
            // Ensure target directory exists
            await ensureDirectory(path.join(process.cwd(), targetDir));
            
            // Fetch and save component from GitHub
            await fetchComponentFromGitHub(
              REPO_OWNER,
              REPO_NAME,
              `${COMPONENTS_PATH}/${component}`,
              destDir
            );
            
            spinner.succeed(`Installed ${chalk.green(component)}`);
          } catch (error) {
            spinner.fail(`Failed to install ${component}`);
            console.error(error);
          }
        }
        
        console.log(chalk.green('\n✅ Installation complete!'));
        console.log(`Components were installed in ${chalk.blue(targetDir)}`);
        console.log(chalk.yellow('\nMake sure to import them in your project:'));
        console.log(`\n${chalk.blue(`import { ${selectedComponents.join(', ')} } from '${targetDir.startsWith('src/') ? '@/' : ''}${targetDir.replace(/^src\//, '')}';`)}`);
      } catch (error) {
        console.error(chalk.red('An error occurred:'), error);
      }
    });
}