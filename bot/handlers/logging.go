package handlers

import (
	"athena.io/bot/config"
	"github.com/bwmarrin/discordgo"
)

const (
	applicationCommandPermissionsUpdateEventType = "APPLICATION_COMMAND_PERMISSIONS_UPDATE"
	autoModerationActionExecutionEventType       = "AUTO_MODERATION_ACTION_EXECUTION"
	autoModerationRuleCreateEventType            = "AUTO_MODERATION_RULE_CREATE"
	autoModerationRuleDeleteEventType            = "AUTO_MODERATION_RULE_DELETE"
	autoModerationRuleUpdateEventType            = "AUTO_MODERATION_RULE_UPDATE"
	channelCreateEventType                       = "CHANNEL_CREATE"
	channelDeleteEventType                       = "CHANNEL_DELETE"
	channelPinsUpdateEventType                   = "CHANNEL_PINS_UPDATE"
	channelUpdateEventType                       = "CHANNEL_UPDATE"
	guildAuditLogEntryCreateEventType            = "GUILD_AUDIT_LOG_ENTRY_CREATE"
	guildBanAddEventType                         = "GUILD_BAN_ADD"
	guildBanRemoveEventType                      = "GUILD_BAN_REMOVE"
	guildCreateEventType                         = "GUILD_CREATE"
	guildDeleteEventType                         = "GUILD_DELETE"
	guildEmojisUpdateEventType                   = "GUILD_EMOJIS_UPDATE"
	guildIntegrationsUpdateEventType             = "GUILD_INTEGRATIONS_UPDATE"
	guildMemberAddEventType                      = "GUILD_MEMBER_ADD"
	guildMemberRemoveEventType                   = "GUILD_MEMBER_REMOVE"
	guildMemberUpdateEventType                   = "GUILD_MEMBER_UPDATE"
	guildMembersChunkEventType                   = "GUILD_MEMBERS_CHUNK"
	guildRoleCreateEventType                     = "GUILD_ROLE_CREATE"
	guildRoleDeleteEventType                     = "GUILD_ROLE_DELETE"
	guildRoleUpdateEventType                     = "GUILD_ROLE_UPDATE"
	guildScheduledEventCreateEventType           = "GUILD_SCHEDULED_EVENT_CREATE"
	guildScheduledEventDeleteEventType           = "GUILD_SCHEDULED_EVENT_DELETE"
	guildScheduledEventUpdateEventType           = "GUILD_SCHEDULED_EVENT_UPDATE"
	guildScheduledEventUserAddEventType          = "GUILD_SCHEDULED_EVENT_USER_ADD"
	guildScheduledEventUserRemoveEventType       = "GUILD_SCHEDULED_EVENT_USER_REMOVE"
	guildUpdateEventType                         = "GUILD_UPDATE"
	interactionCreateEventType                   = "INTERACTION_CREATE"
	inviteCreateEventType                        = "INVITE_CREATE"
	inviteDeleteEventType                        = "INVITE_DELETE"
	messageCreateEventType                       = "MESSAGE_CREATE"
	messageDeleteEventType                       = "MESSAGE_DELETE"
	messageDeleteBulkEventType                   = "MESSAGE_DELETE_BULK"
	messageReactionAddEventType                  = "MESSAGE_REACTION_ADD"
	messageReactionRemoveEventType               = "MESSAGE_REACTION_REMOVE"
	messageReactionRemoveAllEventType            = "MESSAGE_REACTION_REMOVE_ALL"
	messageUpdateEventType                       = "MESSAGE_UPDATE"
	presenceUpdateEventType                      = "PRESENCE_UPDATE"
	presencesReplaceEventType                    = "PRESENCES_REPLACE"
	readyEventType                               = "READY"
	resumedEventType                             = "RESUMED"
	stageInstanceEventCreateEventType            = "STAGE_INSTANCE_EVENT_CREATE"
	stageInstanceEventDeleteEventType            = "STAGE_INSTANCE_EVENT_DELETE"
	stageInstanceEventUpdateEventType            = "STAGE_INSTANCE_EVENT_UPDATE"
	threadCreateEventType                        = "THREAD_CREATE"
	threadDeleteEventType                        = "THREAD_DELETE"
	threadListSyncEventType                      = "THREAD_LIST_SYNC"
	threadMemberUpdateEventType                  = "THREAD_MEMBER_UPDATE"
	threadMembersUpdateEventType                 = "THREAD_MEMBERS_UPDATE"
	threadUpdateEventType                        = "THREAD_UPDATE"
	typingStartEventType                         = "TYPING_START"
	userUpdateEventType                          = "USER_UPDATE"
	voiceServerUpdateEventType                   = "VOICE_SERVER_UPDATE"
	voiceStateUpdateEventType                    = "VOICE_STATE_UPDATE"
	webhooksUpdateEventType                      = "WEBHOOKS_UPDATE"
)

func LoggingHandler(sess *discordgo.Session, ev interface{}) {
	event := ""
	switch v := ev.(type) {
	case *discordgo.ApplicationCommandPermissionsUpdate:
		event = applicationCommandPermissionsUpdateEventType
	case *discordgo.AutoModerationActionExecution:
		event = autoModerationActionExecutionEventType
	case *discordgo.AutoModerationRuleCreate:
		event = autoModerationRuleCreateEventType
	case *discordgo.AutoModerationRuleDelete:
		event = autoModerationRuleDeleteEventType
	case *discordgo.AutoModerationRuleUpdate:
		event = autoModerationRuleUpdateEventType
	case *discordgo.ChannelCreate:
		event = channelCreateEventType
	case *discordgo.ChannelDelete:
		event = channelDeleteEventType
	case *discordgo.ChannelPinsUpdate:
		event = channelPinsUpdateEventType
	case *discordgo.ChannelUpdate:
		event = channelUpdateEventType
	case *discordgo.GuildAuditLogEntryCreate:
		event = guildAuditLogEntryCreateEventType
	case *discordgo.GuildBanAdd:
		event = guildBanAddEventType
	case *discordgo.GuildBanRemove:
		event = guildBanRemoveEventType
	case *discordgo.GuildCreate:
		event = guildCreateEventType
	case *discordgo.GuildDelete:
		event = guildDeleteEventType
	case *discordgo.GuildEmojisUpdate:
		event = guildEmojisUpdateEventType
	case *discordgo.GuildIntegrationsUpdate:
		event = guildIntegrationsUpdateEventType
	case *discordgo.GuildMemberAdd:
		event = guildMemberAddEventType
	case *discordgo.GuildMemberRemove:
		event = guildMemberRemoveEventType
	case *discordgo.GuildMemberUpdate:
		event = guildMemberUpdateEventType
	case *discordgo.GuildMembersChunk:
		event = guildMembersChunkEventType
	case *discordgo.GuildRoleCreate:
		event = guildRoleCreateEventType
	case *discordgo.GuildRoleDelete:
		event = guildRoleDeleteEventType
	case *discordgo.GuildRoleUpdate:
		event = guildRoleUpdateEventType
	case *discordgo.GuildScheduledEventCreate:
		event = guildScheduledEventCreateEventType
	case *discordgo.GuildScheduledEventDelete:
		event = guildScheduledEventDeleteEventType
	case *discordgo.GuildScheduledEventUpdate:
		event = guildScheduledEventUpdateEventType
	case *discordgo.GuildScheduledEventUserAdd:
		event = guildScheduledEventUserAddEventType
	case *discordgo.GuildScheduledEventUserRemove:
		event = guildScheduledEventUserRemoveEventType
	case *discordgo.GuildUpdate:
		event = guildUpdateEventType
	case *discordgo.InteractionCreate:
		event = interactionCreateEventType
	case *discordgo.InviteCreate:
		event = inviteCreateEventType
	case *discordgo.InviteDelete:
		event = inviteDeleteEventType
	case *discordgo.MessageCreate:
		if v.ChannelID == config.DefaultConfig.LogsChannelID {
			return
		}

		event = messageCreateEventType
	case *discordgo.MessageDelete:
		event = messageDeleteEventType
	case *discordgo.MessageDeleteBulk:
		event = messageDeleteBulkEventType
	case *discordgo.MessageReactionAdd:
		event = messageReactionAddEventType
	case *discordgo.MessageReactionRemove:
		event = messageReactionRemoveEventType
	case *discordgo.MessageReactionRemoveAll:
		event = messageReactionRemoveAllEventType
	case *discordgo.MessageUpdate:
		event = messageUpdateEventType
	case *discordgo.PresenceUpdate:
		event = presenceUpdateEventType
	case *discordgo.PresencesReplace:
		event = presencesReplaceEventType
	case *discordgo.Ready:
		event = readyEventType
	case *discordgo.Resumed:
		event = resumedEventType
	case *discordgo.StageInstanceEventCreate:
		event = stageInstanceEventCreateEventType
	case *discordgo.StageInstanceEventDelete:
		event = stageInstanceEventDeleteEventType
	case *discordgo.StageInstanceEventUpdate:
		event = stageInstanceEventUpdateEventType
	case *discordgo.ThreadCreate:
		event = threadCreateEventType
	case *discordgo.ThreadDelete:
		event = threadDeleteEventType
	case *discordgo.ThreadListSync:
		event = threadListSyncEventType
	case *discordgo.ThreadMemberUpdate:
		event = threadMemberUpdateEventType
	case *discordgo.ThreadMembersUpdate:
		event = threadMembersUpdateEventType
	case *discordgo.ThreadUpdate:
		event = threadUpdateEventType
	case *discordgo.TypingStart:
		event = typingStartEventType
	case *discordgo.UserUpdate:
		event = userUpdateEventType
	case *discordgo.VoiceServerUpdate:
		event = voiceServerUpdateEventType
	case *discordgo.VoiceStateUpdate:
		event = voiceStateUpdateEventType
	case *discordgo.WebhooksUpdate:
		event = webhooksUpdateEventType
	default:
		return
	}

	sess.ChannelMessageSend(config.DefaultConfig.LogsChannelID, event)
}
