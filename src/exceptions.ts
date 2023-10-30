import { StatusCode, DecryptForbiddenException, NotFoundException } from '@digichanges/shared-experience';
import InvalidPasswordException from './Main/Domain/Exceptions/InvalidPasswordException';

const exceptions = {
    [DecryptForbiddenException.name]: StatusCode.HTTP_FORBIDDEN,
    [NotFoundException.name]: StatusCode.HTTP_BAD_REQUEST,
    [InvalidPasswordException.name]: StatusCode.HTTP_UNPROCESSABLE_ENTITY,
};

export default exceptions;
