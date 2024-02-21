#!/bin/bash

source .env
ngrok config add-authtoken "${NGROK_TOKEN}"
