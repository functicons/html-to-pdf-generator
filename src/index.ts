import puppeteer, { PDFOptions } from 'puppeteer';
import path from 'path';
import fs from 'fs';

/**
 * Generates a PDF from a local HTML file.
 * @param htmlFilePath The absolute or relative path to the HTML file.
 * @param outputPdfPath The path where the generated PDF will be saved.
 */
async function generatePdfFromHtml(htmlFilePath: string, outputPdfPath: string): Promise<void> {
    console.log('🚀 Starting PDF generation...');

    // Resolve the absolute path for the HTML file.
    const absoluteHtmlPath = path.resolve(htmlFilePath);
    
    // Check if the HTML file exists
    if (!fs.existsSync(absoluteHtmlPath)) {
        console.error(`❌ Error: HTML file not found at ${absoluteHtmlPath}`);
        process.exit(1); // Exit with an error code
    }

    console.log(`📄 Reading HTML file from: ${absoluteHtmlPath}`);

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

        // Navigate to the local HTML file.
        await page.goto(`file://${absoluteHtmlPath}`, {
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
    const htmlFile = args[0];

    // **FIX**: Add a check to ensure htmlFile is not undefined.
    // This acts as a "type guard" for TypeScript.
    if (!htmlFile) {
        console.error('❌ Please provide the path to the input HTML file.');
        console.log('\nUsage:');
        console.log('  npm start <path/to/your.html> [output-name.pdf]\n');
        process.exit(1); // Exit with an error code.
    }
    
    // After the check above, TypeScript knows `htmlFile` is a `string`.
    const outputFileName = args[1] || `${path.parse(htmlFile).name}.pdf`;

    // Run the generator
    await generatePdfFromHtml(htmlFile, outputFileName);
}

// Execute the main function.
main().catch(console.error);
