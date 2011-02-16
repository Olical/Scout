// Set up the object
window.Selector = function(path, context) {
	// Set up the methods
	var methods = {
		all: function(context) {
			// Check if we need to set the context
			if(context === undefined) {
				var context = document;
			}
			
			// Return all elements
			return context.all || context.getElementsByTagName('*');
		},
		filterTag: function(elements, tagName, not) {
			// Set up the array to be returned
			var filtered = new Array();
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				// Compare tags
				if((not) ? elements[i].tagName != tagName.toUpperCase() : elements[i].tagName == tagName.toUpperCase()) {
					// Push to the filtered array
					 filtered.push(elements[i]); 
				}
			}
			
			// Return the filtered array
			return filtered;
		},
		filterClass: function(elements, className, not) {
			// Set up array to be returned
			var filtered = new Array();
			
			// Set up class regexp
			var classRegexp = new RegExp("\\s?" + className + "\\s?");
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				if((not) ? !classRegexp.test(elements[i].className) : classRegexp.test(elements[i].className)) {
					filtered.push(elements[i]);
				}
			}
			
			// Return the filtered array
			return filtered;
		}
	};
};