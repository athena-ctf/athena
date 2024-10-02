package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"athena.io/bot/handlers"
	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
)

func checkNilErr(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

func main() {
	checkNilErr(godotenv.Load())

	sess, err := discordgo.New("Bot " + os.Getenv("DISCORD_BOT_TOKEN"))
	checkNilErr(err)

	sess.AddHandler(handlers.MemberAddHandler)
	sess.AddHandler(handlers.MemberRemoveHandler)
	sess.AddHandler(handlers.MessageCreateHandler)
	sess.AddHandler(handlers.ReactionAddHandler)
	sess.AddHandler(handlers.ReactionRemoveHandler)
	sess.AddHandler(handlers.LoggingHandler)

	sess.Identify.Intents = discordgo.IntentsAll

	checkNilErr(sess.Open())

	defer sess.Close()

	log.Println("Bot is online")

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc
}
