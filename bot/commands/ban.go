package commands

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/bwmarrin/discordgo"
)

type BanCmd struct {
	UserID string
	Days   int
	Reason string
}

func (cmd *BanCmd) FromArgs(args []string) error {
	if len(args) != 3 {
		return errors.New("invalid args")
	}

	cmd.UserID = args[0][2 : len(args[0])-1]
	days, err := strconv.ParseInt(args[1], 10, 32)
	if err != nil {
		return err
	}

	cmd.Days = int(days)
	cmd.Reason = strings.Join(args[2:], " ")
	return nil
}

func (cmd *BanCmd) Name() string { return "ban" }
func (cmd *BanCmd) Help() string { return "Ban a given User" }
func (cmd *BanCmd) LongHelp() LongHelp {
	return LongHelp{
		About: "This command bans a given user for specific days from the server.",
		Usage: "`!ban <user> <days> <reason>`",
		Arguments: []Argument{
			{
				Name:     "user",
				Required: true,
				Help:     `Mention the user to ban using the "@" symbol followed by their username.`,
			},
			{
				Name:     "days",
				Required: true,
				Help:     `Specify the duration of the ban in days. If omitted, the ban will be permanent.`,
			},
			{
				Name:     "reason",
				Required: true,
				Help:     `Provide a reason for the ban. The reason will be DM'ed to user.`,
			},
		},
		Subcommands: nil,
	}
}

func (cmd *BanCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {

	err := sess.GuildBanCreateWithReason(msg.GuildID, cmd.UserID, cmd.Reason, cmd.Days)
	if err != nil {
		return err
	}

	channel, err := sess.UserChannelCreate(cmd.UserID)
	if err != nil {
		return err
	}

	_, err = sess.ChannelMessageSend(
		channel.ID,
		fmt.Sprintf(
			"You have been banned due to '%s'. The duration is %d days.",
			cmd.Reason,
			cmd.Days,
		),
	)

	return err
}

func (cmd *BanCmd) Subcommands() map[string]Command {
	return nil
}
