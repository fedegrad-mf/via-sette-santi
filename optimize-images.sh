#!/bin/bash
# Image Optimization Script for Via dei Sette Santi
# Optimizes images for web delivery: resize and convert to WebP

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check dependencies
if ! command -v convert &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed.${NC}"
    echo "Please install ImageMagick:"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

IMAGES_DIR="public/images"

echo -e "${GREEN}Starting image optimization...${NC}"

# Function to optimize and convert images
optimize_image() {
    local src=$1
    local width=$2
    local height=$3
    local quality=${4:-85}
    
    local filename=$(basename "$src")
    local dir=$(dirname "$src")
    local name="${filename%.*}"
    local ext="${filename##*.}"
    local webp_out="$dir/${name}.webp"
    
    echo -e "${YELLOW}Processing: $filename${NC}"
    
    # Resize JPEG with optimization
    convert "$src" \
        -resize "${width}x${height}^" \
        -gravity center \
        -extent "${width}x${height}" \
        -strip \
        -quality $quality \
        -interlace Plane \
        "$src.tmp"
    
    mv "$src.tmp" "$src"
    
    # Create WebP version
    convert "$src" \
        -quality $quality \
        "$webp_out"
    
    echo "  ✓ Resized to ${width}x${height} and created WebP"
}

# Optimize hero images (1920x800 for carousel)
echo -e "\n${GREEN}=== Optimizing Hero Images (1920x800) ===${NC}"
for img in "$IMAGES_DIR"/hero-*.jpg; do
    if [ -f "$img" ]; then
        optimize_image "$img" 1920 800 85
    fi
done

# Optimize trail images (800x600 for cards)
echo -e "\n${GREEN}=== Optimizing Trail Images (800x600) ===${NC}"
for img in "$IMAGES_DIR/trails"/trail-*.jpg; do
    if [ -f "$img" ]; then
        optimize_image "$img" 800 600 85
    fi
done

# Optimize saint images (600x800 for portrait cards)
echo -e "\n${GREEN}=== Optimizing Saint Images (600x800) ===${NC}"
for img in "$IMAGES_DIR/saints"/saint-*.jpg; do
    if [ -f "$img" ]; then
        optimize_image "$img" 600 800 85
    fi
done

echo -e "\n${GREEN}✓ Image optimization complete!${NC}"
echo ""
echo "Summary:"
echo "  - Hero images resized to 1920x800"
echo "  - Trail images resized to 800x600"
echo "  - Saint images resized to 600x800"
echo "  - All images converted to WebP format"
echo "  - JPEG quality set to 85%"
echo "  - Progressive JPEG encoding enabled"
echo "  - EXIF metadata stripped"
