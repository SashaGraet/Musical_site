package controllers

import (
	"backend/internal/database"
	"backend/internal/models"
	"encoding/json"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"strconv"
	"time"
)

const SecretKey = "secret"

func Register(c fiber.Ctx) error {

	var data map[string]string

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
	}

	if data["login"] == "" || data["email"] == "" || data["password"] == "" {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect data",
		})
	}

	passwordHash, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Login:        data["login"],
		Email:        data["email"],
		PasswordHash: passwordHash,
	}

	database.DB.Select("Login", "Email", "PasswordHash").Create(&user)

	status := models.StatusUser{
		Id:     user.Id,
		Status: false,
	}
	database.DB.Create(&status)

	return c.JSON(user)
}

func Login(c fiber.Ctx) error {
	var data map[string]string

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
	}

	var user models.User

	database.DB.Preload("UserRole").Where("login = ?", data["login"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.PasswordHash, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iss": strconv.Itoa(int(user.Id)),
		"exp": time.Now().Add(time.Hour).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"token": token,
		"user":  user,
	})
}

func User(c fiber.Ctx) error {
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

	database.DB.Preload("UserRole").Where("id = ?", claims["iss"]).First(&user)

	return c.JSON(user)
}

func Logout(c fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Success",
	})
}
