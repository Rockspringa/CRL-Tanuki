%{

function addError(message, type = 1, item) {
    this.yy.compileInfo.errorsTable.addError({ message, type, column: item.first_column, line: item.first_line });
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
  : '\n'* header body+ EOF
  ;

header
  : import* uncertainty?
  ;

import
  : IMPORTAR ID '.' ID '\n'+
    { yy.parseImport(`${$2}.${$4}`, @1.first_column, @1.first_line); }
  ;

uncertainty
  : INCERTEZA DOUBLE_ '\n'+
    { yy.compileInfo.symbolsTable.getSymbol(`__inc_${yy.compileInfo.filename}`, 0).data = new yy.CrlDouble(+$2); }
  ;

body
  : func_declaration block '\n'*
    -> yy.compileInfo.functionsTable.addFunction({...$1, body: $block}, @1.first_column, @1.first_line);
  | (var_declaration | assign) '\n'+
    -> $1.execute()
  ;

func_declaration
  : declaration '(' func_param?[params] ')'
    -> { ...$declaration, params: $3 ? $3 : [] }
  | VOID ID '(' func_param? ')'
    -> { name: $2, params: $4 ? $4 : [] }
  ;

func_param
  : func_param ',' declaration
    -> $1; $1.push($declaration)
  | declaration
    -> [$declaration]
  ;

for
  : PARA '(' INT ID '=' exp ';' exp ';' ('++' | '--') ')' loop_block
    -> new yy.For(new yy.Declare({ type: 2, names: [$4], value: $exp }, @3.first_column, @3.first_line), $exp2, $10 === "++", $loop_block);
  ;

while
  : MIENTRAS '(' exp ')' loop_block
    -> new yy.While($exp, $loop_block)
  ;

if_normal
  : SI '(' exp ')' block else_normal?
    -> new yy.If($exp, $block, $6)
  ;

else_normal
  : SINO block
    -> $block
  ;

if_loop
  : SI '(' exp ')' loop_block else_loop?
    -> new yy.If($exp, $loop_block, $6);
  ;

else_loop
  : SINO loop_block
    -> $loop_block
  ;

block
  : ':' '\n' '\t' instruction+ '!\t'
    -> $4
  ;

instruction
  : (var_declaration | assign | return | function) '\n'+
    -> $1
  | (for | while | if_normal)
    -> $1
  ;

loop_block
  : ':' '\n' '\t' loop_instruction+ '!\t'
    -> $4
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
  ;

var_declaration
  : declaration extra_declare* declaration_assign?
    -> new yy.Declare({ type: $1.type, names: [$1.name].concat($2), value: $3 }, @1.first_column, @1.first_line)
  ;

extra_declare
  : ',' ID
    -> $2
  ;

declaration_assign
  : '=' exp
    -> $exp
  ;

assign
  : ID '=' exp
    -> new yy.Assign($1, $exp, @1.first_column, @1.first_line)
  ;

declaration
  : type ID
    -> {type: $type, name: $2}
  ;

return
  : RETORNO exp?
    -> new yy.Return($2)
  ;

function
  : ID '(' func_values? ')'
    -> new yy.FunctionCall({name: $1, params: $3}, @1.first_column, @1.first_line)
  ;

func_values
  : func_values ',' exp
    -> $1; $1.push($exp)
  | exp
    -> [$exp]
  ;

exp
  : '(' exp ')'
    -> $exp
  | exp '+' exp
    -> new yy.Arithmetic($exp1, $exp2, 0, @2.first_column, @2.first_line)
  | exp '-' exp
    -> new yy.Arithmetic($exp1, $exp2, 1, @2.first_column, @2.first_line)
  | '-' exp %prec UNARY
    -> new yy.Arithmetic(new yy.Value(0, 2, @1.first_column, @1.first_line), $exp, 1, @1.first_column, @1.first_line)
  | exp '*' exp
    -> new yy.Arithmetic($exp1, $exp2, 2, @2.first_column, @2.first_line)
  | exp '/' exp
    -> new yy.Arithmetic($exp1, $exp2, 3, @2.first_column, @2.first_line)
  | exp '%' exp
    -> new yy.Arithmetic($exp1, $exp2, 4, @2.first_column, @2.first_line)
  | exp '^' exp
    -> new yy.Arithmetic($exp1, $exp2, 5, @2.first_column, @2.first_line)
  | exp '==' exp
    -> new yy.Relational($exp1, $exp2, 0, @2.first_column, @2.first_line)
  | exp '!=' exp
    -> new yy.Relational($exp1, $exp2, 1, @2.first_column, @2.first_line)
  | exp '<' exp
    -> new yy.Relational($exp1, $exp2, 2, @2.first_column, @2.first_line)
  | exp '<=' exp
    -> new yy.Relational($exp1, $exp2, 3, @2.first_column, @2.first_line)
  | exp '>' exp
    -> new yy.Relational($exp1, $exp2, 4, @2.first_column, @2.first_line)
  | exp '>=' exp
    -> new yy.Relational($exp1, $exp2, 5, @2.first_column, @2.first_line)
  | exp '~' exp
    -> new yy.Relational($exp1, $exp2, 6, @2.first_column, @2.first_line)
  | exp '&&' exp
    -> new yy.Logics($exp1, $exp2, 0, @2.first_column, @2.first_line)
  | exp '||' exp
    -> new yy.Logics($exp1, $exp2, 1, @2.first_column, @2.first_line)
  | exp '|&' exp
    -> new yy.Logics($exp1, $exp2, 2, @2.first_column, @2.first_line)
  | '!' exp
    -> new yy.Logics(new yy.Value(0, 0, @1.first_column, @1.first_line), $exp, 3, @1.first_column, @1.first_line)
  | value
    -> new yy.Value($value, $value.type, @value.first_column, @value.first_line)
  | ID
    -> new yy.Reference($1, @1.first_column, @1.first_line)
  | function
    -> $1
  ;

value
  : STRING_
    -> new yy.CrlString($1)
  | INT_
    -> new yy.CrlInt(+$1)
  | DOUBLE_
    -> new yy.CrlDouble(+$1)
  | CHAR_
    -> new yy.CrlChar($1)
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