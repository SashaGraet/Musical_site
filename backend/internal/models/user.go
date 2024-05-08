package models

type User struct {
	Id           uint   `json:"id"`
	Login        string `json:"login"`
	Email        string `json:"email"`
	PasswordHash []byte `json:"-"`
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	City         string `json:"city"`
	Gender       string `json:"gender"`
	GroupId      uint   `json:"group_Id"`
}

type UserRole struct {
	UserId     uint   `json:"user_id"`
	Role       string `json:"role"`
	Experience string `json:"experience"`
}
