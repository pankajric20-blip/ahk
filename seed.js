const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres:KahiPassword%401234@db.ffenpfkznrtnkbbzhlqa.supabase.co:5432/postgres';

async function seedDatabase() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Connecting to Supabase...');
        await client.connect();

        console.log('Reading seed file...');
        const seedSql = fs.readFileSync(path.join(__dirname, 'supabase', 'migrations', '0001_initial.sql'), 'utf8');

        console.log('Executing seed SQL (this may take a minute)...');
        await client.query(seedSql);

        console.log('Seed execution completed successfully!');
    } catch (error) {
        const seedSql = fs.readFileSync(path.join(__dirname, 'supabase', 'migrations', '0001_initial.sql'), 'utf8');
        if (error.position) {
            const pos = parseInt(error.position, 10);
            console.error('Error near this SQL context:');
            console.error(seedSql.substring(pos - 100, pos + 100));
        }
        console.error('Error executing seed:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

seedDatabase();
