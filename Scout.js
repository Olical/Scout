// Set up the object
window.Scout = function(selector, context) {
	// Set up the methods
	var methods = {
		all: function(context) {
			// Return all elements
			return context.all || context.getElementsByTagName('*');
		},
		unique: function(arrayName) {
			var newArray = new Array();
			label: for(var i = 0; i < arrayName.length; i++) {  
				for(var j = 0; j < newArray.length; j++) {
					if(newArray[j] == arrayName[i]) {
						continue label;
					}
				}
				newArray[newArray.length] = arrayName[i];
			}
			return newArray;
		},
		getChildren: function(elements) {
			// Set up variables
			var children = new Array();
			var search = null;
			
			// Loop through the elements gathering their children
			for(var i = 0; i < elements.length; i++) {
				search = this.all(elements[i]);
				
				for(var e = 0; e < search.length; e++) {
					children.push(search[e]);
				}
			}
			
			// Return the array
			return children;
		},
		attribute: function(e, name){
			var attr = e.attributes.getNamedItem(name);
			return attr && attr.value;
		},
		filterTag: function(elements, tagName) {
			// Set up the array to be returned
			var filtered = new Array();
			
			// Grab the children
			elements = this.getChildren(elements);
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				// Compare tags if we are not using children
				if(elements[i].tagName == tagName.toUpperCase()) {
					// Push to the filtered array
					filtered.push(elements[i]); 
				}
			}
			
			// Return the filtered array
			return filtered;
		},
		filterClass: function(elements, className) {
			// Set up array to be returned
			var filtered = new Array();
			
			// Set up class regexp
			var classRegexp = new RegExp("\\s?" + className + "\\s?");
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				// Compare classes
				if(classRegexp.test(elements[i].className)) {
					// Push to the filtered array
					filtered.push(elements[i]);
				}
			}
			
			// Return the filtered array
			return filtered;
		},
		filterId: function(elements, idName) {
			// Set up array to be returned
			var filtered = new Array();
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				// Compare ids
				if(elements[i].id == idName) {
					// Push to the filtered array
					filtered.push(elements[i]);
				}
			}
			
			// Return the filtered array
			return filtered;
		},
		filterAttribute: function(elements, attributeName, attributeValue){
			// Set up array to be returned
			var filtered = new Array();
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++){
				// Compare attributes
				if(this.attribute(elements[i], attributeName) == (attributeValue) ? attributeValue : null) {
					// Push to the filtered array
					filtered.push(elements[i]);
				}
			}
			
			// Return the filtered array
			return filtered;
		}
	};
	
	// Set up the array to be returned
	var found = new Array();
	
	// Split the selectors
	var splitSelector = selector.split(/\s*,\s*/ig);
	
	// Set up the array for the split selectors
	var selectors = Array();
	
	// Split the individual selectors
	for(var i = 0; i < splitSelector.length; i++) {
		selectors.push(splitSelector[i].split(/\s+/ig));
	}
	
	// Set up required variables
	var filter = null;
	var toFilter = null;
	
	// Loop through the top level selectors
	for(var x = 0; x < selectors.length; x++) {
		// Load all elements
		toFilter = methods.all((context) ? context : document);
		
		// Loop through the slightly lower selectors
		// Filtering as it goes
		for(var y = 0; y < selectors[x].length; y++) {
			// Grab the current filter
			filter = selectors[x][y];
			
			if(filter.match(/([a-z]+|\*)/ig)) {
				// Filter tags if is not an astrix
				if(filter != '*') {
					toFilter = methods.filterTag(toFilter, filter);
				}
				else {
					// If it is an astrix and we are not on the first iteration
					if(y > 0) {
						// Get all children
						toFilter = methods.getChildren(toFilter);
					}
				}
			}
		}
		
		// Merge the filtered list into the final list
		found = found.concat(toFilter);
	}
	
	// Return found elements
	return methods.unique(found);
};