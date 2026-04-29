import pool from "../config/db.js";

async function checkSeed() {
  try {
    const countResult = await pool.query("SELECT COUNT(*) FROM characters");
    const count = parseInt(countResult.rows[0].count);

    console.log(`Characters table has ${count} rows.`);

    if (count === 0) {
      console.log("\nTable is empty! To seed data:");
      console.log("1. Open Adminer on your VM");
      console.log("2. Run the characters_plain_insert.sql file");
      console.log("3. Run this script again to verify");
    } else {
      const sampleResult = await pool.query(
        "SELECT marvel_id, name FROM characters LIMIT 5"
      );
      console.log("\nSample characters:");
      sampleResult.rows.forEach((c) => console.log(`  - [${c.marvel_id}] ${c.name}`));
      console.log("\nDatabase is ready!");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

checkSeed();
