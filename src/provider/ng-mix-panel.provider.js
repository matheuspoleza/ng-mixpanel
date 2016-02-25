;(function(){
  'use strict';

  angular.module('ngMixPanel').provider('mixpanel', mixPanelProvider);

  function mixPanelProvider(){
    var mixpanelInstance, disabledEvents, disabled;

    this.mixpanel = '';
  }
})();
