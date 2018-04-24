/**
 * Created by ASUS on 2018-04-24.
 */

//模板引擎函数
function tplEngine(tpl, data) {
    var re = /<%([^%>]+)?%>/g,
        re2 = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var code = 'var r=[];\n',
        cursor = 0;
    var add = function(line, js) {
        js ? code += line.match(re2) ? line + '\n' : 'r.push(' + line + ');\n' :
            code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    };
    while (match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index));
        re2.test(match[1]) ? add(match[1], true) : add("this." + match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';

    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

//手机自适应
function setAdapt() {
    var html = document.getElementsByTagName('html')[0];
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    html.style.fontSize = w / 750 + "px";
    //750这个数字是根据你的设计图的实际大小来的，所以值具体根据设计图的大小
}

