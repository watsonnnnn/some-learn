# 存储引擎和数据类型

## 1. 查看MySQL所支持的存储引擎 (show engines)

`注: 执行sql语句时,可以使用";"、"\g"、"\G"来表示语句结束,其中,前两个效果一样,
而\G除了显示结果,还能美化显示效果!(其他语句中都能使用)`

    查看存储引擎详情: show engines \G
    
    show engines \G
    *************************** 1. row ***************************
          Engine: InnoDB
         Support: DEFAULT
         Comment: Supports transactions, row-level locking, and foreign keys
    Transactions: YES
              XA: YES
      Savepoints: YES
    *************************** 2. row ***************************
          Engine: MRG_MYISAM
         Support: YES
         Comment: Collection of identical MyISAM tables
    Transactions: NO
              XA: NO
      Savepoints: NO
    *************************** 3. row ***************************
          Engine: MEMORY
         Support: YES
         Comment: Hash based, stored in memory, useful for temporary tables
    Transactions: NO
              XA: NO
      Savepoints: NO
    *************************** 4. row ***************************
          Engine: BLACKHOLE
         Support: YES
         Comment: /dev/null storage engine (anything you write to it disappears)
    Transactions: NO
              XA: NO
      Savepoints: NO
    *************************** 5. row ***************************
          Engine: MyISAM
         Support: YES
         Comment: MyISAM storage engine
    Transactions: NO
              XA: NO
      Savepoints: NO
    *************************** 6. row ***************************
          Engine: CSV
         Support: YES
         Comment: CSV storage engine
    Transactions: NO
              XA: NO
      Savepoints: NO
    *************************** 7. row ***************************
          Engine: ARCHIVE
         Support: YES
         Comment: Archive storage engine
    Transactions: NO
              XA: NO
      Savepoints: NO
    *************************** 8. row ***************************
          Engine: PERFORMANCE_SCHEMA
         Support: YES
         Comment: Performance Schema
    Transactions: NO
              XA: NO
      Savepoints: NO
    *************************** 9. row ***************************
          Engine: FEDERATED
         Support: NO
         Comment: Federated MySQL storage engine
    Transactions: NULL
              XA: NULL
      Savepoints: NULL
      
    mysql> show engines \g
    +--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
    | Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
    +--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
    | InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
    | MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
    | MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
    | BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
    | MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
    | CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
    | ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
    | PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
    | FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
    +--------------------+---------+----------------------------------------------------------------+--------------+------+------------+

## 2. 查询默认存储引擎

    show variables like '%storage_engine%' \G
      
## 3. 修改默认存储引擎

    修改配置文件 my.ini 中的 default-storage-engine 字段即可。注意修改完成之后要重启mysql服务。
    
## 4. 如何选择存储引擎

`每种存储引擎都有自己的特性、优势和应用场合,所以不能随便选择,必须要掌握各种存储引擎的特性!`

常用的三种存储引擎如下:

1. MyISAM: 不支持事务,也不支持外键,所以访问速度很快。适合于对于对于事务完整性没有要求并且以访问为主的应用场景。
2. InNoDB: 支持事务操作,所以比MyISAM占据更多的磁盘空间。当需要进行频繁的更新、删除操作,同时还对事务完整性要求较高,需要实现并发控制时,要使用该存储引擎。
3. MEMORY: 使用内存存储数据,因此访问速度很快,但是安全上没有保障。如果应用中涉及的数据量小,并且需要快速访问,则可以使用该存储引擎。


    
    

    
    
