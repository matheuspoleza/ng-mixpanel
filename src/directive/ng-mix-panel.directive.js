;(function() {
  'use strict';

  angular.module('ngMixPanel').directive( 'mixpanelTrackClick', [ 'mixpanel', mixpanelTrackClick ]);

  function mixpanelTrackClick(mixpanel) {

    function mixPanelLink(scope, element, attrs){
      var eventName, properties;
      element.on('click', elementTrackClick);

      function elementTrackClick() {
        eventName = attr.mixpanelTrackClick || element.val() || element.text();
        properties = scope.mixpanelProperties;
        mixpanel.track(eventName, properties);
      }
    }

    return {
      restrict: 'A',
      scope: {
        'mixpanelProperties': '=',
      },
      link: mixPanelLink
    }
  }
})();
