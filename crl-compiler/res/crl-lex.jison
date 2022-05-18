INT                \d+ /!\.
DOUBLE             \d+ "." \d+

ID                 [a-zA-Z_$ñ] [\w$ñ]*

LINE_COMMENT       "!!" [^\n]* (\n | $)
IGNORE             [ \r]

INDENT             \t+
DEDENT             "←"

%{

const addDedents = (tabs, token) => {
  while (tabs < this.yy.indents[0]) {
    this.yy.dedents.unshift('!\\t');
    this.yy.indents.shift();
  }

  if (token && !this.yy.eof) {
    this.yy.dedents.unshift('\\n');
    this.yy.dedents.push(token);
    this.yy.eof = token === 'EOF';
  }

  if (this.yy.dedents.length) {
    this.unput("←");
  }
}

%}

%x comment
%x string

%%

{IGNORE}           /* ignore */
{LINE_COMMENT}     /* ignore */

{DEDENT}           %{
  if (this.yy.dedents.length) {
    this.unput("←");
    return this.yy.dedents.shift();
  }
                   %}

{INDENT}           %{
  const tabs = yytext.length;

  if (tabs > this.yy.indents[0]) {
    this.yy.indents.unshift(tabs);
    return '\\t';
  } else if (tabs < this.yy.indents[0]) {
    addDedents(tabs);
  }
                   %}

"'''"                this.pushState('comment');
<comment>"'''"     this.popState();
<comment>$         this.popState(); addDedents(0, 'EOF');
<comment>[^']+          /**/
<comment>"'"(?!"''")    /**/

\b"Boolean"        return 'BOOLEAN';
\b"String"         return 'STRING';
\b"Double"         return 'DOUBLE';
\b"Char"           return 'CHAR';
\b"Void"           return 'VOID';
\b"Int"            return 'INT';
\b"Void"           return 'VOID';

\b"false"          return 'FALSE';
\b"true"           return 'TRUE';

\b"Retorno"        return 'RETORNO';
\b"Si"             return 'SI';
\b"Sino"           return 'SINO';
\b"Para"           return 'PARA';
\b"Mientras"       return 'MIENTRAS';
\b"Detener"        return 'DETENER';
\b"Continuar"      return 'CONTINUAR';
\b"Importar"       return 'IMPORTAR';
\b"Incerteza"      return 'INCERTEZA';

"++"               return '++';
"--"               return '--';

"+"                return '+';
"-"                return '-';
"*"                return '*';
"/"                return '/';
"% "               return '%';
\^                 return '^';

"!="               return '!=';
"<="               return '<=';
">="               return '>=';
"=="               return '==';
"<"                return '<';
">"                return '>';
"~"                return '~';

"&&"               return '&&';
"||"               return '||';
"|&"               return '|&';
"!"                return '!';

"="                return '=';
","                return ',';
")"                return ')';
"("                return '(';
":"                return ':';
"."                return '.';
";"                return ';';
\n/![\t\r\n]       if (yy.indents[0]) addDedents(0); return '\\n';
\n/[\t\r\n]        return '\\n';

["]                this.pushState('string');
<string>["]        this.popState();
<string>[^"\n]*    return 'STRING_';

<string>\n         this.popState(); addError.apply(this, [`Se ingreso un salto de linea antes de cerrar el string.`, yylloc, 0]);
<string>$          this.popState(); addError.apply(this, [`No se cerro la especificacion del string.`, yylloc, 0]); addDedents(0, 'EOF');

['].[']             return 'CHAR_';
[']\\[a-zA-Z'\][']  return 'CHAR_';

{DOUBLE}           return 'DOUBLE_';
{INT}              return 'INT_';

{ID}               return 'ID';

$                  addDedents(0, 'EOF');
[^\n\t ]+          addError.apply(this, [`El token <<${yytext}>> no se reconocio dentro de la gramatica.`, yylloc, 0]);
