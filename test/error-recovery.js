var tape = require('tape');
var md = require('markdown-it');
var mdk = require('../index');

var tests = [
    // ['label',
    //  'input',
    //  'rendering in default mode',
    //  'rendering with strict:true',
    //  'rendering with throwOnError:true',
    //  'rendering with throwOnError:true strict:true']

    ['Ordinary syntax error handling',
     '$1+\\frac{1}{2$',
     '<p><span class="katex-error" title="ParseError: KaTeX parse error: Unexpected end of input in a macro argument, expected &#x27;}&#x27; at end of input: 1+\\frac{1}{2" style="color:#cc0000">1+\\frac{1}{2</span></p>\n',
     '<p><span class="katex-error" title="ParseError: KaTeX parse error: Unexpected end of input in a macro argument, expected &#x27;}&#x27; at end of input: 1+\\frac{1}{2" style="color:#cc0000">1+\\frac{1}{2</span></p>\n',
     { name: 'ParseError', message: 'KaTeX parse error: Unexpected end of input in a macro argument, expected \'}\' at end of input: 1+\\frac{1}{2' },
     { name: 'ParseError', message: 'KaTeX parse error: Unexpected end of input in a macro argument, expected \'}\' at end of input: 1+\\frac{1}{2' }
    ],

    ['Only forbidden in strict mode',
     '$\\c ca$',
     '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi>c</mi><mo>¸</mo></mover><mi>a</mi></mrow><annotation encoding="application/x-tex">\\c ca</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6007em;vertical-align:-0.1701em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.4306em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">c</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1667em;"><span class="mord">¸</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1701em;"><span></span></span></span></span></span><span class="mord mathnormal">a</span></span></span></span></p>\n',
     '<p><span class="katex-error" title="ParseError: KaTeX parse error: LaTeX-incompatible input and strict mode is set to &#x27;error&#x27;: LaTeX&#x27;s accent \\c works only in text mode [mathVsTextAccents]" style="color:#cc0000">\\c ca</span></p>\n',
     '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi>c</mi><mo>¸</mo></mover><mi>a</mi></mrow><annotation encoding="application/x-tex">\\c ca</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6007em;vertical-align:-0.1701em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.4306em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal">c</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1667em;"><span class="mord">¸</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1701em;"><span></span></span></span></span></span><span class="mord mathnormal">a</span></span></span></span></p>\n',
     { name: 'ParseError', message: 'KaTeX parse error: LaTeX-incompatible input and strict mode is set to \'error\': LaTeX\'s accent \\c works only in text mode [mathVsTextAccents]' }
    ],

    ['XSS on syntax error (github issue #26 variant 1)',
     '$<img src=a onerror=alert(1)>%$',
     '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo><mi>i</mi><mi>m</mi><mi>g</mi><mi>s</mi><mi>r</mi><mi>c</mi><mo>=</mo><mi>a</mi><mi>o</mi><mi>n</mi><mi>e</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mi>a</mi><mi>l</mi><mi>e</mi><mi>r</mi><mi>t</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>&gt;</mo></mrow><annotation encoding="application/x-tex">&lt;img src=a onerror=alert(1)&gt;%</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">im</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">src</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.02778em;">error</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal" style="margin-right:0.02778em;">er</span><span class="mord mathnormal">t</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span></p>\n',
     '<p><span class="katex-error" title="ParseError: KaTeX parse error: LaTeX-incompatible input and strict mode is set to &#x27;error&#x27;: % comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $) [commentAtEnd]" style="color:#cc0000">&lt;img src=a onerror=alert(1)&gt;%</span></p>\n',
     '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo><mi>i</mi><mi>m</mi><mi>g</mi><mi>s</mi><mi>r</mi><mi>c</mi><mo>=</mo><mi>a</mi><mi>o</mi><mi>n</mi><mi>e</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mi>a</mi><mi>l</mi><mi>e</mi><mi>r</mi><mi>t</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>&gt;</mo></mrow><annotation encoding="application/x-tex">&lt;img src=a onerror=alert(1)&gt;%</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">im</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">src</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.02778em;">error</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal" style="margin-right:0.02778em;">er</span><span class="mord mathnormal">t</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span></p>\n',
     { name: 'ParseError',
       message: 'KaTeX parse error: LaTeX-incompatible input and strict mode is set to \'error\': % comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $) [commentAtEnd]' },
    ],

    ['XSS on syntax error (github issue #26 variant 2)',
     '$<img src=a onerror=alert(1)>{$',
     '<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;}&#x27;, got &#x27;EOF&#x27; at end of input: …rror=alert(1)&gt;{" style="color:#cc0000">&lt;img src=a onerror=alert(1)&gt;{</span></p>\n',
     '<p><span class="katex-error" title="ParseError: KaTeX parse error: Expected &#x27;}&#x27;, got &#x27;EOF&#x27; at end of input: …rror=alert(1)&gt;{" style="color:#cc0000">&lt;img src=a onerror=alert(1)&gt;{</span></p>\n',
     {name: 'ParseError', message: 'KaTeX parse error: Expected \'}\', got \'EOF\' at end of input: …rror=alert(1)>{'},
     {name: 'ParseError', message: 'KaTeX parse error: Expected \'}\', got \'EOF\' at end of input: …rror=alert(1)>{'}
    ],

    ['XSS with \\unicode (github issue #30)',
     '$\\unicode{<img src=x onerror=alert(1)>}$',
     '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mstyle mathcolor="#cc0000"><mtext>\\unicode</mtext></mstyle><mrow><mo>&lt;</mo><mi>i</mi><mi>m</mi><mi>g</mi><mi>s</mi><mi>r</mi><mi>c</mi><mo>=</mo><mi>x</mi><mi>o</mi><mi>n</mi><mi>e</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mi>a</mi><mi>l</mi><mi>e</mi><mi>r</mi><mi>t</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>&gt;</mo></mrow></mrow><annotation encoding="application/x-tex">\\unicode{&lt;img src=x onerror=alert(1)&gt;}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text" style="color:#cc0000;"><span class="mord" style="color:#cc0000;">\\unicode</span></span><span class="mord"><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">im</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">src</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">x</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.02778em;">error</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal" style="margin-right:0.02778em;">er</span><span class="mord mathnormal">t</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span></span></p>\n',
     '<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mstyle mathcolor="#cc0000"><mtext>\\unicode</mtext></mstyle><mrow><mo>&lt;</mo><mi>i</mi><mi>m</mi><mi>g</mi><mi>s</mi><mi>r</mi><mi>c</mi><mo>=</mo><mi>x</mi><mi>o</mi><mi>n</mi><mi>e</mi><mi>r</mi><mi>r</mi><mi>o</mi><mi>r</mi><mo>=</mo><mi>a</mi><mi>l</mi><mi>e</mi><mi>r</mi><mi>t</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>&gt;</mo></mrow></mrow><annotation encoding="application/x-tex">\\unicode{&lt;img src=x onerror=alert(1)&gt;}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text" style="color:#cc0000;"><span class="mord" style="color:#cc0000;">\\unicode</span></span><span class="mord"><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">im</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">src</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">x</span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.02778em;">error</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal" style="margin-right:0.02778em;">er</span><span class="mord mathnormal">t</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span></span></span></span></span></p>\n',
     { name: 'ParseError',
       message: 'KaTeX parse error: Undefined control sequence: \\unicode at position 1: \\̲u̲n̲i̲c̲o̲d̲e̲{<img src=x one…' },
     { name: 'ParseError',
       message: 'KaTeX parse error: Undefined control sequence: \\unicode at position 1: \\̲u̲n̲i̲c̲o̲d̲e̲{<img src=x one…' },
    ],
];

// this is technically not the default behavior; we're turning off
// console.warn messages for strictness violations
var mdDefault = md().use(mdk, { strict: false });
var mdStrict = md().use(mdk, { strict: true });
var mdThrow = md().use(mdk, { throwOnError: true, strict: false });
var mdThrowStrict = md().use(mdk, { throwOnError: true, strict: true });

function testOne(t, md, input, expected) {
    if (typeof expected === "string") {
        t.equals(md.render(input), expected);
    } else {
        t.throws(function () { md.render(input) }, expected);
    }
}

tests.forEach(function testCase (tc) {
    var label = tc[0];
    var input = tc[1];
    var eDefault = tc[2];
    var eStrict = tc[3];
    var eThrow = tc[4];
    var eThrowStrict = tc[5];

    tape(label, function testTape (t) {
        t.plan(4);
        testOne(t, mdDefault, input, eDefault);
        testOne(t, mdStrict, input, eStrict);
        testOne(t, mdThrow, input, eThrow);
        testOne(t, mdThrowStrict, input, eThrowStrict);
    });
});
