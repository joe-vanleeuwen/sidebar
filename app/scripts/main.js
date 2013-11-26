var text = [
	'How to Diagnose a Mongoose',
	'Stuff You Never Thought You Should Know',
	'Everything is Good. Life Is Great',
	'What\'s the Deal with Deadlines Anyways?',
	'Keeron is Awesome and He Knows What\s Up',
	'This One is Short',
	'This One is So Long I Don\'t Even Know What to Do About It',
	'How is This Ever Going to Work',
	'When Will This End?',
	'I Hope I Know What I\'m Doing'
]

var showX = 7;

Survey = Backbone.View.extend({

	tagName: 'li',

	className: 'survey',

	events: {
		'click': 'select'
	},

	initialize: function(options) {
		this.options = options;

		console.log('hey new view')
		$('.surveys ul').append(this.el)

		this.render();

	},

	render: function() {
		this.$el.text(this.options.text.toUpperCase());
	},

	select: function() {

		$('.survey').each(function() {
			$(this).css('color', 'rgb(71, 86, 90)');
			$(this).removeClass('active');
		})

		this.$el.css('color', '#FFF');

		var change = findHeight(0, this.options.index - 1);

		$('.surveys ul').css('top', '-' + change.toString() + 'px')
		this.$el.addClass('active')
		setHeight()
	}

})

text.forEach(function(item, index) {
	var survey = new Survey({
		text: item,
		index: index
	})
})

setHeight()

function setHeight(start) {
	$('.surveys').css('height', (findHeight(0, showX) + 25).toString() + 'px');
}

// $('.surveys').css('height', (findHeight(0, showX) + 25).toString() + 'px')

function findHeight(start, x) {
	var change = 0;

	for (start; start < x; start++) {
		change += parseInt($($('.surveys ul li')[start]).height()) + 25;
	}

	return change;
}


function findActive(active) {
	$('.surveys ul li').each(function(index) {
		if ($(this).hasClass('active')) {
			active = index;
		}
	})

	return active;
}

$('.up').click(function() {

	var active = findActive();
	console.log(active)

	if (active > (showX - 1)) {

		$('.surveys ul').css('top', '-' + findHeight(0, active - (showX + 1)).toString() + 'px');

	} else {

		$('.surveys ul').css('top', '0px')
	}

})

$('.down').click(function() {
	console.log('hey')
})


// Time Log:
// 30 (11:30 - 12:00)
// 40 (12:30 - 1:10)
// 30 (3:35 - 4:05)
// 90 (4:50 - 6:20)
