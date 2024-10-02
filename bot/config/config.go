package config

type Config struct {
	WelcomeChannelID      string
	EditorRoleID          string
	ViewerRoleID          string
	ReactionRoleMessageID string
	LogsChannelID         string
	GenralChannelID       string
}

var DefaultConfig = Config{
	WelcomeChannelID:      "1259502522318721057",
	EditorRoleID:          "1262082710449557586",
	ViewerRoleID:          "1262706541576982591",
	ReactionRoleMessageID: "1262079396886614037",
	LogsChannelID:         "1263219743960203418",
	GenralChannelID:       "1260509280247877673",
}
