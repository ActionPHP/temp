(function(){

App.Models.Option = Backbone.Model.extend({


});

App.Models.OptionValue = Backbone.Model.extend({


});


/**

Models:

- Option
- OptionValue

Collections

- Options
- OptionValues

Views

- OptionsSandbox ({ collection: Options });
- Option({ collection: OptionValues });
*/

})();

var options = [

    "Size" : {
               "id": 1,
               "name": "Size",
               "options": [
                       
                           { "id": "1", "value": "S", "position":"1" }

                           ]

              }


];
