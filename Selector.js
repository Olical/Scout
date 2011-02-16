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
		filterTag: function(elements, tag, not) {
			// Set up the array to be returned
			var filtered = new Array();
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				// Compare tags
				if((not) ? elements[i].tagName != tag.toUpperCase() : elements[i].tagName == tag.toUpperCase()) {
					// Push to the filtered array
					 filtered.push(elements[i]); 
				}
			}
			
			// Return the filtered array
			return filtered;
		}
	};
};