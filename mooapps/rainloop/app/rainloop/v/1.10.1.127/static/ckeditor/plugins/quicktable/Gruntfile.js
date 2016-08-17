var fs=require("fs");
module.exports=function(a){function b(b,d){fs.readFile(b,"utf8",function(f,g){if(f)return a.log.writeln(f);for(var e=g,c=0;c<d.length;c++)e=e.replace(d[c][0],d[c][1]);fs.writeFile(b,e,"utf8",function(b){if(b)return a.log.writeln(b)})})}a.initConfig({pkg:a.file.readJSON("package.json"),jshint:{all:["lang/*.js","*.js","*.json"],options:{jshintrc:".jshintrc"}},lint5:{dirPath:"samples",templates:["quicktable.html"]},compress:{main:{options:{archive:"release/<%= pkg.name %>-<%= pkg.version %>.zip",level:9,
pretty:!0},files:[{src:"** !node_modules/** !release/** !.* !*.log !Gruntfile.js !package.json !LICENSE !*.md !template.jst !*.zip".split(" "),dest:"<%= pkg.name %>/"}]}},markdown:{all:{files:[{expand:!0,src:"*.md",dest:"release/docs/",ext:".html"}],options:{template:"template.jst",markdownOptions:{gfm:!0,highlight:"manual"}}}}});a.loadNpmTasks("grunt-markdown");a.loadNpmTasks("grunt-contrib-compress");a.loadNpmTasks("grunt-lint5");a.loadNpmTasks("grunt-contrib-jshint");a.registerTask("test",["jshint",
"lint5"]);a.registerTask("build-only",["beforeCompress","compress","afterCompress"]);a.registerTask("build",["test","beforeCompress","compress","afterCompress","markdown"]);a.registerTask("default",["test"]);a.registerTask("beforeCompress","Running before Compression",function(){b("samples/quicktable.html",[[/http\:\/\/cdn.ckeditor.com\/4.4.3\/full-all\//g,"../../../"],[/language: 'en'/g,"// language: 'en'"],[/<\!-- REMOVE BEGIN --\>/g,"<\!-- REMOVE BEGIN --\><\!--"]])});a.registerTask("afterCompress",
"Running after Compression",function(){b("samples/quicktable.html",[[/\.\.\/\.\.\/\.\.\//g,"http://cdn.ckeditor.com/4.4.3/full-all/"],[/\/\/ language: 'en'/g,"language: 'en'"],[/<\!-- REMOVE BEGIN --\><\!--/g,"<\!-- REMOVE BEGIN --\>"]])})};