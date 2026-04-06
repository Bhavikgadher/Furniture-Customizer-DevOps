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
            // Exclude vendor pages mixed in customer folder if any, though App.jsx puts them outside MainLayout
            // App.jsx routes outside MainLayout:
            // /vendor-login (VendorLogin)
            // /vendor-register (VendorRegister)
            // /vendor-pending (VendorPending)
            // /vendor-forgot-password (VendorForgotPassword)
            
            const excludedFiles = ['VendorLogin.jsx', 'VendorRegister.jsx', 'VendorPending.jsx', 'VendorForgotPassword.jsx'];
            if (excludedFiles.includes(file)) {
                console.log(`Skipping excluded file: ${file}`);
                return;
            }
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Regex to match header and footer
            // We use [\s\S]*? for non-greedy match. This works well assuming no nested headers/footers.
            const headerRegex = /<header\b[^>]*>[\s\S]*?<\/header>/g;
            const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/g;
            
            content = content.replace(headerRegex, '{/* Removed hardcoded header to use MainLayout */}');
            content = content.replace(footerRegex, '{/* Removed hardcoded footer to use MainLayout */}');
            
            // Also might want to strip any "import CustomerNavbar" or "import CatalogFooter" just in case
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
