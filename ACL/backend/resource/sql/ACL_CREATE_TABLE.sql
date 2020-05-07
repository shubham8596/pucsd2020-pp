
DROP DATABASE IF EXISTS ACL;

CREATE DATABASE IF NOT EXISTS ACL;

USE ACL;

CREATE TABLE IF NOT EXISTS users(
    	u_id             	INT         	PRIMARY KEY,
    	u_firstname          	VARCHAR(30)    	NOT NULL,
    	u_lastname           	VARCHAR(30)    	NOT NULL,
    	u_password            	VARBINARY(128)  NOT NULL,
    	u_creation_date       	DATETIME    	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS groups(
    	g_id            	INT         	PRIMARY KEY,
    	g_name          	VARCHAR(30)    	NOT NULL,            
    	g_creation_date       	DATETIME    	DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS files(
    	file_id             	INT         	PRIMARY KEY,
    	file_name           	VARCHAR(30)    	NOT NULL,
    	file_path           	VARCHAR(80)   	NOT NULL 
);


CREATE TABLE IF NOT EXISTS folders(
    	folder_id             	INT         	PRIMARY KEY,
    	folder_name           	VARCHAR(80)   	NOT NULL,
    	folder_path           	VARCHAR(80)   	NOT NULL
);


CREATE TABLE IF NOT EXISTS permissions (
    	p_id       		INT         	PRIMARY KEY,
    	p_type     		VARCHAR(20)    	NOT NULL
);


CREATE TABLE IF NOT EXISTS user_group (
    	u_id             	INT,
    	g_id            	INT,
    	PRIMARY KEY(u_id,g_id),
    	FOREIGN KEY(u_id) REFERENCES users(u_id),
    	FOREIGN KEY(g_id) REFERENCES groups(g_id)
);


CREATE TABLE IF NOT EXISTS file_folder (
	file_id             	INT,  
	folder_id           	INT,
        PRIMARY KEY(folder_id,file_id),	
    	FOREIGN KEY(file_id) 	REFERENCES 	files(file_id),
    	FOREIGN KEY(folder_id) 	REFERENCES 	folders(folder_id)
);


CREATE TABLE IF NOT EXISTS file_permission(
	u_id       		INT,
    	file_id    		INT,
	p_id       		INT,
	PRIMARY KEY(u_id,file_id),
	FOREIGN KEY(u_id) 	REFERENCES 	users(u_id),
	FOREIGN KEY(file_id) 	REFERENCES 	files(file_id),
	FOREIGN KEY(p_id) 	REFERENCES 	permissions(p_id)
);


CREATE TABLE IF NOT EXISTS folder_permission(
    	u_id       		INT,
    	folder_id  		INT,
    	p_id       		INT,
    	PRIMARY KEY(u_id,folder_id),
    	FOREIGN KEY(u_id) 	REFERENCES 	users(u_id),
    	FOREIGN KEY(folder_id) 	REFERENCES 	folders(folder_id),
    	FOREIGN KEY(p_id) 	REFERENCES 	permissions(p_id)
);

