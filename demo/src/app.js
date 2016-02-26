;(function() {
  'use strict';

  angular.module('track-app', ['angular-mixpanel'])
    .config(function($mixpanelProvider) {
      $mixpanelProvider.token('123120931232198312-3');
    });
})();
