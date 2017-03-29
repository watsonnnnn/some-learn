#### 样式的继承

    继承是指应用样式的元素的后代会继承样式的某些属性,例如颜色和字号。
    直接应用于元素的样式乃至任何一条应用与元素的属性值都会覆盖继承来的样式(继承样式的权重最低!)。
    
#### 哪些属性是可以继承的呢？css样式表属性可以继承的有如下：

    azimuth, border-collapse, border-spacing,
    caption-side, color, cursor, direction, elevation,
    empty-cells, font-family, font-size, font-style,
    font-variant, font-weight, font, letter-spacing,
    line-height, list-style-image, list-style-position,
    list-style-type, list-style, orphans, pitch-range,
    pitch, quotes, richness, speak-header, speaknumeral,
    speak-punctuation, speak, speechrate,
    stress, text-align, text-indent, texttransform,
    visibility, voice-family, volume, whitespace,
    widows, word-spacing

卧槽,这么多？！理一理这些属性。

##### 1. 文本相关属性：

    azimuth, border-collapse, border-spacing,
    caption-side, color, cursor, direction, elevation,
    empty-cells, 
    【font-family, font-size, font-style,
    font-variant, font-weight, font, letter-spacing,
    line-height】, 
    list-style-image, list-style-position,
    list-style-type, list-style, orphans, pitch-range,
    pitch, quotes, richness, speak-header, speaknumeral,
    speak-punctuation, speak, speechrate,
    stress,
    【 text-align, text-indent, texttransform,】
    visibility, voice-family, volume, whitespace,
    widows,
     【word-spacing】

##### 2. 列表相关属性：

    azimuth, border-collapse, border-spacing,
    caption-side, color, cursor, direction, elevation,
    empty-cells, font-family, font-size, font-style,
    font-variant, font-weight, font, letter-spacing,
    line-height, 
    【 list-style-image, list-style-position,
    list-style-type, list-style, 】
    orphans, pitch-range,
    pitch, quotes, richness, speak-header, speaknumeral,
    speak-punctuation, speak, speechrate,
    stress, text-align, text-indent, texttransform,
    visibility, voice-family, volume, whitespace,
    widows, word-spacing

##### 3. 还有一个属性比较重要，`color`属性。

##### 4. 值得一说的是`font-size`。很显然font-size是可以被继承的。
但是它的方式有一些特别。Font-size的子类继承的不是实际值，而是计算后的值。
