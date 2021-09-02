/******************************************************************************
                            Declare HTML Elements                             */
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultMessage = document.getElementById('result-message');
const result = document.getElementById('result');
const spinner = document.getElementById('spinner');

/******************************************************************************
                            Add Event Listener                               */
searchButton.addEventListener("click", () => {
    const searchInputValue = searchInput.value;
    result.innerHTML="";  
    if (searchInputValue === "") {
        resultMessage.innerText = "Empty search box. Please write down book name...";
    }
    else {
        resultMessage.innerText = "";
        loadBookList(searchInputValue);
    }
});

/******************************************************************************
                          Load Book List From API                            */
const loadBookList = async searchValue => {    
    spinner.classList.remove('d-none');    
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();       
    if(data.numFound === 0){
        resultMessage.innerText = "No Result Found, Please Search Again";
    }
    else{
        resultMessage.innerText = `Displaying ${data.docs.length} of ${data.numFound} results `;
        displayBookDetails(data);    
    }  
    spinner.classList.add('d-none');
};


/******************************************************************************
                            Display Book List                                */
const displayBookDetails = books => {     
    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        const authorName = checkObjectProperty(book.author_name);       
        const publisher = checkObjectProperty(book.publisher);       
        const publishYear = checkObjectProperty(book.publish_year);     
        const thumbnailSrc =  checkThumbnailProperty(book.cover_i);
        div.innerHTML =
        `
        <div class="card h-100">
            <img src="${thumbnailSrc}" class="p-4 p-md-5 card-img-top" alt="...">
            <div class="card-body px-4 py-3 py-md-5">
                <h5 class="card-title mb-4">${book.title}</h5>
                <p class="card-text"><span class="fw-bold">Author:</span> ${authorName} </p>
                <p class="card-text"><span class="fw-bold">Publisher:</span> ${publisher} </p>
                <p class="card-text"><span class="fw-bold">Publish year:</span> ${publishYear} </p>
            </div>
        </div>
        `;        
        result.appendChild(div);        
    });    
};

// Checking Object Property is Exist or Not
const checkObjectProperty = property => {
    if(property === undefined){
        return "Not Available";
    }
    else{
        return property[0];
    }
};

// Checking Image Object Property is Exist or Not
const checkThumbnailProperty = property => {
    if(property === undefined){
        return "images/default_cover.jpg";
    }
    else{
        return `https://covers.openlibrary.org/b/id/${property}-M.jpg`;
    }
};