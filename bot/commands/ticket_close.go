package commands

import (
	"errors"
	"strings"

	"github.com/bwmarrin/discordgo"
)

type TicketCloseCmd struct {
}

func (cmd *TicketCloseCmd) FromArgs(args []string) error {
	return nil
}

func (cmd *TicketCloseCmd) Name() string { return "ticket:close" }
func (cmd *TicketCloseCmd) Help() string {
	return "Closes the ticket."
}
func (cmd *TicketCloseCmd) LongHelp() LongHelp {
	return LongHelp{
		About:       "This command is used for closing tickets",
		Usage:       "`!ticket close`",
		Arguments:   nil,
		Subcommands: nil,
	}
}

func (cmd *TicketCloseCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	channel, err := sess.Channel(msg.ChannelID)
	if err != nil {
		return errors.New("unable to find the channel")
	}

	if strings.HasPrefix(channel.Name, "ticket-") {

		_, err := sess.ChannelDelete(msg.ChannelID)
		return err
	}

	return nil
}

func (cmd *TicketCloseCmd) Subcommands() map[string]Command {
	return nil
}
