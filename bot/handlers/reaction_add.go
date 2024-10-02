package handlers

import (
	"athena.io/bot/config"
	"github.com/bwmarrin/discordgo"
)

var roleMap = map[string]string{
	"✏️": config.DefaultConfig.EditorRoleID,
	"👀":  config.DefaultConfig.ViewerRoleID,
}

func ReactionAddHandler(s *discordgo.Session, m *discordgo.MessageReactionAdd) {
	if m.MessageID == config.DefaultConfig.ReactionRoleMessageID {
		roleID, ok := roleMap[m.Emoji.Name]
		if !ok {
			s.MessageReactionRemove(m.ChannelID, m.MessageID, m.Emoji.Name, m.UserID)
		}

		s.GuildMemberRoleAdd(m.GuildID, m.UserID, roleID)
	}
}
