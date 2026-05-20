const Database = require('better-sqlite3')
const path = require('path')

let db

function getDb() {
  if (!db) {
    const dbPath = process.env.DB_PATH || './invoices.db'
    db = new Database(path.resolve(dbPath))
    db.pragma('journal_mode = WAL')
    initSchema()
  }
  return db
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS company_profile (
      id INTEGER PRIMARY KEY,
      name TEXT,
      vat TEXT,
      cr TEXT,
      city TEXT,
      address TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      filename TEXT,
      uploaded_at TEXT DEFAULT CURRENT_TIMESTAMP,
      supplier_name TEXT,
      supplier_vat TEXT,
      supplier_cr TEXT,
      supplier_city TEXT,
      supplier_address TEXT,
      invoice_number TEXT,
      invoice_date TEXT,
      invoice_type TEXT,
      pre_vat_amount REAL,
      vat_amount REAL,
      total_amount REAL,
      currency TEXT,
      has_qr INTEGER,
      buyer_name TEXT,
      buyer_vat TEXT,
      items_description TEXT,
      vat_valid INTEGER,
      vat_calc_ok INTEGER,
      total_calc_ok INTEGER,
      date_valid INTEGER,
      company_match_name TEXT,
      company_match_vat TEXT,
      issues TEXT,
      warnings TEXT,
      score INTEGER,
      status TEXT DEFAULT 'pending'
    );
  `)
}

module.exports = { getDb }
