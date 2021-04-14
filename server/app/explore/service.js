import logger from 'loglevel';
import axios from 'axios';

export default class ExploreService {
  async explore(method, uri) {
    try {
      if(!this.checkValidation(method)) {
        throw new Error('잘못된 입력값입니다.');
      }

      const request = await axios.request({
        method,
        url: uri
      });
      const response = request.data;

      logger.info(response);
      
      return response;
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
