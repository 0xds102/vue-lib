import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { getAvailableComponents, ensureDirectory } from '../utils.js';
import { Command } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentsDir = path.resolve(__dirname, '../../../components/src');

export default function(program: Command): void {
  program
    .command('add')
    .description('Add components to your project')
    .action(async () => {
      try {
        // Get available components
        const components = await getAvailableComponents(componentsDir);
        
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
            choices: components.map(c => ({ name: c, value: c }))
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
            const sourceDir = path.join(componentsDir, component);
            const destDir = path.join(process.cwd(), targetDir, component);
            
            // Ensure target directory exists
            await ensureDirectory(path.join(process.cwd(), targetDir));
            
            // Copy component files
            await fs.copy(sourceDir, destDir);
            
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