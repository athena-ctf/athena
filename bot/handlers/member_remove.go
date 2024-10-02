package handlers

import (
	"fmt"

	"athena.io/bot/config"
	"github.com/bwmarrin/discordgo"
)

func MemberRemoveHandler(s *discordgo.Session, m *discordgo.GuildMemberRemove) {
	channelID := config.DefaultConfig.WelcomeChannelID
	message := fmt.Sprintf("It seems %s has left the server", m.Member.Mention())

	if _, err := s.ChannelMessageSend(channelID, message); err != nil {
		s.ChannelMessageSend(channelID, err.Error())
	}
}
