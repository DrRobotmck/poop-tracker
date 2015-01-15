// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$(function() {
	var username = $('#username');
	var pin = $('#pin');
	pin.on('keyup', function() {
		if (pin.val().length !== 4) {
			$(this).css('border', 'indianred 5px solid');
		}
		else if(pin.val().length === 4){
			console.log('hi')
			$(this).css('border', 'darkseagreen 5px solid');
		}
	})
	var form = $('#login');
	form.on('submit', function(e) {
		e.preventDefault();
		if ( (username.val() && pin.val()) && pin.val().length === 4) {
			var data = {username: username.val(), pin: pin.val()};
			$.post('/login', data)
			.done(function(user_id) {
				form.hide();
				$('#poop-button').toggleClass('show').toggleClass('hide')
				$.get('/poops/' + user_id)
				.done(renderPoops)
			})
		}
	})

	var poopButton = $('#poop-button');
	poopButton.click(function() {
		$.post('/log_poop')
		.done(renderPoops);
	});
	var renderPoops = function(poopse) {
		if (poopse.poops) {
			var numPoops = poopse.poops.length;
			var name = $('<h2>').text(poopse.username + ' | Total Poops: ' + numPoops);
			var poops = '';
			for (var i = 0; i < numPoops; i++) {
				poops += ('<li>Yup</li>')
			}
			$('.poop-button').show();
			$('#stats').empty().append(name).append(poops);
		}
	};

})
