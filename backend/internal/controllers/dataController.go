package controllers

import (
	"backend/internal/database"
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
	"strconv"
	"strings"
)

func EditProfile(c fiber.Ctx) error {
	var data map[string]interface{}

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
	}

	token, err := jwt.ParseWithClaims(data["token"].(string), jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
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

	fields := []string{"name", "surname", "city", "gender", "email"}
	for _, field := range fields {
		if value, ok := data[field].(string); ok {
			if value == "" {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
					"message": "Field cannot be empty: " + field,
				})
			}
			switch field {
			case "name":
				user.Name = value
			case "surname":
				user.Surname = value
			case "city":
				user.City = value
			case "gender":
				user.Gender = value
			case "email":
				user.Email = value
			}
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Incorrect data for field: " + field,
			})
		}
	}

	if ageFloat, ok := data["age"].(float64); ok {
		user.Age = uint(ageFloat)
	} else if ageStr, ok := data["age"].(string); ok {
		if ageFloat, err := strconv.ParseFloat(ageStr, 64); err == nil {
			user.Age = uint(ageFloat)
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Incorrect data for field: age",
			})
		}
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Incorrect data for field: age",
		})
	}

	roleFields := []string{"role", "experience", "level"}
	roleDataProvided := true
	for _, field := range roleFields {
		if value, ok := data[field].(string); !ok || value == "" {
			roleDataProvided = false
			break
		}
	}

	if roleDataProvided {
		var userRole models.UserRole
		if err := database.DB.Where("id = ?", user.Id).First(&userRole).Error; err != nil {
			userRole = models.UserRole{
				Id:         user.Id,
				Role:       data["role"].(string),
				Experience: data["experience"].(string),
				Level:      data["level"].(string),
			}
			database.DB.Create(&userRole)
		} else {
			userRole.Role = data["role"].(string)
			userRole.Experience = data["experience"].(string)
			userRole.Level = data["level"].(string)
			database.DB.Save(&userRole)
		}
	}

	database.DB.Preload("UserRole").Where("id = ?", claims["iss"]).First(&user)

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

	if genders := c.Query("gender"); genders != "" {
		genderList := strings.Split(genders, ",")
		query = query.Where("gender IN (?)", genderList)
	}

	if ageGroups := c.Query("age_group"); ageGroups != "" {
		ageGroupList := strings.Split(ageGroups, ",")
		var ageConditions []string
		for _, ageGroup := range ageGroupList {
			switch ageGroup {
			case "under_18":
				ageConditions = append(ageConditions, "age < 18")
			case "18_25":
				ageConditions = append(ageConditions, "age BETWEEN 18 AND 25")
			case "25_40":
				ageConditions = append(ageConditions, "age BETWEEN 25 AND 40")
			case "over_40":
				ageConditions = append(ageConditions, "age > 40")
			}
		}
		fmt.Print(ageConditions)
		if len(ageConditions) > 0 {
			query = query.Where(strings.Join(ageConditions, " OR "))
		}
	}

	if cities := c.Query("city"); cities != "" {
		citiesList := strings.Split(cities, ",")
		query = query.Where("city IN (?)", citiesList)
	}

	if roles := c.Query("role"); roles != "" {
		rolesList := strings.Split(roles, ",")
		query = query.Joins("JOIN user_roles ON users.id = user_roles.id").
			Where("user_roles.role IN (?)", rolesList)
	}

	query = query.Joins("INNER JOIN status_users ON users.id = status_users.id AND status_users.status = ?", true)

	query.Limit(10).Offset(offset).Find(&users)

	return c.JSON(users)
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
