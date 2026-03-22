const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabaseUrl = "";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey);

const tables = [
  "ai_tools",
  "profiles",
  "reviews",
  "saved_tools",
  "search_logs",
  "task_categories",
  "tool_tasks",
];

async function backupDB() {
  const dbBackup = {};

  console.log("Starting Supabase Backup...");

  for (const table of tables) {
    console.log(`Backing up table: ${table}...`);
    try {
      let page = 0;
      const pageSize = 1000;
      let allRows = [];
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from(table)
          .select("*")
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (error) {
          throw error;
        }

        allRows = allRows.concat(data);

        if (data.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
      }

      dbBackup[table] = allRows;
      console.log(
        `Successfully backed up ${allRows.length} rows from ${table}`,
      );
    } catch (e) {
      console.error(`Error backing up table ${table}:`, e.message);
    }
  }

  // Handle users table separately through auth API if possible
  try {
    console.log("Backing up Auth Users...");
    const {
      data: { users },
      error,
    } = await supabase.auth.admin.listUsers({ page: 1, perPage: 10000 });
    if (error) throw error;
    dbBackup["auth_users"] = users;
    console.log(`Successfully backed up ${users.length} users from auth.`);
  } catch (e) {
    console.error(
      "Could not backup auth users (normal if lack permissions):",
      e.message,
    );
  }

  const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = `aihkya_db_backup_${dateStr}.json`;

  fs.writeFileSync(backupFile, JSON.stringify(dbBackup, null, 2));
  console.log(
    `\n✅ Database backup successfully saved to: ${__dirname}\\${backupFile}`,
  );
}

backupDB();
