# Proto-Travel Project

**Proto-Travel** is a conceptual project designed to test basic reservation functionalities using the GraphQL API of **Travels.com B2C**. The project is built with **Next.js** and **Relay**, making it ideal for exploring how a frontend can interact with a GraphQL API.

## Project Structure

This project uses a **monorepo** approach managed with **Turborepo** and **PNPM**. The project structure is designed to simulate basic hotel availability and reservation functionalities against a mock API.

### Main Technologies

- **Next.js**: Framework for server-side rendering and static web applications.
- **React**: Library used for building user interfaces.
- **GraphQL**: Query language used for fetching and interacting with API data.
- **Relay**: A React framework for handling GraphQL queries and managing data-fetching.
- **Turborepo**: A tool to handle monorepo architecture and efficiently run tasks across multiple packages.

## Installation and Setup

### Prerequisites

Ensure that the following tools are installed on your system:

- **Node.js** (version 18.x or later)
- **PNPM** (version 7.5.0 or later)
- **Git**

### Steps to Clone and Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/proto-travels.git
   cd proto-travels
   ```

2. **Install dependencies**

   The project uses `PNPM` for dependency management. To install the dependencies, run:

   ```bash
   pnpm install
   ```

3. **Run the development server**

   To start the development server, execute the following command:

   ```bash
   pnpm dev
   ```

   Once the server is running, the project will be accessible at `http://localhost:3000`.

## Build and Start the Project

1. **Build for production**

   To build the project for production:

   ```bash
   pnpm build
   ```

2. **Start the production server**

   After building the project, start the production server:

   ```bash
   pnpm start
   ```

## Working with Relay

Relay is used for efficient GraphQL data management. It compiles GraphQL queries into optimized fragments.

1. **Run the Relay compiler**

   Use the following command to generate optimized Relay queries and fragments:

   ```bash
   pnpm relay
   ```

Relay ensures that data fetching is fast and efficient by managing query and fragment handling in your React components.

## Linting and Formatting

The project uses **ESLint** for code quality checks and **Prettier** for code formatting.

- **Lint the project**:

  ```bash
  pnpm lint
  ```

- **Format the code**:

  ```bash
  pnpm format
  ```

## Scripts

The project provides a variety of useful scripts. Below are descriptions of the most relevant ones:

### Main Project

- **`dev`**: Starts the Next.js development server using Turborepo.
- **`build`**: Builds the project for production.
- **`start`**: Starts the production server.
- **`relay`**: Runs the Relay GraphQL compiler.
- **`lint`**: Runs ESLint for code linting.
- **`format`**: Formats the code using Prettier.

### Web App (Next.js)

- **`next dev`**: Starts the Next.js development server.
- **`next build`**: Builds the Next.js application for production.
- **`next start`**: Starts the Next.js production server.

## Technologies Used

- **Next.js**: The web framework for server-side rendering and static generation.
- **Relay**: For optimized GraphQL data fetching and state management.
- **GraphQL**: API query language for structured data requests.
- **Turborepo**: Tool to optimize monorepo workflows and tasks.
- **PNPM**: Package manager that manages dependencies efficiently.
- **ESLint & Prettier**: Used for maintaining code quality and consistency across the project.

## License

This project is licensed under the MIT License.
