FROM node:4

RUN wget https://github.com/celer/simple-nodejs-websockets-example/archive/master.zip
RUN apt-get update
RUN apt-get install -y unzip
RUN unzip master.zip
RUN (cd simp* && npm install .)

EXPOSE 8080

CMD (cd simp* && npm start)




