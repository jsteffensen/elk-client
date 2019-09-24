import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import * as elasticsearch from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})

export class ElasticSearchService {

  private client: Client;
 
  constructor() {
    if (!this.client) {
      this._connect();
    }
  }
 
  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }
 
  private _connect() {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }
 
  isAvailable(): Promise<any> {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'give me a ping - and one ping only.'
    });
  }
  
  getIndices(): Promise<any> {
	return this.client.cat.indices({
	  index: 'casefiles',
      format: 'json'
    });  
  }
  
  getRootFile(): Promise<any> {
	return this.client.cat.indices({
	  index: 'casefiles',
      format: 'json'
    });  
  }
}
