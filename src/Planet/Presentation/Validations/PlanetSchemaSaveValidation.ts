import { z } from 'zod';

const PlanetSchemaSaveValidation = z.object({
    name: z.string().min(2),
    rotationPeriod: z.string().min(1),
    orbitalPeriod: z.string().min(1),
    diameter: z.string().min(1),
    climate: z.string().min(2),
    gravity: z.string().min(2),
    terrain: z.string().min(2),
    surfaceWater: z.string().min(2),
    population: z.string().min(1),
    url: z.string().url(),
});

export default PlanetSchemaSaveValidation;
