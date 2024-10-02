package handlers

import (
	"strings"

	"athena.io/bot/commands"
	"github.com/bwmarrin/discordgo"
)

func parseMessage(content string) ([]string, bool) {
	if strings.HasPrefix(content, commands.Prefix) {
		message := strings.TrimPrefix(content, commands.Prefix)
		return strings.Split(message, " "), true
	}

	return nil, false
}

func MessageCreateHandler(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}

	args, ok := parseMessage(m.Content)
	if !ok {
		return
	}

	cmd, ok := commands.Commands[args[0]]
	if !ok {
		s.ChannelMessageSend(m.ChannelID, "invalid command")
		return
	}

	if err := cmd.FromArgs(args[1:]); err != nil {
		s.ChannelMessageSend(m.ChannelID, err.Error())
		s.ChannelMessageSend(m.ChannelID, cmd.LongHelp().Usage)
		return
	}

	if err := cmd.Run(s, m.Message); err != nil {
		s.ChannelMessageSend(m.ChannelID, err.Error())
	}
}
