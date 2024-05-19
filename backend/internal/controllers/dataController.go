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

	if data["name"] == "" || data["surname"] == "" || data["city"] == "" || data["gender"] == "" || data["email"] == "" || data["age"] == "" {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect data",
		})
	}

	age, err := strconv.Atoi(data["age"])
	if err != nil {
		return err
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


	database.DB.Offset(offset).Limit(10).Find(&users)

	query := database.DB.Preload("UserRole").Model(&models.User{})

	if gender := c.Query("gender"); gender != "" {
		query = query.Where("gender = ?", gender)
	}

	if ageGroup := c.Query("age_group"); ageGroup != "" {
		switch ageGroup {
		case "under_18":
			query = query.Where("age < 18")
		case "18_25":
			query = query.Where("age BETWEEN 18 AND 25")
		case "25_40":
			query = query.Where("age BETWEEN 25 AND 40")
		case "over_40":
			query = query.Where("age > 40")
		}
	}

	if city := c.Query("city"); city != "" {
		query = query.Where("city = ?", city)
	}

	if role := c.Query("role"); role != "" {
		query = query.Joins("JOIN user_roles ON users.id = user_roles.id").
			Where("user_roles.role = ?", role)
	}

	query = query.Joins("INNER JOIN status_users ON users.id = status_users.id AND status_users.status = ?", true)

	query.Limit(10).Offset(offset).Find(&users)

	return c.JSON(users)
}

func AddRole(c fiber.Ctx) error {
	var data map[string]string

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
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

	var userRole models.UserRole
	if err := database.DB.Where("id = ?", user.Id).First(&userRole).Error; err == nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Role already exists for this user",
		})
	}

	if data["role"] == "" || data["experience"] == "" || data["level"] == "" {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect data",
		})
	}
	userRole.Id = user.Id
	userRole.Role = data["role"]
	userRole.Experience = data["experience"]
	userRole.Level = data["level"]

	database.DB.Create(&userRole)

	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"message": "Role added",
	})
}

func ChangeStatus(c fiber.Ctx) error {
	var data map[string]string

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
	}

	if data["status"] == "" {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect data",
		})
	}

	status, err := strconv.ParseBool(data["status"])
	if err != nil {
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

	var statusUser models.StatusUser

	database.DB.Where("id = ?", user.Id).First(&statusUser)

	statusUser.Status = status

	database.DB.Save(&statusUser)

	return c.JSON(fiber.Map{
		"message": "Status changed",
	})
}
