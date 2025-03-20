import fs from 'fs-extra';
import path from 'path';

/**
 * Get a list of available components
 */
export async function getAvailableComponents(componentsDir: string): Promise<string[]> {
  try {
    const items = await fs.readdir(componentsDir);
    
    // Filter to only include directories that have an index.ts file
    const components: string[] = [];
    
    for (const item of items) {
      const itemPath = path.join(componentsDir, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory() && await fs.pathExists(path.join(itemPath, 'index.ts'))) {
        components.push(item);
      }
    }
    
    return components;
  } catch (error) {
    console.error('Error getting components:', error);
    return [];
  }
}

/**
 * Ensure a directory exists
 */
export async function ensureDirectory(dir: string): Promise<void> {
  try {
    await fs.ensureDir(dir);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create directory ${dir}: ${error.message}`);
    }
    throw error;
  }
}