A rust axum, tokio and sea_orm server which watches for database changes, updates player score in redis using fred and also handles sse notifications. It should watch for

-   Challenge insert, delete, update (watch for points, title and tags change only) and notify using sse
-   Achievement insert, delete, update (per user) watch for changes, update scores and notify user
-   Ban insert (notify player that he/she is banned)
-   Hint update, delete (update score if changed in update or remove points if deleted).
-   Submission create, delete (change user score). It is a many to many intermediate table between player and challenge
-   Unlock create, delete (change user score). It is a many to many intermediate between player and hint

Sea ORM entities are present in a `entity` crate in the workspace. To send a new notification to user, first create one in the database notification table. Create one using `Notification::new(title: String, content: String, player_id: Option<Uuid>)`. A Notification may be a broadcast or individual based on player_id.

A tokio task is run continuosly which listens to events and sends using `tokio::mpsc` to a channel which then sends the sse notification

The schemas of the concerned tables are:

```rs
// achievement
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub value: String,
    pub prize: i32,
    pub challenge_id: Uuid,
    pub player_id: Uuid,
}
```

```rs
// ban
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub reason: String,
    pub duration: i32,
}
```

```rs
// challenge
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub title: String,
    pub description: String,
    pub points: i32,
    pub level: i32,
    pub challenge_type: ChallengeTypeEnum,
    pub author_name: String,
    pub solves: i32,
}

```

```rs
// hint
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub description: String,
    pub cost: i32,
    pub challenge_id: Uuid,
}
```

```rs
// notification
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub title: String,
    pub content: String,
    pub player_id: Option<Uuid>,
}

```

```rs
// player
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub team_id: Uuid,
    pub ban_id: Option<Uuid>,
    #[sea_orm(unique)]
    pub discord_id: Option<String>,
    #[sea_orm(unique)]
    pub user_id: Uuid,
    pub score: i32,
}

```

```rs
// submission
pub struct Model {
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub is_correct: bool, // Add score on create or update only if this is true
    #[sea_orm(primary_key, auto_increment = false)]
    pub player_id: Uuid,
    #[sea_orm(primary_key, auto_increment = false)]
    pub challenge_id: Uuid,
    pub flags: Vec<String>, // On multiple attempts, the flags get appended to this field
}

```

```rs
// unlock
pub struct Model {
    pub created_at: DateTime,
    pub updated_at: DateTime,
    #[sea_orm(primary_key, auto_increment = false)]
    pub player_id: Uuid,
    #[sea_orm(primary_key, auto_increment = false)]
    pub hint_id: Uuid,
}
```
