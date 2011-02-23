/*!
 * Scout selector engine v1.0.0
 * http://flowdev.co.uk/
 * 
 * Copyright 2011, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/Scout
 */

// Set up the object
window.Scout = function(selector, context) {
	// Set up the methods
	var methods = {
		all: function(context) {
			// Set up variables
			var elements = context.all || context.getElementsByTagName('*');
			var elementsArray = new Array();
			
			// Loop through pushing the elements into the array
			for(var i = 0; i < elements.length; i++) {
				elementsArray.push(elements[i]);
			}
			
			// Return all elements
			return elementsArray;
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
			
			// Loop through the elements gathering their children
			for(var i = 0; i < elements.length; i++) {
				children = children.concat(this.all(elements[i]));
			}
			
			// Return the array
			return children;
		},
		filterTag: function(elements, tagName) {
			// Set up the array to be returned
			var filtered = new Array();
			
			// Grab the children
			elements = this.getChildren(elements);
			
			// Loop through all passed elements
			for(var i = 0; i < elements.length; i++) {
				// Compare tags if we are not using children
				if(elements[i].nodeName == tagName.toUpperCase()) {
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
			for(var i = 0; i < elements.length; i++) {
				if(attributeValue) {
					// Compare attributes
					if(elements[i][attributeName] == attributeValue) {
						// Push to the filtered array
						filtered.push(elements[i]);
					}
				}
				else {
					// Check for attributes attributes
					if(elements[i][attributeName]) {
						// Push to the filtered array
						filtered.push(elements[i]);
					}
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
			
			while(filter.length > 0) {
				if(filter.match(/^([a-z]+|\*)/i)) {
					// Filter tags if is not an astrix
					if(filter != '*') {
						toFilter = methods.filterTag(toFilter, filter.replace(/^([a-z]+|\*).*/i, '$1'));
					}
					else {
						// If it is an astrix and we are not on the first iteration
						if(y > 0) {
							// Get all children
							toFilter = methods.getChildren(toFilter);
						}
					}
					
					// Remove this selector
					filter = filter.replace(/^([a-z]+|\*)/i, '');
				}
				else if(filter.match(/^\[([a-z]+)\]/i)) {
					// Filter by the ownership of a specified attribute
					toFilter = methods.filterAttribute(toFilter, filter.replace(/^\[([a-z]+)\].*/i, '$1'));
					
					// Remove this selector
					filter = filter.replace(/^\[([a-z]+)\]/i, '');
				}
				else if(filter.match(/^\[([a-z]+)=["'](.+?)["']\]/i)) {
					// Filter by attribute
					toFilter = methods.filterAttribute(toFilter, filter.replace(/^\[([a-z]+)=["'](.+?)["']\].*/i, '$1'), filter.replace(/^\[([a-z]+)=["'](.+?)["']\].*/i, '$2'));
					
					// Remove this selector
					filter = filter.replace(/^\[([a-z]+)=["'](.+?)["']\]/i, '');
				}
				else if(filter.match(/^\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/i)) {
					// Filter by class
					toFilter = methods.filterClass(toFilter, filter.replace(/^\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*).*/i, '$1'));
					
					// Remove this selector
					filter = filter.replace(/^\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/i, '');
				}
				else if(filter.match(/^#([A-Za-z]+[-A-Za-z0-9_:])/i)) {
					// Filter by id
					toFilter = methods.filterId(toFilter, filter.replace(/^#([A-Za-z]+[-A-Za-z0-9_:]).*/i, '$1'));
					
					// Remove this selector
					filter = filter.replace(/^#([A-Za-z]+[-A-Za-z0-9_:])/i, '');
				}
				else {
					// Stop endless loops
					filter = '';
				}
			}
		}
		
		// Merge the filtered list into the final list
		found = found.concat(toFilter);
	}
	
	// Return found elements
	return methods.unique(found);
};