var todoApp = (function($){

	"use strict";

	var $document,
			$todo,
			list = [],
			template,
			progressStatus = ['open', 'started', 'complete'],
			todoTemplate,

			cacheDOM = function(){
				$document = $(document);
				$todo = $document.find('#todo');
				todoTemplate = $document.find('#todoTemplate').html();
			},
			compileTemplate = function(){
				template =  Handlebars.compile(todoTemplate);
			},
			renderList = function(){
				var html = template(list);
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
				var $userInput = $todo.find('input'),
					inputValue = ($userInput.val()).trim();

				if(inputValue){
					//push new task to list
					list.push({
						text: inputValue,
						progress: progressStatus[0]
					});
					renderList();
				}

				focusInput();
			},
			removeListItem = function(e){
				e.preventDefault();
				var index = $(this).closest('li').data('index');
				//delete item from the array at current index
				list.splice(index, 1);
				renderList();
			},
			captureEnterPress = function(e){
				if(e.keyCode === 13){
					$todo.find('.add-todo').trigger('click');
				}
			},
			cycleStatus = function(e){
				e.preventDefault();

				var statusFound = false,
						newStatus = 0,
						//get info about the list item clicked
						$listElement = $(this).closest('li'),
						currentClass = $listElement.attr('class'),
						currentIndex = $listElement.data('index');

				//find it's current status and shift it by 1
				for(var i = 0, len = progressStatus.length; i < len && !statusFound; i++){
					if(progressStatus[i] === currentClass){
						statusFound = true;

						/*
						if going to next status doesn't exceed the progressStatus list length, 
						go to next status. The default is to cycle to the first status */
						if(i + 1 < len){
							newStatus = i + 1;
						}

						//update the status
						list[currentIndex].progress = progressStatus[newStatus];
					}
				}

				renderList();
			},
			destroy = function(){
				$todo.empty();
				list = [];
				unbindEvents();
			},
			unbindEvents = function(){
				$todo.off('click', '.add-todo', addListItem);
				$todo.off('click', '.delete', removeListItem);
				$todo.off('keyup', 'input', checkInput);
				$todo.off('keypress', 'input', captureEnterPress);
				$todo.off('mouseenter', 'header', hoverSelect);
				$todo.off('click', '.status', cycleStatus);
			},
			bindEvents = function(){
				$todo.on('click', '.add-todo', addListItem);
				$todo.on('click', '.delete', removeListItem);
				$todo.on('keyup', 'input', checkInput);
				$todo.on('keypress', 'input', captureEnterPress);
				$todo.on('mouseenter', 'header', hoverSelect);
				$todo.on('click', '.status', cycleStatus);
			},
			reset = function(){
				destroy();
				init();
			},
			init = function(){
				cacheDOM();
				compileTemplate();
				renderList();
				bindEvents();
			};

		init();

		return {
			destroy: destroy,
			reset: reset
		};

})(jQuery);

