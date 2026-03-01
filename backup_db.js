const { Client } = require("pg");
const fs = require("fs");

const connectionString =
  "postgresql://postgres:KahiPassword%401234@db.ffenpfkznrtnkbbzhlqa.supabase.co:5432/postgres";

async function backupDatabase() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("Connecting to Supabase...");
    await client.connect();

    console.log("Fetching tables...");
    const res = await client.query(`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public';
        `);

    const tables = res.rows.map((r) => r.tablename);
    console.log(
      `Found ${tables.length} tables in the public schema:`,
      tables.join(", "),
    );

    const backupData = {};

    for (const table of tables) {
      console.log(`Exporting table data: ${table}...`);
      const tableData = await client.query(`SELECT * FROM "${table}"`);
      backupData[table] = tableData.rows;
      console.log(` -> Exported ${tableData.rows.length} rows`);
    }

    const filename = `c:\\p\\p\\Project\\AITools\\aihkya\\supabase_db_backup.json`;
    console.log(`Writing backup to ${filename}...`);
    fs.writeFileSync(filename, JSON.stringify(backupData, null, 2));

    console.log(`Backup completed successfully: ${filename}`);
  } catch (error) {
    console.error("Error during backup:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

backupDatabase();
