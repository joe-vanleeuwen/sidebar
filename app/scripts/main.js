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
	'I Hope I Know What I\'m Doing',
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
		this.$el.append('<div class="survey-arrow"></div>');
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
		this.moveArrow()
	},

	moveArrow: function() {

		var previousLiHeight = findHeight(this.options.index - 1, this.options.index)
		var thisLiHeight = findHeight(this.options.index, this.options.index + 1)
		var arrowHeight = $('.survey-arrow').height()

		var arrowBottom = previousLiHeight + (thisLiHeight/2) + (arrowHeight/2);
		$('.survey-arrow').css('bottom', arrowBottom.toString() + 'px');
		console.log(arrowBottom)
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

upArrow()
downArrow()


// function setHeight(start, end) {
// 	$('.surveys').css('height', (findHeight(start, end) + 25).toString() + 'px');
// }

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

function removeActive() {
	$('.survey').each(function() {
		$(this).removeClass('active');
	})
}

function upArrow() {

	$('.up').click(function() {

		var currentTop = parseInt($('.surveys ul').css('top').slice(1, -2));
		var active = findActive();

		if (active > (showX - 1)) {

			$('.surveys ul').css('top', '-' + findHeight(0, active - (showX + 1)).toString() + 'px');
			// remove active class
			removeActive()

		} else if (!active && currentTop > $('.surveys').height()) {

			var currentTop = parseInt($('.surveys ul').css('top').slice(0, -2));
			var height = $('.surveys').height();
			var total = currentTop + height;

			$('.surveys ul').css('top', (total).toString() + 'px');

		} else {	
			$('.surveys ul').css('top', '0px')
		}
	})
}

function downArrow() {

	$('.down').click(function() {

		// remove active class
		removeActive()

		var currentTop  = Math.abs(parseInt($('.surveys ul').css('top').slice(0, -2)));
		var totalHeight = $('.surveys ul').height()
		var viewHeight  = $('.surveys').height();


		if ((totalHeight - currentTop) > viewHeight) {
			$('.surveys ul').css('top', '-' + (currentTop + viewHeight).toString() + 'px');
		}
	})
}

