# HTML to PDF Generator (Node.js & TypeScript)

A simple and powerful command-line tool built with Node.js, TypeScript, and Puppeteer to convert local HTML files into high-quality PDFs. This is perfect for generating invoices, reports, or any other documents from web-standard templates.

## ✨ Features

-   **HTML to PDF Conversion**: Renders any local HTML file or a publicly accessible URL and saves it as a PDF.
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

After you have run `npm install` once, you can run the tool from your terminal. 

There are a few ways to run the converter:

### 1. Using the Wrapper Script (Recommended for general use)

The `html-to-pdf.sh` script provides a user-friendly way to run the converter with argument checking.

Make sure the script is executable:
```bash
chmod +x html-to-pdf.sh
```

Then, run it by providing the path to your HTML file or a URL as the first argument and an optional output file name as the second argument.

```bash
# Basic usage with a local example invoice
./html-to-pdf.sh examples/invoice.html

# Specifying a custom output file name for a local file
./html-to-pdf.sh examples/invoice.html my-custom-invoice.pdf

# Basic usage with a URL
./html-to-pdf.sh https://example.com

# Specifying a custom output file name for a URL
./html-to-pdf.sh https://example.com my-output.pdf
```

### 2. Running with `npm start` (for development)

This command compiles and runs the TypeScript code on the fly. This is equivalent to what the `html-to-pdf.sh` script does under the hood via `npm start`.
```bash
# Basic usage with a local example invoice
npm start examples/invoice.html

# Specifying a custom output file name for a local file
npm start examples/invoice.html my-custom-invoice.pdf

# Basic usage with a URL
npm start https://example.com

# Specifying a custom output file name for a URL
npm start https://example.com my-output.pdf
```

### 3. Building and Running the JavaScript Output

First, compile the TypeScript code into plain JavaScript:
```bash
npm run build
```

Then, run the compiled code with `node`, passing the arguments:
```bash
# Basic usage with a local file
node dist/index.js examples/invoice.html

# Specifying an output file name for a local file
node dist/index.js examples/invoice.html my-custom-invoice.pdf

# Basic usage with a URL
node dist/index.js https://example.com

# Specifying an output file name for a URL
node dist/index.js https://example.com my-output.pdf
```
If you do not specify an output file name, the PDF will be created with the same base name as your HTML file (e.g., `invoice.html` generates `invoice.pdf`). If the input is a URL and no output name is specified, it will default to `output.pdf`.
