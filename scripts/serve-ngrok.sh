#!/bin/bash

source .env
exec ngrok http --domain "${NGROK_DOMAIN}" "${PORT}"
