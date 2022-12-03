var path = require('path'),
	tape = require('tape'),
	testLoad = require('markdown-it-testgen').load,
	mdk = require('../index');

var md = require('markdown-it')()
	.use(mdk);

/* this uses the markdown-it-testgen module to automatically generate tests
   based on an easy to read text file
 */
testLoad(path.join(__dirname, 'fixtures/rendering.txt'), function(data){
	data.fixtures.forEach(function (fixture){

		/* generic test definition code using tape */
		tape(fixture.header,
		     { todo: fixture.header.includes(" XFAIL") },
		     function(t){
			t.plan(1);

			var expected = fixture.second.text,
				actual = md.render(fixture.first.text);

			t.equals(actual, expected);

		});

	});
});
