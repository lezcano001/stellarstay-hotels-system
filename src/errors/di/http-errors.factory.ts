import { ServiceFactory, ServiceKey } from "composed-di";
import { HttpErrors } from "../HttpErrors";

const HTTP_ERRORS = new ServiceKey<HttpErrors>('HttpErrors');
const httpErrorsFactory = ServiceFactory.singleton<HttpErrors>({
  provides: HTTP_ERRORS,
  dependsOn: [],
  initialize: () => {
    return new HttpErrors()
  }
})

export {
  HTTP_ERRORS,
  httpErrorsFactory
}