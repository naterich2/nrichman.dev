#!/bin/bash

echo "Enter Author: "
read author

echo "Enter Title: "
read title

echo "Enter Storage Path: "
read path

echo "Enter Synopsis: "
read synopsis

echo "Enter Beginning: "
read beginning

echo "Enter Tags: "
read tags

/usr/bin/node /home/nrichman/web/nrichman.dev/private/addBlog.js "$title" "$author" "$path" "$synopsis" "$beginning" "$tags"
