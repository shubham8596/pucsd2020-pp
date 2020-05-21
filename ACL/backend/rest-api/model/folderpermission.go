package model

type FolderPermission struct {
	Id            int64  `json:"u_id,string,omitempty" key:"primary" column:"u_id"`
	FId           int64  `json:"folder_id,string,omitempty" column:"folder_id"`
	PType         string `json:"p_type" column:"p_type"`
}

func (folderpermission *FolderPermission) Table() string {
	return "folder_permission"
}


func (folderpermission *FolderPermission) String() string {
	return Stringify(folderpermission)
}
