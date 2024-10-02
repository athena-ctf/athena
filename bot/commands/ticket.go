package commands

import (
	"errors"

	"github.com/bwmarrin/discordgo"
)

var ticketSubCommands = map[string]Command{
	"create": &TicketCreateCmd{},
	"close":  &TicketCloseCmd{},
}

type TicketCmd struct {
	Runner func(sess *discordgo.Session, msg *discordgo.Message)
}

func (cmd *TicketCmd) FromArgs(args []string) error {
	if subCmd, ok := ticketSubCommands[args[0]]; ok {
		if err := subCmd.FromArgs(args[1:]); err != nil {
			return err
		}

		cmd.Runner = func(sess *discordgo.Session, msg *discordgo.Message) {
			subCmd.Run(sess, msg)
		}

		return nil
	} else {
		return errors.New("invalid args")
	}
}

func (cmd *TicketCmd) Name() string { return "ticket" }
func (cmd *TicketCmd) Help() string { return "Create or Closes a ticket for user" }
func (cmd *TicketCmd) LongHelp() LongHelp {

	return LongHelp{
		About:       "This command is used for managing tickets",
		Usage:       "`!ticket <subcommand>`",
		Arguments:   nil,
		Subcommands: []string{"create", "close"},
	}
}

func (cmd *TicketCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	if cmd.Runner != nil {
		cmd.Runner(sess, msg)
	}

	cmd.Runner = nil
	return nil
}

func (cmd *TicketCmd) Subcommands() map[string]Command {
	return ticketSubCommands
}
