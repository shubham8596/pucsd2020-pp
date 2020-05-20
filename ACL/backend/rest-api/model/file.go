package model

type File struct {
	Id           int64  `json:"file_id,string,omitempty" key:"primary" column:"file_id"`
	FileName     string `json:"file_name" column:"file_name"`
	FilePath     string `json:"file_path" column:"file_path"`

}

func (file *File) Table() string {
	return "files"
}


func (file *File) String() string {
	return Stringify(file)
}
