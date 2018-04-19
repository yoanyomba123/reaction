# OWASP ZAP

Security scan using the [OWASP ZAP](https://github.com/zaproxy/zaproxy) tool.

Zap is configured via a Docker Compose manifest. It assumes that the Reaction
app is running on an existing user-defined network.

## Running the Scan

From the project root:

```
# Create a user-defined network in Docker.
docker network create reaction-api

# Start the Reaction application.
# Ensure the application is ready and accepting requests before testing!
docker-compose up -d

# Launch the scan.
docker-compose \
  -f .circleci/deployment-pipeline/owasp-security/docker-compose.yml \
  run owasp \
    zap-baseline.py -t http://reaction:3000
```

## Scan Configuration

The scan is configured using the
[Zap Baseline Scan](https://github.com/zaproxy/zaproxy/wiki/ZAP-Baseline-Scan)
configuration.
