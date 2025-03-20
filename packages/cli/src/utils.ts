import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';

/**
 * Get a list of available components from GitHub
 */
export async function getAvailableComponents(
  owner: string,
  repo: string,
  componentsPath: string
): Promise<string[]> {
  try {
    // GitHub API URL to get contents of the components directory
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${componentsPath}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    const data = await response.json() as any[];
    
    // Filter to only include directories
    return data
      .filter(item => item.type === 'dir')
      .map(item => item.name);
      
  } catch (error) {
    console.error('Error getting components from GitHub:', error);
    return [];
  }
}

/**
 * Fetch a component from GitHub and save it to the destination
 */
export async function fetchComponentFromGitHub(
  owner: string,
  repo: string,
  componentPath: string,
  destDir: string
): Promise<void> {
  // Get all files in the component directory
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${componentPath}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
  
  const files = await response.json() as any[];
  
  // Create destination directory
  await fs.ensureDir(destDir);
  
  // Download each file
  for (const file of files) {
    if (file.type === 'file') {
      // Get file content
      const fileResponse = await fetch(file.download_url);
      
      if (!fileResponse.ok) {
        throw new Error(`Failed to download ${file.name}`);
      }
      
      const content = await fileResponse.text();
      
      // Save file
      await fs.writeFile(path.join(destDir, file.name), content);
    } else if (file.type === 'dir') {
      // Recursively fetch subdirectories
      await fetchComponentFromGitHub(
        owner,
        repo,
        `${componentPath}/${file.name}`,
        path.join(destDir, file.name)
      );
    }
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