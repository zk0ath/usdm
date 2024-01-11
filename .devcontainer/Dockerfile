FROM node:alpine
RUN apk add git
RUN corepack enable npm
RUN apk add --no-cache curl && \
    curl -L https://github.com/cli/cli/releases/download/v2.42.1/gh_2.42.1_linux_arm64.tar.gz | tar xz && \
    mv gh_2.42.1_linux_arm64/bin/gh /usr/local/bin/ && \
    rm -rf gh_2.42.1_linux_arm64
ENV GITHUB_TOKEN ""