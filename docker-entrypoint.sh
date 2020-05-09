#!/bin/bash

if [ -n $1 ]; then
    echo "Argument \$1 found! Value: $1"
    echo "Waiting for dependencies start..."
    /wait && \
    echo "Dependencies connected. Starting Server..." && \
    npm $1
else
    echo 'No arguments found. $1 is not defined'
fi