#!/usr/bin/env bash

function generate_label_array () {
  label_list=(
    "traefik.enable=true"
  )

  if [ "${CONTAINER_INNER_PORT}" != "" ]; then
    label_list+=("traefik.http.services.Service-${CONTAINER_NAME_PREFIX}.loadbalancer.server.port=${CONTAINER_INNER_PORT}")
  fi

  label_list+=(
    "traefik.http.routers.HttpRouter-${CONTAINER_NAME_PREFIX}.entrypoints=web"
    "traefik.http.routers.HttpRouter-${CONTAINER_NAME_PREFIX}.rule=${EXPOSE_RULE}"
  )

  if [ "${EXPOSE_HTTPS_ENABLED,,}" == "true" ]; then
    label_list+=(
      "traefik.http.routers.HttpsRouter-${CONTAINER_NAME_PREFIX}.entrypoints=websecure"
      "traefik.http.routers.HttpsRouter-${CONTAINER_NAME_PREFIX}.rule=${EXPOSE_RULE}"
      "traefik.http.routers.HttpsRouter-${CONTAINER_NAME_PREFIX}.tls.certresolver=LetsEncrypt"
    )
  fi

  if [ "${EXPOSE_REWRITE_ENABLED,,}" == "true" ]; then
    label_list+=(
      "traefik.http.middlewares.URLRewrite.replacepathregex.regex=${EXPOSE_REWRITE_REGEX}"
      "traefik.http.middlewares.URLRewrite.replacepathregex.replacement=${EXPOSE_REWRITE_REPLACE}"
      "traefik.http.routers.HttpRouter-${CONTAINER_NAME_PREFIX}.middlewares=URLRewrite"
    )
    if [ "${EXPOSE_HTTPS_ENABLED,,}" == "true" ]; then
      label_list+=("traefik.http.routers.HttpsRouter-${CONTAINER_NAME_PREFIX}.middlewares=URLRewrite")
    fi
  fi

  labels=()  # 真诚赞美 bash，函数居然只允许返回数值，别的只能通过全局变量传出去
  for i in "${!label_list[@]}"; do
    labels+=("-l" "${label_list[i]}")
  done
}

generate_label_array

mkdir dist
cd dist
tar zxvf ./../frontend.tar.gz
cd ..
docker build -f ./ci/Dockerfile -t $IMAGE_REPO_PREFIX-dev01:$IMAGE_VER .
docker stop $CONTAINER_NAME_PREFIX-dev01 || true && docker rm $CONTAINER_NAME_PREFIX-dev01 || true
docker run -d -p 80 --name $CONTAINER_NAME_PREFIX-dev01 "${labels[@]}" $IMAGE_REPO_PREFIX-dev01:$IMAGE_VER
