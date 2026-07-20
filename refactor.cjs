const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');

files.forEach(file => {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Remove createFileRoute import
  content = content.replace(/import\s*{\s*createFileRoute\s*}\s*from\s*['"]@tanstack\/react-router['"];?\n?/, '');

  // 2. Change Link import
  content = content.replace(/import\s*{\s*Link\s*}\s*from\s*['"]@tanstack\/react-router['"];?/g, 'import { Link } from "react-router-dom";');

  // 3. Import useParams if it's a slug route
  if (file.includes('$slug')) {
    if (!content.includes('import { useParams }')) {
      content = 'import { useParams } from "react-router-dom";\n' + content;
    }
    // Replace Route.useParams() with useParams()
    content = content.replace(/Route\.useParams\(\)/g, 'useParams()');
  }

  // 4. Fix route export. Most files look like:
  // export const Route = createFileRoute('/path')({
  //   component: ComponentName,
  // })
  // We need to replace this block with export default ComponentName;
  const routeMatch = content.match(/export const Route = createFileRoute\([^)]*\)\({\s*component:\s*([A-Za-z0-9_]+),?\s*([^}]*)}\);?/);
  if (routeMatch) {
    const componentName = routeMatch[1];
    content = content.replace(routeMatch[0], `export default ${componentName};`);
  }

  // Also remove head metadata blocks if they exist in Route definition
  content = content.replace(/export const Route = createFileRoute[^{]+\{\s*head:\s*\(\)\s*=>\s*\(\{[\s\S]*?\}\),\s*component:\s*([A-Za-z0-9_]+),?\s*\}\);?/, 'export default $1;');

  // If there are 'to="/path" as any', we can remove 'as any'
  content = content.replace(/to=\{([^}]+)\s+as\s+any\}/g, 'to={$1}');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Refactored', file);
});
