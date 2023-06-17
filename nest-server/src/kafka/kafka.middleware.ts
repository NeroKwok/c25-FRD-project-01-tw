import { Injectable, NestMiddleware } from '@nestjs/common';
import { Producer, Kafka } from 'kafkajs';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class KafkaMiddleware implements NestMiddleware {
  kafka: Kafka;
  producer: Producer;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'nest-log-producer',
      brokers: ['34.87.101.69:9092'],
    });
    this.producer = this.kafka.producer();
    this.connect();
  }
  async connect() {
    try {
      await this.producer.connect();
    } catch (e) {
      console.log(e);
    }
  }
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('request: \n', req.ip);
    const topic = 'new-pages';
    const userAgent = req.headers['user-agent'] || '';
    const os = userAgent.split(/[()]/)[1] || 'Unknown'; // Extract operating system info from user-agent header
    const device = userAgent.match(/(iPhone|iPod|iPad|Android|Windows Phone)/)
      ? 'Mobile'
      : 'Desktop'; // Detect device type based on user-agent header
    const browser = userAgent.split(/[()]/)[2]?.split(' ')[1] || 'Unknown'; // Extract browser info from user-agent header
    const message = {
      key: 'nest-log-ip',
      value: JSON.stringify({
        ip: req.ip,
        os: os,
        device: device,
        browser: browser,
      }),
    };
    const messages = Array(1).fill(message);
    try {
      await this.producer
        .send({
          topic,
          messages: messages,
        })
        .then(console.log);
    } catch (e) {
      console.log('[error]', e);
    }
    next();
  }

  async logUserLogin(name: string, email: string) {
    const topic = 'user-logins';
    const message = {
      key: 'user-login',
      value: JSON.stringify({
        name: name,
        email: email,
        time: new Date().toISOString(),
      }),
    };
    const messages = Array(1).fill(message);
    try {
      await this.producer
        .send({
          topic,
          messages: messages,
        })
        .then(console.log);
    } catch (e) {
      console.log('[error]', e);
    }
  }
}