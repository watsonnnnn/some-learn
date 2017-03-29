### CSS display属性

#### css的display最常见属性如下:

    none: 元素不会生成框，元素不显示，且在页面中不占据位置。
    block: 元素被当做块级元素对待,块级元素的默认值。
    inline: 元素被当成内联元素(行内元素)对待，内联元素的默认值。
    inline-block: 块级元素一方面被当成内联元素，因此可以使块级元素和内联元素可以同一行显示，
    但是另一方面这个元素却可以应用块级元素上的属性比如设置宽高，设置上下边距。

#### display属性可以设置的其他值

    list-item: 此元素会作为列表显示。 
    run-in: 此元素会根据上下文作为块级元素或内联元素显示。 
    table: 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 
    inline-table: 此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。 
    table-row-group: 此元素会作为一个或多个行的分组来显示（类似 <tbody>）。 
    table-header-group: 此元素会作为一个或多个行的分组来显示（类似 <thead>）。 
    table-footer-group: 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。 
    table-row: 此元素会作为一个表格行显示（类似 <tr>）。 
    table-column-group: 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。 
    table-column: 此元素会作为一个单元格列显示（类似 <col>） 
    table-cell: 此元素会作为一个表格单元格显示（类似 <td> 和 <th>） 
    table-caption: 此元素会作为一个表格标题显示（类似 <caption>） 
    inherit: 规定应该从父元素继承 display 属性的值。