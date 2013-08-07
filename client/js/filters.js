	'use strict';

angular.module('blog.filters', []).
filter('newlines', function() {
  return function(text) {
  	return text.replace(/\n/g, '<br/>');
  };
})
.filter('noHTML', function () {
    return function(text) {
        return text
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;');
    }
})
.filter('despace', function () {
	return function(text) {
		return text.replace(/\s+/g, '-').toLowerCase();
	}
});



