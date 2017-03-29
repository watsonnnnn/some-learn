# MySQL数据库维护和性能优化

# 1.MySQL数据库维护

## 1.1 通过复制数据文件实现数据备份

    复制数据库在文件磁盘上保存的文本文件,这是最简单的备份操作。
    
    由于数据库系统在服务器运行时期,总是处于打开和使用状态,因此文本文件的副本备份不一定总是有效,为了解决该问题,
    在本分数据库文件时,需要先停止MySQL数据库服务器。
    
    注意: 1. 为了保证备份数据的完整性,在停止数据库服务之前,先要执行 flush tables 语句将所有的数据写入到磁盘中。
         2. 这种备份方法对InnoDB存储引擎的表不合适,只适合存储引擎为MyISAM的表。
         
## 1.2 通过命令mysqldump实现数据备份(是mysql软件提供的命令行工具,不是mysql命令!)

    mysqldump命令工具会将包含数据的表结构和数据内容保存在相应的文本文件。
    具体执行时,首先会检查待备份的数据表结构,在相应的文本文件中生成create语句;然后检查数据内容,生成相应的insert into语句。
    还原数据时,只需要执行其中的create语句和insert into语句。

    使用mysqldump通常会分为3种形式: 备份一个数据库、备份多个数据库、备份所有数据库。
    
    EdgaryjbdeMacBook-Pro:bin Edgar.yjb$ ./mysqldump
    Usage: mysqldump [OPTIONS] database [tables]
    OR     mysqldump [OPTIONS] --databases [OPTIONS] DB1 [DB2 DB3...]
    OR     mysqldump [OPTIONS] --all-databases [OPTIONS]
    For more options, use mysqldump --help
    
#### 1.2.1 备份一个数据库

    mysqldump -u username -p dbname table1 table2 ... tableN > backupname.sql
    如果不指定表名则会备份整个数据库!
    注意: 必须先手工建立备份文件backupname.sql,否则将无法操作成功(Mac下测试)!
    
#### 1.2.2 备份多个数据库

    mysqldump -u username -p --databases dbname_1 dbname_2 ... dbname_n > backupName.sql

#### 1.2.3 备份所有数据库
    
    mysqldump -u username -p --all-databases > backupName.sql
    
## 1.3 通过复制数据文件实现数据还原

    同复制数据文件来备份一样,只适合存储引擎为MyISAM的表,对InnoDB的表不可用。
    并且, 复制数据文件来还原时,备份时的数据库和还原时数据库的主版本号要一致!(主版本号是指数据库版本号从左往右的第一个数字)
    
## 1.4 通过mysql命令来实现数据库还原(命令行工具)

    mysql -u username -p [dbname] < backupName.sql
    
    该命令会自动执行备份文件中的create和insert into语句来重建数据库和数据。
    
## 1.5 将数据库中的表导出为文本文件

通过将数据库中的表进行导出和导入操作,可以轻松的在MySQL数据库服务器和其他数据库服务器(sql server, oracle)之间移动数据。

#### 1.5.1 通过 select ... into outfile 来实现导出到文本文件

    mysql> help select;
    Name: 'SELECT'
    Description:
    Syntax:
    SELECT
        [ALL | DISTINCT | DISTINCTROW ]
          [HIGH_PRIORITY]
          [MAX_STATEMENT_TIME = N]
          [STRAIGHT_JOIN]
          [SQL_SMALL_RESULT] [SQL_BIG_RESULT] [SQL_BUFFER_RESULT]
          [SQL_CACHE | SQL_NO_CACHE] [SQL_CALC_FOUND_ROWS]
        select_expr [, select_expr ...]
        [FROM table_references
          [PARTITION partition_list]
        [WHERE where_condition]
        [GROUP BY {col_name | expr | position}
          [ASC | DESC], ... [WITH ROLLUP]]
        [HAVING where_condition]
        [ORDER BY {col_name | expr | position}
          [ASC | DESC], ...]
        [LIMIT {[offset,] row_count | row_count OFFSET offset}]
        [PROCEDURE procedure_name(argument_list)]
        [INTO OUTFILE 'file_name'
            [CHARACTER SET charset_name]
            export_options
          | INTO DUMPFILE 'file_name'
          | INTO var_name [, var_name]]
        [FOR UPDATE | LOCK IN SHARE MODE]]

#### 1.5.2 使用命令行工具 mysqldump 实现导出到文本文件

    mysqldump -u username -pPassword -T file_directory dbname table_name [option]
    
#### 1.5.3 执行命令 mysql 实现导出到文本文件

    mysql -u username -pPassword -e "select field_name from table_name" dbname > file_name ;
 
## 1.6 将文本文件导入到数据表

#### 1.6.1 通过 LOAD DATA INFILE命令实现

    load data[local] infile file_name into table table_name [option];
    
    mysql> help load data;
    Name: 'LOAD DATA'
    Description:
    Syntax:
    LOAD DATA [LOW_PRIORITY | CONCURRENT] [LOCAL] INFILE 'file_name'
        [REPLACE | IGNORE]
        INTO TABLE tbl_name
        [PARTITION (partition_name,...)]
        [CHARACTER SET charset_name]
        [{FIELDS | COLUMNS}
            [TERMINATED BY 'string']
            [[OPTIONALLY] ENCLOSED BY 'char']
            [ESCAPED BY 'char']
        ]
        [LINES
            [STARTING BY 'string']
            [TERMINATED BY 'string']
        ]
        [IGNORE number {LINES | ROWS}]
        [(col_name_or_user_var,...)]
        [SET col_name = expr,...]
        
#### 1.6.2 使用命令行工具 mysqlimport 导入文本文件

    mysqlimport -u username -pPassword [--local] dbname file_name [option]
    
    EdgaryjbdeMacBook-Pro:bin Edgar.yjb$ ./mysqlimport --help
    ./mysqlimport  Ver 3.7 Distrib 5.7.12, for osx10.11 (x86_64)
    Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.
    
    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.
    
    Loads tables from text files in various formats.  The base name of the
    text file must be the name of the table that should be used.
    If one uses sockets to connect to the MySQL server, the server will open and
    read the text file directly. In other cases the client will open the text
    file. The SQL command 'LOAD DATA INFILE' is used to import the rows.
    
    Usage: ./mysqlimport [OPTIONS] database textfile...
    Default options are read from the following files in the given order:
    /etc/my.cnf /etc/mysql/my.cnf /usr/local/mysql/etc/my.cnf ~/.my.cnf
    The following groups are read: mysqlimport client
    ...
     
## 1.7 数据库迁移

    从一个数据库迁移到另一个数据库时,一般是先备份,再在另一个数据库服务器恢复。
    具体使用上述的知识,此处不再赘述。
    