const fs = require('fs');
const path = require('path');

const dirs = [
    'd:/Study/Last_Sem_Project/Furniture_Customizer_EndUser/src/pages/customer',
    'd:/Study/Last_Sem_Project/Furniture_Customizer_EndUser/src/pages/auth'
];

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove imports
        content = content.replace(/^import\s+(Navbar|CustomerNavbar|Footer|CatalogFooter)\s+from\s+[^;]+;?\r?\n?/gm, '');

        // Remove component tags
        content = content.replace(/^[ \t]*<(Navbar|CustomerNavbar|Footer|CatalogFooter)[^>]*\/>\r?\n?/gm, '');

        fs.writeFileSync(filePath, content, 'utf8');
    }
}
console.log('Removed Layout components from individual pages.');
