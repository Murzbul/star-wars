import { Command } from 'commander';
import SyncDataUseCase from '../../Domain/UseCases/SyncDataUseCase';

const SyncData = new Command('swapiSync');

SyncData
    .alias('sd')
    .version('0.0.1')
    .description('Run the swapi sync')
    .action(async() =>
    {
        const useCase = new SyncDataUseCase();

        await useCase.handle();
    });

export default SyncData;
