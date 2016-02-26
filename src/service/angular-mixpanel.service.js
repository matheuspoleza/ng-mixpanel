;(function(){
  'use strict';

  angular.module('angular-mixpanel').factory('mixpanelService', [ mixpanelService ]);

  function mixPanelService() {
    var service = {};

    service.getTag = function(){
      return '<script type="text/javascript">(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")'
      +'typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);'
      +'b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);</script>';
    };

    service.createDelegator = function($window, instanceName, disabled) {
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
