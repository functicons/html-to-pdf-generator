# HTML to PDF Generator (Node.js & TypeScript)

A simple and powerful command-line tool built with Node.js, TypeScript, and Puppeteer to convert local HTML files into high-quality PDFs. This is perfect for generating invoices, reports, or any other documents from web-standard templates.

## ✨ Features

-   **HTML to PDF Conversion**: Renders any local HTML file in a headless Chrome browser and saves it as a PDF.
-   **TypeScript-Powered**: Enjoy the benefits of type safety and modern JavaScript features.
-   **Styling Support**: Accurately renders CSS, including external stylesheets from CDNs (like Tailwind CSS), ensuring your PDF looks exactly like your webpage.
-   **Customizable**: Easily modify the HTML template or PDF output options (like format, margins, etc.).
-   **Command-Line Interface**: Specify input and output files directly from the command line.

## Project Structure

```
html-to-pdf-generator/
├── examples/
│   └── invoice.html
├── src/
│   └── index.ts
├── .gitignore
├── Makefile
├── package.json
└── tsconfig.json
```

## 🚀 Installation & Setup

1.  **Clone or Download:**
    Get the project files onto your local machine.

2.  **Navigate to the Project Directory:**
    Open your terminal and change into the project's root folder.
    ```bash
    cd path/to/html-to-pdf-generator
    ```

3.  **Install Dependencies (Crucial First Step!):**
    Run the following command to install all the necessary packages. You must do this before running the application for the first time.
    ```bash
    npm install
    ```

## Usage

After you have run `npm install` once, you can run the tool from your terminal. Provide the path to your HTML file as the first argument and an optional output file name as the second argument.

### 1. Running with `ts-node` (for development)

This command compiles and runs the TypeScript code on the fly.
```bash
# Basic usage with the example invoice
npm start examples/invoice.html

# Specifying a custom output file name
npm start examples/invoice.html my-custom-invoice.pdf
```

### 2. Building and Running the JavaScript Output

First, compile the TypeScript code into plain JavaScript:
```bash
npm run build
```

Then, run the compiled code with `node`, passing the arguments:
```bash
# Basic usage
node dist/index.js examples/invoice.html

# Specifying an output file name
node dist/index.js examples/invoice.html my-custom-invoice.pdf
```
If you do not specify an output file name, the PDF will be created with the same base name as your HTML file (e.g., `invoice.html` generates `invoice.pdf`).

## 🔧 Customization

### Changing the HTML Content
-   You can create any HTML file you want and pass its path to the script when you run it.
-   The example `examples/invoice.html` uses **Tailwind CSS** for styling, which is a great way to design your documents.

### Adjusting PDF Options
-   You can change PDF generation options (like paper size, margins, etc.) by modifying the `pdfOptions` object inside the `generatePdfFromHtml` function in `src/index.ts`.
-   For a full list of available options, refer to the [Puppeteer `page.pdf()` documentation](https://pptr.dev/api/puppeteer.page.pdf).
    ```typescript
    // src/index.ts
    const pdfOptions: PDFOptions = {
        path: outputPdfPath,
        format: 'Letter', // Change format, e.g., 'Letter', 'Legal'
        printBackground: true,
        margin: {
            top: '40px',
            bottom: '40px',
            // ... more options
        }
    };
    ```
