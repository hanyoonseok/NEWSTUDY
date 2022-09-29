## Dockerfile(client)

# nginx 이미지를 사용
FROM nginx

# work dir
WORKDIR /home/blog/client

# work dir 에 build 폴더 생성 : /home/blog/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 복사
COPY ./newstudy.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80 443

# container 실행 시 자동으로 실행할 command. nginx 시작
CMD ["nginx", "-g", "daemon off;"]