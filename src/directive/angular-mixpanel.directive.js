;(function() {
  'use strict';

  angular.module('angular-mixpanel').directive( 'mixpanelTrack', [ '$mixpanelProvider', mixpanelTrackClick ]);

  function mixpanelTrackClick(mixpanel) {

    function mixPanelLink(scope, element, attrs){
      var eventName, properties;
      element.on('click', elementTrackClick);

      function elementTrackClick() {
        eventName = attr.mixpanelTrack || element.val() || element.text();
        properties = scope.mixpanelProp;
        $mixpanelProvider.track(eventName, properties);
      }
    }

    return {
      restrict: 'A',
      scope: {
        'mixpanelProp': '=',
      },
      link: mixPanelLink
    }
  }
})();
