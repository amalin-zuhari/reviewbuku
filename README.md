
# Review Buku App

A book review application that allows users to add books, write reviews, and search for book reviews. Built using Vue3 with TypeScript, NestJS, and SQLite, this app offers an intuitive, user-friendly interface for managing and sharing book reviews.

## Features

- **Add Books**: Users can add new book to the app's collection with details such as title, author, and genre.
- **Write Reviews**: Users can write reviews for books they have read, providing ratings and comments.
- **Search Books**: Advanced search functionality to find books by title, author, or genre.
- **Edit Reviews**: Users can update or modify their existing reviews.
- **Delete Books and Reviews**: Users can remove books from the collection and delete their reviews.

## Technologies Used

- **Frontend**: Vue3 with TypeScript
- **Backend**: NestJS
- **Database**: SQLite
- **Styling**: Tailwind CSS

## Installation

Follow these steps to set up the app locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/amalin-zuhari/reviewbuku.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd reviewbuku
   ```

3. **Install frontend dependencies**:

   ```bash
   cd rb-frontend
   npm install
   ```

4. **Install backend dependencies**:

   ```bash
   cd ../rb-backend
   npm install
   ```

7. **Start the Application**:

   - Run the backend:

     ```bash
     cd rb-backend
     npm run start
     ```

   - Run the frontend:

     ```bash
     cd rb-frontend
     npm run dev
     ```

## Usage

Once the app is set up:

1. Open the app in your browser (usually `http://localhost:3000` for Vue3 frontend).
2. **Add Books**: Click on "Add Book" to input book details.
4. **Search**: Use the search bar to find books by title.
5. **Edit/Update Reviews**: Click on an existing review to modify it.
6. **Delete Books/Reviews**: Use the delete button to remove a book review.
