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
<html>
<head>
	<title>Product options</title>

	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js" ></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
	<link href="style.css" rel="stylesheet">
	
</head>
<body>
	<div id="wpcart-options-sandbox" >
		<span><strong>Product options</strong></span>

		<ul id="wpcart-product-options"></ul>
		<button class="btn btn-primary" >Save</button>
	</div>

	<!-- Templates -->

	<script type="text/template" id="wpcart-product-option-template" >
	<span id="wpcart-product-option-<%= id %>"><%= name %></span>
	<ul class="wpcart-product-option-values"></ul>
	</script>

	<script type="text/template" id="wpcart-product-option-value-template" >
	<li id="wpcart-product-option-value-<%= id %>"><%= value %></li>
	</script>

	<script type="text/javascript">

		(function(){

			window.App = {

				Models: {},
				Collections: {},
				Views: {},
				Router: {}
			}

			var vent = _.extend({}, Backbone.Events);

			App.Models.Option = Backbone.Model.extend({


			});

			App.Models.OptionValue = Backbone.Model.extend({


			});
			
			App.Collections.Options = Backbone.Collection.extend({

					comparator: function(item) {
     			   			return item.get('position');
  					}


			});

			App.Collections.OptionValues = Backbone.Collection.extend({

					comparator: function(item) {
     			   			return item.get('position');
  					}

			});

	App.Views.OptionsSandbox = Backbone.View.extend({

		el: "#wpcart-product-options",

		initialize: function() {
			
			vent.on('product:options', this.render(), this);
		},

		render: function(){

			var options = '[{"id":"1","name":"Size","options":[{"id":"2","value":"M","position":"2"},{"id":"1","value":"S","position":"1"},{"id":"3","value":"L","position":"3"}],"position":"1"}					]';

			options = JSON.parse(options);
			this.collection = new App.Collections.Options(options);

			this.displayOptions(this.collection.models);
		//	this.collection.url = '';

			/*this.collection.fetch({

				success: function(options){

					_.each(this.collection.models, function(option){

						this.addOption(option);

					});

				}

			});*/

		},

		displayOptions: function(options){

			that = this;
			_.each(this.collection.models, function(option){
				
						that.addOption(option);

			});
		},

		addOption: function(option){

			var optionView = new App.Views.Option({ model: option });
			var _view = optionView.render().el;
			console.log(_view);
			this.$el.append(_view);

		}



});


	App.Views.Option = Backbone.View.extend({

		tagName: 'li',

		initialize: function(){

		},

		render: function(){

			var template = _.template($('#wpcart-product-option-template').html());
			var view = template(this.model.toJSON());
			this.$el.html(view);

			var optionValues = new App.Collections.OptionValues(this.model.get('options'));

			
			var optionValueView = new App.Views.OptionValue({collection: optionValues, el: $(this.$el).find('.wpcart-product-option-values')});
			
			//This will also add the option values to the current view
			var valuesView = optionValueView.render().el;
			//this.$el.append(valuesView);

			return this;
		},

		addOptionValue: function(value){

			console.log(value)
		}



	});

	App.Views.OptionValue = Backbone.View.extend({

		//tagName: 'li',
		elContainer: null,

		initialize: function(){

			console.log(this.$el);
		},

		render: function(){
			var that = this;
			var template = _.template($('#wpcart-product-option-value-template').html());
			_.each(this.collection.models, function(optionValue){
				console.log(optionValue.toJSON());
				that.$el.append(template(optionValue.toJSON()));

			});
			//console.log(this.el);
			return this;
		},

	});

	/**

	Models:

	- Option
	- OptionValue

	Collections

	- Options
	- OptionValues

	Views

	- OptionsSandbox ({ collection: Options }); //Contains all the options and their values
	- Option({ collection: OptionValues }); // Contains the option and the values
	- OptionValue //Contains a particular option value
	*/


	var options = [
    {
        "Size": {
            "id": "1",
            "name": "Size",
            "options": [
                {
                    "id": "1",
                    "value": "S",
                    "position": "1"
                },
                {
                    "id": "2",
                    "value": "M",
                    "position": "1"
                },
                {
                    "id": "3",
                    "value": "L",
                    "position": "1"
                }
            ],
            "position": "1"
        }
    }
]

//Let's start this thing
//	
	new App.Views.OptionsSandbox;
	vent.trigger('product:options');
		})();
	</script>
</body>
</html>
