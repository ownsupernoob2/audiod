class Book {
  constructor(id, categoryIds, title, cover, description, audios, Runtime, author) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.cover = cover;
    this.description = description;
    this.audios = audios;
    this.Runtime = Runtime;
    this.author = author
  }
}

export default Book;
