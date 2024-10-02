package commands

import (
	"errors"
	"fmt"
	"time"

	"github.com/bwmarrin/discordgo"
)

type PingCmd struct {
}

func (cmd *PingCmd) FromArgs(args []string) error {
	if len(args) != 0 {
		return errors.New("invalid args")

	}
	return nil
}

func (cmd *PingCmd) Name() string { return "ping" }
func (cmd *PingCmd) Help() string { return "Replies with pong and latency" }
func (cmd *PingCmd) LongHelp() LongHelp {
	return LongHelp{
		About:       "This command checks the bot's latency (response time)",
		Usage:       "`!ping`",
		Arguments:   nil,
		Subcommands: nil,
	}
}
func (cmd *PingCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	timeStamp := time.Now()
	sess.ChannelMessageSend(msg.ChannelID, "Pong🏓")
	elapsed := time.Since(timeStamp).Milliseconds()
	sess.ChannelMessageSend(
		msg.ChannelID,
		fmt.Sprintf(
			"Latency %dms",
			elapsed,
		),
	)

	return nil
}

func (cmd *PingCmd) Subcommands() map[string]Command {
	return nil
}
