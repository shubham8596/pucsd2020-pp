package model

type Folder struct {
	Id           int64  `json:"folder_id,string,omitempty" key:"primary" column:"folder_id"`
	FolderName     string `json:"folder_name" column:"folder_name"`
	FolderPath     string `json:"folder_path" column:"folder_path"`

}

func (folder *Folder) Table() string {
	return "folders"
}


func (folder *Folder) String() string {
	return Stringify(folder)
}
