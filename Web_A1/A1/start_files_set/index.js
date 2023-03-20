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
    // filter category
    function displayCategory(category){
        var if_has = 0;
        for (var i = 0; i < bookList.length; i++){
            var book = bookList[i];
            if (book.category === category || category === '' || category === "All" || category === null){
                if_has ++;
                var table = document.getElementById("table-body");
                var row =  document.createElement("tr"); // more maintanbility method
                row.className = "table-row";
                row.setAttribute("data-searched", "no");
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
                c1_input.className = "checkbox_class";
                c1_input.id = "checkbox" + i;
                c1.appendChild(c1_input);
                // modify c2
                var c2_img = document.createElement("img");
                c2_img.classList = "book-image";
                c2_img.src = book.img;
                c2.appendChild(c2_img);
                // modify c3
                var c3_title = document.createTextNode(book.title);
                c3_title.className = "book-title";
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
        if (if_has === 0){
            alert("No books match your selected category! Select 'All' to display all books!");
        }
        else{
            signleChecked();
        }
    }


    function removeTableRows() {
        var table = document.getElementById("table-body");
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }
    }

    // remove all the high ligh to prepare for the another highlighting
    function removeHighlights() {
        var rows = document.getElementsByClassName("table-row");
        for (var i = 0; i < rows.length; i++) {
            rows[i].setAttribute("data-searched", "no");
        }
    }


    // highlight the books searched before 
    function highlightBook(searchSpace) {
        var rows = document.getElementsByClassName("table-row");
        for (var i = 0; i < rows.length; i++){
            var title = rows[i].childNodes[2].textContent.toLocaleLowerCase();
            if (searchSpace === '' || searchSpace == null){
                return;
            }
            else{
                if (title.includes(searchSpace)){
                    rows[i].setAttribute("data-searched", "yes");
                }
            }
        }
    }

    //set listener to every checkbox
    function signleChecked(){
        var checkboxSqr1 = document.getElementsByClassName("checkbox_class");
        for (var c = 0; c < checkboxSqr1.length; c++){
            checkboxSqr1[c].addEventListener('click', function(){
                var checkboxSqrInside = document.getElementsByClassName("checkbox_class");
                for (var i = 0; i < checkboxSqrInside.length; i++){
                    if (this != checkboxSqrInside[i]){
                        checkboxSqrInside[i].checked = false;
                    }
                }
            });
        }
    }
    

    // show all books
    displayCategory("All");


    // search and category
    var searchBtn = document.getElementById("search-button");
    var categoryBtn = document.getElementById("category-button");
    var checkboxSqr = document.getElementsByClassName("checkbox_class");
    var addToCartBtn = document.getElementById("add-cart");
    var resetCartBtn = document.getElementById("reset-cart");
    var LDBtn = document.getElementById("LD-button");
    var searchSpace = '';
    var categorySpace = '';
    var cart = 0;


    // set listener to search button
    searchBtn.addEventListener('click', function() {
        var searchInput = document.getElementById("search-text");
        var searchItem = searchInput.value.trim().toLowerCase();
        searchSpace = searchItem;
        // if there is nothing in search space, then no books will be seleted
        if ((searchSpace === '' || searchSpace === null)) {
            removeHighlights();
            return;
        }
        // reset highlight
        removeHighlights();
        // search the books and then highlight it
        var if_has = 0;
        var rows = document.getElementsByClassName("table-row");
        for (var i = 0; i < rows.length; i++){
            var title = rows[i].childNodes[2].textContent.toLocaleLowerCase();
            // when some words in search space
            if ((searchSpace !== '' || searchSpace !== null) ){
                if (title.includes(searchSpace)){
                    rows[i].setAttribute("data-searched", "yes");
                    if_has ++;
                }
            }
        }
        if (if_has == 0){
            alert("No book match your searching!")
        }
        console.log(categorySpace + "   " + searchSpace);
    });


    // add envent to category button
    categoryBtn.addEventListener('click', function(){
        var categoryInput = document.getElementById("category");
        var categoryItem = categoryInput.options[categoryInput.selectedIndex].text.trim();
        categorySpace = categoryItem;
        // reset highlight
        removeHighlights();
        removeTableRows();
        displayCategory(categorySpace);
        highlightBook(searchSpace);

        console.log(categorySpace + " +  " + searchSpace);
    });


    // add to cart
    addToCartBtn.addEventListener('click', function() {
        var checkedBook;
        var have_checked = false;
        for (var cb of document.getElementsByClassName("checkbox_class")){
            if (cb.checked){
                checkedBook = cb;
                have_checked = true;
            }
        }
        // when user didn't select any book, alert
        if (have_checked === false){
            alert('Please check any book, then add to cart!');
        }
        else{
            var quantity = prompt("Please enter the quantity you want to add into cart.", "1");
            if (quantity) {
                var parsedQuantity = parseInt(quantity);
                // when user enter non-number, alert
                if (isNaN(parsedQuantity)) {
                    alert('Invalid quantity, please type number!');
                }else{
                    if (parsedQuantity <= 0){
                        alert('You should enter integer above 0!');
                    }
                    else{
                        cart += parsedQuantity;
                        checkedBook.checked = false;
                        cartNum(cart);
                    }
                }
            }
        }
    });


    // clear cart
    resetCartBtn.addEventListener("click", function(){
        if (confirm('Are you sure you want to reset?')){
            cart = 0;
            cartNum(0);
        }
    });


    // change cart num
    function cartNum(num) {
        var cart = document.getElementById("cart-num");
        cart.textContent = "(" + num + ")";
    }


    // light dark button
    LDBtn.addEventListener('click', function toggleTheme() {
        // Obtains an array of all <link>
        // elements.
        // Select your element using indexing.
        var theme = document.getElementsByTagName('link')[0];
        // Change the value of href attribute 
        // to change the css sheet.
        if (theme.getAttribute('href') == 'index.css') {
            theme.setAttribute('href', 'dark.css');
        } else {
            theme.setAttribute('href', 'index.css');
        }
    });

}