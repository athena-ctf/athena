package commands

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/bwmarrin/discordgo"
)

type PurgeCmd struct {
	Limit int64
}

func (cmd *PurgeCmd) FromArgs(args []string) error {
	if len(args) == 1 {
		var err error
		cmd.Limit, err = strconv.ParseInt(args[0], 10, 32)
		if err != nil {
			return err
		}
		return nil
	}

	return errors.New("invalid args")
}

func (cmd *PurgeCmd) Name() string { return "purge" }
func (cmd *PurgeCmd) Help() string { return "Deletes a specified number of messages in the channel." }
func (cmd *PurgeCmd) LongHelp() LongHelp {
	return LongHelp{
		About: "This command deletes a specified number of messages from the current text channel.",
		Usage: "`!purge <limit>`",
		Arguments: []Argument{
			{
				Name:     "limit",
				Required: true,
				Help:     "An integer specifying the number of messages to delete (up to a maximum limit 100).",
			},
		},
		Subcommands: nil,
	}
}

func (cmd *PurgeCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	messages, err := sess.ChannelMessages(msg.ChannelID, int(cmd.Limit)+1, "", "", "")
	if err != nil {
		return err
	}

	messageIDs := make([]string, len(messages))
	for i, message := range messages {
		messageIDs[i] = message.ID
	}

	err = sess.ChannelMessagesBulkDelete(msg.ChannelID, messageIDs)
	if err != nil {
		return err
	}

	_, err = sess.ChannelMessageSend(msg.ChannelID, fmt.Sprintf("Successfully deleted %d messages", len(messages)-1))
	if err != nil {
		return err
	}

	return nil
}

func (cmd *PurgeCmd) Subcommands() map[string]Command {
	return nil
}
