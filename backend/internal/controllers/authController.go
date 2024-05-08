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

	passwordHash, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Login:        data["login"],
		Email:        data["email"],
		PasswordHash: passwordHash,
	}

	database.DB.Create(&user)

	return c.JSON(user)
}

func Login(c fiber.Ctx) error {
	var data map[string]string

	if err := json.Unmarshal(c.Body(), &data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("login = ?", data["login"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.PasswordHash, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "incorrect password",
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
			"message": "could not login",
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
		"accessToken": token,
		"user":        user,
	})
}

func User(c fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(jwt.MapClaims)

	var user models.User

	database.DB.Where("id = ?", claims["iss"]).First(&user)

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
		"message": "success",
	})
}
