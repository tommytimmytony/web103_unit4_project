import { pool } from "../config/database.js";

const getCars = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM cars ORDER BY car_id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT car_id, name, exterior, roof, wheels, interior, price, exterior_price, roof_price, wheels_price, interior_price, convertible
      FROM cars
      WHERE car_id=$1
    `;
    const carId = req.params.carId;
    const results = await pool.query(selectQuery, [carId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const createCars = async (req, res) => {
  try {
    const {
      name,
      exterior,
      roof,
      wheels,
      interior,
      price,
      exterior_price,
      roof_price,
      wheels_price,
      interior_price,
      convertible,
    } = req.body;
    const results = await pool.query(
      `
        INSERT INTO cars (name, exterior, roof, wheels, interior, price, exterior_price, roof_price, wheels_price, interior_price, convertible)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
        `,
      [
        name,
        exterior,
        roof,
        wheels,
        interior,
        price,
        exterior_price,
        roof_price,
        wheels_price,
        interior_price,
        convertible,
      ]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      exterior,
      roof,
      wheels,
      interior,
      price,
      exterior_price,
      roof_price,
      wheels_price,
      interior_price,
      convertible,
    } = req.body;

    const results = await pool.query(
      `
    UPDATE cars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, price = $6, exterior_price = $7, roof_price= $8, wheels_price = $9, interior_price = $10, convertible = $11 WHERE car_id = $12`,
      [
        name,
        exterior,
        roof,
        wheels,
        interior,
        price,
        exterior_price,
        roof_price,
        wheels_price,
        interior_price,
        convertible,
        id,
      ]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("DELETE FROM cars WHERE car_id = $1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getCars,
  createCars,
  getCarById,
  updateCar,
  deleteCar,
};
