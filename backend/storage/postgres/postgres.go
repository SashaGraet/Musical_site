package postgres

import (
	"database/sql"
	"fmt"
)

type Storage struct {
	db *sql.DB
}

func New(storagePath string) (*Storage, error) {
	const op = "storage.postgresql.New"

	db, err := sql.Open("postgres", "host=localhost port=5432 user=postgres password=saizsaiz2003 dbname=music_site sslmode=disable")
	if err != nil {
		return nil, fmt.Errorf("%s: %w", op, err)
	}

	stmt, err := db.Prepare(`
	CREATE TABLE IF NOT EXISTS account(
	    id INTEGER PRIMARY KEY,
	    login TEXT NOT NULL,
	    password 
	)
	`)
}
