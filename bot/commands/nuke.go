package commands

import (
	"errors"

	"github.com/bwmarrin/discordgo"
)

type NukeCmd struct{}

func (cmd *NukeCmd) FromArgs(args []string) error {
	if len(args) != 0 {
		return errors.New("invalid args")
	}

	return nil
}

func (cmd *NukeCmd) Name() string { return "nuke" }

func (cmd *NukeCmd) Help() string {
	return "Delete the channel and make a new channel same as exsisting one."
}

func (cmd *NukeCmd) LongHelp() LongHelp {
	return LongHelp{
		About:       "This command permanently deletes the current channel and creates a new one with the same name and permission.",
		Usage:       "`!nuke`",
		Arguments:   nil,
		Subcommands: nil,
	}
}

func (cmd *NukeCmd) Run(sess *discordgo.Session, msg *discordgo.Message) error {
	channel, err := sess.Channel(msg.ChannelID)
	if err != nil {
		return err
	}

	_, err = sess.ChannelDelete(channel.ID)
	if err != nil {
		return err
	}

	newChannel := discordgo.GuildChannelCreateData{
		Name:                 channel.Name,
		Type:                 channel.Type,
		Topic:                channel.Topic,
		Bitrate:              channel.Bitrate,
		UserLimit:            channel.UserLimit,
		RateLimitPerUser:     channel.RateLimitPerUser,
		Position:             channel.Position,
		PermissionOverwrites: channel.PermissionOverwrites,
		ParentID:             channel.ParentID,
		NSFW:                 channel.NSFW,
	}

	_, err = sess.GuildChannelCreateComplex(msg.GuildID, newChannel)
	if err != nil {
		return err
	}

	return nil
}

func (cmd *NukeCmd) Subcommands() map[string]Command {
	return nil
}
