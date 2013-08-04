(function(){

App.Models.Option = Backbone.Model.extend({


});

App.Models.OptionValue = Backbone.Model.extend({


});

App.Collections.Options = Backbone.Collection.extend({});
App.Collections.OptionValues = Backbone.Collection.extend({});

App.Views.OptionsSandbox = Backbone.View.extend({

	el: "#wpcart-product-options",

	initialize: function() {
		// body...
	},

	render: function(){

		this.collection = new App.Collections.Options;

		this.collection.url = '';

		this.collection.fetch({

			success: function(options){

				_.each(this.collection.models, function(option){

					this.addOption(option);

				});

			}

		});

	},

	addOption: function(option){

		var optionView = new App.Views.Option({ model: options });
		var _view = optionView.render().el;
		this.$el.append(optionView);

	}



});


App.Views.Option = Backbone.View.extend({

	tagName: 'li',

	initialize: function(){

	},

	render: function(){

		var template = _.template($('#wpcart-product-option-template'));
		var view = template(this.model.toJSON());

		var optionValueView = new App.Views.OptionValue({collection: this.model.options, $el: view.find('.wpcart-product-option-values')});
		var valuesView = optionValueView.render().el;



	},



});

App.Views.OptionValue = Backbone.View.extend({

	//tagName: 'li',

	initialize: function(){

	},

	render: function(){

		var template = _.template($('#wpcart-product-option-value-template'));
		_.each(this.collection.models, function(optionValue){

			this.$el.append(template(optionValue.toJSON()));

		});
		
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

})();

var options = [

    "Size" : {
               "id": "1",
               "name": "Size",
               "options": [
                       
                           { "id": "1", "value": "S", "position":"1" },
                           { "id": "2", "value": "M", "position":"1" },
                           { "id": "3", "value": "L", "position":"1" },

                           ],
              "position": "1"

              }


];
