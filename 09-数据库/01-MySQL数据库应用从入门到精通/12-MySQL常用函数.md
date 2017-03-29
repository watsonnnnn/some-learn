# MySQL常用函数

注: 

    SQL语句多数是可以在不同数据库软件之间移植的,而函数的移植性不强,
    主要是由于各种数据库软件都有自己支持的特由函数,
    在使用数据库函数时,如果后期有更换数据库的需求,需要注意这一点。

## 1. 字符串函数

MySQL提供的字符串函数如下:

    1. 合并字符串
        - concat(s1,s2,...,sn): 连接多个字符串为一个完整的字符串
            1. select concat('hello,','world') as '合并的字符串';
            2. select concat('hello,',NULL) as '结果为NULL';         //注:传入的参数如果有一个为NULL,返回的整个结果就是NULL
            3. select concat('当前日期: ',curdate()) as '使用函数';    //参数也可以传入函数
        
        - concat_ws(separator,s1,s2,...,sn): 连接多个字符串,设置自定义分隔符
            1. select concat_ws(' | ', 'hello','world') as '合并的字符串';   //hello | world
            2. select concat_ws('-','010','8086888') as '座机号';     //010-8086888
            3. select concat_ws(NULL,'010','8086888') as '结果为NULL';   //如果分隔符为NULL,则结果为NULL
        
    2. 比较字符串大小
        - strcmp(str1,str2): 比较字符串str1和str2
            1. select strcmp('abc','bcd');    // -1
            2. select strcmp('abc','abc');    // 0
            3. select strcmp('abc','abb');    // 1
            
    3. 获取字符串长度和字符数
        - length(str): 获取字符串长度(中文字符占3个字节)
            1. select length('张三丰') as '中文字符长度';   // 9
                
        - char_length(str): 获取字符串字符数
            2. select char_length('张三丰') as '英文字符长度';   // 3
        
    4. 字符串大小写转换
        - lower(str): 将字符串str中字符全部变为小写
        - upper(str): 将字符串str中字符全部变为大写
    
    5. 字符串查找
        - find_in_set(str1,str2): 查找str1在str2中首次出现的位置,其中,str2必须是用逗号分隔的若干个字符串
            1. select find_in_set('world','hello,hi,world');    // 3, 索引从1开始算
            
        - field(str,str1,str2,...): 获取str1,str2,...,strn中第一个与str相匹配字符串的位置
            1. select field('mysql','oracle','db2','mysql','sql server'); // 3
            
        - locate(str1,str)、position(str1 in str)、instr(str,str1): 获取str的子串str1的位置
            1. select locate('sql','mysql') 位置;   // 3
            2. select position('sql' in 'mysql') 位置;  // 3
            3. select instr('mysql','sql') 位置;   // 3
            
        - elt(n,str1,str2,...): 返回第字符串集合中的第n个字符串
            1. select elt(1,'mysql','oracle','db2') 第一个位置的字符串;  // mysql
            
        - make_set(num,str1,str2,str3,...): 将数字num转换成二进制,然后从二进制的低位开始(索引从1开始),第几个位为1,则从字符串集合中选择第几个,为0的位不选
            1. select make_set(5,'oracle','mysql','db2'); //oracle,db2. 因为5的二进制位101,所以从字符串集中选择第一个和第三个字符串
            2. select make_set(7,'oracle','mysql','db2');  //oracle,mysql,db2.  因为7的二进制位111,所以选择第1,2,3个字符串
            
    6. 截取字符串
        - left(str,x): 返回字符串str中最左边的x个字符
        - right(str,x): 返回字符串str中最右边的x个字符
        - substring(str,num,length): 返回str中第num个位置的长度为length的子串
        - mid(str,num,length): 同上
        
    7. 去除字符串中空格
        - ltrim(str): 去除字符串str左边的空格
        - rtrim(str): 去除字符串str右边的空格
        - trim(str): 去掉字符串str首尾的空格
        
    8. 替换字符串
        - insert(str,pos,len,newstr): 将字符串str从第pos个位置,len个字符长的子串替换为newstr
        - replace(str,substr,newstr): 将字符串str中的子串substr全部替换为newstr
    
    9. 其他字符串函数
        - lpad(str,n,pad): 使用字符串pad对str最左边进行填充,直到长度为n个字符长度
        - rpad(str,n,pad): 使用字符串pad对str最右边进行填充,直到长度为n个字符长度
        - repeat(str,n): 返回字符串str重复n次的结果

## 2. 数值函数

    1. rand(): 返回0~1之间的随机数
    2. cell(x): 返回大于或等于x的最小整数
    3. floor(x): 返回小于或等于x的最大整数
    4. truncate(x,y): 返回数值x保留到小数点后y位的值
    5. round(x): 返回x四舍五入后的值
    6. round(x,y): 返回数值x保留到小数点后面y位的值,截取时进行四舍五入操作

## 3. 日期和时间函数

    1. 获取当前日期和时间
        - now(): 获取当前的日期和时间
        - current_timestamp(): 获取当前时间戳
        - localtime(): 获取local时间
        - sysdate(): systemdate方式
        - curdate(): 获取当前日期
        - current_date: 同上
        - curtime(): 获取当前时间
        - current_time: 同上
        
    2. 显示日期和时间
        - unix_timestamp(date): 获取日期date的unix时间戳
        - from_unixtime(): 获取unix时间戳的日期值
        - UTC_date(): 显示utc日期
        - UTC_time(): 显示utc时间
        
    3. 获取日期和时间的各部分值
        - year(date): 返回日期date的年份
        - quarter(date): 获取日期的季度
        - month(date): 获取日期的月份
        - week(date): 返回日期date为一年中的第几周
        - dayofmonth(date): 月份中的第几天
        - hour(date): 返回date的小时值
        - minute(date): 返回date的分钟值
        - second(date): 返回date的秒值
        
        - 关于月份: month(date)、monthname(date)
        - 关于星期: dayname(date)、dayofweek(date)、weekday(date)
        - 关于天: dayofyear(date)、dayofmonth(date)
        
    4. 抽取日期中的指定值
        - extract(type FROM date)
        type取值: year、month、day、hour、minute、second

    5. 计算日期的函数
        - adddate(date,n): 计算n天后的日期
        - subdate(date,n): 计算n天前的日期
        - addtime(time,n): 计算n秒后的时间
        - subtime(time,n): 计算n秒前的时间
        
        adddate(date, INTERVAL expr type)、subdate(date,INTERVAL expr type) ??啥意思
        
## 4. 系统信息函数 

    1. version(): 返回数据库的版本号
    2. database(): 返回当前的数据库名
    3. user(): 返回当前的用户名
    4. last_insert_id(): 返回最近生成的auto_increment的值
    
## 5. 其它实现特殊功能的函数

    1. password(str): 对字符串加密
    2. format(x,n): 对数字x进行格式化,保留n位小数
    3. inet_aton(ip): 将ip地址转换为数字
    4. inet_ntoa(x): 将数字转换为ip
    5. get_loct(name,time): 创建一个名为name,持续时间为time的锁
    6. release_loct(name): 为名为name的锁进行解锁
    7. benchmark(count,expr): 将表达式重复执行count次
    8. convert(s USING cs): 将字符串s的字符集变为cs
    9. convert(x,type): 将x改为type类型