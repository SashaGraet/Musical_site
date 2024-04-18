package main

import (
	"backend/internal/database"
	"backend/internal/routes"
	"github.com/gofiber/fiber/v3"
)

func main() {
	database.Connect()

	app := fiber.New()

	routes.Setup(app)

	app.Listen(":8000")
}
