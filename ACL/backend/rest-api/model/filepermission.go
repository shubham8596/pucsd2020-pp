package model

type FilePermission struct {
	Id            int64  `json:"u_id,string,omitempty" key:"primary" column:"u_id"`
	FId           int64  `json:"file_id,string,omitempty" column:"file_id"`
	PType         string `json:"p_type" column:"p_type"`
}

func (filepermission *FilePermission) Table() string {
	return "file_permission"
}


func (filepermission *FilePermission) String() string {
	return Stringify(filepermission)
}
