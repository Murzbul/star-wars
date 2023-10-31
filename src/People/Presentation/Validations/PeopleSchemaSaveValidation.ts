import { z } from 'zod';

const PeopleSchemaSaveValidation = z.object({
    name: z.string().min(2),
    height: z.string().min(1),
    mass: z.string().min(1),
    hairColor: z.string().min(1),
    skinColor: z.string().min(2),
    eyeColor: z.string(),
    birthYear: z.string(),
    gender: z.string(),
    homeWorld: z.string().uuid(),
    url: z.string().url(),
});

export default PeopleSchemaSaveValidation;
