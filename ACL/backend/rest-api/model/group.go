package model

type Group struct {
	Id            int64  `json:"g_id,string,omitempty" key:"primary" column:"g_id"`
	FirstName     string `json:"g_name" column:"g_name"`
}

func (group *Group) Table() string {
	return "groups"
}


func (group *Group) String() string {
	return Stringify(group)
}
