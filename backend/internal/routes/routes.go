package routes

import (
	"backend/internal/controllers"
	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App) {

	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
	app.Get("/api/users", controllers.Users)
}
