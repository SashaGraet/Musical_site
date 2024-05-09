package controllers

import (
	"backend/internal/database"
	"backend/internal/models"
	"encoding/json"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
	"strconv"
)

func EditProfile(c fiber.Ctx) error {
	var data map[string]string

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
	}

	age, err := strconv.Atoi(data["age"])
	if err != nil {
		return err
	}

	if data["name"] == "" || data["surname"] == "" || data["city"] == "" || data["gender"] == "" || data["email"] == "" {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect data",
		})
	}
	if age == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect data",
		})
	}

	token, err := jwt.ParseWithClaims(data["token"], jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims := token.Claims.(jwt.MapClaims)

	var user models.User

	database.DB.Where("id = ?", claims["iss"]).First(&user)

	user.Email = data["email"]
	user.Name = data["name"]
	user.Surname = data["surname"]
	user.City = data["city"]
	user.Gender = data["gender"]
	user.Age = uint(age)

	database.DB.Save(&user)

	return c.JSON(user)
}

func Users(c fiber.Ctx) error {

	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page < 1 {
		page = 1
	}

	offset := (page - 1) * 10

	var users []models.User

	database.DB.Preload("UserRoles").Offset(offset).Limit(10).Find(&users)

	return c.JSON(users)
}

func AddRole(c fiber.Ctx) error {
	var data map[string]string

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
	}

	if data["role"] == "" || data["experience"] == "" || data["level"] == "" {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect data",
		})
	}

	token, err := jwt.ParseWithClaims(data["token"], jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims := token.Claims.(jwt.MapClaims)

	var user models.User

	database.DB.Where("id = ?", claims["iss"]).First(&user)

	userRole := models.UserRole{
		Id:         user.Id,
		Role:       data["role"],
		Experience: data["experience"],
		Level:      data["level"],
	}

	database.DB.Create(&userRole)

	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"message": "Role added",
	})
}
