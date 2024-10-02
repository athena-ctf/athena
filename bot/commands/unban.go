package commands

import (
	"errors"

	"github.com/bwmarrin/discordgo"
)

type UnbanCmd struct {
	UserID string
}

func (cmd *UnbanCmd) FromArgs(args []string) error {
	if len(args) == 1 {
		cmd.UserID = args[0][2 : len(args[0])-1]
		return nil
	}

	return errors.New("invalid args")
}

func (cmd *UnbanCmd) Name() string { return "unban" }
func (cmd *UnbanCmd) Help() string { return "Unban a user from the server" }
func (cmd *UnbanCmd) LongHelp() LongHelp {
	return LongHelp{
		About: "This command unbans a given user from the server",
		Usage: "`!unban <user>`",
		Arguments: []Argument{
			{
				Name:     "user",
				Required: true,
				Help:     `Mention the user to unban using the "@" symbol followed by their username`,
			},
		},
		Subcommands: nil,
	}
}

func (cmd *UnbanCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	return sess.GuildBanDelete(msg.GuildID, cmd.UserID)
}

func (cmd *UnbanCmd) Subcommands() map[string]Command {
	return nil
}
