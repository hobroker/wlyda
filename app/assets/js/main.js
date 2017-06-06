$.fn.serializeObject = function () {
	let formArray = this.serializeArray();
	let data = {};
	formArray.forEach(item => {
		data[item.name] = item.value
	});
	return data;
};

$(function () {
	// $('#register-modal').modal();
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
				window.location.reload()
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
			url: '/user/login',
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

	$('.thumbs-box .btn').click(function () {
		let type = $(this).attr('data-thumbs');
		let article_id = $(this).closest('[data-id]').attr('data-id');
		$(this).attr('disabled', true);
		$(this).parent().find('[data-set="' + (type === 'up' ? 'down' : 'up') + '"]').attr('disabled', false);
		$.ajax({
			url: '/article/thumb',
			type: 'post',
			data: {
				type,
				article_id
			},
			success: function (data) {
				// window.location.reload()
			},
			error: function (data) {
				let rsp = JSON.parse(data.responseText);
				alert(rsp.message)
			}
		});
	});
});
