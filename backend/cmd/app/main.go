package main

import (
	"backend/internal/config"
	"backend/internal/lib/logger/handlers/slogpretty"
	"backend/internal/lib/logger/sl"
	"backend/storage/postgres"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"log/slog"
	"os"

	mwLogger "backend/internal/http-server/middleware/logger"
)

const (
	envLocal = "local"
	envProd  = "prod"
)

func main() {
	cfg := config.MustLoad()

	log := setupLogger(cfg.Env)

	log.Info("starting application", slog.String("env", cfg.Env))
	log.Debug("debug messages are enabled")
	log.Error("error messages are enabled")

	storage, err := postgres.New(cfg.DB.ConnectionString)
	if err != nil {
		log.Error("failed to init storage", sl.Err(err))
		os.Exit(1)
	}

	_ = storage

	router := chi.NewRouter()

	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)
	router.Use(mwLogger.New(log))
	router.Use(middleware.Recoverer)
	router.Use(middleware.URLFormat)

	// TODO: run server
}

func setupLogger(env string) *slog.Logger {
	var log *slog.Logger

	switch env {
	case envLocal:
		log = setupPrettySlog()
	case envProd:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}),
		)
	}

	return log

}

func setupPrettySlog() *slog.Logger {
	opts := slogpretty.PrettyHandlerOptions{
		SlogOpts: &slog.HandlerOptions{
			Level: slog.LevelDebug,
		},
	}

	handler := opts.NewPrettyHandler(os.Stdout)

	return slog.New(handler)
}
