package models

type User struct {
	Id            uint   `json:"id"`
	Login         string `json:"login"`
	Password_hash []byte `json:"-"`
}
