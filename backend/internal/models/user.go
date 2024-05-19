package models

type User struct {
	Id           uint     `json:"id"`
	Login        string   `json:"login"`
	Email        string   `json:"email"`
	PasswordHash []byte   `json:"-"`
	Name         string   `json:"name"`
	Surname      string   `json:"surname"`
	City         string   `json:"city"`
	Gender       string   `json:"gender"`
	Age          uint     `json:"age"`
	UserRole     UserRole `json:"user_role" gorm:"foreignKey:Id"`
}

type UserRole struct {
	Id         uint   `json:"-"`
	Role       string `json:"role"`
	Experience string `json:"experience"`
	Level      string `json:"level"`
}

type StatusUser struct {
	Id     uint `json:"-"`
	Status bool `json:"status"`
}
