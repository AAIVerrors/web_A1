function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

bookList = []; // book list container
getJsonObject('data.json',
    function(data) {
        bookList = data; // store the book list into bookList
        console.log(bookList); // print it into console (developer tools)
        console.log(bookList[0]); // print the first book object into console 
        // here you can call methods to laod or refresh the page 
        // loadBooks() or refreshPage()
    },
    function(xhr) { console.error(xhr); }
);


window.onload = function () {
    
    // update the books' information
    var bookTable = document.getElementById("bookTable");
    
    
    for (var i = 0; i < bookList.length; i++){
        var book = bookList[i];
        var table = document.getElementById("bookTable");
        // var row = table.insertRow();
        // var cell1 = row.insertCell();
        // var cell2 = row.insertCell();
        // var cell3 = row.insertCell();
        // var cell4 = row.insertCell();
        // var cell5 = row.insertCell();
        // var cell6 = row.insertCell();
        // var cell7 = row.insertCell();
        // var cell8 = row.insertCell();
        // var cell9 = row.insertCell();
        // // add the html
        // cell1.innerHTML = '<input type="checkbox" name="select">';
        // cell2.innerHTML = '<img src="' + bookList[i].img + '">';
        // cell3.innerHTML = 'New Title';
        // cell4.innerHTML = 'New Title';
        // cell5.innerHTML = 'New Title';
        // cell6.innerHTML = 'New Title';
        // cell7.innerHTML = 'New Title';
        // cell8.innerHTML = 'New Title';
        // cell9.innerHTML = 'New Title';
        var row =  document.createElement("tr"); // more maintanbility method
        var c1 = document.createElement("td");
        var c2 = document.createElement("td");
        var c3 = document.createElement("td");
        var c4 = document.createElement("td");
        var c5 = document.createElement("td");
        var c6 = document.createElement("td");
        var c7 = document.createElement("td");
        var c8 = document.createElement("td");
        var c9 = document.createElement("td");
        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        row.appendChild(c5);
        row.appendChild(c6);
        row.appendChild(c7);
        row.appendChild(c8);
        row.appendChild(c9);
        table.appendChild(row);
        // modify c1
        var c1_input = document.createElement("input");
        c1_input.type = "checkbox";
        c1_input.name = "select";
        c1.appendChild(c1_input);
        // modify c2
        var c2_img = document.createElement("img");
        c2_img.id = "book-image";
        c2_img.src = book.img;
        c2.appendChild(c2_img);
        // modify c3
        var c3_title = document.createTextNode(book.title);
        c3.appendChild(c3_title);
        // modify c4
        c4.className = "image-column";
        var stars_num = book.rating;
        for (var positive_rating = 0; positive_rating < stars_num; positive_rating ++){ // add positive stars
            var c4_star = document.createElement("img");
            c4_star.src = "images/star-16.ico";
            c4.appendChild(c4_star);
        }
        for (var negative_rating = 0; negative_rating < (5-stars_num); negative_rating ++){ // add negative stars
            var c4_star = document.createElement("img");
            c4_star.src = "images/outline-star-16.ico";
            c4.appendChild(c4_star);
        }
        // modify c5
        var c5_author = document.createTextNode(book.authors);
        c5.appendChild(c5_author);
        // modify c6
        var c5_year = document.createTextNode(book.year);
        c6.appendChild(c5_year);
        // modify c7
        var c5_price = document.createTextNode(book.price);
        c7.appendChild(c5_price);
        // modify c8
        var c5_publisher = document.createTextNode(book.publisher);
        c8.appendChild(c5_publisher);
        // modify c9
        var c5_category = document.createTextNode(book.category);
        c9.appendChild(c5_category);
    }


}