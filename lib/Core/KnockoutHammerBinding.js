"use strict";

/*global require*/
//var Hammer = require('hammerjs');
define('KnockoutHammerBinding', ['Knockout', 'Hammer' ], function (Knockout, hammerjs)
{
var KnockoutHammerBinding = {
    register : function(Knockout) {
        Knockout.bindingHandlers.swipeLeft = {
            init : function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var f = Knockout.unwrap(valueAccessor());
                new Hammer(element).on('swipeleft', function(e) {
                    var viewModel = bindingContext.$data;
                    f.apply(viewModel, arguments);
                });
            }
        };

        Knockout.bindingHandlers.swipeRight = {
            init : function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var f = Knockout.unwrap(valueAccessor());
                new Hammer(element).on('swiperight', function(e) {
                    var viewModel = bindingContext.$data;
                    f.apply(viewModel, arguments);
                });
            }
        };
    }
};
return KnockoutHammerBinding;
});
