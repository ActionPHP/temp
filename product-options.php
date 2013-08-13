<?php

	/**
	 * 
	 * 	Ok so we have two Models
	 *  - ProductOption
	 *    - Collection options
	 *  - ProductOptionValue
	 * 
	 * 
	 */
?>
<!DOCTYPE html>
<html>
<head>
	<title>Product options</title>

	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js" ></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
	<link href="style.css" rel="stylesheet">
	
</head>
<body>
	<div id="wpcart-options-sandbox" >
		<span><strong>Product options</strong></span>
		
		<ul id="wpcart-product-options">
			<li>
				<input id="wpcart-options-create-name" type="text" /> <button type="button"
			class="btn btn-default" id="wpcart-options-create-button" ><i class="icon-plus"></i>Create new option</button>
			</li>
		</ul>
		<button class="btn btn-primary" id="wpcart-save-product-options-button">Save</button>
	</div>



	<!-- Templates -->

	<script type="text/template" id="wpcart-product-option-template" >
	<span id="wpcart-product-option-<%= id %>" class="wpcart-product-option-name"><%= name %></span> 
	<span> <a class="wpcart-option-value-create-button" ><i class="icon-plus" ></i>
	Add an option </a></span>
	<ul class="wpcart-product-option-values"></ul>
	</script>

	<script type="text/template" id="wpcart-product-option-value-template" >
	<span id="wpcart-product-option-value-<%= id %>" class="wpcart-product-option-value"><%= (value) ? value : 'Type in an option value' %></span>
	</script>
	<script type="text/javascript">
	//Simple inline edit
	
	$.fn.ineditor = function(options,callback){


		this.click(function(){
			
			var _edited = $(this);

			if(!_edited.hasClass('actionphp-ineditor')) {
					
					
					var _value = _edited.html();
					var _original = _value;

					var _input = '<input type="text" value="' + _value + '" class="actionphp-ineditor-input" />';

					_edited.addClass('actionphp-ineditor');
					_edited.html(_input);
					_edited.find('.actionphp-ineditor-input').focus();

					var _edited_input = _edited.find('.actionphp-ineditor-input');
					
					_edited_input.blur(function(){
					
						var _edited_value = _edited_input.val();
						_edited_value = (_edited_value) ? _edited_value : _original;
						_edited.html(_edited_value);
					
						_edited.removeClass('actionphp-ineditor');


						if (typeof callback == 'function') { // make sure the callback is a function
				     	   callback.call(this); // brings the scope to the callback
				    	}

					});
			} 

			_edited.keydown(function(e){

			if(e.keyCode == 13){

				$('.actionphp-ineditor-input').trigger('blur');
			}

			});

		});

		

		$(document).click(function(e){
			//	console.log(this);
				//console.log(e.target);
				if(!$(e.target).hasClass('actionphp-ineditor-input') && !$(e.target).hasClass('actionphp-ineditor') ){

					$('.actionphp-ineditor-input').trigger('blur');
				}
			});


	}

	</script>

		<script type="text/javascript" src="product-options.js"></script>

</body>
</html>
