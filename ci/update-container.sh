#!/bin/ash
DEBUG=1 kontena master login --token aede1e504fe2bc0370acd91971ca196baed071c98ae811506edc3485b7440725 https://shy-surf-7337.platforms.eu-west-1.kontena.cloud
kontena stack upgrade boxycard ./ep-marketplace/ci/kontena.yml
