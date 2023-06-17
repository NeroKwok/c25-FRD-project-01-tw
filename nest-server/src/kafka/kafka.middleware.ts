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
    const message = {
      key: 'nest-log-ip',
      value: String(req.ip),
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
}
