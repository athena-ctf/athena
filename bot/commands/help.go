package commands

import (
	"errors"
	"fmt"

	"github.com/bwmarrin/discordgo"
)

type HelpCmd struct {
	args []string
}

func (cmd *HelpCmd) FromArgs(args []string) error {
	cmd.args = args
	return nil
}

func (cmd *HelpCmd) Name() string { return "help" }
func (cmd *HelpCmd) Help() string { return "Displays command usage details." }
func (cmd *HelpCmd) LongHelp() LongHelp {
	return LongHelp{
		About:       "Provides detailed information on how to use the available commands.",
		Usage:       "`!help [...commands]`",
		Arguments:   nil,
		Subcommands: nil,
	}
}
func (cmd *HelpCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	if len(cmd.args) == 0 {
		embed := &discordgo.MessageEmbed{
			Title:       "Available Commands:",
			Description: "Here's a list of available commands:",
			Color:       0x00FFFF,
		}
		for k, v := range Commands {
			field := &discordgo.MessageEmbedField{
				Name:  k,
				Value: v.Help(),
			}
			embed.Fields = append(embed.Fields, field)
		}

		_, err := sess.ChannelMessageSendEmbed(msg.ChannelID, embed)
		return err
	} else {
		currCmd, ok := Commands[cmd.args[0]]
		if !ok {
			return errors.New("invalid args")
		}

		for i := 1; i < len(cmd.args); i++ {
			if subCmds := currCmd.Subcommands(); subCmds != nil {
				if currCmd, ok = subCmds[cmd.args[i]]; !ok {
					return errors.New("invalid subcommand")
				}
			} else {
				return errors.New("invalid subcommand")
			}
		}

		longHelp := currCmd.LongHelp()
		fields := []*discordgo.MessageEmbedField{
			{
				Name:  "About",
				Value: longHelp.About,
			},
			{
				Name:  "Usage",
				Value: longHelp.Usage,
			},
		}

		if longHelp.Arguments != nil {
			argumentDescriptions := ""
			for _, arg := range longHelp.Arguments {
				description := fmt.Sprintf("* `%s` (Required): %s\n", arg.Name, arg.Help)
				argumentDescriptions += description
			}
			fields = append(fields, &discordgo.MessageEmbedField{
				Name:  "Arguments",
				Value: argumentDescriptions,
			})
		}

		if longHelp.Subcommands != nil && len(longHelp.Subcommands) > 0 {
			subcommands := ""
			for _, subcommand := range longHelp.Subcommands {
				command := fmt.Sprintf("* `%s`\n", subcommand)
				subcommands += command
			}
			fields = append(fields, &discordgo.MessageEmbedField{
				Name:  "Subcommand",
				Value: subcommands,
			})
		}

		embed := &discordgo.MessageEmbed{
			Title:       currCmd.Name(),
			Description: currCmd.Help(),
			Fields:      fields,
		}
		_, err := sess.ChannelMessageSendEmbed(msg.ChannelID, embed)
		return err
	}
}

func (cmd *HelpCmd) Subcommands() map[string]Command {
	return nil
}
