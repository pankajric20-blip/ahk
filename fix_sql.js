const fs = require('fs');
let d = fs.readFileSync('supabase/migrations/0001_initial.sql', 'utf8');
d = d.replace(/'YES \([^)]+\)'\)/g, "TRUE)");
d = d.replace(/'REFERENCE LIST'\)/g, "FALSE)");
fs.writeFileSync('supabase/migrations/0001_initial.sql', d);
console.log('Fixed boolean syntax error');
