package controllers

import (
	"backend/internal/database"
	"backend/internal/models"
	"github.com/gofiber/fiber/v3"
	"strconv"
)

func Users(c fiber.Ctx) error {

	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page < 1 {
		page = 1
	}

	offset := (page - 1) * 3

	var users []models.User

	database.DB.Offset(offset).Limit(3).Find(&users)

	// Создаем список пользователей только с необходимыми полями
	var publicUsers []interface{}
	for _, user := range users {
		publicUser := struct {
			Id      uint   `json:"id"`
			Email   string `json:"email"`
			Name    string `json:"name"`
			Surname string `json:"surname"`
			City    string `json:"city"`
			Gender  string `json:"gender"`
		}{
			Id:      user.Id,
			Email:   user.Email,
			Name:    user.Name,
			Surname: user.Surname,
			City:    user.City,
			Gender:  user.Gender,
		}
		publicUsers = append(publicUsers, publicUser)
	}

	return c.JSON(publicUsers)
}
