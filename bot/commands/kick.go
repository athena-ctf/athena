package commands

import (
	"errors"
	"fmt"
	"strings"

	"github.com/bwmarrin/discordgo"
)

type KickCmd struct {
	UserID string
	Reason string
}

func (cmd *KickCmd) FromArgs(args []string) error {
	if len(args) != 2 {
		return errors.New("invalid args")
	}

	cmd.UserID = args[0][2 : len(args[0])-1]
	cmd.Reason = strings.Join(args[1:], " ")
	return nil
}

func (cmd *KickCmd) Name() string { return "kick" }
func (cmd *KickCmd) Help() string { return "Kick a given user" }
func (cmd *KickCmd) LongHelp() LongHelp {
	return LongHelp{
		About: "This command kicks a user from the server.",
		Usage: "`!kick <user> <reason>`",
		Arguments: []Argument{
			{
				Name:     "user",
				Required: true,
				Help:     `Mention the user to kick using the "@" symbol followed by their username.`,
			},
			{
				Name:     "reason",
				Required: true,
				Help:     `Provide a reason for the kick. The reason will be DM'ed to user.`,
			},
		},
		Subcommands: nil,
	}
}

func (cmd *KickCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	err := sess.GuildMemberDeleteWithReason(msg.GuildID, cmd.UserID, cmd.Reason)
	if err != nil {
		return err
	}

	channel, err := sess.UserChannelCreate(cmd.UserID)
	if err != nil {
		return errors.New("error creating a channel")
	}

	_, err = sess.ChannelMessageSend(
		channel.ID,
		fmt.Sprintf("You have been kicked due to '%s' ",
			cmd.Reason,
		),
	)

	return err
}

func (cmd *KickCmd) Subcommands() map[string]Command {
	return nil
}
