package commands

import (
	"github.com/bwmarrin/discordgo"
)

type Argument struct {
	Name     string
	Required bool
	Help     string
}

type LongHelp struct {
	About, Usage string
	Arguments    []Argument
	Subcommands  []string
}

type Command interface {
	FromArgs(args []string) error
	Name() string
	Help() string
	LongHelp() LongHelp
	Run(sess *discordgo.Session, msg *discordgo.Message) error
	Subcommands() map[string]Command
}

var Commands = make(map[string]Command)
var Prefix string = "!"

func register(cmd Command) {
	Commands[cmd.Name()] = cmd
}

func init() {
	register(&BanCmd{})
	register(&HelpCmd{})
	register(&UnbanCmd{})
	register(&TicketCmd{})
	register(&KickCmd{})
	register(&MuteCmd{})
	register(&UnmuteCmd{})
	register(&PingCmd{})
	register(&NukeCmd{})
	register(&PurgeCmd{})
}
