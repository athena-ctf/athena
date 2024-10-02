package commands

import (
	"fmt"
	"strings"

	"github.com/bwmarrin/discordgo"
)

type TicketCreateCmd struct {
	Reason string
}

func (cmd *TicketCreateCmd) FromArgs(args []string) error {
	cmd.Reason = strings.Join(args, " ")
	return nil
}

func (cmd *TicketCreateCmd) Name() string { return "ticket:create" }
func (cmd *TicketCreateCmd) Help() string {
	return "Creates a new ticket."
}
func (cmd *TicketCreateCmd) LongHelp() LongHelp {
	return LongHelp{
		About: "This command is used for creating ticket",
		Usage: "`!ticket create <messsage>`",
		Arguments: []Argument{
			{
				Name:     "message",
				Required: true,
				Help:     "Reason to create a ticket.",
			},
		},
		Subcommands: nil,
	}
}

func (cmd *TicketCreateCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	channel, err := sess.GuildChannelCreateComplex(
		msg.GuildID,
		discordgo.GuildChannelCreateData{
			Name:  fmt.Sprintf("ticket-%s", msg.Author.ID),
			Topic: cmd.Reason,
			Type:  discordgo.ChannelTypeGuildText,
			PermissionOverwrites: []*discordgo.PermissionOverwrite{
				{
					Type:  discordgo.PermissionOverwriteTypeMember,
					ID:    msg.Author.ID,
					Deny:  0,
					Allow: discordgo.PermissionViewChannel,
				},
				{
					Type:  discordgo.PermissionOverwriteTypeRole,
					ID:    "1259503222872215646",
					Deny:  0,
					Allow: discordgo.PermissionViewChannel,
				},
				{
					Type:  discordgo.PermissionOverwriteTypeRole,
					ID:    "1259502522318721054",
					Deny:  discordgo.PermissionViewChannel,
					Allow: 0,
				},
			},
		},
	)

	sess.ChannelMessageSend(msg.ChannelID, fmt.Sprintf("The ticket has been created by user %s and channel name <#%s>", msg.Author.Username, channel.ID))
	return err
}

func (cmd *TicketCreateCmd) Subcommands() map[string]Command {
	return nil
}
