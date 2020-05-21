package model

type FileFolder struct {
	Id            int64  `json:"file_id,string,omitempty" key:"primary" column:"file_id"`
	FId           int64  `json:"folder_id,string,omitempty" column:"folder_id"`
}

func (filefolder *FileFolder) Table() string {
	return "file_folder"
}


func (filefolder *FileFolder) String() string {
	return Stringify(filefolder)
}
