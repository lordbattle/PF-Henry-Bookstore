const regexOnlyStringNumber = /^[A-Za-z0-9][A-Za-z0-9\s\S]*$/;
const regexString = /^[A-Za-z0-9,.:-\s]*$/;
const regexStartsWithLetterAndPunctuation = /^[A-Za-z][A-Za-z\s,.;-]*$/;


const validationsFormBook = (values) => {
    let errors = {};
    if (!values.title) {
        errors.title = 'Insert book title'
    } else if (values.title.length <= 50) {
        if (!regexOnlyStringNumber.test(values.title))
            errors.title = 'Title only start with letters or numbers'
        else if (!regexString.test(values.title))
            errors.title = 'Title only letters,numbers,commas,periods and double periods'
    } else {
        errors.title = 'Title Maximum 50 characters'
    }

    if (!values.subtitle) {
        errors.subtitle = 'Insert book subtitle'
    } else if (values.subtitle.length <= 200) {
        if (!regexOnlyStringNumber.test(values.subtitle))
            errors.subtitle = 'Subtitle Only start with letters or numbers'
        else if (!regexString.test(values.subtitle))
            errors.subtitle = 'Subtitle only letters,numbers,commas,periods and double periods'
    } else {
        errors.subtitle = 'Subtitle maximum 200 characters'
    }

    if (!values.publisher) {
        errors.publisher = 'Insert book publisher'
    } else if (values.publisher.length <= 100) {
        if (!regexOnlyStringNumber.test(values.publisher))
            errors.publisher = 'Publisher only start with letters or numbers'
        else if (!regexString.test(values.publisher))
            errors.publisher = 'Publisher only letters,numbers,commas,periods and double periods'
    } else {
        errors.publisher = 'Publisher maximum 100 characters'
    }

    if (!values.identifier) {
        errors.identifier = 'Insert book identifier'
    }else if (parseInt(values.identifier)){
        if(values.identifier.length != 13)
            errors.identifier='Identifier must be a thirteen-digit number'
    }else {
        errors.identifier='Identifier must be an integer'
    }


    if (!values.authors) {
        errors.authors = 'Insert book authors'
    }else if(!regexStartsWithLetterAndPunctuation.test(values.authors)){
        errors.authors='Authors can only start with letters and contain periods, commas, and semicolons'
    }

    if (!values.genre) {
        errors.genre = 'Insert book genre'
    }else if(!regexStartsWithLetterAndPunctuation.test(values.genre)){
        errors.genre='Genre can only start with letters and contain periods, commas, and semicolons'
    }

   
    if (!values.publishedDate) {
        errors.publishedDate = 'Insert book publishedDate'
    } else if (parseInt(values.publishedDate)) {
        if (values.publishedDate < 1800 || values.publishedDate > 2030)
            errors.publishedDate = 'PublishedDat dDate between 1800-2030'
    } else {
        errors.publishedDate = 'PublishedDate must be an integer'
    }

    if (!values.price) {
        errors.price = 'Insert book price'
    }else if(parseInt(values.price)){
        if(values.price < 5 || values.price > 300000)
            errors.price='Price must be between $5-$30000'
    }else{
        errors.price='Price must be an integer'
    }

    if (!values.pages) {
        errors.pages = 'Insert book pages'
    }else if(parseInt(values.pages)){
        if(values.pages < 0 )
            errors.pages='Pages greater than zero'
    }else {
        errors.pages='Pages must be an integer'
    }

    if (!values.stock) {
        errors.stock = 'Insert book stock'
    }else if(parseInt(values.stock)){
        if(values.stock < 0 || values.stock > 999)
            errors.stock='Stock must be between 0-999'
    }else{
        errors.stock='Stock must be an integer'
    }

    if (!values.averageRating) {
        errors.averageRating = 'Insert book averageRating'
    }else if (!parseInt(values.averageRating)){
        errors.averageRating='AverageRating must be an number'
    }

    if (!values.description) {
        errors.description = 'Insert book description'
    }

    return errors;
}
export default validationsFormBook;