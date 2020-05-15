package model

type User struct {
	Id            int64  `json:"u_id,string,omitempty" key:"primary" column:"u_id"`
	FirstName     string `json:"u_firstname" column:"u_firstname"`
	LastName      string `json:"u_lastname" column:"u_lastname"`
	Password      string `json:"u_password" column:"u_password"`
}

func (user *User) Table() string {
	return "users"
}

func (user *User) String() string {
	return Stringify(user)
}

