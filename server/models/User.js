const { randomUUID } = require("node:crypto");
const { pool } = require("../db");

function mapUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    passwordChangedAt: row.password_changed_at,
  };
}

async function findById(id) {
  const result = await pool.query(
    `SELECT id, name, email, password, password_changed_at
     FROM users WHERE id = $1 LIMIT 1`,
    [id],
  );
  return mapUser(result.rows[0]);
}

async function findByEmail(email) {
  const result = await pool.query(
    `SELECT id, name, email, password, password_changed_at
     FROM users WHERE email = $1 LIMIT 1`,
    [email],
  );
  return mapUser(result.rows[0]);
}

async function create({ name, email, password }) {
  const result = await pool.query(
    `INSERT INTO users (id, name, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, password, password_changed_at`,
    [randomUUID(), name, email, password],
  );
  return mapUser(result.rows[0]);
}

async function updateName(id, name) {
  const result = await pool.query(
    `UPDATE users SET name = $2
     WHERE id = $1
     RETURNING id, name, email, password, password_changed_at`,
    [id, name],
  );
  return mapUser(result.rows[0]);
}

async function updatePassword(id, password) {
  const result = await pool.query(
    `UPDATE users
     SET password = $2, password_changed_at = NOW()
     WHERE id = $1
     RETURNING id, name, email, password, password_changed_at`,
    [id, password],
  );
  return mapUser(result.rows[0]);
}

module.exports = { findById, findByEmail, create, updateName, updatePassword };
