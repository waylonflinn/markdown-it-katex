const html = require('html');
const mdk = require('../index');

const md = require('markdown-it')()
  .use(mdk);

const testCases = [
  ['Simple inline math', '$1+1 = 2$'],
  ['Simple block math', '$$1+1 = 2$$'],
  ['No whitespace before and after is fine', 'foo$1+1 = 2$bar'],
  ['Even when it starts with a negative sign', 'foo$-1+1 = 2$bar'],
  ['Shouldn\'t render empty content', 'aaa $$ bbb'],
  ['Should require a closing delimiter', 'aaa $5.99 bbb'],
  ['Paragraph break in inline math is not allowed', `foo $1+1\n\n= 2$ bar`],
  ['Inline math with apparent markup should not be processed', `foo $1 *i* 1$ bar`],
  ['Block math can be indented up to 3 spaces', `
   $$
   1+1 = 2
   $$`],
  ['But 4 means a code block', `
    $$
    1+1 = 2
    $$`],
  ['Multiline inline math', `foo $1 + 1
= 2$ bar`],
  ['Multiline display math', `
$$

  1
+ 1

= 2

$$
  `],
  ['Text can immediately follow inline math', `$n$-th order`],
  ['Display math self-closes at the end of document', `
$$
1+1 = 2
`],
  ['Display and inline math can appear in lists', `
* $1+1 = 2$
* $$
  1+1 = 2
  $$
  `],
  ['Display math can be written in one line', `$$1+1 = 2$$`],
  ['Or on multiple lines with expression starting and ending on delimited lines', `
$$[
[1, 2]
[3, 4]
]$$
  `],
  ['Escaped delimiters should not render math', `
Foo \$1$ bar
\$\$
1
\$\$
`],
  ['Numbers can not follow closing inline math', `Thus, $20,000 and USD$30,000 won't parse as math.`],
  ['Require non whitespace to right of opening inline math', `For some Europeans, it is 2$ for a can of soda, not 1$.`],
  ['Require non whitespace to left of closing inline math.', `I will give you $20 today, if you give me more $ tomorrow.`],
  ['Inline blockmath is not (currently) registered.', `It's well know that $$1 + 1 = 3$$ for sufficiently large 1.`],
  ['Escaped delimiters in math mode', `Money adds: $\$X + \$Y = \$Z$.`],
  ['Multiple escaped delimiters in math module', `Weird-o: $\displaystyle{\begin{pmatrix} \$ & 1\\\$ \end{pmatrix}}$.`],
];

// Prettify to make snapshots more readable
const prettifyOptions = {
  indent_size: 2
};

describe('markdown-it-katex', () => {
  testCases.forEach(([header, markdown]) => {
    it(header, () => {
      const actual = md.render(markdown);
      expect(html.prettyPrint(actual, prettifyOptions)).toMatchSnapshot();
    });
  });
});
