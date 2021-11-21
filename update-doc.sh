#!/bin/bash

# Update docs/index.html with minified Hide-Empty-Trello-Lists-Bookmarklet.js

function f () {
  local BOOKMARKET_PATH=Hide-Empty-Trello-Lists-Bookmarklet.js
  local DOC_PATH=docs/index.html
  local TMP_FILE_PATH=${DOC_PATH}.TMP_BUILD

  if [ "$(grep \\\" $BOOKMARKET_PATH)" != "" ]; then
    `which echo` -e "\033[1;31mERROR\033[0m Bookmarklet cannot use double quotes!"
    return 1;
  fi

  # Output index.html before 'href="javascript:'.  (last sed trims final newline)
  cat docs/index.html | sed -ne '0,/href="javascript:/p' | sed -re 's/(href=")javascript:.*$/\1/' | sed -z '$ s/\n$//' > $TMP_FILE_PATH
  # Output bookmarklet minified
  cat $BOOKMARKET_PATH | sed -re 's/(^|;)\s*\/\/.*$//' | tr -s [:space:] ' ' | sed -e 's/^ //' -e 's/ $//' >> $TMP_FILE_PATH
  # Output index.html after bookmarklet (starting with '">')
  cat docs/index.html | sed -ne '/href="javascript:/,//p' | sed -re 's/^.*href="javascript:[^"]*//' >> $TMP_FILE_PATH

  mv -f $TMP_FILE_PATH $DOC_PATH

  echo -e "\033[1;32mDone\033[0m $DOC_PATH updated"
}

f;

