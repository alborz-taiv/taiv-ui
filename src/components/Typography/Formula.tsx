//TODO Refactor this component so I actually know how it works
import React from 'react';
import { fontWeight, fontSize } from '../../constants/font';
import { Text } from './Text';
import { Fraction } from './Fraction';
import { Group } from '../Layout/Group/Group';

interface FormulaProps {
  expression: string;
  weight?: keyof typeof fontWeight;
  size?: keyof typeof fontSize;
  color?: string;
}

interface ParsedNode {
  type: 'default' | 'operator' | 'fraction' | 'subscript';
  value?: string;
  numerator?: ParsedNode[];
  denominator?: ParsedNode[];
  children?: ParsedNode[];
  subscript?: string;
}

class FormulaParser {
  private tokens: string[] = [];
  private current = 0;

  parse(expression: string): ParsedNode[] {
    const hasMathOperators = /[*\/+\-()=]/.test(expression);
    if (!hasMathOperators) {
      return [{ type: 'default', value: expression }];
    }

    this.tokens = this.tokenize(expression);
    this.current = 0;
    return this.parseExpression();
  }

  private tokenize(expression: string): string[] {
    const tokens: string[] = [];
    let i = 0;

    while (i < expression.length) {
      const char = expression[i];

      if (char === '(' || char === ')') {
        tokens.push(char);
        i++;
      } else if (char === '/' || char === '*' || char === '+' || char === '-' || char === '=' || char === '_') {
        tokens.push(char);
        i++;
      } else {
        let text = '';
        while (i < expression.length && !/[*\/+\-()=_]/.test(expression[i])) {
          text += expression[i];
          i++;
        }
        if (text) {
          tokens.push(text);
        }
      }
    }

    // Strip whitespace from all tokens
    const cleanedTokens = tokens.map((token) => token.trim()).filter((token) => token.length > 0);
    return cleanedTokens;
  }

  private parseExpression(): ParsedNode[] {
    return this.parseAddition();
  }

  private parseAddition(): ParsedNode[] {
    let left = this.parseMultiplication();

    while (this.current < this.tokens.length && (this.peek() === '+' || this.peek() === '-' || this.peek() === '=')) {
      const operator = this.advance();
      const right = this.parseMultiplication();
      left = [...left, { type: 'operator', value: operator }, ...right];
    }

    return left;
  }

  private parseMultiplication(): ParsedNode[] {
    let left = this.parseDivision();

    while (this.current < this.tokens.length && this.peek() === '*') {
      const operator = this.advance();
      const right = this.parseDivision();
      left = [...left, { type: 'operator', value: operator }, ...right];
    }

    return left;
  }

  private parseDivision(): ParsedNode[] {
    let left = this.parsePrimary();

    while (this.current < this.tokens.length && this.peek() === '/') {
      this.advance();
      const right = this.parsePrimary();

      const fraction: ParsedNode = {
        type: 'fraction',
        numerator: left,
        denominator: right,
      };

      left = [fraction];
    }

    return left;
  }

  private parsePrimary(): ParsedNode[] {
    if (this.peek() === '(') {
      this.advance(); // consume '('
      const expr = this.parseExpression();
      this.advance(); // consume ')'

      // Wrap the expression with parentheses
      //   return [{ type: 'default', value: '(' }, ...expr, { type: 'default', value: ')' }];
      return expr;
    }

    // Handle text tokens
    const token = this.peek();
    if (token && !/[*\/+\-()=_]/.test(token)) {
      const text = this.advance();

      // Check if next token is a subscript (text in parentheses)
      if (this.peek() === '_') {
        this.advance(); // consume '_'
        const subscript = this.peek();
        if (subscript && !/[*\/+\-_()=_]/.test(subscript)) {
          this.advance(); // consume subscript text
          return [{ type: 'subscript', value: text, subscript }];
        }
      }

      return [{ type: 'default', value: text }];
    }

    return [];
  }

  private peek(): string {
    return this.tokens[this.current] || '';
  }

  private advance(): string {
    return this.tokens[this.current++] || '';
  }
}

// Update the renderer to handle subscript
const FormulaRenderer: React.FC<{
  nodes: ParsedNode[];
  weight?: keyof typeof fontWeight;
  size?: keyof typeof fontSize;
  color?: string;
}> = ({ nodes, weight, size, color }) => {
  return (
    <Group gap="0.5rem">
      {nodes.map((node, index) => {
        switch (node.type) {
          case 'default':
            return (
              <Text key={index} weight={weight} size={size} color={color}>
                {node.value}
              </Text>
            );

          case 'operator':
            return (
              <Text key={index} weight={weight} size={size} color={color} mx="0.25rem">
                {node.value === '*' ? '×' : node.value}
              </Text>
            );

          case 'subscript':
            return (
              <Text key={index} weight={weight} size={size} color={color}>
                {node.value}
                <sub>{`(${node.subscript})`}</sub>
              </Text>
            );

          case 'fraction':
            return (
              <Fraction
                key={index}
                color={color}
                weight={weight}
                size={size}
                numerator={<FormulaRenderer nodes={node.numerator || []} weight={weight} size={size} color={color} />}
                denominator={<FormulaRenderer nodes={node.denominator || []} weight={weight} size={size} color={color} />}
              />
            );

          default:
            return null;
        }
      })}
    </Group>
  );
};

const Formula = ({ expression, weight, size, color }: FormulaProps) => {
  const parser = new FormulaParser();
  const parsedNodes = parser.parse(expression);

  return <FormulaRenderer nodes={parsedNodes} weight={weight} size={size} color={color} />;
};

export { Formula };
