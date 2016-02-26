;(function(){
  'use strict';

  angular.module('ngMixPanel').provider('$mixpanelProvider', [ 'mixpanelService', mixpanelProvider ]);

  function mixpanelProvider(mixpanelService){
    var mixpanelInstance, disabledEvents, disabled;

    // Allow the explicit passing in of a mixpanel object
    this.mixpanel = function(value){
      mixpanelInstance = value;
    };

    function noop(){
      return;
    }

    this.token = undefined;
    this.config = {};
    this.libraryName = 'angular';

    // Enables multiple calls to disable events which will be collected then
    // applied during initialization. If disable is called, then it overrides
    // all individual event disabling.
    this.disable = function(events) {
      if(angular.isArray(events)){
        if(!disabledEvents)
          disabledEvents = [];
        disabledEvents = disabledEvents.concat(events);
      } else {
        disabled = true;
      }
    };

    this.script = mixpanelService.getTag();

    this.$get = ['$window', '$log', function($window, $log) {
      // If no mixpanel instance was passed into this provider, then
      // we'll create a new instance from the global mixpanel object.
      // This ensures we don't overwrite existing mixpanel deployments.
      if (!mixpanelInstance) {
        if (!$window.mixpanel) {
          angular.element.find('body').append(this.script);
        } else {
          // If no token is passed, use the existing global mixpanel instance
          if (this.token) {
            // If a token is passed, then create a new mixpanel insteance
            // and pass the handler for it.
            $window.mixpanel.init(this.token, this.config, this.libraryName);

            mixpanelInstance = mixpanelService.createDelegator($window, this.libraryName);
          } else {
            mixpanelInstance = mixpanelService.createDelegator($window);
          }
        }
      }

      if(disabled){
        // Create a mock (noop) instance of the mixpanel API
        mixpanelInstance = mixpanelService.createDelegator($window, undefined, true);
      } else if (disabledEvents){
        mixpanelInstance.disable(disabledEvents);
      }

      return mixpanelInstance;
    }];
  }
})();
