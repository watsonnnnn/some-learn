#### 1. 页面中给DOM元素绑定事件时,e和this的区别?


#### 2. e.target 和 e.currentTarget 的区别?
`event.currentTarget指向事件所绑定的元素，而event.target始终指向事件发生的元素。`

HTML代码:

    <div id="wrapper"> 
        <a href="#" id="inner">click here!</a> 
    </div>
    
javascript代码：

    <script type="text/javascript" src="source/jquery.js"></script> 
    <script> 
        $('#wrapper').click(function(e) { 
            console.log('#wrapper'); 
            console.log(e.currentTarget); 
            console.log(e.target); 
        }); 
        $('#inner').click(function(e) { 
            console.log('#inner'); 
            console.log(e.currentTarget); 
            console.log(e.target); 
        }); 
    </script>
    
    
以上测试输出如下： 


1.当点击click here!时click会向上冒泡，输出如下： 

    #inner 
    <a href="#" id="inner">click here!</a> 
    <a href="#" id="inner">click here!</a> 
    #wrapper 
    <div id="wrapper">…</div> 
    <a href="#" id="inner">click here!</a> 


2.当点击click here!时click会向上冒泡，输出如下： 

    #wrapper 
    <div id="wrapper">…</div> 
    <div id="wrapper">…</div> 
