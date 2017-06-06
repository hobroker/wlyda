$.fn.serializeObject = function () {
	let formArray = this.serializeArray();
	let data = {};
	formArray.forEach(item => {
		data[item.name] = item.value
	});
	return data;
};

$(function () {
	$('#register-form').submit(function () {
		let formData = $(this).serializeObject();
		if (!formData['password-one'] || formData['password-one'] !== formData['password-two']) {
			alert('passwords must be identical');
			return false;
		}
		$.ajax({
			url: '/user/register',
			type: 'post',
			data: {
				name: formData.name,
				email: formData.email,
				password: formData['password-one']
			},
			success: function (data) {
				alert('Successfully registered\nYou can login now')
				$('#register-modal').modal('hide');
				$('#login-modal').modal('show');
			},
			error: function (data) {
				let rsp = JSON.parse(data.responseText);
				alert(rsp.message);
			}
		});
		return false;
	});

	$('#login-form').submit(function () {
		let formData = $(this).serializeObject();
		$.ajax({
			url: '/auth/local',
			type: 'post',
			data: {
				email: formData.email,
				password: formData.password
			},
			success: function (data) {
				window.location.reload()
			},
			error: function (data) {
				let rsp = JSON.parse(data.responseText);
				alert(rsp.message)
			}
		});
		return false;
	});

	$('.like-box .btn').click(function () {
		let type = $(this).attr('data-like');
		let article_id = $(this).closest('[data-id]').attr('data-id');
		let me = $(this);
		let neighbour = $(this).parent().find('[data-like="' + (type === 'up' ? 'down' : 'up') + '"]');
		me.attr('disabled', true);
		neighbour.attr('disabled', false);
		let upSpan = $(this).parent().find('[data-like="up"] span');
		let downSpan = $(this).parent().find('[data-like="down"] span');
		$.ajax({
			url: '/article/like',
			type: 'post',
			data: {
				type,
				article_id
			},
			success: function (data) {
				if (!data.errors) {
					let likes = data.data;
					upSpan.text(likes.up)
					downSpan.text(likes.down)
				}
			},
			error: function (data) {
				let rsp = JSON.parse(data.responseText);
				alert(rsp.message)
			}
		});
	});
});
