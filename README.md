# text-analyzer-tool

This application generates count of words, characters, sentences, paragraphs, longest word in the paragraph.

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v20.17.0 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local MongoDB setup)
- [Git](https://git-scm.com/)

## Getting Started

Follow the steps below to set up the project on your local machine.

### 1. Clone the Repository

Clone the project from GitHub to your local machine.

```bash
git clone https://github.com/mohammadwahid-eng/text-analyzer-tool.git
```

### 2. Install Dependencies
Navigate to the project folder and install the required dependencies.

```
cd text-analyzer-tool
npm install
```

### 3. MongoDB Setup
Ensure MongoDB is running on your local machine. You can use MongoDB Atlas for cloud-hosted MongoDB or set it up locally.

- For a local MongoDB setup, follow this [guide](https://docs.mongodb.com/manual/installation/).
- The default MongoDB connection URL is defined in the `.env` file as `MONGO_URI`. Update this if necessary.


### 4. Environment Variables
Create a .env file in the root directory of the project. Use .env.example as a reference and add your own environment variables.

```
cp .env.example .env
```
The `.env` file should include the following variables:

```
# PORT=3000
# MONGO_URI=mongodb+srv://<your_db_user>:<your_db_password>@cluster.dldgv.mongodb.net/text-analyzer-tool
# JWT_SECRET=SECRET
```

### 5. Run the Application
You can run the application using the following command:

```
npm run dev
```
This command will start the server using nodemon for automatic restarts on code changes.

### 6. Building the Project
To create a production build, run:

```
npm run build
```
This command compiles TypeScript (if applicable) and prepares the app for production deployment.

### 7. Running Tests & Coverage Report
This project uses Jest for testing. You can run the tests using the following command. But make sure your is running.

```
npm test
```

The coverage report will be generated in the coverage/ directory. Open the `Icov-report/index.html` file in your browser to view the detailed report.

