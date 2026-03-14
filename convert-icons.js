#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');

async function convertIcon() {
  const inputPath = './logo.svg';
  const sizes = [512, 256, 128, 64, 32];

  console.log('🎨 Converting icons...');

  for (const size of sizes) {
    await sharp(inputPath)
      .resize(size, size)
      .png()
      .toFile(`logo-${size}x${size}.png`);
    console.log(`✅ PNG ${size}x${size}`);
  }

  await sharp(inputPath)
    .resize(512, 512)
    .jpeg({ quality: 90 })
    .toFile('logo-512x512.jpg');
  console.log('✅ JPG 512x512');

  await sharp(inputPath)
    .resize(512, 512)
    .gif()
    .toFile('logo-512x512.gif');
  console.log('✅ GIF 512x512');

  console.log('✨ All conversions completed!');
}

convertIcon().catch(console.error);
