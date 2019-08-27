const book = [
    {
        dewey: 1.133,
        title: "George R.R Martin: A Clash of Kings"
    },
    {
        dewey: 1.134,
        title: "George R.R Martin: A Storm of Swords"
    },
    {
        dewey: 2.133,
        title: "J.K. Rowling: Harry Potter and the Sorcers Stone"
    },
    {
        dewey: 2.2762,
        title: "Lewis Carroll Alice's Adventures in Wonderland"
    }
    ];
    
  function findBook(book, dewey, title) {
	  var start = 0, end = book.length;
	  while (start < end) {
          var middle = Math.floor((start + end) / 2);
		  if (book[middle].dewey == dewey) {
			  if (book[middle].title == title) 
				  return book[middle];
  			for (var idx = middle + 1; book[idx].dewey == dewey; ++idx)
  				if (book[idx].title == title) 
  					return book[idx];
  			for (var idx = middle - 1; book[idx].dewey == dewey; --idx)
  				if (book[idx].title == title) 
  					return book[idx];
  			return null;
  		}
  		if (book[middle].dewey < dewey)
  			start = middle + 1;
  		else
  			end = middle - 1;
  	}
  	return null;
  }

console.log(findBook(book, 2.2762, "Lewis Carroll Alice's Adventures in Wonderland"))