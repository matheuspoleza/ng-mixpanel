;(function(){
  'use strict';

  angular.module('angular-mixpanel').factory('mixpanelService', [ mixpanelService ]);

  function mixpanelService() {
    var service = {};

    service.createMixpanelDelegator = function($window, instanceName, disabled) {
      function getMixpanelInstance() {
        if(!instanceName) return $window.mixpanel;
        return $window.mixpanel[instanceName];
      }

      var methods = [
        'init',
        'push',
        'disable',
        'track',
        'track_links',
        'track_forms',
        'register',
        'register_once',
        'unregister',
        'identify',
        'get_distinct_id',
        'alias',
        'set_config',
        'get_config',
        'get_property'
      ];

      var peopleMethods = [
        'set',
        'set_once',
        'increment',
        'append',
        'track_charge',
        'clear_charges',
        'delete_user'
      ];

      var api = {};
      methods.forEach(function(methodName){
        api[methodName] = function() {
          if(disabled) return noop;

          var mixpanel = getMixpanelInstance();
          return mixpanel[methodName].apply(mixpanel, arguments);
        };
      });

      api.people = {};
      peopleMethods.forEach(function(methodName){
        api.people[methodName] = function(){
          if(disabled) return noop;

          var mixpanel = getMixpanelInstance();
          return mixpanel.people[methodName].apply(mixpanel.people, arguments);
        };
      });

      return api;
    };

    return service;
  }
})();
