#!/bin/bash
# check_all.sh — validate all output images for a given run
# Usage: ./check_all.sh pages/run-08-arc-v2

DIR="${1:-pages/run-08-arc-v2}"
BASE="/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images"
PASS=0
FAIL=0

echo "=============================="
echo "Output Validation Run"
echo "Directory: $DIR"
echo "=============================="

for i in 01 02 03 04 05; do
  # Find the image for this issue in the given run dir
  IMG=$(ls "$BASE/$DIR/"*"issue_0${i#0}"*.png 2>/dev/null | head -1)
  if [ -z "$IMG" ]; then
    IMG=$(ls "$BASE/$DIR/"*"_0${i}_"*.png 2>/dev/null | head -1)
  fi

  if [ -z "$IMG" ]; then
    echo "⚠ Issue $i: no image found in $DIR"
    continue
  fi

  node "$(dirname "$0")/validate_output.js" "$i" "$IMG"
  if [ $? -eq 0 ]; then
    PASS=$((PASS + 1))
  else
    FAIL=$((FAIL + 1))
  fi
done

echo "=============================="
echo "Results: $PASS passed, $FAIL failed"
echo "=============================="
