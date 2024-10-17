import { pool } from "../config/database.js";

const getCustoms = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM customs ORDER BY custom_id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getCustomsByBoltId = async (req, res) => {
  try {
    const selectQuery = `
            SELECT custom_id, name, price, convertible, bolt_custom_id
            FROM customs
            WHERE bolt_custom_id = $1
        `;
    const id = req.params.customId;
    const results = await pool.query(selectQuery, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};


export default {
  getCustoms,
  getCustomsByBoltId,
};
