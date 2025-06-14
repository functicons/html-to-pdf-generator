import puppeteer, { PDFOptions } from 'puppeteer';
import path from 'path';
import fs from 'fs';

/**
 * Generates a PDF from an HTML file path or URL.
 * @param htmlInput The absolute or relative path to the HTML file, or a URL.
 * @param outputPdfPath The path where the generated PDF will be saved.
 */
async function generatePdfFromHtml(htmlInput: string, outputPdfPath: string): Promise<void> {
    console.log('🚀 Starting PDF generation...');

    let pageUrl: string;

    // Check if htmlInput is a URL
    if (htmlInput.startsWith('http://') || htmlInput.startsWith('https://')) {
        pageUrl = htmlInput;
        console.log(`📄 Reading HTML from URL: ${pageUrl}`);
    } else {
        // Resolve the absolute path for the HTML file.
        const absoluteHtmlPath = path.resolve(htmlInput);
        
        // Check if the HTML file exists
        if (!fs.existsSync(absoluteHtmlPath)) {
            console.error(`❌ Error: HTML file not found at ${absoluteHtmlPath}`);
            process.exit(1); // Exit with an error code
        }
        pageUrl = `file://${absoluteHtmlPath}`;
        console.log(`📄 Reading HTML file from: ${absoluteHtmlPath}`);
    }

    // Launch a headless browser instance.
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necessary for running in some environments.
    });

    console.log('🌐 Browser launched.');

    try {
        // Create a new page.
        const page = await browser.newPage();
        console.log('📄 New page created.');

        // Navigate to the local HTML file or URL.
        await page.goto(pageUrl, {
            waitUntil: 'networkidle0',
        });
        console.log('✅ HTML page loaded successfully.');

        // Define PDF options.
        const pdfOptions: PDFOptions = {
            path: outputPdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        };

        // Generate the PDF.
        await page.pdf(pdfOptions);
        console.log(`🎉 PDF successfully generated and saved to: ${outputPdfPath}`);

    } catch (error) {
        console.error('An error occurred during PDF generation:', error);
    } finally {
        // Ensure the browser is closed, even if an error occurs.
        await browser.close();
        console.log('🚪 Browser closed.');
    }
}

/**
 * Main function to run the script.
 */
async function main() {
    // Read command line arguments.
    const args = process.argv.slice(2);
    const htmlInput = args[0]; // Renamed from htmlFile to htmlInput

    // **FIX**: Add a check to ensure htmlInput is not undefined.
    // This acts as a "type guard" for TypeScript.
    if (!htmlInput) {
        console.error('❌ Please provide the path to the input HTML file or a URL.');
        console.log('\nUsage:');
        console.log('  npm start <path/to/your.html | url> [output-name.pdf]\n');
        process.exit(1); // Exit with an error code.
    }
    
    // After the check above, TypeScript knows `htmlInput` is a `string`.
    // Determine a default output name if input is a URL and no output name is provided
    let defaultOutputName = 'output.pdf';
    if (!htmlInput.startsWith('http://') && !htmlInput.startsWith('https://')) {
        defaultOutputName = `${path.parse(htmlInput).name}.pdf`;
    }
    const outputFileName = args[1] || defaultOutputName;

    // Run the generator
    await generatePdfFromHtml(htmlInput, outputFileName);
}

// Execute the main function.
main().catch(console.error);
