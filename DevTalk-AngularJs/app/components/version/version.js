'use strict';

angular.module('DevTalk.version', [
  'DevTalk.version.interpolate-filter',
  'DevTalk.version.version-directive'
])

.value('version', '0.1');
