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
        resultMessage.innerText ="";
        loadBookList(searchInputValue);
    }

});

const loadBookList = async searchValue => {
    spinner.classList.remove('d-none');
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();    
    spinner.classList.add('d-none');
}