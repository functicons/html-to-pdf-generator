# Makefile for the HTML to PDF Generator

# --- Variables ---
# Use the local node_modules binaries
SHELL := /bin/bash
NODE_MODULES = ./node_modules
NPM = npm

# --- Phony Targets ---
# These targets do not produce files with the same name.
.PHONY: all install build run pdf clean help

# --- Default Target ---
# The command that runs when you just type `make`.
all: help

# --- Installation ---
# Installs node dependencies using npm.
# The target checks for the existence of the node_modules directory.
install: $(NODE_MODULES)

$(NODE_MODULES): package.json
	@echo "📦 Installing dependencies..."
	$(NPM) install

# --- Build ---
# Compiles TypeScript to JavaScript. This depends on the dependencies being installed.
build: install
	@echo "⚙️  Building project..."
	$(NPM) run build

# --- Execution ---
# Runs the PDF generator. Pass arguments using ARGS.
# Example: make run ARGS="examples/invoice.html my-output.pdf"
run: build
	@echo "▶️  Running PDF generator..."
	@if [ -z "$(ARGS)" ]; then \
		echo "❌ Error: Please provide the input HTML file using ARGS."; \
		echo "   Example: make run ARGS=\"examples/invoice.html\""; \
		exit 1; \
	fi
	node dist/index.js $(ARGS)

# --- Convenience Target ---
# A shortcut to generate the PDF from the default example template.
pdf: build
	@echo "📄 Generating PDF from example invoice..."
	node dist/index.js examples/invoice.html

# --- Cleanup ---
# Removes generated files and directories.
clean:
	@echo "🧹 Cleaning up project..."
	@rm -rf dist
	@rm -f *.pdf
	@echo "✅ Cleanup complete."

# --- Help ---
# Displays a list of available commands.
help:
	@echo "Makefile Commands:"
	@echo "  make install      - Installs project dependencies."
	@echo "  make build        - Compiles the TypeScript code."
	@echo "  make run ARGS=... - Runs the script. ARGS should contain file paths."
	@echo "                    Example: make run ARGS=\"examples/invoice.html custom.pdf\""
	@echo "  make pdf          - A shortcut to generate the PDF from the default example."
	@echo "  make clean        - Removes all generated files (dist directory, PDFs)."
	@echo "  make help         - Displays this help message."

