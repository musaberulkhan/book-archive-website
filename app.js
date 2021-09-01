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
    if (searchInputValue === "") {
        resultMessage.innerText = "Empty search box. Please write down book name...";
    }
    else {
        resultMessage.innerText = "";
        loadBookList(searchInputValue);
    }

});

const loadBookList = async searchValue => {
    const startTime = performance.now();
    spinner.classList.remove('d-none');
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();

    const endTime = performance.now();
    const processingTime = (endTime - startTime) / 1000;
    spinner.classList.add('d-none');
    resultMessage.innerText = `Number of results found: ${data.numFound} (${processingTime.toFixed(2)} seconds)`;
    displayBookDetails(data);    
}

const displayBookDetails = books => {
    result.innerHTML="";  
    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');

        const authorName = checkObjectProperty(book.author_name);       
        const publisher = checkObjectProperty(book.publisher);       
        const publishYear = checkObjectProperty(book.publish_year);       
        div.innerHTML =
        `
        <div class="card h-100">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title mb-4">${book.title}</h5>
                <p class="card-text"><span class="fw-bold">Author:</span> ${authorName} </p>
                <p class="card-text"><span class="fw-bold">Publisher:</span> ${publisher} </p>
                <p class="card-text"><span class="fw-bold">Publish year:</span> ${publishYear} </p>
            </div>
        </div>
        `;        
        result.appendChild(div);        
    });    
}


const checkObjectProperty = property => {
    if(property === undefined){
        return "Not Available";
    }
    else{
        return property[0];
    }
}