#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import addCommand from './commands/add.js';

const program = new Command();

// CLI metadata
program
  .name('devui')
  .description('CLI to add DevUI components to your project')
  .version('0.0.1');

// Add the 'add' command
addCommand(program);

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red('Invalid command: %s'), program.args.join(' '));
  console.log(`See ${chalk.blue('--help')} for a list of available commands.`);
  process.exit(1);
});

// Parse command line arguments
program.parse();