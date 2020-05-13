# URL: http://52.198.245.20/users/sign_in


# ChatーSpace  DB設計


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|e-mail|string|null: false|
|pass|string|null: false|

### Association
- has_many :chats
- has_many :users_groups
- has_many :groups, through: :users_groups


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :chats
- has_many :users_groups
- has_many :users, through: :users_groups


## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
 
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
|body|text||
|image|text||

### Association
- belongs_to :user
- belongs_to :group








