import { assertEquals } from "https://deno.land/std@0.197.0/assert/assert_equals.ts";
import { expr as Expr } from "./ast.js";
import Token from "./token.js";
import TokenType from "./tokenType.js";
import AstPrinter from "./astPrinter.js";

Deno.test({
  name: 'test ast printer',
  fn () {
    const expr = new Expr.Binary(
      new Expr.Unary(
        new Token(TokenType.MINUS, '-', null, 1),
        new Expr.Literal(123)
      ),
      new Token(TokenType.STAR, '*', null, 1),
      new Expr.Grouping(
        new Expr.Literal(45.67)
      )
    );
    const res = new AstPrinter().print(expr);
    assertEquals(res, '(* (- 123) (group 45.67))');
  }
});