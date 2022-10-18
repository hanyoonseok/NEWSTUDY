# 1. 크롤링 실행

echo "크롤링 시작"

python3 /home/ubuntu/crawling/daily_main.py

echo "크롤링 작업 완료"


# 2. 스파크 실행

echo "하둡 시작"

ssh -i J7B207T.pem j7b207@cluster.ssafy.io
/home/j7b207/hadoop_work.sh

echo "하둡 작업 완료"
