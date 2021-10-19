$(function() {
	$(".g-form").submit(function (event) {
		event.preventDefault();

		// Ссылка, которую получили на этапе публикации приложения
		let appLink = "https://script.google.com/macros/s/AKfycbym5YWTg4DJPaOXhh-ZaTEbqOTak_B_d1akLKl8TDbu_Bku4lXzbhwZqx7bsrYT_GY/exec";
		

		// Сообщение при успешной отправке данных
		let successRespond = 'VIEW  <a target="_blank" href="https://docs.google.com/spreadsheets/d/1Wj5IUO7xGiZ408kFI2CW0wsRbVuQY9yvDSqhy4VFP3Q/edit?usp=sharing">LIST</a>';

		let failRespond ="email already exists, log in or enter another email";

		// Сообщение при ошибке в отправке данных
		let errorRespond = 'fail';

		// Id текущей формы
		let form = $('#' + $(this).attr('id'))[0];
		
		// h2 с ответом формы
		let formRespond = $(this).find('.titleRespond');

        // h2 класс reg c надписью REGISTRATION
		let registr = $(this).find('.reg');
		// Кнопка отправки формы
		let submitButton = $(this).find('.btn');

		let preloader = $(this).find('.preloader');

		// FormData
		let fd = new FormData(form);
        // прячем 
        registr.css('opacity', '0');

		preloader.css('opacity', '1');

		submitButton.prop('disabled', true);
		
		$.ajax({

			url: appLink,
			type: "POST",
			data: fd,
			processData: false,
			contentType: false,

			
			
		}).done(function(res, textStatus, jqXHR) {
			
			
			
			if(jqXHR.readyState === 4 && jqXHR.status === 200) {
	  
			  // Прячем заголовок формы
			  
			  registr.css('opacity', '1');
			  // Прячем прелоадер
			  preloader.css('opacity', '0');
	  
			  // Выводим ответ формы.
			  if(res.result=="false"){
				formRespond.html(failRespond).css('color', '#f00');
			}else{
			  formRespond.html(successRespond).css('color', '#37b599');}
			  
			  // Возвращаем активность кнопке отправки
			  submitButton.prop('disabled', false);
	  
				// Очищаем поля формы
				form.reset();
	  
			} else {
				
				formRespond.html(errorRespond).css('color', '#c64b4b');
				preloader.css('opacity', '0');
				setTimeout( () => {
					formRespond.css({
						'display': 'none'
					});
					
	  
					submitButton.prop('disabled', false);
				}, 7000);
	  
				console.log('Google did not respond with status 200');
			}
		  }).fail(function(res, textStatus, jqXHR) {

			  
			  registr.css('opacity', '1');
			  preloader.css('opacity', '0');
			  formRespond.html('Failed to send message').css('color', '#c64b4b');
			  setTimeout( () => {
				  formRespond.css({
					  'display': 'none'
				  });
				  
				  registr.css('opacity', '1');
				  submitButton.prop('disabled', false); 
			  }, 5000);
	  
			  console.log('apps script does not work');
		  }); 
	  });
	  }(jQuery));