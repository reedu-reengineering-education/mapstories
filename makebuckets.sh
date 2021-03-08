#!/usr/bin/env sh
aws --endpoint-url=http://localhost:4566 s3 mb s3://uploads.knilab.com
aws --endpoint-url=http://localhost:4566 s3 mb s3://cdn.knilab.com

# if you are using awslocal cli
# awslocal s3 mb s3://uploads.knilab.com
# awslocal s3 mb s3://cdn.knilab.com