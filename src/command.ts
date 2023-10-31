import { exit } from 'shelljs';
import commander from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import './register';
import CreateVapID from './Notification/Presentation/Commands/CreateVapID';

import Seed from './Main/Presentation/Commands/SeedCommand';
import initCommand from './initCommand';
import Logger from './Shared/Helpers/Logger';
import SyncData from './Swapi/Presentation/Commands/SyncCommand';

void (async() =>
{
    try
    {
        await initCommand();

        const program = commander.program;

        program.addCommand(CreateVapID);
        program.addCommand(Seed);
        program.addCommand(SyncData);

        await program.parseAsync(process.argv);
        exit();
    }
    catch (error)
    {
        // TODO: Add exception mapping to handle errors like server express
        await Logger.error(error);
        exit();
    }
})();
