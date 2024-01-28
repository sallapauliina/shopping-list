import { sql } from "../database/database.js";

const createAnItem = async (shopping_list_id, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${shopping_list_id}, ${name})`;
};

const createLists = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const findAllActiveItems = async (shopping_list_id) => {
  const rows =
    await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id} ORDER BY name;`;
  if (rows.length > 0 && rows) {
    return rows;
  }
  return false;
};

const findAllActiveLists = async () => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE active = true`;
  return rows;
};

const findEveryItem = async () => {
  const rows = await sql`SELECT * FROM shopping_list_items`;
  if (results && results.length > 0) {
    return rows;
  }
  return false;
};

const findEveryList = async () => {
  const rows = await sql`SELECT * FROM shopping_lists`;
  if (rows.length > 0 && rows) {
    return rows;
  }
  return false;
};

const findListById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
  if (rows.length > 0 && rows) {
    return rows[0];
  }
  return { name: "Unknown", id: 0 };
};

const changeToNonActive = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

const findNonActiveItems = async (shopping_list_id) => {
  const rows =
    await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id} AND collected=TRUE  ORDER BY name;`;
  if (rows.length > 0 && rows) {
    return rows;
  }
  return false;
};

const crossingItemOfTheList = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`;
};

export {
  changeToNonActive,
  createAnItem,
  createLists,
  crossingItemOfTheList,
  findAllActiveItems,
  findAllActiveLists,
  findEveryItem,
  findEveryList,
  findListById,
  findNonActiveItems,
};
