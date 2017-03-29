# webpack的Loader介绍

## 什么是loader?

    webpack enables use of loaders to preprocess files. This allows you to bundle any static resource way 
    beyond JavaScript. You can easily write your own loaders using Node.js.
    
    webpack可以使用loaders来处理文件,它可以处理任何除javascript之外的静态资源。
    
    Loaders are activated by using loadername! prefixes in require() statements, or are automatically applied 
    via regex from your webpack configuration。
    
    使用loaders可以在js中引用某个模块时使用 require('loadername!引用的文件') 这种方式,例如require('style-loader!css-loader!./test.css');
    也可以在webpack.config.js配置文件中使用正则表达式来对特定的文件进行指定。
    
# 常见的loaders类型(摘自webpack官网)
   
## Files

    raw-loader Loads raw content of a file (utf-8)
    val-loader Executes code as module and consider exports as JS code
    url-loader Works like the file loader, but can return a data URL if the file is smaller than a limit
    file-loader Emits the file into the output folder and returns the (relative) URL

## JSON

    json-loader Loads a JSON file (included by default)
    json5-loader Loads and transpiles a JSON 5 file
    cson-loader Loads and transpiles a CSON file
    
## Transpiling

    script-loader Executes a JavaScript file once in global context (like in script tag), requires are not parsed
    babel-loader Loads ES2015+ code and transpiles to ES5 using Babel
    traceur-loader Loads ES2015+ code and transpiles to ES5 using Traceur
    typescript-loader Loads TypeScript like JavaScript
    coffee-loader Loads CoffeeScript like JavaScript

## Templating

    html-loader Exports HTML as string, require references to static resources
    pug-loader Loads Pug templates and returns a function
    jade-loader Loads Jade templates and returns a function
    markdown-loader Compiles Markdown to HTML
    posthtml-loader Loads and transforms a HTML file using PostHTML
    handlebars-loader Compiles Handlebars to HTML

## Styling

    style-loader Add exports of a module as style to DOM
    css-loader Loads CSS file with resolved imports and returns CSS code
    less-loader Loads and compiles a LESS file
    sass-loader Loads and compiles a SASS/SCSS file
    stylus-loader Loads and compiles a Stylus file
    postcss-loader Loads and transforms a CSS/SSS file using PostCSS

## Linting && Testing

    mocha-loader Tests with mocha (Browser/NodeJS)
    eslint-loader PreLoader for linting code using ESLint
    jshint-loader PreLoader for linting code using JSHint
    jscs-loader PreLoader for code style checking using JSCS
    coverjs-loader PreLoader to determine the testing coverage using CoverJS

## Frameworks

    vue-loader Loads and compiles Vue Components
    polymer-loader Process HTML & CSS with preprocessor of choice and require() Web Components like first-class modules
    angular2-template-loader Loads and compiles Angular Components

##### Awesome For more third-party loaders, see the list from awesome-webpack.