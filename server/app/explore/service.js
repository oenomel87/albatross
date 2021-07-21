import logger from 'loglevel';
import got from 'got';
import decompressResponse from 'decompress-response';

const defaultHeader = {
  'Cache-Control': 'no-cache',
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection:  'keep-alive',
  'User-Agent': 'Albatross'
}

export default class ExploreService {
  async explore(header, method, uri, params) {
    try {
      if(!this.checkValidation(method)) {
        throw new Error('잘못된 입력값입니다.');
      }

      const headers = { ...defaultHeader, ...header };

      const options = {
        method,
        headers
      }
      if(params) {
        options['searchParams'] = params;
      }

      const response = await got(uri, options)
      return {
        headers: response.headers,
        body: response.body
      };
    } catch (err) {
      logger.error(err);
      throw new Error('요청을 처리할 수 없습니다.');
    }
  }
  
  checkValidation(method) {
    return this.isValidMethod(method);
  }

  isValidMethod(method) {
    const validList = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    return validList.indexOf(method.toUpperCase()) > -1;
  }
}
