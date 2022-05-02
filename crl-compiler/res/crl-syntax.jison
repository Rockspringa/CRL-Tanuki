%{

const SymbolsTable = require("src/containers/symbols-table").SymbolsTable;
const ErrorsTable = require("src/containers/report-errors").ErrorsTable;

const symbolsTable = new SymbolsTable();
const errors = new ErrorsTable();

if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.symbolsTable = symbolsTable;
    exports.errors = errors;
}

const addError = (message, type = 1, column = this.first_column, line = this.first_line) =>
    errors.addError({ message, type, column, line });

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

%nonassoc '!'
%nonassoc '('	')'

%%

program
  : header body EOF
  ;

header
  : import* incerteza?
  ;

import
  : IMPORTAR ID '.' ID '\n'
  ;

incerteza
  : INCERTEZA DOUBLE '\n'
  ;

body
  : (func_declaration | (var_declaration | assign) '\n')*
  ;

func_declaration
  : declaration '(' func_param? ')' ':' block
  | VOID ID '(' func_param? ')' ':' block
  ;

func_param
  : func_param ',' declaration
  | declaration
  ;

for
  : PARA '(' INT ID '=' value ';' value ';' ('++' | '--') ')' ':' loop_block
  ;

while
  : MIENTRAS '(' value ')' ':' loop_block
  ;

if
  : SI '(' value ')' ':' block (SINO ':' block)?
  ;

loop_if
  : SI '(' value ')' ':' loop_block (SINO ':' loop_block)?
  ;

block
  : '\n' '\t' instruccion+ '!\t'
  ;

instruccion
  : (var_declaration | assign | return | for | while | if | function) '\n'
  ;

loop_block
  : '\n' '\t' loop_instruccion+ '!\t'
  ;

loop_instruccion
  : (var_declaration | assign | return | for | while | loop_if | function | DETENER | CONTINUAR) '\n'
  ;

var_declaration
  : declaration (',' ID)* ('=' value)?
  ;

assign
  : ID '=' value
  ;

declaration
  : type ID -> [$1, $2]
  ;

return
  : RETORNO value?
  ;

function
  : ID '(' func_values? ')'
  ;

func_values
  : func_values ',' value
  | value
  ;

value
  : '(' value ')'
  | value '+' value
  | value '-' value
  | value '*' value
  | value '/' value
  | value '%' value
  | value '^' value
  | value '!=' value
  | value '<=' value
  | value '>=' value
  | value '==' value
  | value '<' value
  | value '>' value
  | value '~' value
  | value '&&' value
  | value '||' value
  | value '|&' value
  | '-' value %prec UNARY
  | '!' value
  | ID
  | _STRING
  | _INT
  | _CHAR
  | TRUE
  | FALSE
  ;

type
  : (BOOLEAN | STRING | DOUBLE | CHAR | INT) -> $1
  ;

%%