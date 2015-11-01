var todoApp = (function($){

	"use strict";

	var $document,
			$todo,
			list = [],
			todoTemplate,

			cacheDOM = function(){
				$document = $(document);
				$todo = $document.find('#todo');
				todoTemplate = $document.find('#todoTemplate').html();
			},
			renderList = function(){
				var template =  Handlebars.compile(todoTemplate),
        html = template(list);
        $todo.html(html);
			},
			focusInput = function(){
				$todo.find('input')
						.val('')
						.trigger('keyup')
						.trigger('focus');
			},
			hoverSelect = function(){
				$todo.find('input').trigger('focus');
			},
			checkInput = function(){
				var $header = $todo.find('header');

				if( $(this).val() ){
					//task field contains input
					$header.removeClass('empty').addClass('populated');
				}else{
					//task field contains no input
					$header.addClass('empty').removeClass('populated');
				}
			},
			addListItem = function(e){
				e.preventDefault();
				var $userInput = $todo.find('input');
				list.push({
					text: $userInput.val(),
					progress: 'open'
				});
				renderList();
				focusInput();
			},
			removeListItem = function(e){
				e.preventDefault();
				var index = $(this).closest('li').data('index');
				//delete item from the array at current index
				list.splice(index, 1);
				renderList();
			},
			destroy = function(){
				$todo.empty();
				list = [];
				//remove event handlers
				$todo.off('click', '.add-todo', addListItem);
				$todo.off('click', '.delete', removeListItem);
				$todo.off('keyup', 'input', checkInput);
				$todo.off('mouseenter', 'header', hoverSelect);
			},
			reset = function(){
				destroy();
				init();
			},
			init = function(){
				cacheDOM();
				renderList();
				//add event handlers
				$todo.on('click', '.add-todo', addListItem);
				$todo.on('click', '.delete', removeListItem);
				$todo.on('keyup', 'input', checkInput);
				$todo.on('mouseenter', 'header', hoverSelect);
			};

		init();

		return {
			destroy: destroy,
			reset: reset
		};

})(jQuery);

