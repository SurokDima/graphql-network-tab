#!/bin/bash

SCRIPT=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")

echo "Script path is ${SCRIPT_DIR}"

tsc

echo "Building devtools-page"
yarn build:devtools-page

echo "Building service-worker"
yarn build:service-worker

echo "Building content-script"
yarn build:content-script

echo "Building injected-script"
yarn build:injected-script


echo "Removing old dist files"
rm -rf "${SCRIPT_DIR}/../dist"

echo "Creating root dist directory"
mkdir -p "${SCRIPT_DIR}/../dist"

echo "Copying devtools dist files to root dist"
mkdir "${SCRIPT_DIR}/../dist"
cp -a "${SCRIPT_DIR}/../src/modules/devtools-page/dist/." "${SCRIPT_DIR}/../dist"

echo "Copying service-worker dist files to root dist"
mkdir "${SCRIPT_DIR}/../dist/service-worker"
cp -a "${SCRIPT_DIR}/../src/modules/service-worker/dist/." "${SCRIPT_DIR}/../dist/service-worker"

echo "Copying content-script dist files to root dist"
mkdir "${SCRIPT_DIR}/../dist/content-script"
cp -a "${SCRIPT_DIR}/../src/modules/content-script/dist/." "${SCRIPT_DIR}/../dist/content-script"

echo "Copying injected-script dist files to root dist"
mkdir "${SCRIPT_DIR}/../dist/injected-script"
cp -a "${SCRIPT_DIR}/../src/modules/injected-script/dist/." "${SCRIPT_DIR}/../dist/injected-script"

echo "Copying manifest.json to root dist"
cp "${SCRIPT_DIR}/../manifest.json" "${SCRIPT_DIR}/../dist/manifest.json"
