// Set up the object
window.Selector = function(path, context) {
	// Set up the methods
	var methods = {
		all: function(context) {
			// Return all elements
			return context.all || context.getElementsByTagName('*');
		},
		attribute: function(e, name){
			var attr = e.attributes.getNamedItem(name);
			return attr && attr.value;
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
				// Compare classes
				if((not) ? !classRegexp.test(elements[i].className) : classRegexp.test(elements[i].className)) {
					// Push to the filtered array
					filtered.push(elements[i]);
				}
			}
			
			// Return the filtered array
			return filtered;
		},
		filterId: function(elements, idName, not) {
			// Set up array to be returned
			var filtered = new Array();
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				// Compare ids
				if((not) ? elements[i].id != idName : elements[i].id == idName) {
					// Push to the filtered array
					filtered.push(elements[i]);
				}
			}
			
			// Return the filtered array
			return filtered;
		},
		filterAttribute: function(elements, attributeName, attributeValue, not){
			// Set up array to be returned
			var filtered = new Array();
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++){
				// Compare attributes
				if((not) ? this.attribute(elements[i], attributeName) != attributeValue : this.attribute(elements[i], attributeName) == attributeValue) {
					// Push to the filtered array
					filtered.push(elements[i]);
				}
			}
			
			// Return the filtered array
			return filtered;
		}
	};
	
	// Grab all elements
	var elements = methods.all((context) ? context : document);
	
	// Return the filtered list
	return elements;
};