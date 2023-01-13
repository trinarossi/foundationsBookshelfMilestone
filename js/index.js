const bookList = bookData;
const favBooks = [];
const library = document.querySelector('.library');
const favoriteList = document.querySelector('.favorites')
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const sortButton = document.querySelector('.sort-button');
const addButton = document.querySelector('.add-button');
const newTitle = document.querySelector('.title-text');
const newAuthor = document.querySelector('.author-text');
const newLanguage = document.querySelector('.language-text');
const sortDrop = document.querySelector('.sort-dd');
const favCounterButton = document.querySelector('.fav-count');
                
//Add search button function
searchButton.addEventListener('click', () => renderBooks(filterBooks(bookList), library));
//Add sort button function
sortButton.addEventListener('click', () => renderBooks(sortBooks(bookList), library))
//Add add new book function
addButton.addEventListener('click', () => {
    const title = newTitle.value;
    const author = newAuthor.value;
    const language = newLanguage.value;

    if (!title || !author || !language) {
        return console.log("no input")
    } bookList.push({title, author, language});
    renderBooks(bookList, library);
    newTitle.value = "";
    newAuthor.value = "";
    newLanguage.value = "";
});

const filterBooks = (books) => books.filter(book => book.title.toLowerCase().includes(searchInput.value.toLowerCase()));

const sortBooks = (books) => {
    const query = sortDrop.value;
    if (query === "az") {
        return books.sort((a, b) => a.title < b.title ? -1 : 1);
    } else if (query === "za") {
        return books.sort((a, b) => b.title < a.title ? -1 : 1);
    }
}

const favorite = (book) => {
    favBooks.push(book);
    renderBooks(bookList, library);
    renderBooks(favBooks, favoriteList);
    renderFavCounter(favBooks);
}

const unfavorite = (book) => {
    const unFavedBook = favBooks.indexOf(book);
    favBooks.splice(unFavedBook, 1);
    renderBooks(bookList, library);
    renderBooks(favBooks, favoriteList);
    renderFavCounter(favBooks);
}

const favCounter = (favBooks) => {
    return favBooks.length;
}

const renderFavCounter = (books) => {
    const favNum = favCounter(favBooks);
    const counter = document.createElement('p');
    counter.style.cssText = 'font-size: 18px; font-family: "Poppins"';
    counter.innerText = `Favorite Books: ${favNum}`;
    favCounterButton.replaceChildren(counter);
    return counter;
}

//create a function that renders a comment section
const createBookCommentSection = (book) => {
    const commentSection = document.createElement('section');
    const comment = document.createElement('p');
    comment.textContent = book.comment;
    commentSection.append(comment);

    const commentInput = document.createElement('input');
    const addCommentBtn = document.createElement('button');
    addCommentBtn.textContent = "Add Comment";
    addCommentBtn.addEventListener("click", () => {
        const userInput = commentInput.value;
        book.comment = userInput;

        // add a 'comment' child to book maybe instead of this?
        const displayComments = document.createElement('section');
        const commentText = document.createElement('p');
        commentText.innerText = book.comment;
        displayComments.append(commentText)
        //

        renderBooks(bookList, library);
    });
    commentSection.append(commentInput, addCommentBtn);
    return commentSection;
}

//const commentSection = createBookCommentSection(book);

const renderBook = (book) => {
    const { title, author, language} = book;
    //entire card
    const bookCard = document.createElement('section');
    bookCard.className = 'card';
    //first section- title and favButton
    const bookCardSec1= document.createElement('section');
    bookCardSec1.className = 'card-sec1';
    const bookTitle = document.createElement('h1');
    bookTitle.style.cssText = 'font-size: 18px; max-width: 300px; white-space: nowrap; overflow: clip; text-overflow: ellipsis; margin-bottom: 0;';
    bookTitle.innerText = `Title: ${title}`;
    bookCardSec1.append(bookTitle)
    //second section- author and language
    const bookCardSec2 = document.createElement('section');
    bookCardSec2.className = 'card-sec2';
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = `Author: ${author}`;
    const bookLan = document.createElement('p');
    bookLan.innerText = `Language: ${language}`;
    bookCardSec2.append(bookAuthor, bookLan)
    
    const favButton = document.createElement('button');
    //<span class="material-symbols-outlined">favorite</span>
    favButton.innerHTML = '<span class="material-symbols-outlined fav-outline">favorite</span>';
    favButton.className = 'fav-button';
    const unFavButton = document.createElement('button');
    unFavButton.innerHTML = '<span class="material-symbols-outlined unfav-outline">heart_broken</span>'
    unFavButton.className = 'unfav-button';
    favButton.addEventListener('click', () => favorite(book));
    unFavButton.addEventListener('click', () => unfavorite(book));
    const bookToAdd = (favBooks.includes(book)) ? unFavButton : favButton;
    bookCardSec1.append(bookToAdd);

    //third section- comment button
    const commentBtn = document.createElement('button');
    commentBtn.textContent = "Comment";
    commentBtn.className = 'comment-button';
    commentBtn.addEventListener('click', () => {
        const commentSection = createBookCommentSection(book);
        bookCard.append(commentSection);
        return commentSection;
    })

    bookCard.append(bookCardSec1, bookCardSec2, commentBtn);


    return bookCard;
}

const renderBooks = (books, location) => {
    const elements = books.map(renderBook);
    location.replaceChildren(...elements);
}

renderBooks(bookList, library);

//what to work on tomorrow:
//media query
//comment feature