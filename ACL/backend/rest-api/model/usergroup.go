package model

type UserGroup struct {
	Id            int64  `json:"u_id,string,omitempty" key:"primary" column:"u_id"`
	GId           int64  `json:"g_id,string,omitempty" column:"g_id"`
}

func (usergroup *UserGroup) Table() string {
	return "user_group"
}


func (usergroup *UserGroup) String() string {
	return Stringify(usergroup)
}
