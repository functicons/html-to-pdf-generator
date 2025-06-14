#!/bin/bash

# ==============================================================================
# HTML to PDF Generator Wrapper Script
# ==============================================================================
#
# Description:
#   A user-friendly wrapper for the Node.js HTML to PDF converter.
#   This script handles argument checking and runs the underlying npm script.
#
# Author:
#   Your Name
#
# Version:
#   1.0.0
#
# Usage:
#   ./html-to-pdf.sh <path/to/input.html | url> [path/to/output.pdf]
#
# ==============================================================================

# --- Configuration ---
# Exit immediately if a command exits with a non-zero status.
set -e

# --- Argument Validation ---
# Check if an input file was provided. The first argument ($1) must exist.
if [ -z "$1" ]; then
    # If no argument is provided, print an error and the usage instructions.
    echo "❌ Error: No input HTML file or URL specified." >&2
    echo "" >&2
    echo "Usage: ./html-to-pdf.sh <path/to/input.html | url> [path/to/output.pdf]" >&2
    echo "" >&2
    echo "Example: ./html-to-pdf.sh examples/invoice.html invoice.pdf" >&2
    echo "Example: ./html-to-pdf.sh https://example.com example.pdf" >&2
    exit 1
fi

# --- Execution ---
# Announce the start of the process.
echo "🚀 Starting PDF generation via npm script..."

# Run the `npm start` command.
# The `--` is a best practice that tells npm to stop parsing its own options
# and pass all subsequent arguments directly to the underlying script.
# "$@" passes all arguments given to this shell script to the npm command.
npm start -- "$@"

# Announce completion.
echo "✅ PDF generation process finished."
