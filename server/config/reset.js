import { pool } from "./database.js";
import boltBucketData from "../data/boltBucketData.js";

async function createTable() {
  const createTableQuery = `
    DROP TABLE IF EXISTS customs;
    DROP TABLE IF EXISTS bolts;
    DROP TABLE IF EXISTS cars;

    CREATE TABLE IF NOT EXISTS bolts (
        bolt_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS customs (
        custom_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT,
        convertible BOOLEAN,
        bolt_custom_id INT,
        FOREIGN KEY (bolt_custom_id) REFERENCES bolts(bolt_id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS cars (
        car_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        exterior VARCHAR(255) NOT NULL,
        roof VARCHAR(255) NOT NULL,
        wheels VARCHAR(255) NOT NULL,
        interior VARCHAR(255) NOT NULL,
        price INT,
        exterior_price INT,
        roof_price INT,
        wheels_price INT,
        interior_price INT,
        convertible BOOLEAN
    );
    `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 Tables created successfully");
  } catch (err) {
    console.error("⚠️ error creating tables", err);
  }
}

function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

async function seedTable() {
  await createTable();

  boltBucketData.forEach(async (bolt) => {
    const insertBoltQuery = {
      text: "INSERT INTO bolts (name) VALUES ($1)",
    };
    const boltValues = [bolt.name];

    try {
      await queryAsync(insertBoltQuery, boltValues);
      console.log(`✅ ${bolt.name} added successfully`);
      bolt.customs.forEach(async (custom) => {
        const insertCustomQuery = {
          text: "INSERT INTO customs (name, price, convertible, bolt_custom_id) VALUES ($1, $2, $3, $4)",
        };
        const customValues = [
          custom.name,
          custom.price,
          custom.convertible,
          custom.bolt_custom_id,
        ];
        await queryAsync(insertCustomQuery, customValues);
        console.log(`✅ ${custom.name} added successfully`);
      });
    } catch (err) {
      console.error("⚠️ error inserting data", err);
    }
  });
}

seedTable();
