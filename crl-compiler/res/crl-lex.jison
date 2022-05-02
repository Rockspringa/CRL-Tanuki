INT                [-]? (/*[1-9]*/ [0-9]+ /*| [0-9]*/)
DOUBLE             [-]? {INT} "." [0-9]+

ID                 [a-zA-Z_$ñ]+

LINE_COMMENT       "!!" [^\n]* (\n | $)
IGNORE             [ \r] | \b [ \t]+

INDENT             \n \t+ /!([ ]* ([\r\n]+ | $))

%{

const indent = [0];

const addDedents = (tabs, token) => {
  const dedents = [...token];

  if (token && tabs < indent[0]) dedents.unshift('\n');
  
  while (tabs < indent[0]) {
    dedents.unshift('!\t');
    indent.shift();
  }

  if (dedents.length) return dedents;
}

%}

%s comment
%s string
%s char

%%

{IGNORE}           /* ignore */
{LINE_COMMENT}     /* ignore */

{INDENT}           %{
  console.log("indent");
                      const tabs = yytext.length;

                      if (tabs > indent[0]) {
                          indent.unshift(tabs);
                          return ['\t', '\n'];
                      }

                      return addDedents(tabs, ['\n']);
                   %}

"'''"              this.begin('comment');
<comment>"'''"     this.popState();
<comment><<EOF>>   this.popState();
<comment>.         /* ignore */

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
\b"Mostrar"        return 'MOSTRAR';
\b"Importar"       return 'IMPORTAR';
\b"incerteza"      return 'INCERTEZA';

"++"               return '++';
"--"               return '--';

"+"                return '+';
[-]                return '-';
[*]                return '*';
"/"                return '/';
[%]                return '%';
[\^]               return '^';

"!="               return '!=';
"<="               return '<=';
">="               return '>=';
"=="               return '==';
[<]                return '<';
[>]                return '>';
[~]                return '~';

"&&"               return '&&';
"||"               return '||';
"|&"               return '|&';
[!]                return '!';

[=]                return '=';
[,]                return ',';
[)]                return ')';
[(]                return '(';
[:]                return ':';
[.]                return '.';
[;]                return ';';
\n([ \t]*\n)*      return '\n';
\n\b               return addDedents(0, ['\n']);

["]                this.begin('string');
<string>["]        this.popState();
<string>[^"\n]*    return '_STRING';

<string>\n         addError(`Se ingreso un salto de linea antes de cerrar el string.`, 0); return addDedents(0, ['EOF']);
<string>$          addError(`No se cerro la especificacion del string.`, 0); return addDedents(0, ['EOF']);

[']                this.begin('char');
<char>"'"          this.popState();
<char>"\"[^'\n]    return '_CHAR';
<char>[^'\n]       return '_CHAR';

<char>\n           addError(`Se ingreso un salto de linea en lugar de un caracter.`, 0); return addDedents(0, ['EOF']);
<char>$            addError(`No se termino la especificacion del caracter.`, 0); return addDedents(0, ['EOF']);

{INT}              return '_INT';
{DOUBLE}           return '_DOUBLE';

{ID}               return 'ID';

$                  return addDedents(0, ['EOF']);
.                  addError(`Token desconocido <<${yytext}>>.`, 0);
