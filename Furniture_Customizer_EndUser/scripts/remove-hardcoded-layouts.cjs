const fs = require('fs');
const path = require('path');

const customerPagesDir = path.join(__dirname, '..', 'src', 'pages', 'customer');

function removeLayouts(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            removeLayouts(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            const excludedFiles = ['VendorLogin.jsx', 'VendorRegister.jsx', 'VendorPending.jsx', 'VendorForgotPassword.jsx'];
            if (excludedFiles.includes(file)) {
                console.log(`Skipping excluded file: ${file}`);
                return;
            }
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            const headerRegex = /<header\b[^>]*>[\s\S]*?<\/header>/g;
            const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/g;
            
            content = content.replace(headerRegex, '{/* Removed hardcoded header to use MainLayout */}');
            content = content.replace(footerRegex, '{/* Removed hardcoded footer to use MainLayout */}');
            
            const importNavRegex = /import\s+CustomerNavbar\s+from\s+[^;]+;/g;
            const importFooterRegex = /import\s+CatalogFooter\s+from\s+[^;]+;/g;
            
            content = content.replace(importNavRegex, '');
            content = content.replace(importFooterRegex, '');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated layouts in ${file}`);
            }
        }
    });
}

removeLayouts(customerPagesDir);
console.log('Finished removing hardcoded layouts.');
