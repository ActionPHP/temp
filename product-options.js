(function(){

App.Models.Option = Backbone.Model.extend({


});

App.Models.OptionValue = Backbone.Model.extend({


});

App.Collections.Options = Backbone.Collection.extend({});
App.Collections.OptionValues = Backbone.Collection.extend({});

App.Views.OptionsSandbox = Backbone.View.extend({

    el: "#wpcart-options-sandbox",

	initialize: function() {
		// body...
	},

	render: function(){


	},

	addOption: function(){

	}



});


App.Views.Option = Backbone.View.extend({});

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
- OptionValueItem //Contains a particular option value
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
