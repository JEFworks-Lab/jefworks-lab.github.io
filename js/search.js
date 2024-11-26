// https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/
(function() {
    function displaySearchResults(results, store) {
	//console.log('Displaying search results...')
	var searchResults = document.getElementById('search-box-results');
	searchResults.innerHTML = ''; // Clear old results
	
	if (results.length) { // Are there any results?
	    var appendString = '';

	    for (var i = 0; i < results.length; i++) {  // Iterate over the results
		var item = store[results[i].ref];
		appendString += '<li><a href="' + item.url + '">' + item.title + '</a> - <i>' + item.content.substring(0, 150) + '...(continue reading)</i></li>';
	    }

	    searchResults.innerHTML = appendString;
	} else {
	    searchResults.innerHTML = '<li>No results found</li>';
	}
    }
    
    function debounce(func, delay) {
	let timeout;
	return function (...args) {
	    clearTimeout(timeout);
	    timeout = setTimeout(() => func.apply(this, args), delay);
	};
    }
    
    // Listen for input events in the search box    
    var searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', (event) => {
	//console.log("Handling search for: ", event.target.value);
        handleSearch(event.target.value);
    });

    // Prevent form submission on Enter key press
    var searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the page from refreshing
      //console.log("Form submitted, but default action prevented.");
    });

	// Initalize lunr with the fields it will be searching on. I've given title
	// a boost of 10 to indicate matches on this field are more important.
	var idx = lunr(function () {
	    this.field('id');
	    this.field('title', { boost: 10 });
	    this.field('author');
	    this.field('tags', { boost: 5 });
	    this.field('content');
	});
	
	for (var key in window.store) { // Add the data to lunr
	    idx.add({
		'id': key,
		'title': window.store[key].title,
		'author': window.store[key].author,
		'tags': window.store[key].tags,
		'content': window.store[key].content
	    });
	}


    var handleSearch = debounce((query) => {	
	var searchTerm  = query;
	//console.log("Searching for:", searchTerm);

	var results = idx.search(searchTerm); // Get lunr to perform a search
	displaySearchResults(results, window.store); // We'll write this in the next section	
    }, 300); // 300ms delay

})();
