
		(function(){

			window.App = {

				Models: {},
				Collections: {},
				Views: {},
				Router: {}
			}

			var vent = _.extend({}, Backbone.Events);

			App.Models.Option = Backbone.Model.extend({

				defaults: {

					id: null,
					options: [{id: null, value: null }]
				}

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

		events: {

			"click #wpcart-options-create-button" : "createOption",

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
			var _view = optionView.render();
			
			this.$el.append(_view.el);
			this.$el.find('.wpcart-product-option-name').ineditor();


			var $el = _view.$el;
			option.set('position', $el.index());

		},

		saveOptions: function(){

			//console.log(this.collection.toJSON());
		},

		createOption: function(){

			var optionName = $('#wpcart-options-create-name').val();
			var optionValues = Array();
			var option = new App.Models.Option({ name: optionName });

			sandbox.addOption(option);

		}



});


	App.Views.Option = Backbone.View.extend({

		tagName: 'li',

		initialize: function(){

			this.optionValueView = new App.Views.OptionValues();
			console.log(this);

		},

		events: {

			"click .wpcart-option-value-create-button" : "addOptionValue"

		},

		render: function(){

			var template = _.template($('#wpcart-product-option-template').html());
			var view = template(this.model.toJSON());
			this.$el.html(view);

			var optionValues = new App.Collections.OptionValues(this.model.get('options'));

			var optionValueList = $(this.$el).find('.wpcart-product-option-values');
			//var that = this;
			$( optionValueList ).sortable({

				update: function (event, ui) {
					
					vent.trigger('option-value-order:change');

				}
			});

			console.log(this);
			this.optionValueView.collection = optionValues;
			this.optionValueView.$el = optionValueList;


			//this.optionValueView = new App.Views.OptionValues({collection: optionValues, el: optionValueList });
			
			//This will also add the option values to the current view
			var valuesView = this.optionValueView.render().el;
			//console.log(optionValueView);
			this.$el.addClass("wpcart-product-option");

			return this;
		},

		addOptionValue: function(){

			var optionValueList = $(this.$el).find('.wpcart-product-option-values');

			var optionValue = new App.Models.OptionValue({id: null, value: null});
			this.optionValueView.addOptionValue(optionValue);

		},





	});

	App.Views.OptionValues = Backbone.View.extend({

		initialize: function(){
			
			vent.on('optionValue:add', this.addOptionValue, this);
		},

		render: function(){
			
			var that = this;
			_.each(this.collection.models, function(optionValue){
					
					//console.log(optionValue);
					that.addOptionValue(optionValue);
				
				});
			return this;
		},

		addOptionValue: function(value){
			
			//var that = this;

			var optionValueView = new App.Views.OptionValueItem({ model: value });
			var _view = optionValueView.render();
			
			this.$el.append(_view.el);
			this.$el.find('.wpcart-product-option-value').ineditor();
			
			$el = _view.$el;
			value.set('position', $el.index());

		}

	});

	App.Views.OptionValueItem = Backbone.View.extend({

		tagName: 'li',

		initialize: function(){

			vent.on('option-value-order:change', this.saveOptionValue, this);
		},

		render: function() {

			var template = _.template($('#wpcart-product-option-value-template').html());
			var view = template(this.model.toJSON());
			this.$el.html(view);

			return this;

		},

		saveOptionValue: function(){

			//Let's get the index of the option value in the list, and use that as it's
			// position.
			// 
			this.model.set('position', this.$el.index());

			//Let's get the actual value from the 'wpcart-product-option-value' span
			var value = this.$el.find('.wpcart-product-option-value').html();
			this.model.set('value', value);

		}


	});

	$( "#wpcart-product-options" ).sortable();

	//Let's start this thing
		
	sandbox = new App.Views.OptionsSandbox;
	vent.trigger('product:options');
	//$('.wpcart-product-option-name').ineditor();

		})();
