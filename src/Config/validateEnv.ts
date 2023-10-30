import { cleanEnv, str, port, bool, num, url } from 'envalid';

export function validateEnv()
{
    if (process.env.NODE_ENV === 'test')
    {
        return cleanEnv(process.env, { NODE_ENV: str() });
    }

    return cleanEnv(process.env, {
        NODE_ENV: str(),

        APP_DEFAULT: str(),
        APP_PATH: str(),
        APP_PORT: port(),
        APP_SET_APP_PROXY: bool(),
        APP_SET_COOKIE_SECURE: bool(),
        APP_SET_COOKIE_SAME_SITE: str(),

        DB_URI: str(),
        DB_ORM_DEFAULT: str(),

        MINIO_HOST: str(),
        MINIO_ACCESS_KEY: str(),
        MINIO_SECRET_KEY: str(),
        MINIO_USE_SSL: bool(),
        MINIO_PORT: port(),
        MINIO_PUBLIC_BUCKET: str(),
        MINIO_PRIVATE_BUCKET: str(),
        MINIO_REGION: str(),
        FILESYSTEM_DEFAULT: str(),

        TZ: str(),

        JWT_SECRET: str(),
        JWT_EXPIRES: num(),
        JWT_ISS: str(),
        JWT_AUD: str(),

        SMTP_HOST: str(),
        SMTP_PORT: num(),
        SMTP_SECURE_SSL: bool(),
        SMTP_SENDER_NAME: str(),
        SMTP_SENDER_EMAIL_DEFAULT: str(),

        URL_API: url(),
        URL_WEB: url(),

        PRODUCT_NAME: str(),
        ENCRYPTION_DEFAULT: str(),
        PUSH_PRIVATE_KEY: str(),
        PUSH_PUBLIC_KEY: str(),
        EXECUTE_CRONS: bool()
    });
}
