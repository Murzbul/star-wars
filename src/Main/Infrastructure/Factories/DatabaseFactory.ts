import MainConfig from '../../../Config/MainConfig';
import CreateMongooseConnection from '../Database/CreateMongooseConnection';
import ICreateConnection from '../Database/ICreateConnection';

type DbValueProp = typeof CreateMongooseConnection;

class DatabaseFactory
{
    private readonly dbDefault: string;
    private config = MainConfig.getInstance().getConfig();

    constructor(dbDefault?: string)
    {
        this.dbDefault = dbDefault ?? this.config.dbConfig.default;
    }

    create(_db?: string): ICreateConnection
    {
        const db = _db ?? this.dbDefault;
        const { dbConfig } = this.config;
        const config = dbConfig[db];

        const strategy = new Map<string, DbValueProp>();
        strategy.set('Mongoose', CreateMongooseConnection);

        return new (strategy.get(db))(config);
    }
}

export default DatabaseFactory;
