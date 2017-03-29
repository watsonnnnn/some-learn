# MySQL安全机制

# 1. MySQL所提供的权限

## 1.1 系统表mysql.user

    该表中主要包含了
    用户字段(Host/User/Password三个字段在用户登录数据库时使用,匹配是否为合法用户)、
    权限字段(以_priv结束的字段)、
    安全字段(ssl_type/ssl_cipher/x509_issuer/x509_subject)、
    资源控制字段(max_questions/max_updates/max_connections/max_user_connections)。

通过desc命令查看该表的结构如下:

    mysql> desc user;
    +------------------------+-----------------------------------+------+-----+-----------------------+-------+
    | Field                  | Type                              | Null | Key | Default               | Extra |
    +------------------------+-----------------------------------+------+-----+-----------------------+-------+
    | Host                   | char(60)                          | NO   | PRI |                       |       |
    | User                   | char(32)                          | NO   | PRI |                       |       |
    | Select_priv            | enum('N','Y')                     | NO   |     | N                     |       |
    | Insert_priv            | enum('N','Y')                     | NO   |     | N                     |       |
    | Update_priv            | enum('N','Y')                     | NO   |     | N                     |       |
    | Delete_priv            | enum('N','Y')                     | NO   |     | N                     |       |
    | Create_priv            | enum('N','Y')                     | NO   |     | N                     |       |
    | Drop_priv              | enum('N','Y')                     | NO   |     | N                     |       |
    | Reload_priv            | enum('N','Y')                     | NO   |     | N                     |       |
    | Shutdown_priv          | enum('N','Y')                     | NO   |     | N                     |       |
    | Process_priv           | enum('N','Y')                     | NO   |     | N                     |       |
    | File_priv              | enum('N','Y')                     | NO   |     | N                     |       |
    | Grant_priv             | enum('N','Y')                     | NO   |     | N                     |       |
    | References_priv        | enum('N','Y')                     | NO   |     | N                     |       |
    | Index_priv             | enum('N','Y')                     | NO   |     | N                     |       |
    | Alter_priv             | enum('N','Y')                     | NO   |     | N                     |       |
    | Show_db_priv           | enum('N','Y')                     | NO   |     | N                     |       |
    | Super_priv             | enum('N','Y')                     | NO   |     | N                     |       |
    | Create_tmp_table_priv  | enum('N','Y')                     | NO   |     | N                     |       |
    | Lock_tables_priv       | enum('N','Y')                     | NO   |     | N                     |       |
    | Execute_priv           | enum('N','Y')                     | NO   |     | N                     |       |
    | Repl_slave_priv        | enum('N','Y')                     | NO   |     | N                     |       |
    | Repl_client_priv       | enum('N','Y')                     | NO   |     | N                     |       |
    | Create_view_priv       | enum('N','Y')                     | NO   |     | N                     |       |
    | Show_view_priv         | enum('N','Y')                     | NO   |     | N                     |       |
    | Create_routine_priv    | enum('N','Y')                     | NO   |     | N                     |       |
    | Alter_routine_priv     | enum('N','Y')                     | NO   |     | N                     |       |
    | Create_user_priv       | enum('N','Y')                     | NO   |     | N                     |       |
    | Event_priv             | enum('N','Y')                     | NO   |     | N                     |       |
    | Trigger_priv           | enum('N','Y')                     | NO   |     | N                     |       |
    | Create_tablespace_priv | enum('N','Y')                     | NO   |     | N                     |       |
    | ssl_type               | enum('','ANY','X509','SPECIFIED') | NO   |     |                       |       |
    | ssl_cipher             | blob                              | NO   |     | NULL                  |       |
    | x509_issuer            | blob                              | NO   |     | NULL                  |       |
    | x509_subject           | blob                              | NO   |     | NULL                  |       |
    | max_questions          | int(11) unsigned                  | NO   |     | 0                     |       |
    | max_updates            | int(11) unsigned                  | NO   |     | 0                     |       |
    | max_connections        | int(11) unsigned                  | NO   |     | 0                     |       |
    | max_user_connections   | int(11) unsigned                  | NO   |     | 0                     |       |
    | plugin                 | char(64)                          | NO   |     | mysql_native_password |       |
    | authentication_string  | text                              | YES  |     | NULL                  |       |
    | password_expired       | enum('N','Y')                     | NO   |     | N                     |       |
    | password_last_changed  | timestamp                         | YES  |     | NULL                  |       |
    | password_lifetime      | smallint(5) unsigned              | YES  |     | NULL                  |       |
    | account_locked         | enum('N','Y')                     | NO   |     | N                     |       |
    +------------------------+-----------------------------------+------+-----+-----------------------+-------+
    45 rows in set (0.00 sec)

## 1.2 系统表mysql.db

该表存储了某个用户对相关数据库的权限。在查找某个用户的具体权限时用到该表。

    mysql> desc db;
    +-----------------------+---------------+------+-----+---------+-------+
    | Field                 | Type          | Null | Key | Default | Extra |
    +-----------------------+---------------+------+-----+---------+-------+
    | Host                  | char(60)      | NO   | PRI |         |       |
    | Db                    | char(64)      | NO   | PRI |         |       |
    | User                  | char(32)      | NO   | PRI |         |       |
    | Select_priv           | enum('N','Y') | NO   |     | N       |       |
    | Insert_priv           | enum('N','Y') | NO   |     | N       |       |
    | Update_priv           | enum('N','Y') | NO   |     | N       |       |
    | Delete_priv           | enum('N','Y') | NO   |     | N       |       |
    | Create_priv           | enum('N','Y') | NO   |     | N       |       |
    | Drop_priv             | enum('N','Y') | NO   |     | N       |       |
    | Grant_priv            | enum('N','Y') | NO   |     | N       |       |
    | References_priv       | enum('N','Y') | NO   |     | N       |       |
    | Index_priv            | enum('N','Y') | NO   |     | N       |       |
    | Alter_priv            | enum('N','Y') | NO   |     | N       |       |
    | Create_tmp_table_priv | enum('N','Y') | NO   |     | N       |       |
    | Lock_tables_priv      | enum('N','Y') | NO   |     | N       |       |
    | Create_view_priv      | enum('N','Y') | NO   |     | N       |       |
    | Show_view_priv        | enum('N','Y') | NO   |     | N       |       |
    | Create_routine_priv   | enum('N','Y') | NO   |     | N       |       |
    | Alter_routine_priv    | enum('N','Y') | NO   |     | N       |       |
    | Execute_priv          | enum('N','Y') | NO   |     | N       |       |
    | Event_priv            | enum('N','Y') | NO   |     | N       |       |
    | Trigger_priv          | enum('N','Y') | NO   |     | N       |       |
    +-----------------------+---------------+------+-----+---------+-------+
    22 rows in set (0.00 sec)
    
    mysql> select * from db \G;
    *************************** 1. row ***************************
                     Host: localhost
                       Db: sys
                     User: mysql.sys
              Select_priv: N
              Insert_priv: N
              Update_priv: N
              Delete_priv: N
              Create_priv: N
                Drop_priv: N
               Grant_priv: N
          References_priv: N
               Index_priv: N
               Alter_priv: N
    Create_tmp_table_priv: N
         Lock_tables_priv: N
         Create_view_priv: N
           Show_view_priv: N
      Create_routine_priv: N
       Alter_routine_priv: N
             Execute_priv: N
               Event_priv: N
             Trigger_priv: Y
    1 row in set (0.00 sec)
    
## 1.3 其他权限表(tables_priv用来对单个表设置权限, columns_priv用来对单个字段设置权限, procs_priv用来对procedure和function设置权限) 

    mysql> select * from tables_priv \G
    *************************** 1. row ***************************
           Host: localhost
             Db: sys
           User: mysql.sys
     Table_name: sys_config
        Grantor: root@localhost
      Timestamp: 2016-04-27 09:10:33
     Table_priv: Select
    Column_priv: 
    1 row in set (0.00 sec)
    
    mysql> desc columns_priv;
    +-------------+----------------------------------------------+------+-----+-------------------+-----------------------------+
    | Field       | Type                                         | Null | Key | Default           | Extra                       |
    +-------------+----------------------------------------------+------+-----+-------------------+-----------------------------+
    | Host        | char(60)                                     | NO   | PRI |                   |                             |
    | Db          | char(64)                                     | NO   | PRI |                   |                             |
    | User        | char(32)                                     | NO   | PRI |                   |                             |
    | Table_name  | char(64)                                     | NO   | PRI |                   |                             |
    | Column_name | char(64)                                     | NO   | PRI |                   |                             |
    | Timestamp   | timestamp                                    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
    | Column_priv | set('Select','Insert','Update','References') | NO   |     |                   |                             |
    +-------------+----------------------------------------------+------+-----+-------------------+-----------------------------+
    7 rows in set (0.00 sec)
    
    mysql> desc procs_priv;
    +--------------+----------------------------------------+------+-----+-------------------+-----------------------------+
    | Field        | Type                                   | Null | Key | Default           | Extra                       |
    +--------------+----------------------------------------+------+-----+-------------------+-----------------------------+
    | Host         | char(60)                               | NO   | PRI |                   |                             |
    | Db           | char(64)                               | NO   | PRI |                   |                             |
    | User         | char(32)                               | NO   | PRI |                   |                             |
    | Routine_name | char(64)                               | NO   | PRI |                   |                             |
    | Routine_type | enum('FUNCTION','PROCEDURE')           | NO   | PRI | NULL              |                             |
    | Grantor      | char(77)                               | NO   | MUL |                   |                             |
    | Proc_priv    | set('Execute','Alter Routine','Grant') | NO   |     |                   |                             |
    | Timestamp    | timestamp                              | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
    +--------------+----------------------------------------+------+-----+-------------------+-----------------------------+
    8 rows in set (0.00 sec)

# 2. MySQL所提供的用户机制

用户管理机制主要包括了登录和退出MySQL服务器、创建用户、删除用户、修改用户密码和为用户赋予权限等内容。

## 2.1 登录和退出MySQL服务器

登录数据库的完整命令:

    mysql [-h hostname|hostIP -p port] -u username -p [DatabaseName] [-e 'sql语句']
    
    其中:
    DatabaseName指定了登录到哪一个数据库
    -e 'sql语句': 指定了登录后要执行的sql语句
    
退出数据库登录:

    exit | quit | \q
    
## 2.2 创建普通用户

### 2.2.1 使用create user命令创建用户

在日常使用中,应该避免使用超级用户root来登录数据库进行操作,而是应该创建一些普通用户来进行数据库操作。
添加的用户可以在`mysql.user`表中查看到。

语法:

    create user 'userName' [identified by 'password']
    [,'userName' [identified by 'password']]
    ...

查看系统帮助:

    mysql> help create user;
    Name: 'CREATE USER'
    Description:
    Syntax:
    CREATE USER syntax for MySQL 5.7.6 and higher:
    Example 1: Create an account that uses the default authentication
    plugin and the given password. Mark the password expired so that the
    user must choose a new one at the first connection to the server:
    
    CREATE USER 'jeffrey'@'localhost'
      IDENTIFIED BY 'new_password' PASSWORD EXPIRE;
    
    Example 2: Create an account that uses the sha256_password
    authentication plugin and the given password. Require that a new
    password be chosen every 180 days:
    
    CREATE USER 'jeffrey'@'localhost'
      IDENTIFIED WITH sha256_password BY 'new_password'
      PASSWORD EXPIRE INTERVAL 180 DAY;
      
### 2.2.2 使用insert语句来创建用户

    insert into mysql.user(Host,User,authentication_string,ssl_cipher,x509_issuer,x509_subject) 
    values('hostname','username',PASSWORD('password'),'','','');
    flush privileges;     //使用insert语句创建用户后必须调用词句使之生效,否则无法登录
    
    注意:
    1. 在具体实现创建账号时,由于mysql.user中的ssl_cipher,x509_issuer,x509_subject字段没有默认值,故需要手工指定。
    否则会报错(可以根据错误提示修改)。
    2. 密码需要调用PASSWORD函数进行加密。
    3. 使用insert语句创建用户后必须调用flush privileges命令使之生效,否则无法登录
    
    例子:
    insert into user(Host,User,authentication_string,ssl_cipher,x509_issuer,x509_subject) 
    values('%','test1',password('test1'),'','','');
    flush privileges; 
    
### 2.2.3 使用grant语句创建用户

    使用create user和insert语句都能创建新用户,但是不能为新创建的用户赋予权限。
    使用grant语句,不仅可以创建用户,还可以在创建的同时赋予权限。

语法:

    grant priv_type on database.tableName 
        to username identified by 'password'
            [,username identified by 'password']
            ...

例子:

    grant select on college_proj.user 
        to 'test2' identified by 'test2';
        
## 2.3 利用超级用户root修改账户密码

### 2.3.1 使用命令行工具mysqladmin修改root的用户密码

注意: mysqladmin是命令行命令,而不是mysql命令!新密码需要用双引号括起来!末尾不能有分号!修改时需要确认旧密码!

    1. cd /usr/local/mysql/bin/
    2. ./mysqladmin -u root -p password "root"
    Enter password: 

### 2.3.2 使用set命令修改root用户密码

当使用root账户登录到系统后,可以通过set命令修改root账户密码。

    set password=PASSWORD('new_password');
    
### 2.3.3 更新系统表mysql.user来修改root密码

    update mysql.user 
        set authentication_string = PASSWORD('new_password') 
        where User='root';
    flush privileges;    //使修改生效!!!
    
## 2.4 利用超级账户root修改普通账户密码

### 2.4.1 通过grant命令修改

    grant priv_type on database.table_name
        to user identified by 'new_password';
        
### 2.4.2 通过set命令修改

    1. 使用root账户来修改普通用户密码
    SET password FOR
        'username'@'hostname' = PASSWORD('new_password');
        
    2. 普通用户自己登录使用set命令修改自己的密码
    set password = PASSWORD('new_password');
        
### 2.4.3 更新系统表mysql.user中的数据

     update mysql.user 
            set authentication_string = PASSWORD('new_password') 
            where User='username';
    flush privileges;    //使修改生效!!!

## 2.5 删除普通用户

### 2.5.1 使用drop user命令删除

    drop user user1[ ,user2, user3, ....]
    
### 2.5.2 从系统表mysql.user中删除记录
    
    delete from mysql.user where User='username';

# 3. 权限管理

## 3.1 对用户授权

    mysql> help grant;
    Name: 'GRANT'
    Description:
    Syntax:
    GRANT
        priv_type [(column_list)]
          [, priv_type [(column_list)]] ...
        ON [object_type] priv_level
        TO user_specification [, user_specification] ...
        [REQUIRE {NONE | tsl_option [[AND] tsl_option] ...}]
        [WITH {GRANT OPTION | resource_option} ...]
    
    GRANT PROXY ON user_specification
        TO user_specification [, user_specification] ...
        [WITH GRANT OPTION]
    
    object_type: {
        TABLE
      | FUNCTION
      | PROCEDURE
    }
    
    priv_level: {
        *
      | *.*
      | db_name.*
      | db_name.tbl_name
      | tbl_name
      | db_name.routine_name
    }
    
    user_specification:
        user [ auth_option ]
    
    auth_option: {     # Before MySQL 5.7.6
        IDENTIFIED BY 'auth_string'
      | IDENTIFIED BY PASSWORD 'hash_string'
      | IDENTIFIED WITH auth_plugin
      | IDENTIFIED WITH auth_plugin AS 'hash_string'
    }
    
    auth_option: {     # As of MySQL 5.7.6
        IDENTIFIED BY 'auth_string'
      | IDENTIFIED BY PASSWORD 'hash_string'
      | IDENTIFIED WITH auth_plugin
      | IDENTIFIED WITH auth_plugin BY 'auth_string'
      | IDENTIFIED WITH auth_plugin AS 'hash_string'
    }
    
    tsl_option: {
        SSL
      | X509
      | CIPHER 'cipher'
      | ISSUER 'issuer'
      | SUBJECT 'subject'
    }
    
    resource_option: {
      | MAX_QUERIES_PER_HOUR count
      | MAX_UPDATES_PER_HOUR count
      | MAX_CONNECTIONS_PER_HOUR count
      | MAX_USER_CONNECTIONS count
    }
    
    The GRANT statement grants privileges to MySQL user accounts.
    
例子:

    grant select, create, drop on *.* to 'test1'@'localhost';

## 3.2 查看用户权限(show grants)
语法:

    show grants for 'username';
    
例子:

    mysql> show grants for 'yijianbo';
    +--------------------------------------------------------------------------+
    | Grants for yijianbo@%                                                    |
    +--------------------------------------------------------------------------+
    | GRANT USAGE ON *.* TO 'yijianbo'@'%'                                     |
    | GRANT SELECT, INSERT, CREATE, DROP ON `college_proj`.* TO 'yijianbo'@'%' |
    +--------------------------------------------------------------------------+
    2 rows in set (0.00 sec)

## 3.3 收回用户权限(revoke)

    mysql> help revoke;
    Name: 'REVOKE'
    Description:
    Syntax:
    REVOKE
        priv_type [(column_list)]
          [, priv_type [(column_list)]] ...
        ON [object_type] priv_level
        FROM user [, user] ...
    
    REVOKE ALL PRIVILEGES, GRANT OPTION
        FROM user [, user] ...
    
    REVOKE PROXY ON user
        FROM user [, user] ...
    
    The REVOKE statement enables system administrators to revoke privileges
    from MySQL accounts.