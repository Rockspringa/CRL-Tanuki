%{

function addError(message, item, type = 1) {
    this.yy.compileInfo.errorsTable.addError({ message, type, column: item.first_column + 1, line: item.first_line });
}

%}

%ebnf

%left '+' '-'
%left '*' '/' '%'

%right '^'

%nonassoc UNARY
%nonassoc '==' '!=' '<' '>' '<=' '>=' '~'

%left '||'
%left '|&'
%left '&&'

%left '!'
%nonassoc '('	')'

%%

program
  : '\n'* program_ EOF
  | error EOF
    { addError.apply({ yy }, ["No se pudo recuperar del error, las posibles causas son un ':' faltante de una funcion o un tipo, identificador, palabra clave faltante en el ambito global.", @1]); }
  ;

program_
  : header body+
  | header
    { addError.apply({ yy }, ["No se encontro el cuerpo del archivo.", @1]); }
  ;

header
  : import* uncertainty?
  ;

import
  : IMPORTAR ID '.' ID '\n'+
    { yy.parseImport(`${$2}.${$4}`, @1.first_column + 1, @1.first_line); }
  | IMPORTAR ID '.' error
    { addError.apply({ yy }, ["Se esperaba la extension del archivo.", @4]); }
  | IMPORTAR ID error
    { addError.apply({ yy }, ["Se esperaba un punto entre el nombre del archivo y su extension.", @3]); }
  | IMPORTAR ID '\n'+
    { addError.apply({ yy }, ["Se esperaba un punto y su extension", @3]); }
  ;

uncertainty
  : INCERTEZA (DOUBLE_ | INT_) '\n'+
    { yy.compileInfo.symbolsTable.getSymbol(`__inc_${yy.compileInfo.filename}`, 0).data = new yy.CrlDouble(+$2); }
  | INCERTEZA error
    { addError.apply({ yy }, ["Se esperaba un valor numerico.", @2]); }
  ;

body
  : func_declaration block '\n'*
    { if ($1 && $block) yy.compileInfo.functionsTable.addFunction({ ...$1, body: $block}, @1.first_column + 1, @1.first_line); }
  | (var_declaration | assign) '\n'+
    { if ($1) $1.execute() }
  | ID error
    { addError.apply({ yy }, ["Se esperaba un signo igual.", @2]); }
  | declaration error
    { addError.apply({ yy }, ["Se esperaba un parentesis de apertura, una coma o un igual.", @2]); }
  | func_declaration error
    { addError.apply({ yy }, ["Se esperaba un signo de dos puntos.", @2]); }
  ;

func_declaration
  : declaration '(' func_param? ')'
    { if ($declaration) $$ = { ...$declaration, params: $3 || [] }; }
  | VOID ID '(' func_param? ')'
    -> { name: $2, params: $4 || [] }
  | declaration '(' error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de cierre o una lista de parametros.", @3])
  | VOID ID '(' error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de cierre o una lista de parametros.", @4])
  | VOID ID error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de apertura.", @3])
  | VOID error
    -> addError.apply({ yy }, ["Se esperaba un identificador", @2])
  ;

func_param
  : func_param ',' declaration
    -> $1; if ($1 && $declaration) $1.push($declaration)
  | declaration
    -> ($declaration) ? [$declaration] : []
  | func_param ',' error
    -> $1; addError.apply({ yy }, ["Se esperaba el tipo del parametro.", @3])
  | func_param error
    -> $1; addError.apply({ yy }, ["Se esperaba una coma.", @2])
  ;

for
  : PARA '(' INT ID '=' exp ';' exp ';' ('++' | '--') ')' loop_block
    {
    if ($exp1 && $exp2)
      $$ = new yy.For(new yy.Declare({ type: 2, names: [$4], value: $exp }, @3.first_column + 1, @3.first_line), $exp2, $10 === "++", $loop_block);
    }
  | PARA '(' INT ID '=' exp ';' exp ';' error
    -> addError.apply({ yy }, ["Se esperaba '++' o un '--' seguidos por ')' y ':'", @10])
  | PARA '(' INT ID '=' exp ';' exp error
    -> addError.apply({ yy }, ["Se esperaba un signo de punto y coma, un operador aritmetico, un operador de comparacion o un operador logico.", @9])
  | PARA '(' INT ID '=' exp ';' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @8])
  | PARA '(' INT ID '=' exp error
    -> addError.apply({ yy }, ["Se esperaba un signo de punto y coma, un operador aritmetico, un operador de comparacion o un operador logico", @7])
  | PARA '(' INT ID '=' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @6])
  | PARA '(' INT ID error
    -> addError.apply({ yy }, ["Se esperaba un signo de igual.", @5])
  | PARA '(' INT error
    -> addError.apply({ yy }, ["Se esperaba un identificador.", @4])
  | PARA '(' error
    -> addError.apply({ yy }, ["Se esperaba la palabra clave 'Int'.", @3])
  | PARA error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de apertura.", @2])
  ;

while
  : MIENTRAS '(' exp ')' loop_block
    { if ($exp) $$ = new yy.While($exp, $loop_block); }
  | MIENTRAS '(' exp ')' error
    -> addError.apply({ yy }, ["Se esperaba un signo de dos puntos.", @5])
  | MIENTRAS '(' exp error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de apertura, un operador aritmetico, un operador de comparacion o un operador logico.", @4])
  | MIENTRAS '(' error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de apertura.", @3])
  | MIENTRAS error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de apertura.", @2])
  ;

if_normal
  : SI '(' exp ')' block else_normal?
    { if ($exp) $$ = new yy.If($exp, $block, $6); }
  | SI '(' exp ')' error else_normal?
    -> addError.apply({ yy }, ["Se esperaba un signo de dos puntos.", @5])
  | SI '(' exp error else_normal?
    -> addError.apply({ yy }, ["Se esperaba un parentesis de cierre, un operador aritmetico, un operador de comparacion o un operador logico.", @4])
  | SI '(' error else_normal?
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | SI error else_normal?
    -> addError.apply({ yy }, ["Se esperaba un parentesis de apertura.", @2])
  ;

else_normal
  : SINO block
    -> $block
  | SINO error
    -> addError.apply({ yy }, ["Se esperaba un signo de dos puntos.", @2])
  ;

if_loop
  : SI '(' exp ')' loop_block else_loop?
    { if ($exp) $$ = new yy.If($exp, $loop_block, $6); }
  | SI '(' exp ')' error else_loop?
    -> addError.apply({ yy }, ["Se esperaba un signo de dos puntos.", @5])
  | SI '(' exp error else_loop?
    -> addError.apply({ yy }, ["Se esperaba un parentesis de cierre, un operador aritmetico, un operador de comparacion o un operador logico.", @4])
  | SI '(' error else_loop?
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | SI error else_loop?
    -> addError.apply({ yy }, ["Se esperaba un parentesis de apertura.", @2])
  ;

else_loop
  : SINO loop_block
    -> $loop_block
  | SINO error
    -> addError.apply({ yy }, ["Se esperaba un signo de dos puntos.", @2])
  ;

block
  : ':' '\n' '\t' instruction+ '!\t'
    -> $4
  | ':' '\n' error
    -> []; addError.apply({ yy }, ["Se esperaba un nivel mas de identacion.", @3])
  | ':' error
    -> []; addError.apply({ yy }, ["Se esperaba un salto de linea.", @2])
  ;

instruction
  : (var_declaration | assign | return | function) '\n'+
    -> $1
  | (for | while | if_normal)
    -> $1
  | ID error
    -> addError.apply({ yy }, ["Se esperaba un signo igual o un parentesis de apertura.", @2])
  | error
    -> addError.apply({ yy }, ["Se esperaba 'Para', 'Mientras', 'Si', 'Retorno', un identificador o un tipo.", @1])
  ;

loop_block
  : ':' '\n' '\t' loop_instruction+ '!\t'
    -> $4
  | ':' '\n' error
    -> []; addError.apply({ yy }, ["Se esperaba un nivel mas de identacion.", @3])
  | ':' error
    -> []; addError.apply({ yy }, ["Se esperaba un salto de linea.", @2])
  ;

loop_instruction
  : (var_declaration | assign | return | function) '\n'+
    -> $1
  | DETENER '\n'+
    -> new yy.Break()
  | CONTINUAR '\n'+
    -> new yy.Continue()
  | (for | while | if_loop)
    -> $1
  | ID error
    -> addError.apply({ yy }, ["Se esperaba un signo igual o un parentesis de apertura.", @2])
  | error
    -> addError.apply({ yy }, ["Se esperaba 'Para', 'Mientras', 'Si', 'Retorno', 'Detener', 'Continuar', un identificador o un tipo.", @1])
  ;

var_declaration
  : declaration extra_declare* declaration_assign?
    { if ($1) $$ = new yy.Declare({ type: $1.type, names: [$1.name].concat($2 || []), value: $3 }, @1.first_column + 1, @1.first_line); }
  ;

extra_declare
  : ',' ID
    -> $2
  | ',' error
    -> addError.apply({ yy }, ["Se esperaba un identificador.", @2])
  ;

declaration_assign
  : '=' exp
    { if ($exp) $$ = $exp; }
  | '=' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @2])
  ;

assign
  : ID '=' exp
    { if ($exp) $$ = new yy.Assign($1, $exp, @1.first_column + 1, @1.first_line); }
  | ID '=' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  ;

declaration
  : type ID
    -> {type: $type, name: $2}
  | type error
    -> addError.apply({ yy }, ["Se esperaba un identificador.", @2])
  ;

return
  : RETORNO exp?
    -> new yy.Return($2)
  ;

function
  : ID '(' func_values? ')'
    -> new yy.FunctionCall({name: $1, params: $3 || []}, @1.first_column + 1, @1.first_line)
  | ID '(' error
    -> addError.apply({ yy }, ["Se esperaba un parentesis de cierre o una lista de expresiones o valores.", @3])
  ;

func_values
  : func_values ',' exp
    -> $1; if ($exp) $1.push($exp)
  | exp
    -> $exp ? [$exp] : []
  | func_values ',' error
    -> $1; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | func_values error
    -> $1; addError.apply({ yy }, ["Se esperaba una coma, un operador aritmetico, un operador de comparacion o un operador logico..", @2])
  ;

exp
  : '(' exp ')'
    -> $exp
  | exp '+' exp
    -> new yy.Arithmetic($exp1, $exp2, 0, @2.first_column + 1, @2.first_line)
  | exp '-' exp
    -> new yy.Arithmetic($exp1, $exp2, 1, @2.first_column + 1, @2.first_line)
  | '-' exp %prec UNARY
    -> new yy.Arithmetic(new yy.Value(0, 2, @1.first_column + 1, @1.first_line), $exp, 1, @1.first_column + 1, @1.first_line)
  | exp '*' exp
    -> new yy.Arithmetic($exp1, $exp2, 2, @2.first_column + 1, @2.first_line)
  | exp '/' exp
    -> new yy.Arithmetic($exp1, $exp2, 3, @2.first_column + 1, @2.first_line)
  | exp '%' exp
    -> new yy.Arithmetic($exp1, $exp2, 4, @2.first_column + 1, @2.first_line)
  | exp '^' exp
    -> new yy.Arithmetic($exp1, $exp2, 5, @2.first_column + 1, @2.first_line)
  | exp '==' exp
    -> new yy.Relational($exp1, $exp2, 0, @2.first_column + 1, @2.first_line)
  | exp '!=' exp
    -> new yy.Relational($exp1, $exp2, 1, @2.first_column + 1, @2.first_line)
  | exp '<' exp
    -> new yy.Relational($exp1, $exp2, 2, @2.first_column + 1, @2.first_line)
  | exp '<=' exp
    -> new yy.Relational($exp1, $exp2, 3, @2.first_column + 1, @2.first_line)
  | exp '>' exp
    -> new yy.Relational($exp1, $exp2, 4, @2.first_column + 1, @2.first_line)
  | exp '>=' exp
    -> new yy.Relational($exp1, $exp2, 5, @2.first_column + 1, @2.first_line)
  | exp '~' exp
    -> new yy.Relational($exp1, $exp2, 6, @2.first_column + 1, @2.first_line)
  | exp '&&' exp
    -> new yy.Logics($exp1, $exp2, 0, @2.first_column + 1, @2.first_line)
  | exp '||' exp
    -> new yy.Logics($exp1, $exp2, 1, @2.first_column + 1, @2.first_line)
  | exp '|&' exp
    -> new yy.Logics($exp1, $exp2, 2, @2.first_column + 1, @2.first_line)
  | '!' exp
    -> new yy.Logics(new yy.Value(0, 0, @1.first_column + 1, @1.first_line), $exp, 3, @1.first_column + 1, @1.first_line)
  | value
    -> new yy.Value($value, $value.type, @value.first_column + 1, @value.first_line)
  | ID
    -> new yy.Reference($1, @1.first_column + 1, @1.first_line)
  | function
    -> $1
  | '(' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @2])
  | exp '+' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '-' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '*' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '/' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '%' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '^' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '==' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '!=' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '<' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '<=' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '>' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '>=' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '~' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '&&' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '||' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | exp '|&' error
    -> $exp; addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @3])
  | '!' error
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @2])
  | '-' error %prec UNARY
    -> addError.apply({ yy }, ["Se esperaba una expresion o un valor.", @2])
  ;

value
  : STRING_
    -> new yy.CrlString($1)
  | INT_
    -> new yy.CrlInt(+$1)
  | DOUBLE_
    -> new yy.CrlDouble(+$1)
  | CHAR_
    -> new yy.CrlChar($1.substring(1, $1.length - 1))
  | TRUE
    -> new yy.CrlBool(1)
  | FALSE
    -> new yy.CrlBool(0)
  ;

type
  : BOOLEAN
    -> 0
  | CHAR
    -> 1
  | INT
    -> 2
  | DOUBLE
    -> 3
  | STRING
    -> 4
  ;

%%