package handlers

import (
	"athena.io/bot/config"
	"github.com/bwmarrin/discordgo"
)

func ReactionRemoveHandler(s *discordgo.Session, m *discordgo.MessageReactionRemove) {
	if m.MessageID == config.DefaultConfig.ReactionRoleMessageID {
		s.GuildMemberRoleRemove(m.GuildID, m.UserID, roleMap[m.Emoji.Name])
	}
}
