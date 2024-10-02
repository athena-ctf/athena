package commands

import (
	"errors"

	"github.com/bwmarrin/discordgo"
)

type UnmuteCmd struct {
	UserID string
}

func (cmd *UnmuteCmd) FromArgs(args []string) error {
	if len(args) == 1 {
		cmd.UserID = args[0][2 : len(args[0])-1]
		return nil
	}

	return errors.New("invalid args")
}

func (cmd *UnmuteCmd) Name() string { return "unmute" }
func (cmd *UnmuteCmd) Help() string { return "Unmute a given user" }
func (cmd *UnmuteCmd) LongHelp() LongHelp {
	return LongHelp{
		About: "This command unmutes a user on the server",
		Usage: "`!unmute <user>`",
		Arguments: []Argument{
			{
				Name:     "user",
				Required: true,
				Help:     `Mention the user to unmute using the "@" symbol followed by their username(User must be connected to a voice channel)`,
			},
		},
		Subcommands: nil,
	}
}

func (cmd *UnmuteCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	return sess.GuildMemberMute(msg.GuildID, cmd.UserID, false)
}

func (cmd *UnmuteCmd) Subcommands() map[string]Command {
	return nil
}
