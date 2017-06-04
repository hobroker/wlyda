$.fn.serializeObject = function () {
	let formArray = this.serializeArray();
	var data = {};
	formArray.forEach(item => {
		data[item.name] = item.value
	});
	return data;
};

$(function () {
	$('#register-modal').modal();
	$('#register-form').submit(function () {
		let formData = $(this).serializeObject();
		if (!formData['password-one'] || formData['password-one'] !== formData['password-two']) {
			alert('passwords must be identical');
			return false;
		}
		$.ajax({
			url: '/user/register',
			type: 'post',
			data: formData,
			success: function (data) {
				console.log(data)
			},
			error: function (data) {

			}
		});
		return false;
	})
});