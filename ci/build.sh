#!/usr/bin/env bash

yarn_cache_dir=$(yarn cache dir)
mv -T $yarn_cache_dir "$yarn_cache_dir-ci-old"
mkdir -p ./cache/yarn
mv -T ./cache/yarn $yarn_cache_dir

yarn install --prefer-offline
yarn build

cd build
tar zcvf ./../frontend.tar.gz .
cd ..

mv -T $yarn_cache_dir ./cache/yarn
mv -T "$yarn_cache_dir-ci-old" $yarn_cache_dir
